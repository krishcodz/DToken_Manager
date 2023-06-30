import React, { useState } from "react";
import { token } from "../../../declarations/token";
import { Principal } from "@dfinity/principal";
function Transfer() {
  
  const [buttonText, setbuttonText] = useState("Transfer");
  const [isDisabled, setDisabled] = useState(false);
  const [receiptentId, setreceiptentId] = useState("");
  const [amount, setamount] = useState("");
  async function handleClick() {
    setDisabled(true);
    let receiptent = Principal.fromText(receiptentId);
    let transferamount = Number(amount);
    setbuttonText(await token.transfer(receiptent, transferamount));
    setamount("");
    setreceiptentId("");
    setbuttonText("Transfer");
    setDisabled(false);    
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={receiptentId}
                onChange={(e)=>{setreceiptentId(e.target.value)}}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e)=>{setamount(e.target.value)}}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled}>
            {buttonText}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Transfer;
