import { createContext, useCallback, useContext, useState } from "react";

const Context = createContext();

export const PlayProvider = ({ children }) => {
  const [play, setPlay] = useState(false);
  const [hasScroll, setHasScroll] = useState(false);
  const [end, setEnd] = useState(false);
  // Bumped on every restart so the 3D scene and intro know to reset themselves.
  const [restartCount, setRestartCount] = useState(0);

  // Back to the intro screen ("Start the Journey") without reloading the page.
  const restart = useCallback(() => {
    setEnd(false);
    setPlay(false);
    setHasScroll(false);
    setRestartCount((count) => count + 1);
  }, []);

  return (
    <Context.Provider
      value={{
        play,
        setPlay,
        hasScroll,
        setHasScroll,
        end,
        setEnd,
        restartCount,
        restart,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const usePlay = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("usePlay must be used within a PlayProvider");
  }

  return context;
};
