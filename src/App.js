import React, { useState } from "react";
import axios from "axios";

function App() {
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");

    const handleSubmit = async () => {
        console.log(code);

        const payload = {
            language: "cpp",
            code,
        };

        try {
            const { data } = await axios.post(
                "http://localhost:5000/run",
                payload
            );
            setOutput(data.output);
        } catch (err) {
            console.log(err.response);
        }
    };

    return (
        <div className="">
            <h1>ONLINE CODE COMPILER</h1>
            <textarea
                rows="20"
                cols="75"
                value={code}
                onChange={(e) => {
                    setCode(e.target.value);
                }}
            ></textarea>
            <br />
            <button onClick={handleSubmit}>Submit</button>
            <p>{output}</p>
        </div>
    );
}

export default App;