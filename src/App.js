/**
 * App
 * @description: The APP Components is the highest components of the application, which defines the stage of the application process
 */

import React, { useEffect, useState } from 'react';
//import Canvas from './Canvas';
import Step from './scripts/steps';
import UI from './components/UI';
import Canvas from './components/Canvas';

const App = () => {
  const mystep = new Step();

  return (
    <div className="app">
      <UI step={mystep}/>
      <Canvas step={mystep}/>
    </div>
  )
}

export default App;