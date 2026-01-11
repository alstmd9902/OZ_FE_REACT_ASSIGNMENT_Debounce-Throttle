import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");

  // const [searchString, setSearchString] = useState("");
  const [throttleQuery, setThrottleQuery] = useState("");

  //debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceQuery(query);
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  //throttle
  const lastTimeRef = useRef(0);
  const handleThrottleChange = (e) => {
    const now = Date.now();

    if (now - lastTimeRef.current >= 100) {
      lastTimeRef.current = now;
      setThrottleQuery(e.target.value);
      console.log("throttle:", e.target.value);
    }
  };

  return (
    <div className="container">
      <h1>
        debounce와 throttle을
        <br />
        이용한 검색
      </h1>
      <div>
        <h2>Debounce</h2>
        <input
          type="text"
          placeholder="Debounce를 이용한 검색..."
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <p>{debounceQuery}</p>
      </div>
      <div>
        <h2>Throttle</h2>
        <input
          type="text"
          placeholder="Throttle을 이용한 검색..."
          onChange={handleThrottleChange}
        />
      </div>
      <p>{throttleQuery}</p>
    </div>
  );
}

export default App;
