'use client';
import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import LanguageSelect from "@/components/LanguageSelect";
import Output from "./Output";

const CodeEditor = () => {
  const [value, setValue] = useState("//Enter your code");
  const [language, setLanguage] = useState("javascript");
  const editorRef = useRef(null);

  function showValue() {
    console.log(editorRef.current.getValue());
  }
  function handleEditorOnMount(editor, monaco) {
    editorRef.current = editor;
    editor.focus();
  }
  // console.log(editorRef.current.getValue())
  const onLanguageSelect = (lang, val) => {
    setLanguage(lang);
    setValue(val);
  };

  return (
    <>
      <div className="flex flex-row ml-4">
        <div className="m">
          <div className="flex flex-row">
            <LanguageSelect
              language={language}
              onLanguageSelect={onLanguageSelect}
            />
            <span className="my-auto mx-4">Theme</span>
          </div>

          <Editor
            // isLazy={true}
            height="90vh"
            width="65vw"
            theme="vs-dark"
            defaultLanguage="javascript"
            language={language}
            defaultValue={value}
            onMount={handleEditorOnMount}
            value={value}
            onChange={(e) => {
              setValue(e);
            }}
          />
        </div>
        <Output code={value} language={language}/>
      </div>
    </>
  );
};
export default CodeEditor;

//background color(darkmode) : #100c14
