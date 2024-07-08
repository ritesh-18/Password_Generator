// import { useState } from 'react'
import { useState, useCallback, useEffect ,useRef} from "react";
import "./App.css";

//Creating  a Password Generator
function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharallowed] = useState(false);
  const [password, setPassword] = useState("");


  //useRef hook
  const inputRef = useRef(null);


  const pswdGenerator = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*(){}[]~`";
    for (let i = 1; i <= length; i++) {
      password += str.charAt(Math.floor(Math.random() * str.length + 1)); // it is used to get one charcter for our password and then it concatenate with previous one
    }

    setPassword(password);
  }, [length, numberAllowed, charAllowed, setPassword]);
  
const copypswdToClipboard=useCallback(()=>{
 inputRef.current?.select();
 window.navigator.clipboard.writeText(password)
} , [password])





useEffect(()=>{ pswdGenerator()} , [charAllowed , length , numberAllowed , setPassword])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500  bg-gray-800 ">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Password"
            className="outline-none w-full py-1 px-3"
            ref={inputRef}
          />
          <button
            className="outline-none bg-blue-700 
             text-white px-3 py-0.5 shrink-0 hover:bg-red-700"
             onClick={copypswdToClipboard}
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer"
            />
            <label>length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharallowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
