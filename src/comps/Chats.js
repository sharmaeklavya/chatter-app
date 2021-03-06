import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Picker from "emoji-picker-react";
import queryString from "query-string";
import io from "socket.io-client";
import Header from "./Header";
import Search from "./Search";

let socket;

function Chats() {
  const location = useLocation();
  const messagesEndRef = useRef(null);
  const [inputMsg, setInputMsg] = useState("");
  const [msgText, setMsgText] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userRoom, setUserRoom] = useState("");
  const [queryUserName, setQueryUserName] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // const SERVER_ENDPOINT = "http://localhost:4500";
  const SERVER_ENDPOINT = "https://socketio-chatter.herokuapp.com";

  useEffect(() => {
    const { username, room } = queryString.parse(location.search);
    socket = io(SERVER_ENDPOINT, {
      withCredentials: true,
      extraHeaders: {
        "chatter-header": "chatter",
      },
      transports: ["websocket", "polling", "flashsocket"],
    });
    setQueryUserName(username);
    socket.open();
    socket.emit("joinRoom", { username, room });
    return () => {
      socket.close();
    };
  }, [SERVER_ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("chat", (payload) => {
      setMsgText((msgs) => [...msgs, payload]);
    });

    socket.on("roomUsers", ({ users, room }) => {
      setUserList([...userList, ...users]);
      setUserRoom(room);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMsg !== "") {
      //Emit message to server
      socket.emit("chatMsg", inputMsg);
    }
    setInputMsg("");
  };

  // scroll down to latest message
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [msgText]);

  // emoji picker
  const onEmojiClick = (event, emojiObject) => {
    setInputMsg((input) => input + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <section className="container mx-auto px-8 py-4">
      <Header />
      <Search users={userList} />
      <div className="flex flex-wrap">
        <div className="w-full sm:w-72 m-2 bg-white overflow-y-auto rounded-lg border-none outline-none shadow-sm">
          {/* sidebar - list of users */}
          <h2 className="w-full p-3 text-center font-medium border border-solid rounded-b-lg shadow-md text-white bg-blue-700">
            {userRoom !== undefined ? userRoom.toUpperCase() : "..."}
          </h2>
          {userList.map((user, i) => {
            return (
              <div key={i} className="p-3">
                <div className="flex items-center p-2 font-medium">
                  <i className="fas fa-user text-3xl text-blue-700"></i>
                  <p className="user-name grow px-2 text-sm">{user.username}</p>
                </div>
                <hr className="ml-11 border-1" />
              </div>
            );
          })}
        </div>
        {/* user list ends here */}

        <div className="blank-space sm:w-8"></div>

        {/* message box - text area */}
        <div className="message-box w-full sm:w-72 flex-1 flex flex-col my-2 p-5 pb-2 bg-white rounded-lg border-none outline-none shadow-sm">
          <div className="self-stretch my-2 overflow-y-auto">
            {msgText.map((msg, i) =>
              msg.username === queryUserName || msg.username === "Chatter" ? (
                <div
                  key={i}
                  className="meta relative ml-auto w-fit text-right text-sm p-3 mt-2 bg-gray-100 rounded-full rounded-tr-none"
                >
                  <p className="text-xs text-gray-500">
                    <span>{msg.username + " "}</span>
                    <span>{msg.time}</span>
                  </p>
                  <p className="text-sm font-medium">{msg.text}</p>
                </div>
              ) : (
                <div
                  key={i}
                  className="meta relative mr-auto w-fit text-left text-sm p-3 mt-2 bg-gray-100 rounded-full rounded-tl-none"
                >
                  <p className="text-xs text-gray-500">
                    <span>{msg.username + " "}</span>
                    <span>{msg.time}</span>
                  </p>
                  <p className="text-sm font-medium">{msg.text}</p>
                </div>
              )
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* message input form */}

          <div className="w-full h-12 relative mt-auto mb-4 px-4 bg-gray-100 border border-solid rounded-full">
            <i
              className="far fa-smile absolute top-2 left-4 text-2xl text-blue-700"
              onClick={() => setShowEmojiPicker((val) => !val)}
            >
              {showEmojiPicker && <Picker onEmojiClick={onEmojiClick} />}
            </i>
            <form onSubmit={sendMessage} className="inline w-full text-center">
              <input
                className="w-10/12 h-12 pl-8 text-sm bg-transparent rounded-full border-none outline-none"
                type="text"
                name="type-message"
                id="type-message"
                value={inputMsg || ""}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Type a message"
                autoComplete="off"
              />
              <button
                className="absolute top-1 right-4 shadow-sm"
                type="submit"
              >
                <i className="fas fa-paper-plane text-2xl text-blue-700"></i>
              </button>
            </form>
          </div>

          {/* message input form ends here */}
        </div>

        {/* Message box - text area ends here */}
      </div>
    </section>
  );
}

export default Chats;
