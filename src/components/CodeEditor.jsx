"use client";
import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import LanguageSelect from "@/components/LanguageSelect";
import Output from "./Output";
import { useThemeStore } from "@/stores/theme";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

const CodeEditor = () => {
  const { theme, toggleDarkTheme, toggleLightTheme } = useThemeStore();
  const [background, setBackground] = useState("white");
  const [themeicon,setThemeicon] = useState(<MdDarkMode />);
  const [value, setValue] = useState("//Enter your code");
  const [language, setLanguage] = useState("javascript");
  const editorRef = useRef(null);

  const handleOnMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();
  };
  // console.log(editorRef.current.getValue())
  const onLanguageSelect = (lang, val) => {
    setLanguage(lang);
    setValue(val);
  };

  const toggleTheme = () => {
    if (theme === "light") {
      toggleDarkTheme();
      setThemeicon(<MdOutlineLightMode />);
    } else {
      toggleLightTheme();
      setThemeicon(<MdDarkMode  />);
    }
  };

  return (
    <>
      <div
        className={`flex flex-col md:flex-row pl-4 ${
          theme === "light" ? "bg-slate-50" : "bg-[#100c14]"
        } `}
      >
        <div>
          <div className="flex flex-row">
            <LanguageSelect
              language={language}
              onLanguageSelect={onLanguageSelect}
            />
            <span
              onClick={toggleTheme}
              className="p-1 my-auto mx-4 cursor-pointer bg-slate-50 h-fit  w-fit rounded-xl"
            >
              {themeicon}
            </span>
          </div>

          <Editor
            className="border-2 border-black/80"
            height="95vh"
            width="65vw"
            theme={`vs-${theme}`}
            defaultLanguage="javascript"
            formatOnType={true}
            formatOnPaste={true}
            language={language}
            defaultValue={value}
            onMount={handleOnMount}
            readOnly={true}
            onChange={(e) => {
                setValue(e);
            }}
            />
        </div>
        <Output code={value} language={language} />
      </div>
    </>
  );
};
export default CodeEditor;

