import React, { useState } from "react";
import Nav from "../components/Nav";
import {
  Flame,
  TrendingUp,
  Users,
  Clock,
  Star,
  Zap,
  ChevronRight,
  Eye,
  BarChart2,
  Megaphone,
  Building2,
  Rocket,
  Instagram,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";

const content = {
  en: {
    badge: "🔥 1M+ Views on TikTok",
    headline: "Promote Your Brand",
    subheadline: "For a Full Day",
    description:
      "We showcase your business, startup, or social media account through banners and posters on our website, reaching thousands of highly engaged users every single day.",
    stat1: "10K+",
    stat1Label: "Daily Views",
    stat2: "1M+",
    stat2Label: "TikTok Views",
    stat3: "High",
    stat3Label: "Retention",
    retentionTitle: "Users Who Stay",
    retentionDesc:
      "Our audience doesn't just scroll past — they read, engage, and return. Our users spend significantly more time on our platform compared to average, meaning your promotion gets maximum exposure.",
    whatWePromote: "What We Promote",
    businesses: "Businesses",
    businessDesc: "Local shops, restaurants, services & brands",
    startups: "Startups",
    startupDesc: "New ventures looking for their first customers",
    socialMedia: "Social Accounts",
    socialMediaDesc: "Grow your Instagram, TikTok, YouTube & more",
    cta: "Get Promoted Today",
    ctaDesc: "Reach out on Instagram or TikTok to get started",
    viral: "Going Viral",
    viralDesc: "Already hitting 1 million views on TikTok and counting.",
    footerNote: "One-day promotion slot. Limited availability.",
    contactLabel: "Contact",
    instaBtn: "DM on Instagram",
    tiktokBtn: "Follow on TikTok",
    copyInsta: "Copy",
    copied: "Copied!",
  },
  np: {
    badge: "🔥 TikTok मा १M+ भ्यूज",
    headline: "आफ्नो ब्र्यान्ड प्रमोट गर्नुहोस्",
    subheadline: "पूरा एक दिनको लागि",
    stat1: "१०K+",
    description:
      "हामी तपाईंको व्यवसाय, स्टार्टअप, वा सोशल मिडिया अकाउन्ट हाम्रो वेबसाइटमा ब्यानर र पोस्टर मार्फत हजारौं सक्रिय दर्शकहरूसमक्ष पुर्‍याउँछौं।",
    stat1Label: "दैनिक भ्यूज",
    stat2: "१M+",
    stat2Label: "TikTok भ्यूज",
    stat3: "उच्च",
    stat3Label: "रिटेन्सन",
    retentionTitle: "लामो समय बस्ने दर्शक",
    retentionDesc:
      "हाम्रो दर्शक केवल स्क्रोल गर्दैनन् — उनीहरू पढ्छन्, संलग्न हुन्छन्, र फर्किन्छन्। तपाईंको प्रमोशनलाई अधिकतम एक्सपोजर मिल्छ।",
    whatWePromote: "हामी के प्रमोट गर्छौं",
    businesses: "व्यवसायहरू",
    businessDesc: "स्थानीय पसल, रेस्टुरेन्ट, सेवा र ब्र्यान्डहरू",
    startups: "स्टार्टअपहरू",
    startupDesc: "पहिलो ग्राहक खोज्ने नयाँ उद्यमहरू",
    socialMedia: "सोशल अकाउन्टहरू",
    socialMediaDesc: "Instagram, TikTok, YouTube र थप बढाउनुहोस्",
    cta: "आज नै प्रमोट गर्नुहोस्",
    ctaDesc: "Instagram वा TikTok मा सम्पर्क गर्नुहोस्",
    viral: "भाइरल भइरहेको छ",
    viralDesc: "TikTok मा पहिले नै १ मिलियन भ्यूज पुगिसकेको छ।",
    footerNote: "एक दिनको प्रमोशन स्लट। सीमित उपलब्धता।",
    contactLabel: "सम्पर्क",
    instaBtn: "Instagram मा DM गर्नुहोस्",
    tiktokBtn: "TikTok मा Follow गर्नुहोस्",
    copyInsta: "कपी",
    copied: "कपी भयो!",
  },
};

const INSTA_ID = "@davidrai119";
const instaUrl = "https://www.instagram.com/davidrai119/";
const tiktokUrl = "https://www.tiktok.com/@davidrai08";

const TikTokIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.22 8.22 0 004.83 1.56V6.8a4.85 4.85 0 01-1.06-.11z" />
  </svg>
);

