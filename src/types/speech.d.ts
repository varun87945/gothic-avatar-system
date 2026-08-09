export interface SpeechRequest {
  text: string;
  voice?: SpeechSynthesisVoice;
  rate?: number;
  pitch?: number;
}
