/**
 * App
 * @description: The APP Components is the highest components of the application, which defines the stage of the application process
 */

 import React, { useEffect, useState } from 'react';
 //import Canvas from './Canvas';
 import Step from '../scripts/steps';

 const App = () => {
   const mystep = new Step();
 
   return (
     <div className="app">
       Hello
     </div>
   )
 }
 
 export default App;