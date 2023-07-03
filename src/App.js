import "./styles.css";
import { useState } from "react";
import usePasswordGenerator from "./hooks/use-password-generator";
import PasswordStrengthIndicator from "./components/strengthChecker";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";

export default function App() {
  const [length, setLength] = useState(4);
  const [copied, setCopied] = useState(false);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false }
  ]);

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  /** Writing Custom Hook to generate Passwords */
  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  return (
    <div className="container">
      {/* Password Display */}
      {password && (
        <div className="header">
          <div className="title">{password}</div>

          <Button
            text={copied ? "Copied" : "Copy"}
            customClass="copyBtn"
            onClick={handleCopy}
          />
        </div>
      )}
      {/* Password Length */}
      <div className="charlength">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => {
            setLength(e.target.value);
          }}
        />
      </div>

      {/* Options as Checkboxes */}
      <div className="checkboxes">
        {checkboxData.map((checkbox, i) => {
          return (
            <Checkbox
              key={i}
              title={checkbox.title}
              onChange={() => handleCheckboxChange(i)}
              state={checkbox.state}
            />
          );
        })}
      </div>

      {/* Strength */}
      <PasswordStrengthIndicator password={password} />

      {/* Error Handling */}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}

      {/* Generate Button */}
      <Button
        text="Generate Password"
        customClass="generateBtn"
        onClick={() => {
          generatePassword(checkboxData, length);
        }}
      />
    </div>
  );
}
