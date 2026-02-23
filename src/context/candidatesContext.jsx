import React, { useRef } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../config/supabase";

export const CandidateContext = createContext();

export const CandidateProvider = ({ children }) => {
  const [candidates, setCandidates] = useState([]);
  const channelRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const update_duration = 5;
  const [should_start, setShouldStart] = useState(false);

  const fetchCandidates = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("votes")
      .select()
      .order("vote_count", { ascending: false });

    if (!error) {
      setCandidates(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCandidates();
    channelRef.current = supabase.channel("real-channel");

    channelRef.current.subscribe((status) => {
      // console.log("Channel status:", status); // will show SUBSCRIBED
    });

    function messageReceived(p) {
      // console.log("boastcast payload", p);
      const {
        payload: { vote_count, id },
      } = p;

      if (!p || !p.payload) return;

      setCandidates((prev) =>
        prev.map((c) => (c.id === id ? { ...c, vote_count: vote_count } : c)),
      );
    }

    // Listen for "new_vote". Can be "*" to listen to all events
    channelRef.current.on("broadcast", { event: "new_vote" }, (payload) =>
      messageReceived(payload),
    );

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(channelRef.current);
    };
  }, []);

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
