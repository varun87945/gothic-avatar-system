/*
 * Gothic Avatar System
 * Copyright © 2026 Varun. All Rights Reserved.
 *
 * This source code is proprietary.
 * Unauthorized copying, modification, distribution,
 * publication, or reuse is prohibited.
 */
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function BottomBar({ children }: Props) {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,

        width: "100%",
        minHeight: 80,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        padding: "12px 16px 16px",

        background: "rgba(10, 3, 24, 0.96)",
        borderTop: "1px solid rgba(167, 139, 250, 0.35)",

        boxSizing: "border-box",

        zIndex: 9999,
        pointerEvents: "auto",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 900,

          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          position: "relative",
          zIndex: 10000,
          pointerEvents: "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}
