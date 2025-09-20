import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StoryCard from "../components/StoryCard";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const StoriesPage = () => {
  const stories = useSelector(state => state.stories.stories);
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const gridRef = useRef(null);
  const floatingElementsRef = useRef([]);
  const parallaxBgRef = useRef(null);
  const filterBarRef = useRef(null);
  const statsRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All');

  // Categories for filtering
  const categories = ['All', 'Sci-Fi', 'Fantasy', 'Mystery', 'Historical', 'Adventure'];
  
  // Filter stories based on active category
  const filteredStories = activeFilter === 'All' 
    ? stories 
    : stories.filter(story => story.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial page load animation
      const tl = gsap.timeline();
      
      // Parallax background animation
      tl.fromTo(parallaxBgRef.current, 
        { 
          y: 100,
          opacity: 0,
          scale: 1.1,
          filter: "blur(20px)"
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 2,
          ease: "power3.out"
        }
      );

      // Hero section animations
      tl.fromTo(titleRef.current,
        { 
          y: 150,
          opacity: 0,
          rotationX: -90,
          transformOrigin: "50% 100%"
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.5,
          ease: "back.out(1.7)"
        }, "-=1.5"
      );

      tl.fromTo(subtitleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=1"
      );

      tl.fromTo(filterBarRef.current,
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
        "-=0.8"
      );

      tl.fromTo(statsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.5"
      );

      // Floating elements animation
      floatingElementsRef.current.forEach((el, i) => {
        if (el) {
          gsap.to(el, {
            y: "random(-100, 100)",
            x: "random(-50, 50)",
            rotation: "random(-180, 180)",
            scale: "random(0.8, 1.2)",
            duration: "random(8, 15)",
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: i * 0.5
          });
        }
      });

      // Scroll-triggered animations
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Parallax title effect
          gsap.set(titleRef.current, {
            y: progress * -100,
            scale: 1 - progress * 0.3,
            opacity: 1 - progress * 0.8
          });

          // Parallax subtitle
          gsap.set(subtitleRef.current, {
            y: progress * -80,
            opacity: 1 - progress * 1.2
          });

          // Background parallax
          gsap.set(parallaxBgRef.current, {
            y: progress * -200,
            scale: 1 + progress * 0.3
          });
        }
      });

      // Grid reveal animation
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        onUpdate: (self) => {
          const cards = gridRef.current?.children;
          if (cards) {
            Array.from(cards).forEach((card, i) => {
              const progress = Math.max(0, Math.min(1, (self.progress - i * 0.1) * 2));
              gsap.set(card, {
                y: (1 - progress) * 100,
                opacity: progress,
                scale: 0.8 + progress * 0.2,
                rotationY: (1 - progress) * 25
              });
            });
          }
        }
      });

      // Mouse parallax effect
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xPos = (clientX / innerWidth - 0.5) * 2;
        const yPos = (clientY / innerHeight - 0.5) * 2;

        floatingElementsRef.current.forEach((el, i) => {
          if (el) {
            gsap.to(el, {
              x: xPos * (20 + i * 10),
              y: yPos * (15 + i * 8),
              duration: 2,
              ease: "power3.out"
            });
          }
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Scroll position tracking
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
      };
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Filter change animation
  const handleFilterChange = (category) => {
    if (category !== activeFilter) {
      gsap.to(gridRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          setActiveFilter(category);
          gsap.to(gridRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "back.out(1.7)"
          });
        }
      });
    }
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-gray-950 overflow-hidden">
      {/* Animated Background */}
      <div 
        ref={parallaxBgRef}
        className="fixed inset-0 -z-10"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(119, 198, 255, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, #0f172a 0%, #1e293b 100%)
          `
        }}
      />

      {/* Floating Elements */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (floatingElementsRef.current[i] = el)}
          className="fixed pointer-events-none -z-5"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${20 + Math.random() * 60}px`,
            height: `${20 + Math.random() * 60}px`,
          }}
        >
          <div 
            className="w-full h-full rounded-full opacity-20 blur-sm"
            style={{
              background: [
                'linear-gradient(45deg, #ff6b6b, #feca57)',
                'linear-gradient(45deg, #48cae4, #023e8a)', 
                'linear-gradient(45deg, #f72585, #b5179e)',
                'linear-gradient(45deg, #43aa8b, #90e0ef)',
                'linear-gradient(45deg, #f9844a, #fee2e2)'
              ][Math.floor(Math.random() * 5)]
            }}
          />
        </div>
      ))}

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Title */}
          <h1 
            ref={titleRef}
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none"
            style={{
              background: `
                linear-gradient(135deg, 
                  #ffd700 0%, 
                  #ff6b6b 25%, 
                  #4ecdc4 50%, 
                  #45b7d1 75%, 
                  #96ceb4 100%
                )
              `,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              filter: `hue-rotate(${scrollY * 0.5}deg)`
            }}
          >
            INFINITE
            <br />
            STORIES
          </h1>

          {/* Subtitle */}
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
          >
            Dive into worlds beyond imagination. Each story adapts to your choices, 
            creating unique narratives that evolve with every decision you make.
          </p>

          {/* Stats */}
          <div ref={statsRef} className="flex justify-center space-x-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{stories.length}+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Stories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">∞</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Possibilities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section ref={filterBarRef} className="sticky top-20 z-40 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleFilterChange(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeFilter === category
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-105'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <span className="text-gray-400 text-sm">
                Showing {filteredStories.length} of {stories.length} stories
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div 
            ref={gridRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredStories.map((story, index) => (
              <div
                key={`${story.id}-${activeFilter}`}
                className="transform-gpu"
                style={{ perspective: '1000px' }}
              >
                <StoryCard story={story} index={index} />
              </div>
            ))}
          </div>

          {filteredStories.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-white mb-2">No stories found</h3>
              <p className="text-gray-400">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* Scroll Indicator */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center">
          <div 
            className="w-8 h-8 border-2 border-pink-400 rounded-full"
            style={{
              background: `conic-gradient(#ec4899 ${scrollY * 0.1}deg, transparent ${scrollY * 0.1}deg)`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StoriesPage;