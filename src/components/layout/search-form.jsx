import { Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";

const SearchForm = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  className = "",
}) => {
  return (
    <form onSubmit={handleSearch} className={className}>
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
        <Input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 transition-all focus:ring-2 focus:ring-primary/20"
          aria-label="Search movies"
        />
      </div>
    </form>
  );
};

export default SearchForm;
