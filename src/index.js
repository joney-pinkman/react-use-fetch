import { useRef, useEffect } from "react";

export default (fetch = window.fetch) => {
  const abortRef = useRef(new AbortController());

  useEffect(() => {
    return () => {
      abortRef.current.abort();
    };
  }, []);

  return (url, options) => {
    abortRef.current.abort();
    abortRef.current = new AbortController();
    return fetch(url, { ...options, signal: abortRef.current.signal });
  };
};
