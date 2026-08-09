export type Viseme = "A" | "I" | "U" | "E" | "O" | "rest";
export interface VisemeKeyframe {
  time: number; // seconds since utterance start
  viseme: Viseme;
}
