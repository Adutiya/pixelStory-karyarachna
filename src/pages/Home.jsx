import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import gsap from "gsap";
import StoryCard from "../components/StoryCard";

const HomePage = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const storiesRef = useRef(null);
  const stories = useSelector(state => state.stories.stories);

  useEffect(() => {
    // Hero animations
    gsap.fromTo(titleRef.current, 
      { y: 100, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
    );
    
    gsap.fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: 'power3.out' }
    );

    // Stories section animation
    gsap.fromTo(storiesRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 1, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20 animate-pulse"
              style={{
                width: `${60 + i * 40}px`,
                height: `${60 + i * 40}px`,
                background: `radial-gradient(circle, rgba(255,255,255,0.3), transparent)`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${4 + i}s`
              }}
            />
          ))}
        </div>

        <div className="text-center z-10 px-6 max-w-6xl">
          <h1 
            ref={titleRef}
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 text-white leading-tight"
          >
            IMMERSIVE
            <br />
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              STORYTELLING
            </span>
          </h1>
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Step into worlds beyond imagination. Experience interactive narratives 
            that respond to your choices and emotions through cutting-edge technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/stories"
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg rounded-full hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Explore Stories
            </Link>
            <button className="px-8 py-4 border-2 border-white/50 text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Featured Stories Preview */}
      <section 
        ref={storiesRef}
        className="py-24 bg-gray-900"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Featured Stories
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover our most popular interactive narratives
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <StoryCard key={story.id} story={story} index={index} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/stories"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:scale-105 transition-all duration-300"
            >
              View All Stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
