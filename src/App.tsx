import { Component, ReactNode } from "react";
import AvatarCanvasDemo from "./components/UI/VRMAControlPanel";

class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: string | null }
> {
  state = { error: null };

  static getDerivedStateFromError(e: Error) {
    return { error: e.message };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="h-screen w-screen flex items-center justify-center bg-black text-red-400 text-sm p-8 font-mono">
          <pre className="whitespace-pre-wrap">{this.state.error}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <AvatarCanvasDemo />
    </ErrorBoundary>
  );
}