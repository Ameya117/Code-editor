import React, { useState } from "react";
import { languages } from "@/languages";

const LanguageSelect = ({ language, onLanguageSelect }) => {
  const [dropdown, setDropdown] = useState(false);
  const languageKeys = Object.keys(languages);
  return (
    <div className="my-2 ">
      <div
        // tabIndex={0}
        onBlur={() => setDropdown(false)}
        onFocus={()=>setDropdown(true)}
        onClick={() => setDropdown(!dropdown)}
        className="px-3 py-1 rounded-lg bg-slate-200  hover:bg-slate-300 w-[20vw] cursor-pointer"
      >
        {language}
      </div>

      {dropdown && (
        <div className="absolute z-50 py-4 w-[20vw] border  rounded-md bg-slate-100 bg-opacity-95  shadow-xl">
          {languageKeys.map((item) => {
            return (
              <h2
                key={item}
                className={`${item==language ? "bg-blue-400" : "hover:bg-slate-3  00"}  px-3 cursor-pointer text-base`}
                onClick={() => {
                  onLanguageSelect(item,languages[item].value);
                  setDropdown(false);
                }}
              >
                {item} <span className={`${item==language ? "text-white" : ""} text-xs text-slate-500`}>({languages[item].version})</span>
              </h2>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSelect;
