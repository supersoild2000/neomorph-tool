import React, { useEffect, useRef, useState } from "react";

function App() {
  const [width, setWidth] = useState(0);
  const widthInputRef = useRef<HTMLInputElement>(null);
  const previewElemStyle = {
    width: width,
  };
  useEffect(() => {
    if (widthInputRef.current !== null) {
      setWidth(+widthInputRef.current.value);
    }
  }, []);
  return (
    <>
      <header>
        <h1>neomorph-tool</h1>
      </header>
      <main>
        <div className="preview-container">
          <div className="preview-elem" style={previewElemStyle}>
            <p>Sample text</p>
          </div>
        </div>
        <div className="control-container">
          <div>
            <label htmlFor="width">Enter width:</label>
            <input
              type="range"
              name="width"
              id="width"
              min="100"
              max="500"
              ref={widthInputRef}
              onChange={(e) => {
                setWidth(+e.target.value);
              }}
            />
            <span>{width}</span>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
