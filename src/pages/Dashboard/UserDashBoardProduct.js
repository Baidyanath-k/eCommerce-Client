import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
const moment = require("moment");

const UserDashBoardProduct = () => {
  const [orders, setOrders] = useState([]);
  // console.log(orders);
  const { auth } = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/orders-service/orders`,
        {
          headers: {
            Authorization: auth?.token,
            "Content-Type": "application/json",
          },
        }
      );
      setOrders(data?.data);
      console.log(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <div className="min-h-screen">
      <div className="order-header">
        <h2 className="font-bold text-3xl text-center">All Orders</h2>
      </div>
      <div className="order-body">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th className="text-lg">#</th>
                <th className="text-lg">Status</th>
                <th className="text-lg">Buyer</th>
                <th className="text-lg">Payment</th>
                <th className="text-lg">Quantity</th>
                <th className="text-lg">Date</th>
              </tr>
            </thead>
            {orders?.map((order, index) => {
              return (
                <tbody key={order._id}>
                  <tr>
                    <th>{index + 1}</th>
                    <td>{order?.status}</td>
                    <td className="capitalize">{order?.buyer?.name}</td>
                    <td>{order?.payment?.success ? "True" : "False"}</td>
                    <td>{order?.products?.length}</td>
                    <td>{moment(order?.createAt).startOf("day").fromNow()}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>

          <section className="text-gray-600 body-font overflow-hidden min-h-screen">
            <div className="container py-10 mx-auto">
              <div className="lg:w-full mx-auto flex flex-wrap">
                <div className="lg:w-full w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                  
                  {orders?.map((order, index) => {
                    return (
                      <section className="text-gray-600 body-font">
                        <div className="container mx-auto">
                          <div className="flex items-center lg:w-full mx-auto border p-7 mb-10 border-gray-200 sm:flex-row flex-col">
                            <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                              <img
                                className="w-full h-full rounded-full"
                                src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${order?.products[0]?._id}`}
                                alt={order?.products[0]?.name}
                              />
                            </div>
                            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                              <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                                {order?.products[0]?.name}
                              </h2>
                              <p className="leading-relaxed mb-3">
                                TK: {order?.products[0]?.price}
                              </p>
                              <p className="leading-relaxed text-base">
                                {order?.products[0]?.description?.length > 25
                                  ? order?.products[0]?.description.substring(
                                      0,
                                      60
                                    ) + "..."
                                  : order?.products[0]?.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </section>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserDashBoardProduct;
