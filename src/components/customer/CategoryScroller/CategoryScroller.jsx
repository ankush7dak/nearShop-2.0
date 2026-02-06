import { useEffect, useRef, useState } from "react";
import "./CategoryScroller.css";

const dummyCategories = [
  { id: 1, name: "Grocery", icon: "🛒" },
  { id: 2, name: "Vegetables", icon: "🥦" },
  { id: 3, name: "Fruits", icon: "🍎" },
  { id: 4, name: "Bakery", icon: "🥖" },
  { id: 5, name: "Pharmacy", icon: "💊" },
  { id: 6, name: "Electronics", icon: "📱" },
  { id: 7, name: "Fashion", icon: "👕" },
  { id: 8, name: "Stationery", icon: "📚" },
  { id: 9, name: "Meat", icon: "🍗" },
  { id: 10, name: "Electronics", icon: "📱" },
  { id: 11, name: "Fashion", icon: "👕" },
  { id: 12, name: "Stationery", icon: "📚" },
  { id: 13, name: "Meat", icon: "🍗" },
  { id: 14, name: "Fashion", icon: "👕" },
  { id: 15, name: "Stationery", icon: "📚" },
  { id: 16, name: "Meat", icon: "🍗" },
  { id: 17, name: "Dairy", icon: "🥛" }
];

export default function CategoryScroller() {
  const scrollRef = useRef(null);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;

    setShowLeft(el.scrollLeft > 5);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  useEffect(() => {
    updateArrows();

    const el = scrollRef.current;
    el.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);

    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scrollLeftHandler = () => {
    scrollRef.current.scrollBy({
      left: -300,
      behavior: "smooth"
    });
  };

  const scrollRightHandler = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: "smooth"
    });
  };

  return (
  <div className="nearshop-category-outer">
    <div className="nearshop-category-wrapper">
        
      {showLeft && (
        <button className="scroll-btn left" onClick={scrollLeftHandler}>
          ◀
        </button>
      )}

      <div className="nearshop-category-list" ref={scrollRef}>
        {dummyCategories.map((cat) => (
          <div className="category-pill" key={cat.id}>
            <span className="cat-icon">{cat.icon}</span>
            <span className="cat-name">{cat.name}</span>
          </div>
        ))}
      </div>

      {showRight && (
        <button className="scroll-btn right" onClick={scrollRightHandler}>
          ▶
        </button>
      )}
    </div>
  </div>
);

}
