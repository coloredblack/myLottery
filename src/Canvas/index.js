import React from 'react';
import { Stage, Sprite } from '@inlet/react-pixi';
import bookmarkImg from './assets/bookmark-16.png';

class Canvas extends React.Component {
  render() {
    return (
      <Stage width={800} height={600} options={{backgroundColor: 0x00FFbb}}>
        <Sprite image={ bookmarkImg } x={100} y={100}></Sprite>
      </Stage>
    )
  }
}

export default Canvas;