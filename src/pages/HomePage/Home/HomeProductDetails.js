import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Main from "../../Layout/Main";
import SimilarProduct from "./SimilarProduct";

const HomeProductDetails = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState([]);
  const [similarProduct, setSimilarProduct] = useState([]);
  console.log(similarProduct);
  const getSingleProduct = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${_id}`
      );
      setProduct(result?.data?.data);
      getSimilarProduct(
        result?.data?.data._id,
        result?.data?.data?.category?._id
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/similar-product/${pid}/${cid}`
      );
      setSimilarProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Main>
      <section className="text-gray-600 body-font overflow-hidden min-h-screen">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="eCommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${_id}`}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                Category: {product?.category?.name}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product?.name}
              </h1>

              <p className="leading-relaxed mt-7">{product?.description}</p>

              <div className="flex my-7">
                <span className="title-font font-medium text-2xl text-gray-900">
                  TK:{product?.price}
                </span>
              </div>
              <div className="flex">
                <Link to={`../products-update/${_id}`}>
                  <button className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                    Add to Cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <section className="text-gray-600 body-font mb-5">
          <h2 className="text-center my-4 font-bold text-xl">
            Similar Product
          </h2>
          <h2 className="text-center my-4 font-bold text-xl">
            {similarProduct.length < 1 && "No Similar Product Found"}
          </h2>
          <div className="container px-5 mx-auto">
            <div className="flex flex-wrap -m-4">
              {similarProduct.map((sProduct) => (
                <SimilarProduct
                  key={sProduct._id}
                  sProduct={sProduct}
                ></SimilarProduct>
              ))}
            </div>
          </div>
        </section>
      </section>
    </Main>
  );
};

export default HomeProductDetails;
