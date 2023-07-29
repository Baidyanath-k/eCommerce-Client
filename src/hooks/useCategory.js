import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategory() {
  const [catagories, setCategories] = useState([]);
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/catagories`
      );
      setCategories(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return catagories;
}
