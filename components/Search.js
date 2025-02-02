import React from "react";

function Search({ handleSearchSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchInput = e.target.search.value;
    handleSearchSubmit(searchInput);
  };

  return (
    <form className="m-5 w-full" onSubmit={handleSubmit} noValidate>
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Search
      </label>
      <div className="relative ">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="search"
          name="search"
          className="block w-full p-4 pl-10 bg-[#D4D4D4] rounded-lg focus:outline-none  focus:bg-[#D4D4D4]/60 focus:ring-2 focus:ring-[#B7B7A4]"
          placeholder="Search"
          required
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-[#283618] hover:bg-[#597339] focus:ring-1 focus:outline-none focus:ring-[#B7B7A4] font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default Search;
