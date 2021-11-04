import React, { useState } from "react";
import axios from "axios";
import AceEditor from "react-ace";

function App() {
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [language, setLanguage] = useState("cpp");

    const handleSubmit = async () => {
        console.log(code);

        const payload = {
            language: language,
            code,
        };

        try {
            const { data } = await axios.post(
                "http://localhost:5000/run",
                payload
            );
            setOutput(data.output);
        } catch ({ response }) {
            if (response) {
                const errMsg = response.data.err.stderr;
                setOutput(errMsg);
            } else {
                setOutput("Error connecting to server!");
            }
        }
    };

    return (
        <div className="" style={{ backgroundColor: "lightgray" }}>
            <h1>ONLINE CODE COMPILER</h1>
            <div>
                <select
                    value={language}
                    onChange={(e) => {
                        setLanguage(e.target.value);
                    }}
                >
                    <label>Language : </label>
                    <option value="c">C</option>
                    <option value="cpp">C++</option>
                    <option value="py">Python</option>
                    <option value="js">Javascript</option>
                </select>
                <br />
                <br />
            </div>
            <br />

            <AceEditor
                mode="javascript"
                theme="github"
                value={code}
                onChange={(e) => {
                    setCode(e);
                }}
                fontSize={16}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 4,
                }}
            />

            <br />
            <button onClick={handleSubmit}>Submit</button>
            <p>{output}</p>
        </div>
    );
}

export default App;