const Promotion = () => {
  const [lang, setLang] = useState("en");
  const [copied, setCopied] = useState(false);
  const t = content[lang];

  const handleCopy = () => {
    navigator.clipboard.writeText(INSTA_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main
      className="home-root"
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "0 0 100px",
        minHeight: "100vh",
        background: "#fff",
      }}
    >
      <Nav />

      {/* Language Selector */}
      <div className="flex justify-end px-4 pt-3 pb-1">
        <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1 text-sm font-medium">
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1 rounded-full transition-all ${
              lang === "en"
                ? "bg-red-600 text-white shadow"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang("np")}
            className={`px-3 py-1 rounded-full transition-all ${
              lang === "np"
                ? "bg-red-600 text-white shadow"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            नेपाली
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="px-4 pt-6 pb-8">
        {/* Viral Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
            <Flame size={13} className="text-red-500" />
            {t.badge}
          </span>
        </div>

        {/* Headline */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-black text-gray-900 leading-tight tracking-tight">
            {t.headline}
          </h1>
          <h2 className="text-3xl font-black text-red-600 leading-tight mt-1">
            {t.subheadline}
          </h2>
          <p className="mt-4 text-gray-500 text-base leading-relaxed max-w-sm mx-auto">
            {t.description}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: <Eye size={18} />, val: t.stat1, label: t.stat1Label },
            { icon: <Flame size={18} />, val: t.stat2, label: t.stat2Label },
            {
              icon: <BarChart2 size={18} />,
              val: t.stat3,
              label: t.stat3Label,
            },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl p-3 text-center shadow-sm"
            >
              <div className="flex justify-center text-red-500 mb-1">
                {s.icon}
              </div>
              <div className="text-2xl font-black text-gray-900">{s.val}</div>
              <div className="text-xs text-gray-400 font-medium mt-0.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Card */}
        {/* Bottom CTA */}
        <section className="px-4 pb-4">
          <div className="bg-red-600 rounded-2xl p-6 text-center shadow-lg">
            <h3 className="text-white font-black text-xl mb-1">{t.cta}</h3>
            <p className="text-red-100 text-sm mb-4">{t.ctaDesc}</p>
            <div className="flex flex-col gap-3">
              <a
                href={instaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-red-600 font-bold px-6 py-3 rounded-xl text-sm shadow transition-opacity hover:opacity-90"
              >
                <Instagram size={17} />
                {t.instaBtn}
              </a>
              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-red-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-opacity hover:opacity-90"
              >
                <TikTokIcon size={16} />
                {t.tiktokBtn}
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </section>

        <p className="text-center text-xs text-gray-400">{t.footerNote}</p>
      </section>

      {/* Divider */}
      <div className="mx-4 border-t border-gray-100" />

      {/* Retention Section */}
      <section className="px-4 py-7">
        <div className="flex items-start gap-4 bg-red-50 border border-red-100 rounded-2xl p-4">
          <div className="bg-red-100 rounded-xl p-2.5 shrink-0">
            <Clock size={22} className="text-red-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-base mb-1">
              {t.retentionTitle}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {t.retentionDesc}
            </p>
          </div>
        </div>
      </section>

      {/* What We Promote */}
      <section className="px-4 pb-7">
        <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
          <Megaphone size={18} className="text-red-600" />
          {t.whatWePromote}
        </h3>
        <div className="flex flex-col gap-3">
          {[
            {
              icon: <Building2 size={20} className="text-red-600" />,
              title: t.businesses,
              desc: t.businessDesc,
            },
            {
              icon: <Rocket size={20} className="text-red-600" />,
              title: t.startups,
              desc: t.startupDesc,
            },
            {
              icon: <Instagram size={20} className="text-red-600" />,
              title: t.socialMedia,
              desc: t.socialMediaDesc,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm"
            >
              <div className="bg-red-50 rounded-xl p-2.5 shrink-0">
                {item.icon}
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm">
                  {item.title}
                </div>
                <div className="text-gray-400 text-xs mt-0.5">{item.desc}</div>
              </div>
              <ChevronRight
                size={16}
                className="text-gray-300 ml-auto shrink-0"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="mx-4 border-t border-gray-100" />

      {/* Viral TikTok Banner */}
      <section className="px-4 py-7">
        <div className="bg-gray-900 rounded-2xl p-5 flex items-center gap-4">
          <div className="bg-white rounded-xl p-2.5 shrink-0">
            <Zap size={22} className="text-red-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white font-black text-base">{t.viral}</div>
            <div className="text-gray-400 text-sm mt-0.5">{t.viralDesc}</div>
            <a
              href={tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-2.5 text-xs font-bold bg-white text-gray-900 px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              <TikTokIcon size={13} />
              @davidrai08
              <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="px-4 pb-7">
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: <TrendingUp size={18} />, label: "Growing Fast" },
            { icon: <Users size={18} />, label: "Real Audience" },
            { icon: <Star size={18} />, label: "Quality Reach" },
            { icon: <Flame size={18} />, label: "Viral Content" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3"
            >
              <span className="text-red-500">{item.icon}</span>
              <span className="text-sm font-semibold text-gray-700">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 pb-4">
        <div className="bg-red-600 rounded-2xl p-6 text-center shadow-lg">
          <h3 className="text-white font-black text-xl mb-1">{t.cta}</h3>
          <p className="text-red-100 text-sm mb-4">{t.ctaDesc}</p>
          <div className="flex flex-col gap-3">
            <a
              href={instaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-red-600 font-bold px-6 py-3 rounded-xl text-sm shadow transition-opacity hover:opacity-90"
            >
              <Instagram size={17} />
              {t.instaBtn}
            </a>
            <a
              href={tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-red-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-opacity hover:opacity-90"
            >
              <TikTokIcon size={16} />
              {t.tiktokBtn}
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Promotion;
