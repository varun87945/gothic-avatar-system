import { SpeechRequest } from "@/types/speech";
import { speak } from "./tts";
import { generateVisemeTimeline } from "./visemeExtractor";

export interface QueueItem {
  request: SpeechRequest;
  onVisemes: (visemes: { time: number; viseme: string }[]) => void;
}

/**
 * Very lightweight FIFO queue – useful for chaining user utterances.
 */
export class SpeechQueue {
  private queue: QueueItem[] = [];
  private isSpeaking = false;

  enqueue(item: QueueItem) {
    this.queue.push(item);
    this.process();
  }

  private async process() {
    if (this.isSpeaking || this.queue.length === 0) return;
    const { request, onVisemes } = this.queue.shift()!;

    const utterance = new SpeechSynthesisUtterance(request.text);
    const duration = utterance.text.length * 0.08; // rough estimate
    const visemes = generateVisemeTimeline(request.text, duration);
    onVisemes(visemes);

    this.isSpeaking = true;
    await speak(request, () => {
      this.isSpeaking = false;
      this.process();
    });
  }
}
