import React, { useState } from "react";
import axios from "axios";
import AceEditor from "react-ace";

function App() {
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [language, setLanguage] = useState("cpp");

    const myStyle = {
        color: "white",
        backgroundColor: "#181D31",
        // padding: "10px",
        fontFamily: "Cursive",
        borderRadius: '20px'
        // display: "flex",
    };

    const myStyle1 = {
        color: "#181D31",
        backgroundColor: "#A8E6CF",
        padding: "10px",
        fontFamily: "San-sarif",
        margin: "auto"
    };
    const myStyle2 = {
        borderRadius: '20px',
        color: "white",
        backgroundColor: "#181D31",
        fontSize: "1.5rem",
        padding: "20px",
        fontFamily: "San-sarif",
        marginLeft: "100px",
        margin: "auto",
        border: "solid",
        height: "70vh",
        width: "40%"
    };
    const dflex = {
        display: "flex",
    }
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
        <div className="" style={myStyle1} >
            <h1 style={{ marginLeft: "30%" }}>ONLINE CODE COMPILER</h1>
            <div style={dflex}>
                <div >
                    <div >
                        <select
                        style={myStyle}
                            // style={{  }}
                            value={language}
                            onChange={(e) => {
                                setLanguage(e.target.value);
                            }}
                        >
                            <label >Language : </label>
                            <option value="c">C</option>
                            <option value="cpp">C++</option>
                            <option value="py">Python</option>
                            <option value="js">Javascript</option>
                        </select>
                        <br />
                        <br />
                    </div>

                    {/* <br /> */}

                    <AceEditor

                        mode="javascript"
                        theme="google"
                        value={code}
                        height='75vh'
                        width='650px'
                        // wrapEnabled="true"
                        style={myStyle}
                        onChange={(e) => {
                            setCode(e);
                        }}

                        fontSize={20}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: true,
                            tabSize: 100,
                        }}
                    />

                    <br />
                    <button onClick={handleSubmit} style={myStyle}>Submit</button>
                </div>
                <div style={myStyle2}>{output}</div>
            </div>
        </div>
    );
}

export default App;
