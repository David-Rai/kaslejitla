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
  const clientVoteBuffer = useRef({});

  //Fetching initial candidates
  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${server_url}`);
      const data = await res.json();
      // console.log("Data from server", data);
      setCandidates(data);
    } catch (err) {
      setCandidates([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  //Socket
  useEffect(() => {
    if (!socket) return;
    const handleNewVote = (updates) => {
      console.log(clientVoteBuffer.current)
     Object.keys(clientVoteBuffer.current).forEach(b=>updates[b] -=clientVoteBuffer.current[b] )
      setCandidates((prev) =>
        prev.map((c) =>
          updates[c.id]
            ? { ...c, vote_count: c.vote_count + updates[c.id] }
            : c,
        ),
      );
      clientVoteBuffer.current={}
    };

    socket.on("new-vote", handleNewVote);

    return () => {
      socket.off("new-vote", handleNewVote); // remove only this handler
    };
  }, [socket]);

  return (
    <CandidateContext.Provider
      value={{
        candidates,
        setCandidates,
        loading,
        channelRef,
        clientVoteBuffer,
        fetchCandidates,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidates = () => useContext(CandidateContext);
