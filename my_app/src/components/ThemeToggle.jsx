import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; // Sun and Moon icons

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 0,
        width: "36px",
        height: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {theme === "dark" ? (
        <FaSun color="#41a1c4ff" size={24} /> // Dark cyan sun for light mode
      ) : (
        <FaMoon color="#41a1c4ff" size={24} /> // White moon for dark mode
      )}
    </button>
  );
}
