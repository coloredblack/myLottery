import * as PIXI from 'pixi.js';
import Star from './objects/star';

class PIXIApp {
    app = new PIXI.Application({
        width: 800,
        height: 600,
        view: document.getElementById("my-canvas"),
        backgroundColor: 0x000000,
    });
    starAmount = 1000;
    cameraZ = 0;
    fov = 20;
    baseSpeed = 0.025;
    speed = 0;
    warpSpeed = 0;
    starStretch = 5;
    starBaseSize = 0.0;
    step = 0;
    stars = [];
    constructor() {
        this.app.stop();
        this.initStars();
        this.app.loader.add('spritesheet', './assets/mc.json');
    }
    initStars() {
        //console.log("is initalizing stars");
        for (let i = 0; i < this.starAmount; i++) {
            const star = new Star(this.cameraZ);  
            //console.log(this.cameraZ);
            this.app.stage.addChild(star.sprite);
            this.stars.push(star);
        }
    }

    Explosion = () => {
        const explosionTextures = [];
        let i;
        for (i = 0; i < 26; i++) {
            const texture = PIXI.Texture.from(`Explosion_Sequence_A ${i + 1}.png`);
            explosionTextures.push(texture);
        }
        for (i = 0; i < 10; i++){
            const explosion = new PIXI.AnimatedSprite(explosionTextures);
            explosion.x = this.app.renderer.width/2 + Math.random()*100 - 50;
            explosion.y = this.app.renderer.height/2 + Math.random()*100 - 50;
            explosion.anchor.set(0.5);
            explosion.rotation = Math.random()*2*Math.PI;
            explosion.gotoAndPlay(Math.random()*26);
            this.app.stage.addChild(explosion);
        }
    }
    changeStage(step) {
        //console.log(step);
        switch (step) {
            case 1: this.stageA(); break;
            case 2: this.stageB(); break;
            case 5: this.stageC(); break;
            //case 5: this.stageD(); break;
            case 6: this.showStage(); break;
            case 7: this.reset(); break;
            case 8: this.finish(); break;
            default: break;
        }
    }
    stageA() {
        this.app.ticker.add(this.AHandler, this.app);
        this.app.ticker.start();
        //console.log(this.explosion);
    }
    stageB() {
        this.app.ticker.stop();
        this.app.ticker.remove(this.AHandler, this.app);
        this.app.ticker.add(this.BHandler, this.app);
        this.app.start();
    }
    stageC() {
        this.app.ticker.stop();
        this.app.ticker.remove(this.BHandler, this.app);
        this.app.ticker.add(this.CHandler, this.app);
        this.app.start();
        setInterval(() => {
            this.stageD();
        }, 1000);
    }
    stageD() {
        this.app.loader.load(this.Explosion);
        setInterval(() => {
            this.showStage();
        }, 1500)
    }
    reset() {
        this.app.stop();
        this.app = new PIXI.Application({
            width: 800,
            height: 600,
            view: document.getElementById("my-canvas"),
            backgroundColor: 0x000000,
        });
        this.app.stop();
    }
    finish() {
        this.app.stop();
        this.app.stage.removeAllListeners();
        this.app.stage.removeChildren();
        this.app.ticker.destroy();
        this.app.renderer.clear();
    }
    showStage() {
        this.app.ticker.remove(this.CHandler, this.app);

        //console.log("Time to SHow");
        this.app.stage.removeChildren();
        
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
            lineJoin: 'round',
        });

        const richText = new PIXI.Text('抽奖已经结束，点击下方按钮查看获奖名单', style);
        richText.x = 50;
        richText.y = 220;

        this.app.stage.addChild(richText);
    }
    AHandler = (delta) => {
        this.warpSpeed = 0;
        this.speed += (this.warpSpeed - this.speed) / 20;
        //console.log("A doing");
        this.cameraZ += delta * 10 * (this.speed + this.baseSpeed);
        this.calcStars();   
    };
    BHandler = (delta) => {
        this.speed += (this.warpSpeed - this.speed) / 20;
        this.cameraZ -= delta * 10 * (this.speed + this.baseSpeed);
        //console.log("B doing");
        this.calcStars();
    }
    CHandler = (delta) => {
        //console.log("C is doing");
        this.speed = 0;
        this.centerCalcStars(delta)
    }

    centerCalcStars(delta) {
        for (let i = 0; i < this.starAmount; i++) {
            const star = this.stars[i];
            star.center(delta, this.cameraZ);
            star.proj(this.cameraZ, this.app.renderer.screen.width, this.app.renderer.screen.height, this.fov, this.speed);
        }
    }
    calcStars() {
        for (let i = 0; i < this.starAmount; i++) {
            const star = this.stars[i];
            star.proj(this.cameraZ, this.app.renderer.screen.width, this.app.renderer.screen.height, this.fov, this.speed);
        }
    }
}

const pixiApp = new PIXIApp();
//pixiApp.app.ticker.stop();

export default pixiApp;
