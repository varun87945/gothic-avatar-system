/*
 * Gothic Avatar System
 * Copyright © 2026 Varun. All Rights Reserved.
 *
 * This source code is proprietary.
 * Unauthorized copying, modification, distribution,
 * publication, or reuse is prohibited.
 */
import { useState, FormEvent } from "react";
import { motion } from "framer-motion";

type Props = {
  onSpeak: (text: string) => void;
  onEmotion: (emotion: string) => void;
};

const emotions = [
  "happy",
  "sad",
  "angry",
  "shy",
  "sleepy",
  "confused",
  "surprised",
  "clapping",
  "goodbye",
  "jump",
  "lookAround",
  "neutral",
  "dancing",
  "greeting",
  "Pose",
  "showFullBody",
  "spin",
  "shoot",
  "peaceSign",
];

export const TalkBox = ({ onSpeak, onEmotion }: Props) => {
  const [text, setText] = useState("");
  const [emotion, setEmotion] = useState("neutral");

  const submit = (e: FormEvent) => {
    e.preventDefault();

    onEmotion(emotion);

    if (text.trim()) {
      onSpeak(text.trim());
      setText("");
    }
  };

  return (
    <motion.div
      style={{ width: "100%", maxWidth: 900, margin: "0 auto" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <form
        onSubmit={submit}
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          width: "100%",
        }}
      >
        <input
          placeholder="Type dialogue..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            flex: 1,
            height: 42,
            padding: "0 14px",
            borderRadius: 10,
            border: "1px solid rgba(167,139,250,0.45)",
            background: "rgba(255,255,255,0.96)",
            color: "#111827",
            fontSize: 15,
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        <select
          value={emotion}
          onChange={(e) => {
            const value = e.target.value;
            setEmotion(value);
            onEmotion(value);
          }}
          style={{
            width: 220,
            height: 42,
            padding: "0 14px",
            borderRadius: 10,
            border: "1px solid rgba(167,139,250,0.45)",
            background: "rgba(255,255,255,0.96)",
            color: "#111827",
            fontSize: 15,
            outline: "none",
            boxSizing: "border-box",
            cursor: "pointer",
          }}
        >
          {emotions.map((emo) => (
            <option key={emo} value={emo}>
              {emo}
            </option>
          ))}
        </select>

        <button
          type="submit"
          style={{
            height: 42,
            padding: "0 20px",
            borderRadius: 10,
            border: "1px solid rgba(167,139,250,0.55)",
            background: "#7c3aed",
            color: "white",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Speak
        </button>
      </form>
    </motion.div>
  );
};

export default TalkBox;
