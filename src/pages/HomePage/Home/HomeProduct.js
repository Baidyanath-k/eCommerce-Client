import React from "react";
import { Link } from "react-router-dom";

const HomeProduct = ({ product }) => {
  // console.log(product);
  const { _id, category, description, name, price } = product;

  return (
    <div className="p-4 md:w-1/3">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${_id}`}
          alt={name}
        />
        <div className="p-4">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            {category ? category.name : "category not found"}
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {name}
          </h1>
          <p className="leading-relaxed mb-3">
            {description.substring(0, 25)}...
          </p>
          <p className="leading-relaxed mb-3">TK: {price}</p>
          <div className="flex items-center justify-between">
            <Link className="">
              <button className="bg-gray-400 py-2 px-3 text-slate-200">
                Learn More
              </button>
            </Link>
            <Link className="">
              <button className="bg-gray-400 py-2 px-3 text-slate-200">
                Add to cart
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProduct;
