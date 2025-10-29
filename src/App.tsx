import { useState, useEffect, useMemo, useCallback } from 'react';

import ProjectItem from './components/ProjectItem';
import { type Repository } from './types';
import SearchInput from './components/SearchInput';
import FilterToggle from './components/FilterToggle';
import SkeletonLoader from './components/SkeletonLoader';
import useDebounce from './hooks/useDebounce';
import './App.css';

//  Importing logo image
import gitLogo from './git_pic2.png';

// status types for API calls
type Status = 'idle' | 'loading' | 'success' | 'error';

function App() {
  // --- STATE MANAGEMENT ---
  const [searchTerm, setSearchTerm] = useState(''); // search text
  const [repositories, setRepositories] = useState<Repository[]>([]); // search results
  const [status, setStatus] = useState<Status>('idle'); // API state
  const [error, setError] = useState<string | null>(null); // error messages
  const [showBookmarked, setShowBookmarked] = useState(false); // toggle filter

  // --- LOCAL STORAGE (Bookmarks) ---
  const [bookmarkedRepos, setBookmarkedRepos] = useState<Repository[]>(() => {
    try {
      const storedBookmarks = localStorage.getItem('githubBookmarks');
      const parsed = storedBookmarks ? JSON.parse(storedBookmarks) : [];
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (item) => item && typeof item === 'object' && item.id && item.owner && item.html_url
        );
      }
      return [];
    } catch (error) {
      console.error('Error reading bookmarks from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('githubBookmarks', JSON.stringify(bookmarkedRepos));
    } catch (error) {
      console.error('Error saving bookmarks to localStorage', error);
    }
  }, [bookmarkedRepos]);

  // --- API FETCHING ---
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchRepos = useCallback(async (query: string) => {
    setStatus('loading');
    setError(null);
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${query}&per_page=30`
      );
      if (!response.ok) throw new Error('Something went wrong. Please try again.');

      const data = await response.json();
      setRepositories(data.items);
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    const trimmedSearch = debouncedSearchTerm.trim();
    if (trimmedSearch && !showBookmarked) {
      fetchRepos(trimmedSearch);
    } else if (!showBookmarked) {
      setRepositories([]);
      setStatus('idle');
      setError(null);
    }
  }, [debouncedSearchTerm, showBookmarked, fetchRepos]);

  const toggleBookmark = useCallback((repoToToggle: Repository) => {
    setBookmarkedRepos((current) => {
      const alreadyBookmarked = current.some((repo) => repo.id === repoToToggle.id);
      return alreadyBookmarked
        ? current.filter((repo) => repo.id !== repoToToggle.id)
        : [...current, repoToToggle];
    });
  }, []);

  const handleSearchChange = useCallback((newSearch: string) => {
    setSearchTerm(newSearch);
  }, []);

  const handleToggleChange = useCallback((isOn: boolean) => {
    setShowBookmarked(isOn);
    if (isOn) setSearchTerm('');
  }, []);

  const displayedRepos = useMemo(() => {
    if (showBookmarked) {
      const list = bookmarkedRepos;
      const trimmedSearch = searchTerm.trim().toLowerCase();
      return trimmedSearch
        ? list.filter((repo) => repo.name.toLowerCase().includes(trimmedSearch))
        : list;
    } else {
      return repositories;
    }
  }, [repositories, bookmarkedRepos, showBookmarked, searchTerm]);

  const isRepoBookmarked = (repoId: number) =>
    bookmarkedRepos.some((repo) => repo.id === repoId);

  // --- UI ---
  return (
    <div className="container">
      {/* Logo and title together */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
        <img
          src={gitLogo}
          alt="GitHub Logo"
          style={{ width: '78px', height: '78px', borderRadius: '8px' }}
        />
        <h1>GitHub Repository Finder</h1>
      </div>

      <SearchInput value={searchTerm} onChange={handleSearchChange} />

      <FilterToggle showBookmarked={showBookmarked} onToggle={handleToggleChange} />

      <div className="project-list-container">
        {/* Loading state */}
        {status === 'loading' && !showBookmarked && (
          <>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </>
        )}

        {/* Error state */}
        {status === 'error' && <p className="error-message">{error}</p>}

        {/* Empty bookmark + search */}
        {showBookmarked && displayedRepos.length === 0 && searchTerm.trim() && (
          <p>No bookmarked repositories found for "{searchTerm.trim()}".</p>
        )}

        {/* Empty bookmark view */}
        {showBookmarked && displayedRepos.length === 0 && !searchTerm.trim() && (
          <p>You haven't bookmarked any repositories yet.</p>
        )}

        {/* Empty search results */}
        {status === 'success' && displayedRepos.length === 0 && !showBookmarked && (
          <p>No repositories found.</p>
        )}

        {/* Repo list */}
        {(status === 'success' || showBookmarked) &&
          displayedRepos.length > 0 &&
          displayedRepos.map((repo) => (
            <ProjectItem
              key={repo.id}
              repo={repo}
              isBookmarked={isRepoBookmarked(repo.id)}
              onToggleBookmark={toggleBookmark}
            />
          ))}

        {/* Initial idle state */}
        {status === 'idle' && !searchTerm && !showBookmarked && (
          <p>Start typing to search for repositories.</p>
        )}
      </div>
    </div>
  );
}

export default App;
