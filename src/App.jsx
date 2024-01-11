import { useRef } from "react";
import { useEffect } from "react";
import { useState, useCallback } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, setnumber] = useState(false);
  const [specialChar, setspecialChar] = useState(false);
  const [password, setpassword] = useState("");

  //useref hook

  const passRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";
    if (specialChar) str += "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, number, specialChar, setpassword]);
  const copyPassToClipboard = useCallback(() => {
    passRef.current?.select();
    passRef.current?.setSelectionRange(0, 25);
    window.navigator.clipboard.writeText(password);
  });
  useEffect(() => {
    passwordGenerator();
  }, [length, number, specialChar, passwordGenerator]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center">
          Your personal passwqord generator
        </h1>
        <div className="flex shadow rounded-lg mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 mx-1 rounded-md"
            placeholder="Your password"
            readOnly
            ref={passRef}
          />
          <button
            className="bg-blue-400 text-white"
            onClick={copyPassToClipboard}
          >
            Copy
          </button>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
        </div>
        <div>
          <input
            type="checkbox"
            defaultChecked={number}
            id="inputNumber"
            onChange={() => {
              setnumber((prev) => !prev);
            }}
          />
          <label htmlFor="numInput">Numbers</label>
          <input
            type="checkbox"
            defaultChecked={specialChar}
            id="inputchar"
            onChange={() => {
              setspecialChar((prev) => !prev);
            }}
          />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </>
  );
}

export default App;
