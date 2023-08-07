import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/authContext";

const ProductsDetails = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { _id } = useParams();
  const [product, setProduct] = useState([]);
  const [photo, setPhoto] = useState([]);
  // console.log(product);

  const getSingleProduct = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${_id}`
      );
      setProduct(result?.data?.data);
    } catch (error) {
      toast.error("Product not found");
    }
  };

  const getPhoto = async () => {
    try {
      const photoResult = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${_id}`
      );
      setPhoto(photoResult?.config?.url);
    } catch (error) {
      toast.error("Product photo not found");
    }
  };

  useEffect(() => {
    getSingleProduct();
    getPhoto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      // eslint-disable-next-line no-unused-vars
      const result = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${_id}`,
        {
          headers: {
            Authorization: auth?.token,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Product Deleted Successfully");
      setTimeout(() => {
        navigate("/admin-dashboard/admin-dashboard-products");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="eCommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={photo}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product?.category?.name}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product?.name}
              </h1>

              <p className="leading-relaxed mt-7">{product?.description}</p>

              <div className="flex my-7">
                <span className="title-font font-medium text-2xl text-gray-900">
                  TK:{product?.price}
                </span>
                <span className="title-font ml-auto font-medium text-2xl text-gray-900">
                  Quantity: {product?.quantity}
                </span>
              </div>
              <div className="flex">
                <Link to={`../products-update/${_id}`}>
                  <button className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                    Update
                  </button>
                </Link>

                <button
                  onClick={handleDelete}
                  className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsDetails;
