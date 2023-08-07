import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Main from "../Layout/Main";
import CategoryProduct from "./CategoryProduct";

const Categories = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  // console.log(products);
  // console.log(category);
  const getProductByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getProductByCategory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug]);
  return (
    <Main>
      <div className="min-h-screen">
        <div className="my-4 text-center">
          <h2 className="font-bold text-2xl">Category - {category.name}</h2>
          <h2 className="font-bold text-xl my-2">
            Found {products.length}{" "}
            {products.length <= 1 ? "Product" : "Products"}
          </h2>
        </div>

        <section className="text-gray-600 body-font">
          <div className="container px-5 mx-auto">
            <div className="flex flex-wrap -m-4">
              {products.map((product) => (
                <CategoryProduct
                  key={product._id}
                  product={product}
                ></CategoryProduct>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Main>
  );
};

export default Categories;
