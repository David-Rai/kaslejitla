import React, { useState } from "react";
import { AlertTriangle, Send, Loader2, ShieldCheck } from "lucide-react";
import Nav from "../components/Nav";
import supabase from "../config/supabase";
import toast from "react-hot-toast";

const Review = () => {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) { toast.error("Please write something before submitting."); return; }

    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert([{ text }]);
    setSubmitting(false);

    if (error) { toast.error("Failed to submit Review."); console.error(error); }
    else { setSubmitted(true); setText(""); }
  };

  return (
    <main 
     className="home-root"
        style={{
          maxWidth: 640,
          margin: "0 auto",
          padding: "0 0 100px",
          minHeight: "100vh",
          background: "linear-gradient(160deg, #f8f7ff 0%, #f0f4ff 100%)"
        }}
    >
      <Nav />

      <div className="max-w-xl mx-auto px-4 pt-10 md:pt-16">

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            {/* <AlertTriangle size={13} /> */}
            Anonymous Reviewing
          </div>
          <h1 className="text-3xl font-semibold text-gray-900 leading-tight">Submit a Review</h1>
          <p className="text-gray-400 mt-2 text-sm font-light">
            Timro honest (Suggestions,Report,Reviews) deuna 
            {/* Your identity is never stored. Reviews are completely anonymous. */}
            </p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-md border border-red-100 rounded-2xl shadow-xl shadow-red-50 p-6 md:p-8">

          {submitted ? (
            <div className="flex flex-col items-center text-center py-8 gap-4">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                <ShieldCheck size={32} className="text-red-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">Review Received</h2>
                <p className="text-gray-400 text-sm font-light">Thank you for speaking up. Your Review has been submitted anonymously.</p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-sm text-red-500 font-medium hover:underline"
              >
                Submit another Review
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Textarea */}
              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Describe what you'd like to Review..."
                  rows={6}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition font-light leading-relaxed"
                />
                <span className="absolute bottom-3 right-3 text-xs text-gray-300">{text.length} chars</span>
              </div>

              {/* Privacy note */}
              <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                <ShieldCheck size={15} className="text-red-400 mt-0.5 shrink-0" />
                <p className="text-xs text-red-400 font-light leading-relaxed">
                  This Review is completely anonymous. No personal information, IP address, or identity is collected or stored.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 active:scale-[0.98] text-white text-sm font-semibold shadow-lg shadow-red-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <><Loader2 size={15} className="animate-spin" /> Submitting...</>
                ) : (
                  <><Send size={15} /> Submit Anonymously</>
                )}
              </button>

            </form>
          )}
        </div>

      </div>
    </main>
  );
};

export default Review;