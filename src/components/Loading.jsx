import React from "react";
import styles from "../styles/loader.module.css";
import { useThemeStore } from "@/stores/theme";

const Loading = ({ message }) => {
  const { theme } = useThemeStore();
  return (
    <div
      className={`${
        theme === "light" ? "bg-slate-300" : "bg-slate-800"
      } bg-slate-100 w-fit px-4 rounded-lg text-xs flex flex-row py-2`}
    >
      {/* Loading... */}
      <div className={`${styles.loader}`}></div>
      <span
        className={`mx-2 ${theme === "light" ? "text-black" : "text-white"}`}
      >
        {message}
      </span>
    </div>
  );
};

export default Loading;
