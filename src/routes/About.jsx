import React from "react";
import Nav from "../components/Nav";
import { Vote, Eye, Smile, AlertCircle } from "lucide-react";

const About = () => {
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

      <section className="max-w-xl mx-auto mt-12 px-4">
        {/* Header Banner */}
        <div className="rounded-2xl overflow-hidden shadow-lg shadow-red-200">
          <div className="bg-gradient-to-r from-red-600 to-rose-500 px-8 py-8">
            <p className="text-xs font-bold tracking-widest uppercase text-red-200 mb-2">
              Disclaimer
            </p>
            <h1 className="text-3xl font-extrabold text-white leading-tight">
              About This Site
            </h1>
          </div>

          {/* Body */}
          <div className="bg-white px-8 py-8">
            {/* Intro */}
            <p className="text-sm text-gray-600 leading-relaxed border-l-4 border-red-500 pl-4 italic mb-8">
              This website is created for{" "}
              <strong className="text-gray-800">
                entertainment and public opinion purposes only
              </strong>
              . It is not affiliated with, endorsed by, or representative of any
              official government body, electoral commission, or political
              organization.
            </p>

            {/* Cards */}
            {[
              {
                icon: <Vote className="text-red-500" size={20} />,
                title: "Not Official Voting",
                body: "Any polls or votes on this site are informal expressions of public opinion — they have no legal standing and do not affect any real election or official process.",
              },
              {
                icon: <Eye className="text-red-500" size={20} />,
                title: "Full Transparency",
                body: "We believe in being upfront: this is an independent, community-driven platform. Results here reflect visitor sentiment, nothing more.",
              },
              {
                icon: <Smile className="text-red-500" size={20} />,
                title: "For Entertainment & Education",
                body: "This site exists to spark conversation, explore public sentiment, and engage people in topics they care about — in a fun, low-stakes way.",
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="flex gap-4 items-start mb-6">
                <div className="min-w-[42px] h-[42px] rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900 mb-1">
                    {title}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {body}
                  </p>
                </div>
              </div>
            ))}

            {/* Footer Note */}
            <div className="flex gap-3 items-start mt-6 bg-red-50 rounded-xl p-4">
              <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={16} />
              <p className="text-xs text-gray-500 leading-relaxed">
                By using this site you acknowledge that all content is provided
                for informational and entertainment purposes only. Please vote
                responsibly in your real, official elections!
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
