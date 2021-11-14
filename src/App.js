import React, { useState } from "react";
import axios from "axios";
import AceEditor from "react-ace";
import { jsPDF } from "jspdf";
import copy from "./copy.png";
import pdf from "./pdf.png";

function App() {
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [language, setLanguage] = useState("cpp");
    const [name, setName] = useState("default-code");

    // const myStyle = {
    //     color: "white",
    //     backgroundColor: "#181D31",
    //     // padding: "10px",
    //     fontFamily: "Cursive",
    //     borderRadius: '20px'
    //     // display: "flex",
    // };

    // const myStyle1 = {
    //     color: "#181D31",
    //     backgroundColor: "#A8E6CF",
    //     padding: "10px",
    //     fontFamily: "San-sarif",
    //     margin: "auto"
    // };
    // const myStyle2 = {
    //     borderRadius: '20px',
    //     color: "white",
    //     backgroundColor: "#181D31",
    //     fontSize: "1.5rem",
    //     padding: "20px",
    //     fontFamily: "San-sarif",
    //     marginLeft: "100px",
    //     margin: "auto",
    //     border: "solid",
    //     height: "70vh",
    //     width: "40%"
    // };
    // const dflex = {
    //     display: "flex",
    // }

    var doc = new jsPDF();
    doc.text(code, 15, 15);

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
        <div className="mx-8">
            <h1 className="flex justify-center ubuntu text-3xl p-4 text-gray-800 border-black border-b-2">
                ONLINE CODE COMPILER
            </h1>
            <div className="">
                <div>
                    <div className="flex p-4">
                        <label>Language &nbsp;</label>
                        <select
                            className="ubuntu"
                            value={language}
                            onChange={(e) => {
                                setLanguage(e.target.value);
                            }}
                        >
                            <option value="c">C</option>
                            <option value="cpp">C++</option>
                            <option value="py">Python</option>
                            <option value="js">Javascript</option>
                        </select>
                        <br />
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <button
                            onClick={handleSubmit}
                            className="bg-gray-300 px-2 ubuntu"
                        >
                            <div className="flex">
                                SUBMIT&nbsp;
                                <img
                                    alt="PLAY"
                                    src="https://img.icons8.com/ios-glyphs/30/000000/play--v1.png"
                                    style={{
                                        height: "15px",
                                        width: "15px",
                                        marginTop: "5px",
                                    }}
                                />
                            </div>
                        </button>
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        <button
                            className="bg-gray-300 px-2 ubuntu"
                            onClick={() => navigator.clipboard.writeText(code)}
                        >
                            <div className="flex">
                                Copy Code&nbsp;
                                <img
                                    style={{
                                        height: "15px",
                                        width: "15px",
                                        marginTop: "5px",
                                    }}
                                    src={copy}
                                    alt="CP"
                                />
                            </div>
                        </button>
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        <input
                            type="text"
                            id="fname"
                            name=""
                            placeholder=" Enter name"
                            className="border-2 border-black border-r-0"
                            onChange={(e) => {
                                setName(e.target.value);
                                console.log(name);
                            }}
                        />
                        <button
                            className="bg-gray-300 px-4 ubuntu border-black border-2 border-l-0"
                            onClick={() => {
                                doc.save(`${name}.pdf`);
                            }}
                        >
                            <div className="flex">
                                Save PDF&nbsp;
                                <img
                                    style={{
                                        height: "15px",
                                        width: "15px",
                                        marginTop: "5px",
                                    }}
                                    alt="PDF"
                                    src={pdf}
                                />
                            </div>
                        </button>
                    </div>

                    {/* <br /> */}

                    <div className="flex terminal justify-center terminal">
                        <AceEditor
                            className="border-2 border-gray-700 mx-8"
                            mode="javascript"
                            theme=""
                            value={code}
                            height="75vh"
                            placeholder="// Write your code here."
                            width="60%"
                            wrapEnabled="true"
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
                        <div className="grid grid-cols-1 justify-center">
                            <div className="grid grid-cols-1">
                                <div className="flex justify-end pr-2 bg-gray-100 border-t-2 border-l-2 border-r-2 border-black">
                                    Notes
                                </div>
                                <textarea
                                    className="h-full w-full border-2 border-black p-2 border-t-0"
                                    placeholder="// Write your plan here."
                                    style={{ height: "210px", width: "500px" }}
                                ></textarea>
                            </div>
                            <div className="grid grid-cols-1 mt-4">
                                <div className="flex justify-end bg-gray-100 pr-2">
                                    Output Screen
                                </div>
                                <div
                                    className="h-full w-full bg-black text-white p-4"
                                    style={{ height: "250px", width: "500px" }}
                                >
                                    {output}
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        </div>
    );
}

export default App;
