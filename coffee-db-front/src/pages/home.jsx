import React from "react";
import { Link } from "react-router-dom";
import { Thermometer } from "../assets/thermometer";
import { Coffee } from "../assets/coffee";
import { Sprout } from "../assets/sprout";
import { Users } from "../assets/users";
export function Home() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif font-bold text-5xl md:text-7xl text-[#3E2723] mb-6 leading-tight">
            For the coffee obsessed
          </h1>
          <p className="text-xl md:text-2xl text-[#3E2723]/70 mb-8 font-light">
            A community for those who care about every detail—from bean to cup
          </p>
          <p className="text-base md:text-lg text-[#3E2723]/60 max-w-2xl mx-auto leading-relaxed">
            Share brewing recipes, discuss gear, explore coffee origins, and
            connect with fellow enthusiasts who understand why water temperature
            matters.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="explore" className="w-full py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif font-semibold text-3xl md:text-4xl text-[#3E2723] text-center mb-16">
            What we're about
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Recipes Feature */}
            <Link to="/recipes" className="flex flex-col group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-[#8D6E63]/10 flex items-center justify-center mb-6 group-hover:bg-[#8D6E63]/20 transition-colors">
                <div className="w-6 h-6 text-[#8D6E63]">
                  <Thermometer />
                </div>
              </div>
              <h3 className="font-serif font-semibold text-xl text-[#3E2723] mb-3 group-hover:text-[#8D6E63] transition-colors">
                Brewing Recipes
              </h3>
              <p className="text-[#3E2723]/70 leading-relaxed">
                Discover and share detailed brewing methods. V60, AeroPress,
                espresso—dial in your perfect cup with community-tested recipes.
              </p>
            </Link>

            {/* Gear Feature */}
            <Link to="/gear" className="flex flex-col group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-[#8D6E63]/10 flex items-center justify-center mb-6 group-hover:bg-[#8D6E63]/20 transition-colors">
                <div className="w-6 h-6 text-[#8D6E63]">
                  <Coffee />
                </div>
              </div>
              <h3 className="font-serif font-semibold text-xl text-[#3E2723] mb-3 group-hover:text-[#8D6E63] transition-colors">
                Gear Reviews
              </h3>
              <p className="text-[#3E2723]/70 leading-relaxed">
                Honest reviews and discussions on grinders, brewers, and
                accessories. Find the right tools for your brewing style.
              </p>
            </Link>

            {/* Beans Feature */}
            <Link to="/beans" className="flex flex-col group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-[#8D6E63]/10 flex items-center justify-center mb-6 group-hover:bg-[#8D6E63]/20 transition-colors">
                <div className="w-6 h-6 text-[#8D6E63]">
                  <Sprout />
                </div>
              </div>
              <h3 className="font-serif font-semibold text-xl text-[#3E2723] mb-3 group-hover:text-[#8D6E63] transition-colors">
                Beans & Origins
              </h3>
              <p className="text-[#3E2723]/70 leading-relaxed">
                Explore roasters, regions, and varietals. Learn what makes
                Ethiopian Yirgacheffe different from Colombian Huila.
              </p>
            </Link>

            {/* Community Feature */}
            <Link
              to="/community"
              className="flex flex-col group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-[#8D6E63]/10 flex items-center justify-center mb-6 group-hover:bg-[#8D6E63]/20 transition-colors">
                <div className="w-6 h-6 text-[#8D6E63]">
                  <Users />
                </div>
              </div>
              <h3 className="font-serif font-semibold text-xl text-[#3E2723] mb-3 group-hover:text-[#8D6E63] transition-colors">
                Community
              </h3>
              <p className="text-[#3E2723]/70 leading-relaxed">
                Connect with fellow coffee enthusiasts. Share experiences, ask
                questions, and learn from those who've been there.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Secondary Content Section */}
      <section className="w-full py-16 px-6 bg-[#3E2723]/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif font-semibold text-2xl md:text-3xl text-[#3E2723] mb-8 text-center">
            Built by coffee lovers, for coffee lovers
          </h2>
          <div className="space-y-6 text-[#3E2723]/70 leading-relaxed">
            <p>
              We started this community because we couldn't find a place that
              took coffee as seriously as we do. Not in a pretentious way—in a
              genuinely curious, always-learning way.
            </p>
            <p>
              Whether you're perfecting your pour-over technique, researching
              your next grinder upgrade, or trying to understand why that
              natural process Ethiopian tastes like blueberries, you'll find
              people here who get it.
            </p>
            <p>
              No ads, no affiliate links, no hidden agendas. Just a shared
              obsession with making better coffee.
            </p>
          </div>
        </div>
      </section>

      {/* Topics Preview Section */}
      <section className="w-full py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif font-semibold text-2xl md:text-3xl text-[#3E2723] mb-12 text-center">
            Popular topics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-[#3E2723]/10 rounded-lg p-6 hover:border-[#8D6E63]/30 transition-colors">
              <h3 className="font-serif font-semibold text-lg text-[#3E2723] mb-2">
                Dialing in espresso
              </h3>
              <p className="text-sm text-[#3E2723]/60 mb-4">
                Troubleshooting extraction, grind size, and pressure profiling
              </p>
              <span className="text-xs text-[#8D6E63] font-medium">
                324 discussions
              </span>
            </div>

            <div className="border border-[#3E2723]/10 rounded-lg p-6 hover:border-[#8D6E63]/30 transition-colors">
              <h3 className="font-serif font-semibold text-lg text-[#3E2723] mb-2">
                Hand grinder recommendations
              </h3>
              <p className="text-sm text-[#3E2723]/60 mb-4">
                Comparing Comandante, 1Zpresso, and other manual options
              </p>
              <span className="text-xs text-[#8D6E63] font-medium">
                198 discussions
              </span>
            </div>

            <div className="border border-[#3E2723]/10 rounded-lg p-6 hover:border-[#8D6E63]/30 transition-colors">
              <h3 className="font-serif font-semibold text-lg text-[#3E2723] mb-2">
                Light roast recommendations
              </h3>
              <p className="text-sm text-[#3E2723]/60 mb-4">
                Discovering roasters pushing the boundaries of fruit-forward
                profiles
              </p>
              <span className="text-xs text-[#8D6E63] font-medium">
                267 discussions
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
