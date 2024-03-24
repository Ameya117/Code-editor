import React, { useState } from "react";
import { languages } from "@/languages";
import Loading from "./Loading";
const axios = require("axios");

const Output = (props) => {
  const { code, language } = props;
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
      const response = await axios.request(options);
      const token = response.data.token;
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
          const response = await axios.request(options);
          //   console.log(response.data);
          setOutput(response.data);
          setLoading(false);
        }, 5000);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-2 w-[30vw] mt-2">
      <h2>Output</h2>
      <button
        className="border border-green-500 rounded-lg px-3 my-2 hover:bg-green-500"
        onClick={compileCode}
      >
        Run
      </button>
      <div className="p-2 border rounded-md h-[85vh] ">
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
