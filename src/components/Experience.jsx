import {
  CameraControls,
  Environment,
  MeshPortalMaterial,
  RoundedBox,
  Text,
  useCursor,
  useTexture,
} from "@react-three/drei";
import { XR } from '@react-three/xr'
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Cactoro } from "./Cactoro";
import { DragonEvolved } from "./Dragon_Evolved";
import { Fish } from "./Fish";
export const Experience = () => {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  useCursor(hovered);
  const controlsRef = useRef();
  const scene = useThree((state) => state.scene);
  
  const [xrActive, setXrActive] = useState(false)

      function Render() {
        // Takes over the render-loop, the user has the responsibility to render
        useFrame(({ gl, scene, camera }) => {
          gl.render(scene, camera)
        }, 1)
      }


  useEffect(() => {
    if (active) {
      const targetPosition = new THREE.Vector3();
      scene.getObjectByName(active).getWorldPosition(targetPosition);
      if(!xrActive){
      controlsRef.current.setLookAt(
        0,
        0,
        5,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      );
      }
      
    } else {
      if(!xrActive) controlsRef.current.setLookAt(0, 0, 10, 0, 0, 0, true);
    }
  }, [active, xrActive]);

  return (
    <>
      <XR
         referenceSpace="local"
          sessionInit={{ requiredFeatures: ['local'] }}
          onSessionStarted={(session) => setXrActive(true)}
          onSessionEnded={() => setXrActive(false)}

      >
        <Render />
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      { /* only if not xrActive */}
      {!xrActive &&
      <CameraControls
        ref={controlsRef}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}        
      />
      }
        <group position={[0,0,-0.75]} scale={[0.25,0.25,0.25]}>
      <MonsterStage
        name="Fish King"
        color="#38adcf"
        texture={
          "textures/anime_art_style_a_water_based_pokemon_like_environ.jpg"
        }
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Fish scale={0.6}  position={[0,-1,-1.5]} hovered={hovered === "Fish King"} />
      </MonsterStage>
      <MonsterStage
        texture={"textures/anime_art_style_lava_world.jpg"}
        name="Dragon"
        color={"#df8d52"}
        position-x={-2.5}
        rotation-y={Math.PI / 8}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <DragonEvolved
          scale={0.5}
          position={[-1,-1,-1.5]}
          hovered={hovered === "Dragon"}
        />
      </MonsterStage>
      <MonsterStage
        name="Cactoro"
        color="#739d3c"
        texture={"textures/anime_art_style_cactus_forest.jpg"}
        position-x={2.5}
        rotation-y={-Math.PI / 8}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Cactoro scale={0.45} position={[1,-1,-1.5]} hovered={hovered === "Cactoro"} />
      </MonsterStage>
      </group>
      </XR>
    </>
  );
};

const MonsterStage = ({
  children,
  texture,
  name,
  color,
  active,
  setActive,
  hovered,
  setHovered,
  ...props
}) => {
  const map = useTexture(texture);
  const portalMaterial = useRef();

  useFrame((_state, delta) => {
    const worldOpen = active === name;
    easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.2, delta);
  });

  return (
    <group {...props}>
      <Text
        font="fonts/Caprasimo-Regular.ttf"
        fontSize={0.3}
        position={[0, -1.3, 0.051]}
        anchorY={"bottom"}
      >
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
      <RoundedBox
        name={name}
        args={[2, 3, 0.1]}
        onDoubleClick={() => setActive(active === name ? null : name)}
        onPointerEnter={() => setHovered(name)}
        onPointerLeave={() => setHovered(null)}
      >
        <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide} worldUnits={false} renderPriority={2} blend={0.5}>
          <ambientLight intensity={1} />
          <Environment preset="sunset" />
          {children}
          <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};
