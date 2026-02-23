import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { useCandidates } from "../context/candidatesContext";
import supabase from "../config/supabase";
import {
  X,
  Send,
  MessageSquare,
  User,
  Loader2,
  Plus,
  ChevronDown,
  ShieldAlert,
  Eye,
} from "lucide-react";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const formatDate = (d) => {
  const date = new Date(d);
  return (
    date.toLocaleDateString("en-US", { month: "short", day: "numeric" }) +
    " · " +
    date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  );
};

const Opinions = () => {
  const [opinions, setOpinions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { candidates } = useCandidates();
  const [text, setText] = useState("");
  const [candidate, setCandidate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [warned, setWarned] = useState(false);

  const fetchOpinions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("opinions")
      .select()
      .order("created_at", { ascending: false })
      .limit(10);
    if (error) console.error(error);
    else setOpinions(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOpinions();
  }, []);

  const loadMore = async () => {
    if (!opinions.length) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("opinions")
      .select()
      .order("created_at", { ascending: false })
      .range(opinions.length, opinions.length + 9);
    if (error) console.error(error);
    else setOpinions((prev) => [...prev, ...data]);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text || !candidate) {
      toast.error("Please fill all fields");
      return;
    }
    setSubmitting(true);
    const { data, error } = await supabase
      .from("opinions")
      .insert([{ text, candidate }])
      .select();
    setSubmitting(false);
    if (error) {
      toast.error("Failed to submit opinion");
      console.error(error);
    } else {
      toast.success("Opinion submitted 🎉");
      setOpinions((prev) => [data[0], ...prev]);
      setText("");
      setCandidate("");
      setIsOpen(false);
    }
  };

  if (loading && opinions.length === 0) {
    return <Loader />;
  }

  return (
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
      <Nav />

      {/* Header */}
      <header className="flex justify-between items-center px-5 pt-6 pb-4">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-red-500 mb-1">
            Public Forum
          </p>
          <h1 className="text-2xl font-semibold text-gray-900 m-0">
            Citizen Opinions
          </h1>
        </div>
        <button onClick={() => setIsOpen(true)} className="btn">
          <Plus size={16} />
          Add Opinion
        </button>
      </header>

      {/* Add Opinion Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-md p-4"
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
        >
          <div className="w-full max-w-[440px] bg-white/95 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.15)] p-7 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 bg-black/[0.06] border-none rounded-lg w-[30px] h-[30px] flex items-center justify-center cursor-pointer text-gray-500 hover:bg-black/10 transition-colors"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-[10px] bg-red-500/10 flex items-center justify-center">
                <MessageSquare size={18} className="text-red-500" />
              </div>
              <div>
                <h2 className="m-0 text-[17px] font-semibold text-gray-900">
                  Share Your View
                </h2>
                <p className="m-0 text-xs text-gray-400 font-light">
                  Anonymous · Public
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none" />
                <select
                  value={candidate}
                  onChange={(e) => setCandidate(e.target.value)}
                  className="w-full pl-10 pr-9 py-3 rounded-xl border border-black/10 bg-white/80 text-sm text-gray-900 outline-none appearance-none focus:border-red-500 focus:ring-4 focus:ring-red-500/12 transition-all font-sans"
                >
                  <option value="">Select Candidate</option>
                  {candidates.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
                <ChevronDown size={15} className="absolute right-3.5 top-3.5 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <MessageSquare size={15} className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none" />
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write your opinion..."
                  rows={4}
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-black/10 bg-white/80 text-sm text-gray-900 outline-none resize-none focus:border-red-500 focus:ring-4 focus:ring-red-500/12 transition-all placeholder:text-gray-400 font-sans"
                />
              </div>

              <button type="submit" disabled={submitting} className="btn">
                {submitting ? (
                  <><Loader2 size={15} className="animate-spin" />Submitting...</>
                ) : (
                  <><Send size={15} />Submit Opinion</>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Opinions List */}
      <section className="relative flex-1 px-4 pt-2 flex flex-col gap-3">

        {/* Warning Popup — centered over the list */}
        {!warned && opinions.length > 0 && (
          <div className="absolute inset-0 z-20 flex items-start justify-center pt-10 pointer-events-none">
            <div className="pointer-events-auto mx-4 w-full max-w-sm bg-white border border-red-100 rounded-2xl shadow-[0_8px_40px_rgba(239,68,68,0.15)] p-5 flex flex-col items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center">
                <ShieldAlert size={22} className="text-red-500" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  Heads up ⚠️
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  These are unmoderated public opinions. They may contain{" "}
                  <span className="font-medium text-red-500">bad words</span> or
                  offensive language. View at your own risk.
                </p>
              </div>
              <button
                onClick={() => setWarned(true)}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-colors"
              >
                <Eye size={14} />
                I understand, show opinions
              </button>
            </div>
          </div>
        )}

        {opinions.length === 0 && !loading && (
          <p className="text-center text-gray-400 mt-12 font-light">
            No opinions yet. Be the first!
          </p>
        )}

        {/* Blurred wrapper */}
        <div className={!warned ? "blur-sm pointer-events-none select-none" : ""}>
          <div className="flex flex-col gap-3">
            {opinions.map((op) => (
              <div
                key={op.id}
                className="bg-white/75 backdrop-blur-xl border border-black/[0.07] rounded-[18px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.09)] transition-all duration-200"
              >
                <div className="flex justify-between items-start flex-wrap gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-red-500 bg-red-50 rounded-full text-xs font-semibold tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full inline-block bg-red-500" />
                    {op.candidate || "All Candidates"}
                  </span>
                  <span className="text-xs text-gray-400 font-light">
                    {formatDate(op.created_at)}
                  </span>
                </div>
                <p className="m-0 mb-2.5 text-sm text-gray-700 leading-relaxed font-light">
                  {op.text}
                </p>
                <p className="m-0 text-xs text-gray-300 italic">Anonymous</p>
              </div>
            ))}

            {opinions.length > 0 && (
              <div className="flex justify-center mt-2 mb-4">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="px-7 py-2.5 rounded-xl border border-black/10 bg-white/80 text-sm font-medium text-gray-700 cursor-pointer hover:bg-white hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all"
                >
                  {loading ? "Loading..." : "Load more"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Opinions;