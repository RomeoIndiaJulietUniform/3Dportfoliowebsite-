import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useState } from "react";

export const TextSection = ({ sceneOpacity, title,subtitleLinkURL1,subtitleLinkURL2,subtitleLinkURL3, subtitle1,subtitle2,subtitle3, ...props }) => {
  const titleMaterialRef = useRef();
  const subtitleMaterialRef1 = useRef();
  const subtitleMaterialRef2 = useRef();
  const subtitleMaterialRef3 = useRef();
  const [subtitleHovered1, setSubtitleHover1] = useState(false);
  const [subtitleHovered2, setSubtitleHover2] = useState(false);
  const [subtitleHovered3, setSubtitleHover3] = useState(false);
  const { camera } = useThree();
  
   

  

  const handleSubtitleClick1 = () => {
    window.open(subtitleLinkURL1, "_blank");
  };


  
  const handleSubtitleClick2 = () => {
    window.open(subtitleLinkURL2, "_blank");
  };


  
  const handleSubtitleClick3 = () => {
    window.open(subtitleLinkURL3, "_blank");
  };

  useFrame(() => {
    titleMaterialRef.current.opacity = sceneOpacity.current;
    subtitleMaterialRef1.current.opacity = sceneOpacity.current;
    subtitleMaterialRef2.current.opacity =sceneOpacity.current;
    subtitleMaterialRef3.current.opacity = sceneOpacity.current;
  });

  return (
    <>
      <group {...props}>
        <Text
          color= "white"
          anchorX="right"
          anchorY="bottom"
          fontSize={1}
          maxWidth={5}
          font="/Fonts/Fuggles/Fuggles-Regular.ttf"
        >
          {title}
          <meshStandardMaterial ref={titleMaterialRef} />
        </Text>

        <Text
          color={subtitleHovered1 ? "red" : "white"}
          anchorX="right"
          anchorY = {0}
          fontSize={0.7}
          maxWidth={10}
          font="/Fonts/Fuggles/Fuggles-Regular.ttf"
          onPointerOver={() => setSubtitleHover1(true)}
          onPointerOut={() => setSubtitleHover1(false)}
          onClick={handleSubtitleClick1}
        >
          {subtitle1}
          <meshStandardMaterial ref={subtitleMaterialRef1} />
        </Text>

        <Text
          color={subtitleHovered2 ? "red" : "white"}
          anchorX="right"
          anchorY={1}
          fontSize={0.7}
          maxWidth={10}
          font="/Fonts/Fuggles/Fuggles-Regular.ttf"
          onPointerOver={() => setSubtitleHover2(true)}
          onPointerOut={() => setSubtitleHover2(false)}
          onClick={handleSubtitleClick2}
        >
          {subtitle2}
          <meshStandardMaterial ref={subtitleMaterialRef2} />
        </Text>

        
        <Text
          color={subtitleHovered3 ? "red" : "white"}
          anchorX="right"
          anchorY={2}
          fontSize={0.7}
          maxWidth={10}
          font="/Fonts/Fuggles/Fuggles-Regular.ttf"
          onPointerOver={() => setSubtitleHover3(true)}
          onPointerOut={() => setSubtitleHover3(false)}
          onClick={handleSubtitleClick3}
        >
          {subtitle3}
          <meshStandardMaterial ref={subtitleMaterialRef3} />
        </Text>
      </group>
    </>
  );
};
