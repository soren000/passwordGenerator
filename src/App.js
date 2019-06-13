import React, { useState } from 'react';
import './styles/main.scss';
import { FaCheck, FaTimes } from 'react-icons/fa';

const App = () => {
  const [result, setResult] = useState('');
  const [passwordLength, setPasswordLength] = useState(8);
  const [customCharacters, setCustomCharacters] = useState('');
  const [capitalLetters, setCapitalLetters] = useState(true);
  const [lowerLetters, setLowerLetters] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [error, setError] = useState('');


  const randomGen = () => {
    const possibleCaps = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
    const possibleLowerCase = possibleCaps.toLowerCase();
    const possibleNumbers = `1234567890`;
    const possibleSymbols = ` !"#%^&'()*+,-/;<=>?@[]\\_\`{}|~`;
    let finalPossible = '';
    if (capitalLetters) {
      finalPossible += possibleCaps;
    }
    if (lowerLetters) {
      finalPossible += possibleLowerCase;
    }
    if (numbers) {
      finalPossible += possibleNumbers;
    }
    if (symbols) {
      finalPossible += possibleSymbols;
    }
    if (customCharacters.length > 0) {
      finalPossible += customCharacters;
    }
    if (finalPossible.length === 0) {
      setError('There were no possible characters to choose from.')
    } else {
      setError('')
    }

    let password = '';
    for (let i = 0; i <= passwordLength - 1; i++) {
      password += finalPossible.charAt(Math.floor(Math.random() * Math.floor(finalPossible.length)));
    }

    setResult(password);
  }

  const copyPassword = async () => {
    try {
      const permissions = await navigator.permissions.query({ name: "clipboard-write" });
      if (permissions.state === "granted" || permissions.state === "prompt") {
        navigator.clipboard.writeText(result);
      }
      else {
        new Error('Permission to copy to the clipboard denied. Check browser settings.');
      }

    } catch (e) {
      console.log(e);
    }
  }


  // const isOverFlowing = (id) => {
  //   const element = document.getElementById(id);
  //   console.log(element);
  //   // const test = element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  //   // console.log(test);
  //   // return test; 
  // }
  return (
    <div className="App">
      <h1>Random Password Generator</h1>
      <div className="passwordResultContainer">
        <p className="passwordResult" id="passwordResult">{result}</p>
        <button onClick={copyPassword} className="copyButton">Copy</button>
      </div>
      {error && <p id="errorMessage">There were no possible characters to choose from.</p>}
      <div className="optionsSection">
        <button onClick={randomGen} className="randomButton">Randomize</button>
        <div className="optionContainer">
          <p>Password Length</p>
          <input type="number" onChange={e => setPasswordLength(e.target.value)} value={passwordLength}></input>
        </div>
        <div className="optionSelectionContainer">
          <div className="optionSelection">
            <p>Capital Letters</p>
            <div
              className={capitalLetters ? "optionCheckbox optionCheckbox-isSelected" : "optionCheckbox"}
              onClick={() => setCapitalLetters(!capitalLetters)}
            >
              {capitalLetters ? <FaCheck /> : <FaTimes />}
            </div>
          </div>
          <div className="optionSelection">
            <p>Lower Letters</p>
            <div
              className={lowerLetters ? "optionCheckbox optionCheckbox-isSelected" : "optionCheckbox"}
              onClick={() => setLowerLetters(!lowerLetters)}
            >
              {lowerLetters ? <FaCheck /> : <FaTimes />}
            </div>
          </div>
          <div className="optionSelection">
            <p>Numbers</p>
            <div
              className={numbers ? "optionCheckbox optionCheckbox-isSelected" : "optionCheckbox"}
              onClick={() => setNumbers(!numbers)}
            >
              {numbers ? <FaCheck /> : <FaTimes />}
            </div>
          </div>
          <div className="optionSelection">
            <p>Symbols</p>
            <div
              className={symbols ? "optionCheckbox optionCheckbox-isSelected" : "optionCheckbox"}
              onClick={() => setSymbols(!symbols)}
            >
              {symbols ? <FaCheck /> : <FaTimes />}
            </div>
          </div>
        </div>
        <div className="optionContainer optionContainer-custom">
          <p>Custom</p>
          <textarea type="text" onChange={e => setCustomCharacters(e.target.value)} value={customCharacters}></textarea>
        </div>
      </div>
      <footer>
        <a href="https://github.com/soren000/passwordGenerator">This project was made by Soren. It is completely open source. Check out the GitHub.</a>
      </footer>
    </div>
  );
}

export default App;
