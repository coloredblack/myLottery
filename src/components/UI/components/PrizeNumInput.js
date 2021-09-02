import React, { useState } from 'react';

const PrizeNumInput = (props) => {
  const [prizeNumber, setPrizeNumber] = useState(1);

  const handlePrizeNumberUpdate = (e) => {
    setPrizeNumber(e);
  }

  const handleSubMit = (e) => {
    props.setPrizeNumber(prizeNumber);
  }
  return (
    <form>
      <input onKeyUp={ handlePrizeNumberUpdate}></input>
      <button onClick={handleSubMit}>SubMit</button>
    </form>
  )
}