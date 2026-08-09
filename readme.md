
> **TL;DR** – copy the entire folder structure, run `npm install`, then `npm run dev`.  
> The project is built with **React + Vite**, **TypeScript**, **TailwindCSS**, **React‑Three‑Fiber**, **@pixiv/three‑vrm**, **Framer Motion**, and the **Web Speech API** for TTS.

---

## 1️⃣ Project Tree Overview

```
gothic-avatar-system/
│
├─ .gitignore
├─ README.md
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
├─ tailwind.config.ts
│
├─ public/
│   ├─ models/
│   │   └─ gothic-avatar.vrm               # (placeholder – add your VRM)
│   ├─ backgrounds/
│   │   ├─ gothic-room.png
│   │   └─ fog-overlay.png
│   ├─ audio/
│   │   └─ (optional sfx)
│   └─ textures/
│       └─ (optional textures)
│
├─ src/
│   ├─ main.tsx
│   ├─ App.tsx
│   ├─ index.css
│   ├─ styles/
│   │   ├─ globals.css
│   │   ├─ gothic-theme.css
│   │   ├─ animations.css
│   │   ├─ ui.css
│   │   └─ effects.css
│   │
│   ├─ types/
│   │   ├─ vrm.d.ts
│   │   ├─ emotions.d.ts
│   │   ├─ speech.d.ts
│   │   ├─ visemes.d.ts
│   │   └─ avatar.d.ts
│   │
│   ├─ hooks/
│   │   ├─ useVRM.ts
│   │   ├─ useSpeech.ts
│   │   ├─ useLipSync.ts
│   │   ├─ useEmotion.ts
│   │   ├─ useBlink.ts
│   │   ├─ useEyeTracking.ts
│   │   └─ useIdleMotion.ts
│   │
│   ├─ lib/
│   │   ├─ vrm/
│   │   │   ├─ loadVRM.ts
│   │   │   ├─ expressions.ts
│   │   │   ├─ visemes.ts
│   │   │   ├─ animation.ts
│   │   │   └─ springbones.ts
│   │   ├─ speech/
│   │   │   ├─ tts.ts
│   │   │   ├─ speechQueue.ts
│   │   │   ├─ visemeExtractor.ts
│   │   │   └─ audioPlayer.ts
│   │   ├─ emotion/
│   │   │   ├─ emotionMap.ts
│   │   │   ├─ emotionParser.ts
│   │   │   ├─ emotionState.ts
│   │   │   └─ expressionPresets.ts
│   │   ├─ three/
│   │   │   ├─ renderer.ts
│   │   │   ├─ scene.ts
│   │   │   ├─ camera.ts
│   │   │   ├─ lighting.ts
│   │   │   ├─ environment.ts
│   │   │   └─ postprocessing.ts
│   │   └─ utils/
│   │       ├─ math.ts
│   │       ├─ easing.ts
│   │       ├─ logger.ts
│   │       ├─ constants.ts
│   │       └─ helpers.ts
│   │
│   ├─ components/
│   │   ├─ Avatar/
│   │   │   ├─ AvatarCanvas.tsx
│   │   │   ├─ AvatarLoader.tsx
│   │   │   ├─ VRMRenderer.tsx
│   │   │   ├─ Animation/
│   │   │   │   ├─ IdleMotion.tsx
│   │   │   │   ├─ BlinkController.tsx
│   │   │   │   ├─ EyeTracking.tsx
│   │   │   │   ├─ HairPhysics.tsx
│   │   │   │   └─ AnimationManager.tsx
│   │   │   ├─ Face/
│   │   │   │   ├─ LipSync.tsx
│   │   │   │   ├─ EmotionController.tsx
│   │   │   │   ├─ ExpressionManager.tsx
│   │   │   │   ├─ VisemePlayer.tsx
│   │   │   │   └─ FacialBlendshapes.tsx
│   │   │   └─ Effects/
│   │   │       ├─ BloomEffect.tsx
│   │   │       ├─ GothicGlow.tsx
│   │   │       ├─ FogEffect.tsx
│   │   │       └─ ParticleSystem.tsx
│   │   ├─ UI/
│   │   │   ├─ TalkBox.tsx
│   │   │   ├─ EmotionBox.tsx
│   │   │   ├─ ExpressionButtons.tsx
│   │   │   ├─ AudioControls.tsx
│   │   │   ├─ AvatarStatus.tsx
│   │   │   ├─ SettingsPanel.tsx
│   │   │   └─ BottomBar.tsx
│   │   └─ Layout/
│   │       ├─ MainScene.tsx
│   │       ├─ CameraRig.tsx
│   │       ├─ Environment.tsx
│   │       └─ Lighting.tsx
│   │
│   └─ data/
│       ├─ emotions.json
│       ├─ visemes.json
│       ├─ expressions.json
│       └─ animation-presets.json
│
├─ scripts/
│   ├─ optimize-vrm.ts
│   ├─ generate-visemes.ts
│   ├─ cleanup-assets.ts
│   └─ convert-textures.ts
│
└─ docs/
    ├─ setup.md
    ├─ vrm-guide.md
    ├─ lipsync.md
    ├─ emotion-system.md
    └─ deployment.md
```
Everything runs **locally in the browser** – no backend, no AI services, no authentication.  

Happy hacking! 🚀
