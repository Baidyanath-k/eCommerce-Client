import React from "react";
import { Link } from "react-router-dom";

const Products = ({ product }) => {
  // console.log(product);
  const { _id, name, description, category } = product;
  return (
    <div className="p-4 md:w-1/3">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            {category?.name}
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {name}
          </h1>
          <p className="leading-relaxed mb-3">
            {description.length > 40
              ? description.substring(0, 40) + "..."
              : description}
          </p>
          <div className="flex items-center flex-wrap ">
            <Link
              to={`products-details/${_id}`}
              className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
            >
              <button>Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
