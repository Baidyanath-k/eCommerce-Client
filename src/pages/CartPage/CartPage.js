/* eslint-disable no-unused-vars */
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useCart } from "../../context/cartContext";
import Main from "../Layout/Main";
import SingleCart from "./SingleCart";

const CartPage = () => {
  const { auth } = useAuth();
  console.log(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
  console.log(instance);
  const totalPrice = () => {
    try {
      let total = 0;
      // eslint-disable-next-line array-callback-return
      cart?.map((item) => {
        total = total + item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  // get payment token
  const getPaymentToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/payment-service/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPaymentToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/payment-service/braintree/payment`,
        { nonce, cart },
        {
          headers: {
            Authorization: auth?.token,
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/user-dashboard");
      toast.success("Payment complete");
    } catch (error) {
      setLoading(false);
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
              {auth?.user?.address ? (
                <>
                  <div className="text-center mt-4">
                    <h2 className="text-center mt-4 font-bold text-xl">
                      {auth?.user?.address}
                    </h2>
                    <button
                      className="bg-gray-400 py-2 px-3 text-slate-200 mt-4"
                      onClick={() =>
                        navigate(
                          location.state ||
                            "/user-dashboard/user-dashboard-profile"
                        )
                      }
                    >
                      Update address
                    </button>
                  </div>
                </>
              ) : (
                <div className="">
                  {auth?.token ? (
                    <button
                      className="bg-gray-400 py-2 px-3 text-slate-200 mx-auto text-center block"
                      onClick={() =>
                        navigate(
                          location.state ||
                            "/user-dashboard/user-dashboard-profile"
                        )
                      }
                    >
                      Update address
                    </button>
                  ) : (
                    <button
                      className="bg-red-500 mt-5 py-2 px-3 text-slate-200 mx-auto text-center block"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please login and check out
                    </button>
                  )}
                </div>
              )}
              <div className="mt-10">
                {!clientToken || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: { flow: "vault" },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      className="bg-gray-400 py-2 px-3 text-slate-200"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing...." : " Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
};

export default CartPage;
