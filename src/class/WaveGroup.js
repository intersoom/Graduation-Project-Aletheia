import { Wave } from "./Wave";

export class WaveGroup {
  constructor(info) {
    this.totalWaves = 2;
    this.totalPoints = 12;
    this.stageHeight = info.stageHeight;

    this.color = [
      "rgba(28, 28, 28, 1)",
      "rgba(84, 84, 84, 1)",
      "rgba(0, 87, 158, 1)",
    ];

    this.waves = [];

    for (let i = 0; i < this.totalWaves; i++) {
      const wave = new Wave(i, this.totalPoints, this.color[i], 150);
      this.waves[i] = wave;
    }
  }

  resize(stageWidth, stageHeight) {
    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i];
      wave.resize(stageWidth, stageHeight);
    }
  }

  draw(ctx, skyUpMax, terraUpMax, shut, open) {
    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i];
      if (i % 2 === 0) {
        wave.draw(ctx, 1, skyUpMax, shut, open);
      } else {
        wave.draw(ctx, -1, terraUpMax, shut, -1 * open);
      }
    }
  }
}
