import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../components/Loader";
import { usePostHog } from "@posthog/react";
import { useCandidates } from "../context/candidatesContext";
import Nav from "../components/Nav";
import supabase from "../config/supabase";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const posthog = usePostHog();
  const { candidates, loading, channelRef, setCandidates } = useCandidates();
  const [is_update_interval_started, setIsUpdateIntervalStarted] =
    useState(false);
  // const [my_updatesRef.current, setMyUpdates] = useState([]);
  let update_interval = null;
  const my_updatesRef = useRef([]);

  // ======MAIN UPDATE DB FUNCTION===
  const updateDB = async () => {
    if (my_updatesRef.current.length === 0) {
      clearInterval(update_interval);
      setIsUpdateIntervalStarted(false);
      return console.log("no updates so ending interval");
    }

    if (is_update_interval_started) return;

    //starting the interval + update with interval duration
    update_interval = setInterval(async () => {
      if (my_updatesRef.current.length === 0) {
        clearInterval(update_interval);
        setIsUpdateIntervalStarted(false);
        return console.log("no updates so ending interval");
      }

      // console.log("Updating the DB....", my_updatesRef.current);
      // Update DB
      await Promise.all(
        my_updatesRef.current.map((u) =>
          supabase
            .from("votes")
            .update({ vote_count: u.new_vote_count })
            .eq("id", u.id),
        ),
      );

      my_updatesRef.current = [];
      // console.log("deleting all updates from local", my_updatesRef.current);
    }, 5000);

    setIsUpdateIntervalStarted(true);
  };

  // ===On click of vote now button===
  const handleClick = async (c) => {
    const { id, vote_count, name } = c;

    const new_vote_count = vote_count + 1;

    //Updating my_updatesRef.current
    if (my_updatesRef.current.length === 0) {
      my_updatesRef.current.push({ id, new_vote_count });
      // console.log("zero updates so adding first one", my_updatesRef.current);
    } else {
      // if exist update else add new{id,new_vote_count}
      const index = my_updatesRef.current.findIndex((u) => u.id === id);
      if (index === -1) {
        // Candidate not in updates yet → add
        my_updatesRef.current.push({ id, new_vote_count });
      } else {
        // Candidate already exists → update
        my_updatesRef.current[index].new_vote_count = new_vote_count;
      }
      // console.log("already present update", my_updatesRef.current);
    }

    //Increasing locally
    setCandidates((prev) =>
      prev.map((p) => (p.id === id ? { ...p, vote_count: new_vote_count } : p)),
    );

    // Broadcast new vote into server
  
    // channelRef.current.send({
    //   type: "broadcast",
    //   event: "new_vote",
    //   payload: { id, vote_count: new_vote_count },
    // });

    posthog.capture("vote", { votefor: name });

    updateDB();
  };

  const sorted_candidates = [...candidates].sort(
    (a, b) => b.vote_count - a.vote_count,
  );

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
            ⚠️ This is an unofficial public poll for entertainment purposes only.
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
