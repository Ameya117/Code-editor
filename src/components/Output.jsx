import React, { useState } from "react";
import { languages } from "@/languages";
import Loading from "./Loading";
import { useThemeStore } from "@/stores/theme";
const axios = require("axios");

const Output = (props) => {
  const { code, language } = props;
  const {theme} = useThemeStore();
  const language_id = languages[language].id;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const API_baseURL = process.env.NEXT_PUBLIC_API_URL;
  const [output, setOutput] = useState();
  const [loading, setLoading] = useState(false);

  const compileCode = async () => {
    const sourceCode = code;
    if (!sourceCode) return;
    try {
      setOutput();
      const options = {
        method: "POST",
        url: `${API_baseURL}/submissions`,
        params: {
          base64_encoded: "false",
          fields: "*",
        },
        headers: {
          "content-type": "application/json",
          "Content-Type": "application/json",
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
        data: {
          language_id: language_id,
          source_code: sourceCode,
          stdin: "",
        },
      };
      setLoading(true);
      const post_response = await axios.request(options);
      const token = post_response.data.token;
      try {
      const options = {
          method: "GET",
          url: `${API_baseURL}/submissions/${token}`,
          params: {
            base64_encoded: "false",
            fields: "*",
          },
          headers: {
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        };
        setTimeout(async () => {
            try{
                const response = await axios.request(options);
                setOutput(response.data);
                setLoading(false);
            }catch(error){
                alert(error);
            }
        }, 4500);
      } catch (error) {
        console.log(error)
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`${
        theme === "light" ? "text-black" : "text-white"
      } mx-2 w-[80vw] md:w-[50vw] lg:w-[30vw] mt-2`}>
      <h2 className="font-semibold">Output</h2>
      <button
        className="border border-green-500 rounded-lg px-3 my-2 hover:bg-green-500"
        onClick={compileCode}
      >
        Run
      </button>
      <div className={`${
        theme === "light" ? "border-black/80" : "border-white"
      } p-2 border-2  rounded-md h-[85vh]`}>
        {output ? (
          <p>{output.stdout}</p>
        ) : loading ? (
          <Loading message="compiling" />
        ) : (
          <p className="text-sm text-slate-500">Press run to see the output</p>
        )}
      </div>
    </div>
  );
};

export default Output;
