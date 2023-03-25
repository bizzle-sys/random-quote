import "./App.css";
import { useState, useEffect, useRef } from "react";

function App() {
  // declaring variables and state variable
  const [quotes, setQuotes] = useState("");
  const texRef = useRef();
  const [colors, setColors] = useState("#ffffff");
  const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    quotes.text + " - " + quotes.author
  )}`;
  // functions
  const getQuote = () => {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        let randomNums = Math.floor(Math.random() * data.length);
        setQuotes(data[randomNums]);
      });
  };
  const randomColor = () => {
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    setColors(color);
    console.log("color:", color);
    console.log("colors:", colors);
  };
  useEffect(() => {
    console.log(colors);
  }, [colors]);
  const handleOnClick = () => {
    getQuote();
    randomColor();
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div className="App" style={{ colors }}>
      <div className="quote">
        <p ref={texRef}>{quotes.text}</p>
        <p>Author: {quotes.author}</p>
        <div className="btnContainer">
          <button onClick={handleOnClick} className="btn">
            Get Quote
          </button>

          <a
            href={twitterURL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn">
            Tweet
          </a>
        </div>
      </div>
    </div>
    //  href={`https://twitter.com/intent/tweet?text=${quotes.text}`}
    //  target="_blank"
    //  rel="nooper noreferrer"
    //  className="btn"
  );
}

export default App;
