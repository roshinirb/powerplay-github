import { useState, useEffect } from 'react';

// Simple debounce hook – helps avoid too many updates (like API calls) while typing
// Waits for a short delay before updating the final value
function useDebounce<T>(value: T, delay: number): T {
  // store the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // start a timer whenever value changes
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // clear the previous timer if value changes again
    // this is what creates the debounce effect
    return () => clearTimeout(handler);
  }, [value, delay]);

  // return the final, delayed value
  return debouncedValue;
}

export default useDebounce;
