import { StrictMode } from "react";
import React from "react";
// import Opinions from "./routes/Opinions";
import Review from "./routes/Review";
import { createRoot } from "react-dom/client";
import About from "./routes/About";
import { CandidateProvider } from "./context/candidatesContext";
import "./index.css";
import { SocketProvider } from "./context/socketContext";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./routes/Home";
import { PostHogProvider } from "@posthog/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/review",
    element: <Review />,
  },{
    path:'/about',
    element:<About />
  }
]);

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  autocapture: true, // automatically capture clicks/forms
  capture_pageview: true, // track pageviews
};

createRoot(document.getElementById("root")).render(
<SocketProvider>
    <CandidateProvider>
    <PostHogProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={options}
    >
      <RouterProvider router={router} />
    </PostHogProvider>
  </CandidateProvider>
</SocketProvider>
);
