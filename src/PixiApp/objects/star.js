import * as PIXI from 'pixi.js';
//import app from '../index';
import starImg from '../assets/star.png';

class Star {
  texture = new PIXI.Texture.from(starImg);
  x = 0;
  y = 0;
  z = 0;
  r = 1000;
  dx = 0;
  dy = 0;
  dz = 0;
  baseSize = 0.05;
  stretch = 5;
  constructor(cameraZ) {
    this.sprite = new PIXI.Sprite(this.texture);
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.7;
    this.randomize(cameraZ, true);
  }
  randomize(cameraZ, initial) {
    this.z = initial ? Math.random() * 2000 : cameraZ - Math.random() * 1500 + 2000;
    const deg = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 1;
    this.x = Math.cos(deg) * distance;
    this.y = Math.sin(deg) * distance;
  }
  center(delta, cameraZ) {
    const zdif = this.z - ( cameraZ + 1000 );
    const r = Math.sqrt(this.x * this.x + this.y * this.y + zdif * zdif);
    this.r = r;
    if (r > 15) {
      const k = 1000;
      this.dx = this.dx - this.x * k / (r * r * r) * delta;
      this.dy = this.dy - this.y * k / (r * r * r) * delta;
      this.dz = this.dz - zdif * k / (r * r * r) * delta;
      this.x = this.x + this.dx * delta;
      this.y = this.y + this.dy * delta;
      this.z = this.z + this.dz * delta;
    }//当前这个凑出来的效果似乎还行，暂时就别改了
  }
  proj(cameraZ, width, height, fov, speed) {
    //console.log(cameraZ, width, height, fov, speed);
    if (this.z < cameraZ || this.z > cameraZ+3000) this.randomize(cameraZ);
    const z = this.z - cameraZ;
    this.sprite.x = this.x * (fov / z) * width + width / 2;
    this.sprite.y = this.y * (fov / z) * height + height / 2;
    const dxCenter = this.sprite.x - width / 2;
    const dyCenter = this.sprite.y - height / 2;
    const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
    const distanceScale = Math.max(0, (2000 - z) / 2000);
    this.sprite.scale.x = distanceScale * this.baseSize;
    this.sprite.scale.y = distanceScale * this.baseSize + distanceScale * speed * this.stretch * distanceCenter / width;
    this.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
  }
}

export default Star;