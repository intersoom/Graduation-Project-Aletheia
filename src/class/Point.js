export class Point {
  constructor(index, x, y, max, speed) {
    this.x = x;
    this.y = y;
    this.fixedY = y;
    this.speed = 0.07;
    this.cur = index + 1;
    this.max = max;
  }

  update(max_, speed_, shut, open) {
    this.cur += speed_;

    if (shut < 0) {
      this.y = this.fixedY + open;
    } else {
      console.log(shut);
      this.y = this.fixedY + Math.sin(this.cur) * this.max * shut;
    }
  }
}
