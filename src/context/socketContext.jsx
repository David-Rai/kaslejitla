import React, { createContext, useContext } from "react";
import io from "socket.io-client";
import { server_url } from "../config/server_url";
import { useState } from "react";

const SocketContext = createContext();
const url = import.meta.env.VITE_SERVER_URL;

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket] = useState(() => io(server_url));

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
