import React from "react";
import { useSearch } from "../../context/searchContext";
import Main from "../Layout/Main";
import SearchProduct from "./SearchProduct";

const Search = () => {
  const [values] = useSearch();
  return (
    <Main title="Product Search">
      <div className="min-h-screen">
        <h2 className="text-4xl font-bold text-center mt-4">Search Result</h2>

        <h4 className="text-xl font-bold text-center mt-4">
          {values?.results.length >= 1
            ? `Found ${values.results.length}`
            : "Product Not Found"}
        </h4>
        <section className="text-gray-600 body-font">
          <div className="container px-5 mx-auto">
            <div className="flex flex-wrap -m-4">
              {values?.results.map((value) => (
                <SearchProduct key={value._id} value={value}></SearchProduct>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Main>
  );
};

export default Search;
