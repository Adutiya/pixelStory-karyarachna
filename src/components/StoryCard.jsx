import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const StoryCard = ({ story, index }) => {
  const cardRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const glowRef = useRef(null);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();
    
    
    tl.fromTo(
      cardRef.current,
      { 
        y: 100, 
        opacity: 0, 
        scale: 0.8, 
        rotate: index % 2 === 0 ? -8 : 8,
        filter: "blur(10px)"
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotate: 0,
        filter: "blur(0px)",
        duration: 1.4,
        delay: index * 0.15,
        ease: "elastic.out(1, 0.8)"
      }
    );

   
    gsap.to(cardRef.current, {
      y: "random(-10, 10)",
      x: "random(-5, 5)",
      rotation: "random(-2, 2)",
      duration: "random(3, 5)",
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: index * 0.5
    });


    gsap.to(glowRef.current, {
      opacity: "random(0.3, 0.7)",
      scale: "random(1, 1.2)",
      duration: "random(2, 4)",
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });

  }, [index]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    
    
    const tl = gsap.timeline();
    
    tl.to(cardRef.current, {
      scale: 1.08,
      rotationY: 5,
      z: 100,
      duration: 0.4,
      ease: "power2.out"
    })
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.3
    }, 0)
    .to(contentRef.current, {
      y: -10,
      duration: 0.3,
      ease: "power2.out"
    }, 0)
    .to(glowRef.current, {
      opacity: 0.8,
      scale: 1.3,
      duration: 0.3
    }, 0);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    
    const tl = gsap.timeline();
    
    tl.to(cardRef.current, {
      scale: 1,
      rotationY: 0,
      z: 0,
      duration: 0.4,
      ease: "power2.out"
    })
    .to(overlayRef.current, {
      opacity: 1,
      duration: 0.3
    }, 0)
    .to(contentRef.current, {
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    }, 0)
    .to(glowRef.current, {
      opacity: 0.5,
      scale: 1,
      duration: 0.3
    }, 0);
  };

  const handleClick = () => {
   
    gsap.to(cardRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
      onComplete: () => {
        navigate(`/story/${story.id}`);
      }
    });
  };

 
  const getCategoryColor = () => {
    const colors = {
      'Sci-Fi': 'from-cyan-400 to-blue-500',
      'Fantasy': 'from-purple-400 to-pink-500',
      'Mystery': 'from-gray-400 to-slate-600',
      'Historical': 'from-amber-400 to-orange-500',
      'Adventure': 'from-green-400 to-emerald-500'
    };
    return colors[story.category] || 'from-gray-400 to-gray-600';
  };

  return (
    <div className="relative perspective-1000">
  
      <div 
        ref={glowRef}
        className="absolute inset-0 rounded-3xl opacity-50 blur-xl -z-10"
        style={{ 
          background: story.bg,
          transform: 'scale(0.9)'
        }}
      />
      
      <div
        ref={cardRef}
        className="relative group cursor-pointer will-change-transform"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ transformStyle: 'preserve-3d' }}
      >
       
        <div 
          className="relative overflow-hidden rounded-3xl h-[450px] shadow-2xl border border-white/10 backdrop-blur-sm"
          style={{ 
            background: `linear-gradient(135deg, ${story.bg}), linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`,
            backgroundBlendMode: 'overlay'
          }}
        >
    
          <div 
            ref={overlayRef}
            className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40 transition-all duration-500"
          />
          
          <div className="absolute inset-0 opacity-20 mix-blend-multiply bg-noise" />
          
          
          <div className="absolute top-6 left-6 z-20">
            <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${getCategoryColor()} text-white text-sm font-bold shadow-lg backdrop-blur-sm border border-white/20`}>
              {story.category || 'Story'}
            </div>
          </div>

          
          <div className="absolute top-6 right-6 z-20">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300">
              <span className="text-white text-lg">🔖</span>
            </div>
          </div>

         
          <div 
            ref={contentRef}
            className="relative z-10 h-full flex flex-col justify-between text-white p-8"
          >
       
            <div className="flex-1 flex flex-col justify-center">
              <div className="space-y-4">
                <h3 className="text-4xl font-black leading-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  {story.title}
                </h3>
                <p className="text-lg text-white/90 leading-relaxed font-medium">
                  {story.description}
                </p>
              </div>
            </div>


            <div className="space-y-4">
             
              <div className="flex items-center space-x-4 text-sm text-white/70">
                <div className="flex items-center space-x-1">
                  <span>⏱️</span>
                  <span>15 min read</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>📚</span>
                  <span>5 chapters</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>⭐</span>
                  <span>4.8</span>
                </div>
              </div>

             
              <div className="flex items-center justify-between">
              <button 
  onClick={(e) => {
    e.stopPropagation(); 
    handleClick();
  }}
  className="group/btn flex items-center space-x-3 px-8 py-4 bg-white/15 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/25 hover:border-white/30 transition-all duration-300 font-bold text-lg shadow-lg"
>
  <span>Enter Story</span>
  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover/btn:translate-x-1 transition-transform duration-300">
    <span className="text-sm">→</span>
  </div>
</button>


               
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500"
                      style={{ width: '30%' }}
                    />
                  </div>
                  <span className="text-xs text-white/60">30%</span>
                </div>
              </div>
            </div>
          </div>

          
          <div className="absolute inset-0 pointer-events-none">
         
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/40 rounded-full animate-pulse"
                style={{
                  top: `${20 + (i * 15)}%`,
                  left: `${10 + (i * 15)}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${2 + (i * 0.3)}s`
                }}
              />
            ))}
            
            
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
          </div>
        </div>

    
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isHovered ? 'animate-pulse' : ''}`} />
      </div>
    </div>
  );
};

export default StoryCard;
