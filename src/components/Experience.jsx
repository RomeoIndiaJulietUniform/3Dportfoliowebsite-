import { Float, useScroll } from "@react-three/drei";
import { PerspectiveCamera } from "@react-three/drei";
import { Background } from "./background";
import { Airplane } from "./airplane";
import { Cloud } from "./cloud";
import * as THREE from "three";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { TextSection } from "./texts";
import { usePlay } from "../context/play";
import { gsap } from "gsap";

const LINE_NB_POINTS = 1000;
const curvedistance = 25;

export const Experience = () => {
  const curvepoints = useMemo(
    () => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -1 * curvedistance),
      new THREE.Vector3(-5, 0, -2 * curvedistance),
      new THREE.Vector3(-5, 0, -3 * curvedistance),
      new THREE.Vector3(0, 0, -5 * curvedistance),
      new THREE.Vector3(0, 0, -10 * curvedistance),
    ],
    [],
  );

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(curvepoints, false, "catmullrom", 0.5);
  }, []);

  const sceneOpacity = useRef(0);
  const lineMaterialRef = useRef();

  const textSection = useMemo(() => {
    return [
      {
        position: new THREE.Vector3(
          curvepoints[0].x - 1.3,
          curvepoints[0].y + 0,
          curvepoints[0].z - 4,
        ),

        title: "Hii I am Riju Mondal, A FullStack Java Developer",
      },
      {
        position: new THREE.Vector3(
          curvepoints[2].x + 11,
          curvepoints[2].y + 4.1,
          curvepoints[2].z,
        ),

        title: "Projects",

        subtitle1: "I. MERN ChatApp with UIDs",
        subtitle2: "II. Movie Recommendation App with React",
        subtitle3: "III. Java Object Oriented Programming",
        subtitleLinkURL1: "https://github.com/RomeoIndiaJulietUniform/ChatApp",
        subtitleLinkURL2:
          "https://github.com/RomeoIndiaJulietUniform/MovieRecomApp",
        subtitleLinkURL3:
          "https://github.com/RomeoIndiaJulietUniform/Java_OOPS",
      },
      {
        position: new THREE.Vector3(
          curvepoints[3].x - 1,
          curvepoints[3].y + 5,
          curvepoints[3].z,
        ),

        title: "Achievements",
        subtitle1: "1.LeetCode Knight Badge with 500+ Problems Solved",
        subtitle2: "2. CodeForces Max Rating of 1417(Specialist)",
        subtitle3:
          "3. Cleared Air Force Common Admission Test Twice and Coast Gaurd Common Admission Test",
        subtitleLinkURL1: "https://leetcode.com/u/riju1/",
        subtitleLinkURL2: "https://codeforces.com/profile/nevermind0109",
        subtitleLinkURL3:
          "https://drive.google.com/file/d/1xfiuK7-gbtKIO0SBqdnjjf56DuOGRuUC/view",
      },
      {
        position: new THREE.Vector3(
          curvepoints[4].x + 4,
          curvepoints[4].y + 3.8,
          curvepoints[4].z,
        ),

        title: "Contact",
        subtitle1: "1.mailrijumondal@gmail.com",
        subtitle2: "2.Linkedin",
        subtitle3: "3.Github",
        subtitleLinkURL1: 'mailto:mailrijumondal@gmail.com"',
        subtitleLinkURL2: "https://www.linkedin.com/in/riju-mondal-137686244/",
        subtitleLinkURL3: "https://github.com/RomeoIndiaJulietUniform",
      },
    ];
  }, []);

  const clouds = useMemo(
    () => [
      {
        position: new THREE.Vector3(-10, -3, -63),
      },
      {
        position: new THREE.Vector3(-5, -4, -33),
      },
      {
        position: new THREE.Vector3(6, -5, -33),
      },
      {
        position: new THREE.Vector3(-8, -8, -37),
      },
      {
        position: new THREE.Vector3(-7, 8, -58),
      },
      {
        position: new THREE.Vector3(9, 6, -15),
      },
      {
        position: new THREE.Vector3(2, 5, -20),
      },
      {
        position: new THREE.Vector3(-3, 8, -25),
      },
      {
        position: new THREE.Vector3(-6, 1, -104),
      },
    ],
    [],
  );

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.2);
    shape.lineTo(0, 0.2);

    return shape;
  }, [curve]);

  const CameraGroup = useRef();
  const scroll = useScroll();
  const lastScroll = useRef(0);
  const Camera = useRef();
  const curve_ahead_camera = 0.007;
  const curve_ahead_airplane = 0.03;
  const max_bank_angle = 65;
  const { play, setHasScroll, end, setEnd, restartCount } = usePlay();

  const tmp = useMemo(
    () => ({
      curPoint: new THREE.Vector3(),
      lookAtPoint: new THREE.Vector3(),
      currentLookAt: new THREE.Vector3(),
      targetLookAt: new THREE.Vector3(),
      lookTarget: new THREE.Vector3(),
      tangent: new THREE.Vector3(),
      up: new THREE.Vector3(0, 1, 0),
      nonLerpLookup: new THREE.Object3D(),
      euler: new THREE.Euler(),
      quaternion: new THREE.Quaternion(),
    }),
    [],
  );

  useFrame((_state, delta) => {
    if (window.innerWidth > window.innerHeight) {
      if (window.innerWidth <= 768) {
        Camera.current.fov = 70;
        Camera.current.position.z = 12;
      } else {
        Camera.current.fov = 35;
        Camera.current.position.z = 10;
      }
    } else {
      Camera.current.fov = 128;
      Camera.current.position.z = 4;
      Camera.current.position.y = 1.2;
    }

    if (play && sceneOpacity.current < 1) {
      sceneOpacity.current = THREE.MathUtils.lerp(
        sceneOpacity.current,
        1,
        delta * 0.5,
      );
    }

    if (lastScroll.current <= 0 && scroll.offset > 0) {
      setHasScroll(true);
    }
    lastScroll.current = scroll.offset;

    if (end && sceneOpacity.current > 0) {
      sceneOpacity.current = THREE.MathUtils.lerp(
        sceneOpacity.current,
        0,
        delta,
      );
    }

    if (end) {
      return;
    }

    lineMaterialRef.current.opacity = sceneOpacity.current;

    const scrollOffset = Math.max(0, scroll.offset);

    const curPoint = curve.getPoint(scrollOffset, tmp.curPoint);

    CameraGroup.current.position.lerp(curPoint, delta * 24);

    const lookAtpoint = curve.getPoint(
      Math.min(scrollOffset + curve_ahead_camera, 1),
      tmp.lookAtPoint,
    );

    const currentLookAt = CameraGroup.current.getWorldDirection(
      tmp.currentLookAt,
    );

    const targetLookAt = tmp.targetLookAt
      .subVectors(curPoint, lookAtpoint)
      .normalize();

    const lookAt = currentLookAt.lerp(targetLookAt, delta * 24);
    CameraGroup.current.lookAt(
      tmp.lookTarget.copy(CameraGroup.current.position).add(lookAt),
    );

    const tangent = curve.getTangent(
      scrollOffset + curve_ahead_airplane,
      tmp.tangent,
    );

    const nonlerplookup = tmp.nonLerpLookup;
    nonlerplookup.position.copy(curPoint);
    nonlerplookup.lookAt(
      tmp.lookTarget.copy(nonlerplookup.position).add(targetLookAt),
    );

    tangent.applyAxisAngle(tmp.up, -nonlerplookup.rotation.y);

    let bankangle = Math.atan2(-tangent.z, tangent.x);
    bankangle = -Math.PI / 2 + bankangle;

    let bankradiandegrees = (bankangle * 180) / Math.PI;
    bankradiandegrees *= 15;

    if (bankradiandegrees < 0) {
      bankradiandegrees = Math.max(bankradiandegrees, -max_bank_angle);
    } else if (bankradiandegrees > 0) {
      bankradiandegrees = Math.min(bankradiandegrees, max_bank_angle);
    }

    bankangle = (bankradiandegrees * Math.PI) / 180;

    const targetairplanequaternion = tmp.quaternion.setFromEuler(
      tmp.euler.set(
        airplane.current.rotation.x,
        airplane.current.rotation.y,
        bankangle,
      ),
    );

    airplane.current.quaternion.slerp(targetairplanequaternion, delta * 2);

    if (
      CameraGroup.current.position.z <
      curvepoints[curvepoints.length - 1].z + 100
    ) {
      setEnd(true);
      console.log("End Marked");
      planeOutTl.current.play();
    }
  });

  const airplane = useRef();

  const planeIn = useRef();
  const planeOutTl = useRef();
  const cameraRail = useRef(new THREE.Object3D());

  useLayoutEffect(() => {
    planeIn.current = gsap.timeline();
    planeIn.current.pause();
    planeIn.current.from(airplane.current.position, {
      duration: 3,
      z: 5,
      y: -2,
    });

    planeOutTl.current = gsap.timeline();
    planeOutTl.current.pause();

    planeOutTl.current.to(
      airplane.current.position,
      {
        duration: 15,
        z: -250,
        y: -5,
        ease: "power1.inOut",
      },
      0,
    );

    planeOutTl.current.to(
      CameraGroup.current.position,
      {
        duration: 15,
        y: 350,
        z: -50,
        ease: "power1.inOut",
      },
      0,
    );

    planeOutTl.current.to(
      Camera.current,
      {
        duration: 15,
        fov: 20,
        ease: "power1.inOut",
      },
      0,
    );

    planeOutTl.current.to(
      airplane.current.position,
      {
        duration: 20,
        z: -500,
        y: -15,
        ease: "power2.in",
      },
      "+=0",
    );
  }, []);

  useEffect(() => {
    if (play) {
      planeIn.current.play();
    }
  }, [play]);

  useLayoutEffect(() => {
    if (restartCount === 0) return;

    planeOutTl.current.pause(0).invalidate();
    planeIn.current.pause(0);

    CameraGroup.current.position.set(0, 0, 0);
    CameraGroup.current.quaternion.identity();
    airplane.current.quaternion.identity();

    sceneOpacity.current = 0;
    lastScroll.current = 0;
    scroll.offset = 0;
    scroll.scroll.current = 0;
  }, [restartCount]);

  return useMemo(
    () => (
      <>
        <group ref={CameraGroup}>
          <Background />
          <PerspectiveCamera
            ref={Camera}
            position={[0, 2, 12]}
            fov={30}
            makeDefault
          />
          <group ref={airplane}>
            <Float floatIntensity={2} speed={2}>
              <Airplane
                rotation-y={Math.PI / 1}
                scale={[0.2, 0.2, 0.2]}
                position-y={0.4}
              />
            </Float>
          </group>
        </group>

        {textSection.map((textSection, index) => (
          <TextSection
            sceneOpacity={sceneOpacity}
            {...textSection}
            key={index}
          />
        ))}

        <mesh>
          <extrudeGeometry
            args={[
              shape,
              {
                steps: LINE_NB_POINTS,
                bevelEnabled: false,
                extrudePath: curve,
              },
            ]}
          />
          <meshStandardMaterial
            color={"white"}
            ref={lineMaterialRef}
            transparent
          />
        </mesh>

        {clouds.map((cloud, index) => (
          <Cloud sceneOpacity={sceneOpacity} {...cloud} key={index} />
        ))}
      </>
    ),
    [],
  );
};
