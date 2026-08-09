import { motion } from "framer-motion";

type Props = {
  setEmotion: (e: string) => void;
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

export const EmotionButtons = ({ setEmotion }: Props) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-3 min-w-max px-2 py-2">
        {emotions.map((emotion) => (
          <motion.button
            key={emotion}
            type="button"
            onClick={() => setEmotion(emotion)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              px-6 py-3
              rounded-lg
              bg-green-600
              hover:bg-green-500
              text-white
              font-bold
              uppercase
              tracking-wide
              shadow-md
              transition
              whitespace-nowrap
            "
          >
            {emotion}
          </motion.button>
        ))}
      </div>
    </div>
  );
};