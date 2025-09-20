import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/navbar";
import HomePage from "./pages/Home";
import StoriesPage from "./components/StoriesPageComponent";
import StoryPage from "./pages/StoryPage";

import LoadingScreen from "./components/Loading";

const App = () => {
  const { stories, isLoading, favorites, readingProgress } = useSelector(state => state.stories);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <div className="bg-gray-950 text-white min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/story/:id" element={<StoryPage />} />
          {/* /*<Route path="/about" element={<AboutPage />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
