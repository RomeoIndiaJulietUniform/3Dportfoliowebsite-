import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { ScrollControls } from "@react-three/drei";
import { Overlay } from "./components/Overlay";


function App() {




  return (
    <>
      <Canvas camera={{
        position: [0, 0, 5],
        fov: 30,
      }}>
        <color attach="background" args={["#ececec"]} />
        <ScrollControls pages={6} damping={0.7}>
        <Experience />
        </ScrollControls>
      </Canvas>
      <Overlay/>
    </>
  );
}

export default App;
