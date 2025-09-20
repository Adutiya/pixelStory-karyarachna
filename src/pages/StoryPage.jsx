import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const StoryViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const stories = useSelector((state) => state.stories.stories);
  const story = stories.find((s) => s.id === id);

  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const sectionsRef = useRef([]);
  const floatingRef = useRef([]);
  const progressRef = useRef(null);
  const cursorRef = useRef(null);
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // FlowFest-style vibrant colors
  const colors = ["#FF6B35", "#F7931E", "#FFD23F", "#06FFA5", "#4D96FF", "#9B59B6", "#E91E63"];

  useEffect(() => {
    if (!story) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = Math.min(scrollY / docHeight, 1);
      
      setScrollProgress(progress);

      // FlowFest-style floating animations
      floatingRef.current.forEach((el, i) => {
        if (el) {
          const speed = 0.5 + (i % 4) * 0.3;
          const amplitude = 50 + (i % 3) * 30;
          const phase = i * 0.5;
          
          el.style.transform = `
            translateY(${Math.sin(scrollY * 0.01 + phase) * amplitude - scrollY * speed}px)
            translateX(${Math.cos(scrollY * 0.008 + phase) * 40}px)
            rotate(${scrollY * 0.05 + i * 60}deg)
            scale(${1 + Math.sin(scrollY * 0.005 + phase) * 0.3})
          `;
        }
      });

      // Dynamic title effects
      if (titleRef.current) {
        const titleOffset = scrollY * 0.4;
        const titleScale = Math.max(0.5, 1 - progress * 0.5);
        titleRef.current.style.transform = `
          translateY(${-titleOffset}px) 
          scale(${titleScale})
          rotateX(${progress * 10}deg)
        `;
        titleRef.current.style.filter = `
          hue-rotate(${progress * 180}deg) 
          brightness(${1 + Math.sin(scrollY * 0.01) * 0.2})
        `;
      }

      // Parallax hero section
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
        heroRef.current.style.filter = `brightness(${1 - progress * 0.4})`;
      }

      // Animate story sections with FlowFest flair
      sectionsRef.current.forEach((section, i) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionProgress = Math.max(0, Math.min(1, 
            (windowHeight - rect.top) / (windowHeight + rect.height)
          ));
          
          if (sectionProgress > 0.2 && sectionProgress < 0.8) {
            setCurrentSection(i);
          }

          // FlowFest-style morphing animations
          const morphScale = 0.7 + sectionProgress * 0.3;
          const morphRotate = (sectionProgress - 0.5) * 15;
          const morphTranslateY = (1 - sectionProgress) * 150;
          const morphSkew = Math.sin(sectionProgress * Math.PI) * 5;

          section.style.transform = `
            translateY(${morphTranslateY}px)
            scale(${morphScale})
            rotate(${morphRotate}deg)
            skewY(${morphSkew}deg)
          `;
          section.style.opacity = sectionProgress;
          
          // Dynamic color shifting
          section.style.filter = `
            hue-rotate(${sectionProgress * 360}deg)
            saturate(${1 + sectionProgress * 0.5})
            brightness(${0.9 + sectionProgress * 0.2})
          `;
        }
      });

      // Progress bar animation
      if (progressRef.current) {
        progressRef.current.style.width = `${progress * 100}%`;
        progressRef.current.style.filter = `hue-rotate(${progress * 360}deg)`;
      }
    };

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [story]);

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600">
        <div className="text-center">
          <div className="text-white text-3xl font-bold mb-6">Story not found</div>
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const storyParagraphs = story.content?.split("\n\n") || [];

  return (
    <div ref={pageRef} className="relative overflow-hidden">
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        style={{
          background: 'radial-gradient(circle, #FF6B35, #F7931E)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.1s ease-out',
        }}
      />

      {/* FlowFest-style animated progress bar */}
      <div className="fixed top-0 left-0 w-full h-2 bg-black/10 z-50">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 relative overflow-hidden"
          style={{ width: '0%' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
        </div>
      </div>

      {/* Dynamic background with FlowFest colors */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, #FF6B35 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, #F7931E 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, #FFD23F 0%, transparent 50%),
              linear-gradient(135deg, #4D96FF 0%, #9B59B6 50%, #E91E63 100%)
            `,
          }}
        />
      </div>

      {/* FlowFest-style floating elements */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (floatingRef.current[i] = el)}
            className="absolute"
            style={{
              width: `${30 + Math.random() * 80}px`,
              height: `${30 + Math.random() * 80}px`,
              background: `
                linear-gradient(45deg, 
                  ${colors[i % colors.length]}, 
                  ${colors[(i + 1) % colors.length]}
                )
              `,
              borderRadius: Math.random() > 0.5 ? '50%' : '20px',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.6,
              filter: 'blur(2px)',
              boxShadow: `0 0 30px ${colors[i % colors.length]}50`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-6 left-6 z-40">
        <button
          onClick={() => navigate("/stories")}
          className="px-6 py-3 bg-white/20 backdrop-blur-md text-white font-bold rounded-full border-2 border-white/30 hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-110"
        >
          ← Back
        </button>
      </nav>

      {/* Reading progress indicator */}
      <div className="fixed top-6 right-6 z-40">
        <div className="px-4 py-2 bg-white/20 backdrop-blur-md text-white text-sm font-bold rounded-full border border-white/30">
          {currentSection + 1} / {storyParagraphs.length}
        </div>
      </div>

      {/* FlowFest-style hero section */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative"
      >
        <div className="text-center max-w-6xl mx-auto px-6 relative z-20">
          {/* Category and time badges */}
          <div className="mb-8 flex justify-center gap-4">
            <span className="px-6 py-2 bg-orange-500 text-white font-bold rounded-full text-sm border-2 border-white/50">
              {story.category}
            </span>
            <span className="px-6 py-2 bg-purple-600 text-white font-bold rounded-full text-sm border-2 border-white/50">
              {story.readTime || "5 min read"}
            </span>
          </div>
          
          {/* FlowFest-style massive title */}
          <h1
            ref={titleRef}
            className="text-7xl md:text-9xl lg:text-[12rem] font-black text-white mb-8 leading-none relative"
            style={{
              textShadow: '0 0 50px rgba(255,107,53,0.5), 0 0 100px rgba(247,147,30,0.3)',
              background: 'linear-gradient(45deg, #FF6B35, #F7931E, #FFD23F, #06FFA5)',
              backgroundSize: '400% 400%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradientFlow 6s ease-in-out infinite',
              transformStyle: 'preserve-3d',
            }}
          >
            {story.title}
          </h1>
          
          {/* Subtitle with typewriter effect */}
          <div className="text-2xl text-white/90 mb-12 font-medium">
            Scroll to discover the story...
          </div>
          
          {/* FlowFest-style scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <div className="w-8 h-16 border-4 border-white/60 rounded-full flex justify-center p-2 animate-bounce">
              <div className="w-2 h-6 bg-gradient-to-b from-orange-500 to-pink-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Story content with FlowFest animations */}
      <div className="relative z-20">
        {storyParagraphs.map((paragraph, index) => (
          <section
            key={index}
            ref={(el) => (sectionsRef.current[index] = el)}
            className="min-h-screen flex items-center justify-center px-6 py-20"
          >
            <div className="max-w-5xl mx-auto relative">
              {/* FlowFest-style content card */}
              <div 
                className="relative p-12 rounded-3xl overflow-hidden"
                style={{
                  background: `
                    linear-gradient(135deg, 
                      rgba(255,255,255,0.15) 0%, 
                      rgba(255,255,255,0.05) 100%
                    )
                  `,
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(255,255,255,0.2)',
                  boxShadow: `
                    0 20px 60px rgba(0,0,0,0.3),
                    inset 0 1px 0 rgba(255,255,255,0.4)
                  `,
                }}
              >
                {/* Paragraph text */}
                <p className="text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed font-light mb-8">
                  {paragraph}
                </p>
                
                {/* FlowFest-style decorative elements */}
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full animate-pulse opacity-80"></div>
                <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full animate-pulse delay-1000 opacity-80"></div>
                
                {/* Interactive corner elements */}
                <div className="absolute top-4 right-4 w-4 h-4 bg-white rounded-full opacity-40 cursor-pointer hover:opacity-100 hover:scale-150 transition-all duration-300"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-50 cursor-pointer hover:opacity-100 hover:scale-125 transition-all duration-300"></div>
                
                {/* Animated gradient overlay */}
                <div 
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{
                    background: 'linear-gradient(45deg, transparent, rgba(255,107,53,0.1), transparent)',
                    animation: 'shimmer 3s ease-in-out infinite',
                  }}
                ></div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* FlowFest-style ending section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-t from-black/50 to-transparent">
        <div className="text-center">
          <h2 className="text-6xl md:text-8xl text-white font-black mb-8">
            The End
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Thanks for reading! Ready for more stories?
          </p>
          <button
            onClick={() => navigate("/stories")}
            className="px-12 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full text-xl font-bold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110 shadow-2xl"
          >
            Read More Stories
          </button>
        </div>
      </section>

      {/* FlowFest-style animations */}
      <style jsx>{`
        @keyframes gradientFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        html {
          scroll-behavior: smooth;
          cursor: none;
        }
        
        body {
          overflow-x: hidden;
          background: #000;
        }
        
        /* FlowFest-style smooth transitions */
        * {
          transition: filter 0.3s ease;
        }
        
        /* Interactive hover effects */
        button:hover {
          filter: brightness(1.1) saturate(1.2);
        }
        
        /* Morphing animations */
        section {
          transform-origin: center center;
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default StoryViewPage;