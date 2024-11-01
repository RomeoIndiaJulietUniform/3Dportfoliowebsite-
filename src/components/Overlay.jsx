import { useProgress } from "@react-three/drei";
import { usePlay } from "../context/play";
import React, { useMemo } from "react";

export const Overlay = () => {
  const { progress } = useProgress();
  const { setPlay, end, play, hasScroll } = usePlay();

  const overlayClass = useMemo(
    () => `overlay ${play ? "overlay--disable" : ""} ${hasScroll ? "overlay--scrolled" : ""}`,
    [play, hasScroll]
  );

  const loaderClass = useMemo(
    () => `loader ${progress === 100 ? "loader-disappear" : ""}`,
    [progress]
  );

  const introClass = useMemo(
    () => `intro ${play ? "intro--disappear" : ""}`,
    [play]
  );

  const handleStartJourney = () => {
    setPlay(true);
  };  

  return (
    <div className={overlayClass}>
      <div className={loaderClass} />
      {progress === 100 && (
        <div className={introClass}>
          <h1 className="logo">rijumondal.vercel.app</h1>
          <p className="intro__scroll">Scroll to Experience</p>
          <div className="scroll">
            <button className="explore" onClick={handleStartJourney}>
              Start the Journey
            </button>
          </div>
        </div>
      )}
      <div className={`outro ${end ? "outro--appear": ""}`}>
        <p className="outro-text">Thanks for Visiting!</p>
      </div>
    </div>
  );
}