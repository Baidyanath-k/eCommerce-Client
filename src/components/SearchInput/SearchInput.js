import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/searchContext";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  // console.log(values)
  const navigate = useNavigate();
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <form className="form-control" onSubmit={handleSearch}>
        <input
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          type="text"
          placeholder="Search Product"
          className="input input-bordered w-32 md:w-auto"
        />
      </form>
    </div>
  );
};

export default SearchInput;
