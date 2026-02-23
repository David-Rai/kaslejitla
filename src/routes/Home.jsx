import React, { useContext, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../components/Loader";
import { usePostHog } from "@posthog/react";
import { useCandidates } from "../context/candidatesContext";
import Nav from "../components/Nav";
import supabase from "../config/supabase";
import "react-toastify/dist/ReactToastify.css";
import { useSocket } from "../context/socketContext";

const Home = () => {
  const posthog = usePostHog();
  const socket = useSocket();
  const { candidates, loading, setCandidates } = useCandidates();

  // ===On click of vote now button===
  const handleClick = async (c) => {
    const { id, vote_count, name } = c;

    const new_vote_count = vote_count + 1;

    //Increasing locally
    setCandidates((prev) =>
      prev.map((p) => (p.id === id ? { ...p, vote_count: new_vote_count } : p)),
    );

    // Broadcast new vote into server
    socket.emit("increase-vote", { id,new_vote_count });

    posthog.capture("vote", { votefor: name });
  };

  // asc order candidates
  const sorted_candidates = [...candidates].sort(
    (a, b) => b.vote_count - a.vote_count,
  );

  // Maximum votes
  const maxVotes = sorted_candidates[0]?.vote_count || 1;

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <main
        className="home-root"
        style={{
          maxWidth: 640,
          margin: "0 auto",
          padding: "0 0 100px",
          minHeight: "100vh",
          background: "linear-gradient(160deg, #f8f7ff 0%, #f0f4ff 100%)",
        }}
      >
        {/* Navigation */}
        <Nav />

        {/* Header */}
        <div style={{ padding: "32px 20px 16px" }}>
          <p
            // className="text-[12px] font-bold leading-[0.1em] uppercase text-[red] mb-[6]"
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "red",
              marginBottom: 6,
            }}
          >
            Live Poll
          </p>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 600,
              color: "#111827",
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            Who do you love? fun poll
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "#9ca3af",
              marginTop: 6,
              fontWeight: 300,
            }}
          >
            ⚠️ This is an unofficial public poll for entertainment purposes
            only.
          </p>
        </div>

        {/* Candidates rendering */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            padding: "0 16px",
          }}
        >
          {sorted_candidates.map((candidate, index) => {
            const rankLabel =
              index === 0
                ? "🥇"
                : index === 1
                  ? "🥈"
                  : index === 2
                    ? "🥉"
                    : `#${index + 1}`;
            const rankClass =
              index === 0
                ? "first"
                : index === 1
                  ? "second"
                  : index === 2
                    ? "third"
                    : "";
            const barWidth = Math.round(
              (candidate.vote_count / maxVotes) * 100,
            );

            return (
              <div
                key={candidate.id}
                onClick={() => handleClick(candidate)}
                className="candidate-card"
              >
                <div className={`vote-bar`} style={{ width: `${barWidth}%` }} />
                <span className={`rank-badge ${rankClass}`}>{rankLabel}</span>

                <img
                  src={candidate.image}
                  alt={candidate.name}
                  className="candidate-avatar"
                />

                <div style={{ flex: 1 }}>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  >
                    {candidate.name}
                  </h2>
                  <p
                    style={{
                      margin: "3px 0 0",
                      fontSize: 13,
                      color: "#9ca3af",
                      fontWeight: 300,
                    }}
                  >
                    {candidate.party}
                  </p>
                </div>

                <div className="vote-count">
                  <div className="number">
                    {candidate.vote_count.toLocaleString()}
                  </div>
                  <div className="label">Points</div>
                </div>
              </div>
            );
          })}
        </div>

        <ToastContainer
          position="bottom-center"
          toastStyle={{ fontFamily: "'DM Sans', sans-serif", borderRadius: 12 }}
        />
      </main>
    </>
  );
};

export default Home;
