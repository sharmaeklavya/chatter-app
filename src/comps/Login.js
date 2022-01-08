import React, { useState } from "react";

function Login() {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");

  const joinRoom = () => {
    if (userName !== "" && roomName !== "") {
      localStorage.setItem("username", userName);
      localStorage.setItem("room", roomName);
    } else {
      alert("Enter your name and select a room please.");
    }
  };

  return (
    <div className="h-screen w-screen grid place-content-center bg-gray-100">
      <div className="form-container p-10 rounded-lg shadow-md bg-white">
        <h1 className="text-2xl ">Join with your name</h1>
        <p className="text-xs font-light text-gray-700 mt-2">
          Only <span className="text-red-900 text-medium">First Name </span>
          required.
        </p>
        <form
          onSubmit={joinRoom}
          action="https://proj-chatter.netlify.app"
          // action="http://localhost:3000"
          method="GET"
        >
          <div className="user-name mt-4 mb-2 border border-solid border-red-900 rounded-sm">
            <label className="p-1 text-xs" htmlFor="username">
              Username
            </label>
            <input
              className="p-1 text-base block w-full outline-none"
              type="text"
              name="username"
              id="username"
              maxLength={15}
              placeholder="Type your first name here"
              autoComplete="off"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <p className="text-xs mb-4 font-light text-gray-700 underline">
            Please use English letters only. Do not use numbers or key/symbols.
            Thanks.
          </p>
          <div className="join-room my-4 border border-solid border-red-900 rounded-sm">
            <label className="p-1 text-xs" htmlFor="joinroom">
              Join Room
            </label>
            <select
              required
              className="p-1 text-base block w-full outline-none"
              name="room"
              id="room"
              defaultValue="selectroom"
              onChange={(e) => setRoomName(e.target.value)}
            >
              <option value="selectroom" disabled>
                Select a room
              </option>
              <option value="C++">C++</option>
              <option value="Ruby">Ruby</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
              <option value="Javascript">JavaScript</option>
            </select>
          </div>
          <button
            className="text-sm my-4 p-2 w-full mx-auto shadow-lg bg-red-900 text-white rounded-sm hover:rounded-full hover:bg-gray-900"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
