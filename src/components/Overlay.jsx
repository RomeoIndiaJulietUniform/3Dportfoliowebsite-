import { Loader, useProgress } from "@react-three/drei"
import { usePlay } from "../context/play";

export const Overlay = () =>{
    
    const {progress} = useProgress();
    const {setPlay,end, play,hasScroll} = usePlay();


    return(
      <div
      className={`overlay ${play ? "overlay--disable" : ""}
    ${hasScroll ? "overlay--scrolled" : ""}`}
    >
            <div className={`loader ${progress === 100 ? "loader-disappear" : ""}`} />
            {progress === 100 && (
            <div className={`intro ${play ? "intro--disappear" : ""}`}>
                <h1 className="logo">rijumondal.netlify.app</h1>
                <p className="intro__scroll">
                  Scroll to Experience
                </p>
                <div className="scroll"><button
            className="explore"
            onClick={() => {
              setPlay(true);
            }}
          >
            Start the Journey
          </button></div>
            </div>
            )}

        
         
        
        </div>
    )
}