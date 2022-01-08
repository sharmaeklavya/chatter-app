import React from "react";
import { useHistory } from "react-router-dom";

function Search({ userList }) {
  const history = useHistory();

  const leaveTheRoom = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("room");
    window.location.reload();
    history.push("/login");
  };

  return (
    <div className="my-2 py-2 flex flex-wrap items-center justify-between">
      <div className="sm:w-72 w-full m-2 relative bg-white shadow-sm rounded-full">
        {/* <input
          className="sm:w-60 p-3 bg-transparent rounded-full border-none outline-none"
          type="search"
          name="search-user"
          id="search-user"
          placeholder="Search User"
        />
        <i className="fas fa-search p-3 text-blue-700 absolute top-1 right-0 shadow-sm"></i> */}
      </div>
      <button
        type="button"
        onClick={leaveTheRoom}
        className="sm:w-44 w-full m-2 p-3 bg-blue-700 hover:bg-blue-900 text-white text-sm font-medium rounded-full shadow-sm cursor-pointer"
      >
        Leave the room
        <i className="fas fa-door-open mx-2 text-lg"></i>
      </button>
    </div>
  );
}

export default Search;
