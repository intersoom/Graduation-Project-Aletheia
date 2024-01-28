import { atom } from "recoil";

export const currentSceneIndexAtom = atom({
  key: "currentSceneIndex",
  default: 0, // start with the first scene
});

export const currentRef = atom({
  key: "currentRef",
  default: null,
});
