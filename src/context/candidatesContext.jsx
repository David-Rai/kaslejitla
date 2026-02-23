import React, { useRef } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { server_url } from "../config/server_url";
import { useSocket } from "./socketContext";

export const CandidateContext = createContext();

export const CandidateProvider = ({ children }) => {
  const [candidates, setCandidates] = useState([]);
  const socket = useSocket();
  const channelRef = useRef(null);
  const [loading, setLoading] = useState(false);

  //Fetching initial candidates
  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${server_url}`);
      const data = await res.json();
      console.log("Data from server", data);
      setCandidates(data);
    } catch (err) {
      setCandidates([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  //Socket handling
  useEffect(() => {
    if (!socket) return;

    //Getting new vote
    socket.on("new-vote", (payload) => {
      console.log("payload got", payload);
      const { id, new_vote_count } = payload;
      setCandidates((prev) =>
        prev.map((p) => (p.id === id ? { ...p, vote_count:new_vote_count } : p)),
      );
    });

    return ()=>{
      socket.off('new-vote')
    }
  }, [socket]);

  return (
    <CandidateContext.Provider
      value={{
        candidates,
        setCandidates,
        loading,
        channelRef,
        fetchCandidates,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidates = () => useContext(CandidateContext);
