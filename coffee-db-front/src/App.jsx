import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/home";
import { Recipes } from "./pages/recipes";
import { Gear } from "./pages/gear";
import { Beans } from "./pages/beans";
import { Community } from "./pages/community";
import { Coffee } from "./assets/coffee";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full">
        {/* Header */}
        <header className="w-full border-b border-[#3E2723]/10">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-6 h-6 text-[#8D6E63]">
                <Coffee />
              </div>
              <span className="font-serif font-bold text-xl text-[#3E2723]">
                Brew Collective
              </span>
            </Link>
            <nav className="flex items-center gap-6">
              <a
                href="#explore"
                className="text-[#3E2723] hover:text-[#8D6E63] transition-colors font-medium text-sm"
              >
                Explore
              </a>
              <Link
                to="/login"
                className="text-[#3E2723] hover:text-[#8D6E63] transition-colors font-medium text-sm"
              >
                Login
              </Link>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/gear" element={<Gear />} />
          <Route path="/beans" element={<Beans />} />
          <Route path="/community" element={<Community />} />
        </Routes>

        {/* Footer */}
        <footer className="w-full border-t border-[#3E2723]/10 py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 text-[#8D6E63]">
                  <Coffee />
                </div>
                <span className="font-serif font-semibold text-[#3E2723]">
                  BrewJournal
                </span>
              </div>
              <p className="text-sm text-[#3E2723]/50">
                A community-driven platform for coffee enthusiasts
              </p>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
