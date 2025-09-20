import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import gsap from "gsap";
import { setLoading } from "../redux/story"; 

const LoadingScreen = () => {
  const loaderRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const letters = loaderRef.current?.querySelectorAll("span");
    if (letters) {
      letters.forEach((letter, i) => {
        gsap.fromTo(
          letter,
          { y: 50, opacity: 0, scale: 0.5 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
          }
        );
      });
    }

    const timer = setTimeout(() => {
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          dispatch(setLoading(false));
        },
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center z-50"
    >
      <div className="text-6xl md:text-8xl font-black tracking-wider">
        {"STORYWORLD".split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block mx-1 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
