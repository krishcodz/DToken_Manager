import React, { useState } from "react";
import { token } from "../../../declarations/token";

function Faucet() {

  const [isDisabled, setDisabled] = useState(false);
  const [buttontext, setbuttontext] = useState("Gimme gimme");
  async function handleClick(event) {
    setDisabled(true);
    setbuttontext(await token.payOut());
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free Driz tokens here! Claim 1,000 Driz tokens to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {buttontext}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
