import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import styled, { keyframes, createGlobalStyle } from "styled-components";

// Keyframes for aurora animation
const auroraAnimation = keyframes`
  0% {
    background-position: 50% 50%, 50% 50%;
  }
  100% {
    background-position: 350% 50%, 350% 50%;
  }
`;

// Styled component for aurora animation
const AuroraDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: repeating-linear-gradient(100deg, var(--blue-500) 10%, var(--indigo-300) 15%, var(--blue-300) 20%, var(--violet-200) 25%, var(--blue-400) 30%);
  background-size: 300% 200%;
  background-position: 50% 50%;
  animation: ${auroraAnimation} 60s linear infinite;
  z-index: -1;
  filter: blur(100px);
  pointer-events: none;
  opacity: 0.9;
`;

// Global style for adding Tailwind colors as CSS variables
const GlobalStyle = createGlobalStyle`
  :root {
    --gray-200: #e5e7eb;
    --blue-500: #3b82f6;
    --indigo-300: #a5b4fc;
    --blue-300: #93c5fd;
    --violet-200: #c4b5fd;
    --blue-400: #60a5fa;
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