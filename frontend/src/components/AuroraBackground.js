import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import styled, { keyframes, createGlobalStyle } from "styled-components";

// Keyframes for pulsing and color-shifting animation
const auroraAnimation = keyframes`
  0% {
    background-position: 0% 50%;
    opacity: 1;
  }
  50% {
    background-position: 130% 50%;
    opacity: 1;
  }
  100% {
    background-position: 0% 50%;
    opacity: 1;
  }
`;

// Styled component for aurora animation with pulsing and color shifting
const AuroraDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    102deg,
    var(--orange-500) 0%,
    var(--red-400) 20%,
    var(--yellow-300) 40%,
    var(--blue-500) 60%,
    var(--blue-400) 80%,
    var(--blue-300) 100%
  );
  background-size: 200% 200%;
  animation: ${auroraAnimation} 10s ease-in-out infinite;
  z-index: -1;
  filter: blur(100px);
  pointer-events: none;
  opacity: 0.9;
`;

// Global style for adding custom colors as CSS variables
const GlobalStyle = createGlobalStyle`
  :root {
    --orange-500: #fb923c;
    --red-400: #f87171;
    --yellow-300: #fde047;
    --blue-500: #3b82f6;
    --blue-400: #60a5fa;
    --blue-300: #93c5fd;
    --transparent: transparent;
    --white: #ffffff;
    --black: #000000;
  }
`;

// AuroraBackground component
export const AuroraBackground = ({ className, children, ...props }) => {
  return (
    <>
      <GlobalStyle />
      <main>
        <div className={clsx("relative flex flex-col h-[100vh] items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-slate-950 transition-bg", className)} {...props}>
          <AuroraDiv />
          {children}
        </div>
      </main>
    </>
  );
};

export default AuroraBackground;