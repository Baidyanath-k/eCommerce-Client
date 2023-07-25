import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import CategoryModal from "../../components/CategoryModal/CategoryModal";
import CategoryForm from "../../components/Form/CategoryForm";
import { useAuth } from "../../context/authContext";

const AdminCategory = () => {
  const { auth } = useAuth();
  const [catagories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [selected, setSelected] = useState(null);

  // console.log(typeof name);
  // CREATE CATEGORY || METHOD POST
  const handleOnsubmit = async (event) => {
    event.preventDefault();
    try {
      let result = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/categories`,
        { name: name },
        {
          headers: {
            Authorization: auth?.token,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(result);
      if (result) {
        // console.log(data?.data);
        getAllCategory();
        toast.success(`${result.data?.data?.name} is created`, {
          duration: 4000,
          position: "top-center",
        });
      } else {
        toast.error("category not save", {
          duration: 4000,
          position: "top-center",
        });
      }

      setName("");
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        duration: 4000,
        position: "top-center",
      });
    }
  };

  // GET ALL CATEGORY || METHOD GET
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

  // update CATEGORY || METHOD PATCH
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      let result = await axios.patch(
        `${process.env.REACT_APP_API}/api/v1/category/updateCategory/${selected._id}`,
        {
          name: updatedName,
        },
        {
          headers: {
            Authorization: auth?.token,
            "Content-Type": "application/json",
          },
        }
      );

      if (result) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        getAllCategory();
      } else {
        toast.error("category not save", {
          duration: 4000,
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message, {
        duration: 4000,
        position: "top-center",
      });
    }
  };

  // DELETE CATEGORY || METHOD DELETE
  const handleDelete = async (id) => {
    // console.log(id);
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`,
        {
          headers: {
            Authorization: auth?.token,
            "Content-Type": "application/json",
          },
        }
      );

      if (result) {
        // console.log(result);
         toast.success(`${result?.data?.data?.name} is deleted`);
        getAllCategory();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        duration: 4000,
        position: "top-center",
      });
    }
  };
  return (
    <section className="text-gray-600 body-font min-h-screen">
      <div className="container pb-8 mx-auto flex items-center sm:flex-row flex-col">
        <div className="lg:w-4/5  w-full lg:pl-10">
          <h2 className="text-center mb-6 font-extrabold text-xl">
            Manage Category
          </h2>
          <div className="mx-auto text-center mb-6">
            <CategoryForm
              handleOnsubmit={handleOnsubmit}
              name={name}
              setName={setName}
            ></CategoryForm>
          </div>
          {/* {console.log(catagories)} */}
          <div className="">
            <table className="table w-full block h-full">
              {/* head */}
              <thead className="mx-auto text-center">
                <tr>
                  <th className="font-extrabold text-xl">Name</th>
                  <th className="font-extrabold text-xl">Actions</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {catagories.map((category) => (
                  <tr className="font-bold text-lg" key={category._id}>
                    <td>{category.name}</td>
                    <td>
                      <>
                        <label
                          htmlFor={category._id}
                          onClick={() => {
                            setSelected(category);
                            setUpdatedName(category.name);
                          }}
                          className="btn"
                        >
                          Edit
                        </label>
                        <CategoryModal
                          handleUpdate={handleUpdate}
                          updatedName={updatedName}
                          setUpdatedName={setUpdatedName}
                          category={category}
                        ></CategoryModal>
                      </>
                      <button
                        onClick={() => {
                          handleDelete(category._id);
                        }}
                        className="btn btn-error mx-3"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminCategory;
