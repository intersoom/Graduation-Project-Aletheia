import { Player } from "../class/Player";

export class KeyController {
  constructor() {
    // 생성자
    this.keys = [];

    window.addEventListener(
      "keydown",
      (e) => {
        console.log(e.code + " 누름");
        this.keys[e.code] = true;
      },
      false
    );

    window.addEventListener(
      "keyup",
      (e) => {
        console.log(e.code + " 뗌");
        // setTimeout(() => {
        delete this.keys[e.code];
        // }, 1000);
      },
      false
    );
  }
}
