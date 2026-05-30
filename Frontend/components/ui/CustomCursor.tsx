"use client";

import { useEffect, useRef, useState } from "react";

const HOVER_SELECTOR =
  "a, button, input, textarea, select, label, [role='button'], .cursor-hover";

export function CustomCursor() {
  const blobRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;

    const animate = () => {
      currentX += (mouseX.current - currentX) * 0.26;
      currentY += (mouseY.current - currentY) * 0.26;
      blob.style.left = `${currentX}px`;
      blob.style.top = `${currentY}px`;
      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.current = event.clientX;
      mouseY.current = event.clientY;
    };

    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (target?.matches(HOVER_SELECTOR)) {
        setHovering(true);
      }
    };

    const handlePointerOut = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (target?.matches(HOVER_SELECTOR)) {
        setHovering(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);

    animationFrameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
    };
  }, []);

  return (
    <div
      ref={blobRef}
      className={`custom-cursor-blob ${hovering ? "custom-cursor-hover" : ""}`}
      aria-hidden="true"
    />
  );
}
