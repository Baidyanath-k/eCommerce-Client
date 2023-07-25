import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Main from "../../Layout/Main";
import HomeProduct from "./HomeProduct";

const Home = () => {
  const [products, setProducts] = useState([]);
  const allProduct = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-products`
      );
      setProducts(result?.data?.data);
    } catch (error) {
      toast.error("Product not found");
    }
  };
  useEffect(() => {
    allProduct();
  }, []);
  return (
    <Main title={"eCommerce-Shop Now"}>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col">
          <div className="lg:w-1/5 md:w-1/5 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h2>jfjfjfjfjfjfj</h2>
          </div>
          <div className="lg:w-4/5 md:w-4/5 w-4/5">
            <section className="text-gray-600 body-font">
              <div className="container px-5 mx-auto">
                <div className="flex flex-wrap -m-4">
                  {products.map((product) => (
                    <HomeProduct
                      key={product._id}
                      product={product}
                    ></HomeProduct>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </Main>
  );
};

export default Home;
