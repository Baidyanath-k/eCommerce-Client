import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/cartContext";

const SingleCart = ({ c }) => {
  const { _id, name, price, description } = c;
  const [cart, setCart] = useCart();
  const removeItem = (pid) => {
    try {
      let myCart = [...cart];
      const index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto">
        <div className="flex items-center lg:w-full mx-auto border p-7 mb-10 border-gray-200 sm:flex-row flex-col">
          <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
            <img
              className="w-full h-full rounded-full"
              src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${_id}`}
              alt={name}
            />
          </div>
          <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
            <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
              {name}
            </h2>
            <p className="leading-relaxed mb-3">TK: {price}</p>
            <p className="leading-relaxed text-base">
              {description.length > 25
                ? description.substring(0, 60) + "..."
                : description}
            </p>
            <div className="flex items-center justify-between mt-4">
              <Link to={`/productDetails/${_id}`} className="">
                <button className="bg-gray-400 py-2 px-3 text-slate-200">
                  Details
                </button>
              </Link>
              <Link className="">
                <button
                  className="bg-red-500 py-2 px-3 text-slate-200"
                  onClick={() => removeItem(_id)}
                >
                  Delete
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleCart;
