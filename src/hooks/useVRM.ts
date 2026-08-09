import { useEffect, useRef, useState } from "react";
import { loadVRM } from "@/lib/vrm/loadVRM";
import { VRM } from "@pixiv/three-vrm";

export const useVRM = (url: string) => {
  const [vrm, setVrm] = useState<VRM | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ref keeps the latest loaded VRM accessible in the cleanup without
  // creating a stale closure over the state variable (which is null on
  // first render when the cleanup is registered).
  const vrmRef = useRef<VRM | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    loadVRM(url)
      .then((model) => {
        if (cancelled) return;
        vrmRef.current = model;
        setVrm(model);
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
      // Use ref instead of stale state value
      vrmRef.current?.scene?.removeFromParent();
      vrmRef.current = null;
    };
  }, [url]);

  return { vrm, loading, error };
};
