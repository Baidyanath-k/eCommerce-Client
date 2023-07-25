import React from "react";

const CategoryForm = ({ handleOnsubmit, name, setName }) => {
  return (
    <div className="border-2 py-4 rounded-md border-gray-200 ">
      <h2 className="font-bold text-xl pb-4">Create Category</h2>
      <form onSubmit={handleOnsubmit}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Category Name"
          className="input input-bordered input-accent w-full max-w-xs"
        />
        <button type="submit" className="btn btn-accent mx-2">
          Create
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
