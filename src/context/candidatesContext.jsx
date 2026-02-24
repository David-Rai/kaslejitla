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

    // const handleNewVote = ({ id, vote_count }) => {
    //   console.log("new vote", id);
    //   setCandidates((prev) => {
    //     // Avoid unnecessary re-render if value is same
    //     const updated = prev.map((p) =>
    //       p.id === id && p.vote_count !== vote_count ? { ...p, vote_count } : p,
    //     );

    //     return updated;
    //   });
    // };

    const handleNewVote = (updates) => {
      console.log("new", updates);
      setCandidates((prev) =>
        prev.map((c) =>
          updates[c.id]
            ? { ...c, vote_count: c.vote_count + updates[c.id] }
            : c,
        ),
      );
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
        fetchCandidates,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidates = () => useContext(CandidateContext);
