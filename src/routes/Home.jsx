import React, { useContext, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../components/Loader";
import useSound from "use-sound";
import bellsound from "../assets/bellsound.mp3";
import { usePostHog } from "@posthog/react";
import soil from "../assets/soil2.png";
import cpn from "../assets/cpn2.png";
import { useCandidates } from "../context/candidatesContext";
import Nav from "../components/Nav";
import "react-toastify/dist/ReactToastify.css";
import { useSocket } from "../context/socketContext";

let particleId = 0;

const Home = () => {
  const posthog = usePostHog();
  const [play] = useSound(bellsound);
  const socket = useSocket();
  const lastVoteTime = useRef({});
  const { candidates, loading, setCandidates, clientVoteBuffer } =
    useCandidates();
  const [disable, setDisable] = useState(false);
  const [isSound, SetIsSound] = useState(true);
  const [emojis, setEmojis] = useState([]);
  // 7 emojis
  const emojiList = [
    "🌳",
    "🔔",
    "☀️",
    <img src={soil} className="h-[30px]" />,
    <img src={cpn} className="h-[30px]" />,
    "💡",
    "🔼",
  ];

  // ===On click of vote now button===
  const handleClick = async ({ id }) => {
    posthog.capture("vote", { votefor: id });

    //Throttling with Socket emitting
    const now = Date.now();
    if (lastVoteTime.current[id] && now - lastVoteTime.current[id] < 200) {
      return setDisable(true);
    }
    lastVoteTime.current[id] = now;
    setDisable(false);

    if (id === 2 && isSound) {
      play();
    }

    // Spawn emoji rain for this candidate (id maps to emojiList index)
    const emoji = emojiList[(id - 1) % emojiList.length];
    const newParticles = Array.from({ length: 4 }, () => ({
      key: particleId++,
      emoji,
      left: Math.random() * 80 + 10,
      duration: 500 + Math.random() * 800,
      size: 22 + Math.random() * 18,
    }));
    setEmojis((prev) => [...prev, ...newParticles]);

    // Broadcast new vote into server
    socket.emit("increase-vote", { id });
  };

  const removeEmoji = (key) => {
    setEmojis((prev) => prev.filter((e) => e.key !== key));
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
      <style>{`
        @keyframes emoji-fall {
          0%   { transform: translateY(0) scale(1); opacity: 1; }
          70%  { opacity: 1; }
          100% { transform: translateY(100vh) scale(0.7); opacity: 0; }
        }
      `}</style>

      {/* Emoji particles */}
      {emojis.map((p) => (
        <span
          key={p.key}
          onAnimationEnd={() => removeEmoji(p.key)}
          style={{
            position: "fixed",
            top: -50,
            left: `${p.left}%`,
            fontSize: p.size,
            pointerEvents: "none",
            zIndex: 9999,
            animation: `emoji-fall ${p.duration}ms ease-in forwards`,
          }}
        >
          {p.emoji}
        </span>
      ))}

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
        <Nav isSound={isSound} SetIsSound={SetIsSound} />

        {/* Header */}
        <div style={{ padding: "32px 20px 16px" }}>
          <p
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
            className="text-[26px] font-semibold text-[#111827] m-o"
            style={{
              lineHeight: 1.3,
            }}
          >
            Who do you love? fun poll
          </h1>
          <p className="text-[14px] text-[#9ca3af] mt-[6px] font-light">
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
                disabled={disable}
                onClick={() => handleClick(candidate)}
                className="candidate-card select-none"
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
