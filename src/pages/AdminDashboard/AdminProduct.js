import { Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/authContext";
const { Option } = Select;
const demoImg = require("../../images/images.png");

const AdminProduct = () => {
  const { auth } = useAuth();
  const [catagories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  // console.log(typeof(photo));

  const getAllCategory = async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/catagories`
      );
      // console.log(data)
      if (data) {
        setCategories(data?.data?.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong with getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const createProduct =async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("shipping", shipping);
      const result =await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData,
        {
          headers: {
            Authorization: auth?.token,
            // "Content-Type": "application/json",
          },
        }
      );

      // console.log(result);

      if (result) {
        toast.success(result?.data?.message);
        // console.log(result);
        return true;
      } else {
        toast.error("do not create product");
      }
    } catch (error) {
      // console.log(error);
      toast.error(error?.response?.data?.message);
      return false;
    }
  };
  return (
    <div className="min-h-screen">
      <Select
        placeholder="Select a category"
        mode="multiple"
        style={{ width: "80%", display: "block", margin: "0 auto" }}
        showSearch
        onChange={(value) => setCategory(value)}
      >
        {catagories?.map((c) => (
          <Option key={c._id} value={c._id}>
            {c.name}
          </Option>
        ))}
      </Select>

      <div className="mt-10">
        <label className="btn w-4/5 mx-auto flex">
          {photo ? photo.name : "Upload photo"}
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="hidden"
          />
        </label>
      </div>
      <div className="my-6 ">
        {photo ? (
          <div className="w-full">
            <img
              src={URL.createObjectURL(photo)}
              alt="product-img"
              className="mx-auto"
            />
          </div>
        ) : (
          <div>
            <img src={demoImg} alt="demo-img" className="mx-auto" />
          </div>
        )}
      </div>

      <div className="w-4/5 mx-auto">
        <div className="w-full">
          <input
            type="text"
            value={name}
            placeholder="Product Name"
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full border-2"
          />
        </div>
        <div className="w-full my-2">
          <textarea
            className="textarea textarea-bordered w-full border-2"
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="w-full mb-2">
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="input input-bordered w-full border-2"
          />
        </div>
        <div className="w-full mb-2">
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="input input-bordered w-full border-2"
          />
        </div>
        <div className="w-full mb-2">
          <Select
            style={{ width: "100%", display: "block", margin: "0 auto" }}
            showSearch
            placeholder="Select Shipping"
            onChange={(value) => {
              setShipping(value);
            }}
          >
            <Option value={1}>Yes</Option>
            <Option value={0}>No</Option>
          </Select>
        </div>
        <div className="w-full">
          <button onClick={createProduct} type="submit" className="btn w-full">
            create product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
