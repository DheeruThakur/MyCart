import React, { useEffect, useMemo, useState } from "react";
import SearchProducts from "../components/SearchProducts";
import { useLocation } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  const query = location.search.split('=')[1];
  const searchBy = useMemo(() => query, [location]);

  return (
    <div className="min-h-[687px]">
      <SearchProducts searchBy={searchBy} />
    </div>
  );
};

export default Search;
