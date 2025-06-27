import React from "react";

const AccPlaces = () => {
  const addNewPlace = () => {
    console.log("Adicionar um novo lugar.");
  };

  return (
    <div>
      <button
        onClick={addNewPlace}
        className="hover:bg-primary-500 bg-primary-400 flex min-w-44 cursor-pointer gap-2 rounded-full px-4 py-2 text-white transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        Adicionar novo lugar
      </button>
    </div>
  );
};

export default AccPlaces;
