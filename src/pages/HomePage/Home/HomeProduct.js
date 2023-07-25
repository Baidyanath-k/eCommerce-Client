import React from "react";
import { Link } from "react-router-dom";

const HomeProduct = ({ product }) => {
  console.log(product);
  const {_id, category, description, name, price } = product;

  
  return (
    <div className="p-4 md:w-1/3">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${_id}`}
          alt={name}
        />
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            {category?.name}
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {name}
          </h1>
          <p className="leading-relaxed mb-3">{description}</p>
          <p className="leading-relaxed mb-3">TK: {price}</p>
          <div className="flex items-center flex-wrap ">
            <Link className="inline-flex items-center md:mb-2 lg:mb-0">
              <button>Learn More</button>
            </Link>
            <Link className="mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none pr-3 py-1">
              <button>Add to cart</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProduct;
