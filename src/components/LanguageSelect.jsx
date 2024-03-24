import React, { useState } from "react";
import { languages } from "@/languages";

const LanguageSelect = ({ language, onLanguageSelect }) => {
  // console.log(languages)
  const [dropdown, setDropdown] = useState(false);
  const languageKeys = Object.keys(languages);
  return (
    <div className="my-2">
      <div
        // tabIndex={0}
        // onBlur={() => setDropdown(false)}
        // onFocus={()=>setDropdown(true)}
        onClick={() => setDropdown(!dropdown)}
        className="px-3 py-1 rounded-xl bg-slate-200 hover:bg-slate-300 w-[20vw] cursor-pointer"
      >
        {language}
      </div>

      {dropdown && (
        <div className="absolute z-50 py-4 rounded-md bg-slate-50 w-[20vw]">
          {languageKeys.map((item) => {
            return (
              <h2
                key={item}
                className={`${item==language ? "bg-blue-400" : "hover:bg-slate-200"}  px-3 cursor-pointer`}
                onClick={() => {
                  onLanguageSelect(item,languages[item].value);
                  setDropdown(false);
                }}
              >
                {item}
              </h2>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSelect;
