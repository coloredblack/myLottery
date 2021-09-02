/**
 * UI Component
 * @description: UI aims to provide the user interface, including:
 *  - add candidates BUTTON
 *  - set prizeNumber INPUT
 *  - start BUTTON
 */

import React, { useState } from "react"

const UI = observer((props) => {
  const [step] = useState(() => props.step);

  return (
    <div className="UI">User Interface</div>
  )
})

export default UI;