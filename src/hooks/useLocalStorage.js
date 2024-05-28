import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error fetching data from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting data to localStorage:', error);
    }
  };

  const clear = () => {
    try {
      window.localStorage.removeItem(key); 
      setStoredValue(initialValue); 
    } catch (error) {
      console.error('Error clear :', error);
    }
  };

  return [storedValue, setValue, clear];
}
