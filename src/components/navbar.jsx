import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 50) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
    return (
      <nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-black bg-opacity-90 backdrop-blur-md py-3" : "bg-transparent py-6"
        }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/">
            <h1 className={`text-white font-bold transition-all duration-300 cursor-pointer ${
              scrolled ? "text-xl" : "text-3xl"
            }`}>
              StoryWorld
            </h1>
          </Link>
          <ul className="flex space-x-8 text-white uppercase tracking-wide">
            <li>
              <Link to="/" className="hover:text-pink-400 cursor-pointer transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/stories" className="hover:text-pink-400 cursor-pointer transition-colors">
                Stories
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-pink-400 cursor-pointer transition-colors">
                About
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  };
  export default Navbar;