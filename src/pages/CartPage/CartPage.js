import React from "react";
import { useAuth } from "../../context/authContext";
import { useCart } from "../../context/cartContext";
import Main from "../Layout/Main";
import SingleCart from "./SingleCart";

const CartPage = () => {
  const { auth } = useAuth();

  const [cart, setCart] = useCart();
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Main>
      <div className="text-center py-4">
        <h2 className="font-bold text-3xl">{`Hello ${
          auth?.token && auth?.user?.name
        }`}</h2>
        <h3 className="font-bold text-xl py-5">
          {auth?.token
            ? `${
                cart?.length >= 1
                  ? `You have ${cart?.length} product in your cart`
                  : "No product Selected"
              } `
            : "Please login to checkout"}
        </h3>
      </div>
      <section className="text-gray-600 body-font overflow-hidden min-h-screen">
        <div className="container py-10 mx-auto">
          <div className="lg:w-full mx-auto flex flex-wrap">
            <div className="lg:w-3/5 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              {cart?.map((c) => (
                <SingleCart key={c._id} c={c}></SingleCart>
              ))}
            </div>
            <div className="lg:w-2/5 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-center font-bold text-2xl py-2">Summery</h2>
              <h4 className="text-center font-bold text-xl py-2">
                Total || Checkout || Payment
              </h4>
              <hr />
              <h2 className="text-center font-bold text-sm py-2">
                Total Price: {totalPrice()}TK
              </h2>
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
};

export default CartPage;
