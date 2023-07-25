import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Products from "./Products";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-products`
      );
      setProducts(result?.data?.data);
    } catch (error) {
      toast.error("Product data not found");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  // console.log(products)
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {products.map((product) => (
            <Products key={product._id} product={product}></Products>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminProducts;
