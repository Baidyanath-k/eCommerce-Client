import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState({
    keyword: "",
    results: [],
  });

  const value = [search, setSearch];
    
  

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

const useSearch = () => useContext(SearchContext);
export { SearchProvider, useSearch };

