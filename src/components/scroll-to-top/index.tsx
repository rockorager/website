import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import s from "./ScrollToTop.module.css";

export default function ScrollToTopButton() {
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);
  const setScrollToTopButtonRef = useRef<HTMLButtonElement>(
    null
  );
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollToTopButton(true);
      } else {
        setShowScrollToTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    showScrollToTopButton &&
    <button
      ref={setScrollToTopButtonRef}
      className={s.scrollToTopButton}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp size={16} />
    </button>
  );
};
