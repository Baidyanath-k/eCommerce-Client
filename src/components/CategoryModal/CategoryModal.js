import React from "react";

const CategoryModal = ({
  category,
  handleUpdate,
  updatedName,
  setUpdatedName,
}) => {
  return (
    <>
      <input type="checkbox" id={category._id} className="modal-toggle" />
      <div className="modal modal-middle">
        <div method="dialog" className="modal-box">
          <label
            htmlFor={category._id}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="font-bold text-xl pb-4">Update Category</h2>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="name"
              value={updatedName}
              onChange={(event) => setUpdatedName(event.target.value)}
              placeholder="Update Category"
              className="input input-bordered input-accent w-full max-w-xs"
            />
            <button type="submit" className="btn btn-accent mx-2">
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CategoryModal;
