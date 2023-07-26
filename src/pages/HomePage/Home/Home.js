/* eslint-disable react-hooks/exhaustive-deps */
import { Checkbox, Radio } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Prices } from "../../../components/priceFilter/priceFilter";
import Main from "../../Layout/Main";
import HomeProduct from "./HomeProduct";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const getAllCategory = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/catagories`
      );
      setCategories(result?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

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
    if (!checked.length || !radio.length) allProduct();
  }, [checked.length, radio.length]);

  // category filter show
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const productFilter = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/filter-product`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) productFilter();
  }, [checked, radio]);

  return (
    <Main title={"eCommerce-Shop Now"}>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col">
          <div className="lg:w-1/5 md:w-1/5 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left items-center text-center">
            <div className="">
              {categories?.map((category) => (
                <Checkbox
                  key={category._id}
                  onChange={(e) => handleFilter(e.target.checked, category._id)}
                >
                  {category.name}
                </Checkbox>
              ))}
            </div>
            <div className="mt-10">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices.map((p) => (
                  <div key={p._id}>
                    {" "}
                    <Radio value={p.array}>{p.name}</Radio>{" "}
                  </div>
                ))}
              </Radio.Group>
            </div>
          </div>
          <div className="lg:w-4/5 md:w-4/5 w-4/5 mx-auto">
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
