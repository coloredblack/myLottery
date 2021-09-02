import React, {useState, useEffect} from 'react';
import { Stage, Sprite } from '@inlet/react-pixi';
import bookmarkImg from './assets/bookmark-16.png';
import { useState } from 'react';
import { observer } from 'mobx-react';

const Canvas = observer((props) => {
  const [step, setStep] = useState(props.step);
  //update the step
  useEffect(() => {
    setStep(props.step);
  }, [props])
  
  return (
    <Stage width={800} height={600} options={{backgroundColor: 0x00FFbb}}>
      <Sprite image={ bookmarkImg } x={100} y={100}></Sprite>
    </Stage>
  )
})

export default Canvas;