/* eslint-disable no-unused-vars */
import { Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
const { Option } = Select;
const demoImg = require("../../images/images.png");

const AdminProductUpdate = () => {
  const navigate=useNavigate();
  const { auth } = useAuth();
  const { _id } = useParams();
  // const [product, setProduct] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");
  // console.log(category);

  const getSingleProduct = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${_id}`
      );
      // setProduct(result?.data?.data);
      setName(result?.data?.data?.name);
      setDescription(result?.data?.data?.description);
      setPrice(result?.data?.data?.price);
      setQuantity(result?.data?.data?.quantity);
      setShipping(result?.data?.data?.shipping);
      setId(result?.data?.data?._id);
      setCategory(result?.data?.data?.category._id);
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

  const getAllCategory = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/catagories`
      );
      setCategories(result?.data?.data);
    } catch (error) {
      toast.error("category not found");
    }
  };

  useEffect(() => {
    getSingleProduct();
    getPhoto();
    getAllCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      // photo && productData.append("photo", photo);
      productData.append("category", category);
      const result = axios.patch(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData,
        {
          headers: {
            Authorization: auth?.token,
            "Content-Type": "application/json",
          },
        }
      );
      if (result) {
        toast.success("Data update Successfully");

        setTimeout(() => {
          navigate(
            `/admin-dashboard/admin-dashboard-products/products-details/${id}`
          );
        }, 1000);
        
      } else {
        toast.error("Product Updated unsuccessful");
        
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
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
        value={category}
      >
        {categories?.map((c) => (
          <Option key={c._id} value={c._id}>
            {c.name}
          </Option>
        ))}
      </Select>

      <div className="mt-10">
        <label className="btn w-4/5 mx-auto flex">
          {photo ? "Update Photo" : "Can't find Product photo"}
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
            <img src={photo} alt="product-img" className="mx-auto" />
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
            value={shipping ? "yes" : "No"}
          >
            <Option value={1}>Yes</Option>
            <Option value={0}>No</Option>
          </Select>
        </div>
        <div className="w-full">
          <button onClick={updateProduct} type="submit" className="btn w-full">
            update product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductUpdate;
