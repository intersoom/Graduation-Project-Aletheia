import { Point } from "./Point";

export class Wave {
  constructor(index, totalPoints, color, max) {
    this.index = index;
    this.totalPoints = totalPoints;
    this.color = color;
    this.points = [];
    this.max = max;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.centerX = stageWidth / 2;
    this.centerY = stageHeight / 2;

    this.pointGap = this.stageWidth / (this.totalPoints - 1);
    this.init();
  }

  init() {
    this.points = [];

    for (let i = 0; i < this.totalPoints; i++) {
      if (this.index === 0) {
        this.points[i] = new Point(
          this.index + i,
          this.pointGap * i,
          // this.centerY,
          // this.stageHeight - 300,
          this.stageHeight / 2 - 30,
          this.max,
          Math.random() * 0.001 * 50 + 0.01
          // Math.random() * 1000
        );
      } else {
        this.points[i] = new Point(
          this.index + i,
          this.pointGap * i,
          // this.centerY,
          // 300,
          this.stageHeight / 2 + 30,
          this.max,
          Math.random() * 0.001 * 50 + 0.01
          // Math.random() * 1000
        );
      }
    }
  }

  draw(ctx, i, upMax, shut, open) {
    ctx.beginPath();
    ctx.fillStyle = this.color;

    let prevX = this.points[0].x;
    let prevY = this.points[0].y;

    ctx.moveTo(prevX, prevY);

    for (let i = 1; i < this.totalPoints; i++) {
      if (i < this.totalPoints - 1) {
        this.points[i].update(
          Math.random() * 200,
          // 0 ~ 30 사이로!
          Math.random() * 0.0015 * upMax,
          shut,
          open
        );
      }

      const cx = (prevX + this.points[i].x) / 2;
      const cy = (prevY + this.points[i].y) / 2;

      ctx.quadraticCurveTo(prevX, prevY, cx, cy);

      prevX = this.points[i].x;
      prevY = this.points[i].y;
    }

    ctx.lineTo(prevX, prevY);
    ctx.lineTo(this.stageWidth, i * this.stageHeight);
    ctx.lineTo(this.points[0].x, i * this.stageHeight);
    ctx.fill();
    ctx.closePath();
  }
}
