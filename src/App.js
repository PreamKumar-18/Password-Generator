import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import { FaClipboard } from "react-icons/fa"
import { number, upperCaseLetters, lowerCaseLetters, specialCharacters } from "./Chracters"
import { COPY_SUCCESS, ALERT } from "./Message"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
toast.configure();
function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(20);
  const [uppercase, setUpperCase] = useState(true);
  const [lowercase, setLowerCase] = useState(true);;
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);

  const copyBtn = useRef();
  const handleGeneratorPassword = () => {
    if (!uppercase && !lowercase && !numbers && !symbols) {
      notifs({ ALERT }, true);
    }
    let characterList = "";
    if (uppercase) {
      characterList += upperCaseLetters;
    }
    if (lowercase) {
      characterList += lowerCaseLetters;
    }
    if (numbers) {
      characterList += number;
    }
    if (symbols) {
      characterList += specialCharacters;
    }
    setPassword(passwordCreator(characterList));
  };

  useEffect(() => {
    handleGeneratorPassword();
  }, []);
  const passwordCreator = (characterList) => {
    let password = "";
    const characterListLength = characterList.length;
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = getRandomIndex(characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password;
  };
  const getRandomIndex = (limit) => {
    return Math.round(Math.random() * limit);
  }
  const copyFromClipboard = () => {
    const newTextArea = document.createElement("textarea");
    newTextArea.innerText = password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand("copy");
    newTextArea.remove();

    copyBtn.current.disabled = true;
    setTimeout(() => {
      copyBtn.current.disabled = false;
    }, 3000);
  };
  const notifs = (message, Error = false) => {
    if (Error) {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideprogressBar: false,
        clseOnClick: true,
        pauseOnHour: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideprogressBar: false,
        clseOnClick: true,
        pauseOnHour: true,
        draggable: true,
        progress: undefined,
      })
    }
  }
  const handleCopy = () => {
    copyFromClipboard();
    notifs({ COPY_SUCCESS })
  }
  return (
    <div className="container">
      <div className="generator">
        <h2 className="generator-header">Password Generator</h2>
        <div className="generator-password">
          {password}
          <button className="generator-button" ref={copyBtn} onClick={handleCopy} ><FaClipboard /></button>
        </div>
        <div className="form-group">
          <label htmlFor="password-length">Password Length</label>
          <input name="password-length" id="password-length" type="number"
            max="20" min="7"
            defaultValue={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="uppercase-letters">Include Uppercase Letters</label>
          <input name="uppercase-letters" type="checkbox" id="uppercase-letters"
            checked={uppercase}
            onChange={(e) => setUpperCase(e.target.checked)} />
        </div>
        <div className="form-group">
          <label htmlFor="lowercase-letters">Include Lowercase letters</label>
          <input className="lowercase-letters" id="lowercase-letters" type="checkbox"
            checked={lowercase}
            onChange={(e) => setLowerCase(e.target.checked)} />
        </div>
        <div className="form-group">
          <label htmlFor="include-numbers">Include Numbers</label>
          <input className="include-numbers" id="include-numbers" type="checkbox"
            checked={numbers}
            onChange={(e) => setNumbers(e.target.checked)} />
        </div>
        <div className="form-group">
          <label htmlFor="include-symbols">Include Symbols</label>
          <input className="include-symbols" id="include-symbols" type="checkbox"
            checked={symbols}
            onChange={(e) => setSymbols(e.target.checked)} />
        </div>
        <button className="generator-btn"
          onClick={handleGeneratorPassword} >
          Generate New Password
        </button>
      </div>
    </div>
  );
}

export default App;
