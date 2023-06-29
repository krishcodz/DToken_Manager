import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token } from "../../../declarations/token";
function Balance() {
  
  const [inputvalue, setinputvalue] = useState("");
  const [bal, setbal] = useState("");
  const [symbol, setsymbol] = useState("");
  const [isHidden, setHidden] = useState(true);
  async function handleClick() {
    const principal = Principal.fromText(inputvalue); 
    const balance = await token.balanceOf(principal);
    setbal(balance.toLocaleString());
    setsymbol(await token.getSymbol());
    setHidden(false);
  
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputvalue}
          onChange={(e)=> setinputvalue(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {bal} {symbol} Tokens</p>
    </div>
  );
}

export default Balance;
