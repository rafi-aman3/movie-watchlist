import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";


export function useSearch() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
  
    const handleSearch = useCallback(
      (e, onComplete) => {
        e?.preventDefault();
        const trimmedQuery = searchQuery.trim();
  
        if (trimmedQuery) {
          router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
          setSearchQuery("");
          onComplete?.();
        }
      },
      [searchQuery, router]
    );
  
    const resetSearch = useCallback(() => {
      setSearchQuery("");
    }, []);
  
    return {
      searchQuery,
      setSearchQuery,
      handleSearch,
      resetSearch,
    };
  }