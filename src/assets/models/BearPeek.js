import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import modelSrc from "./bearPeek.glb";
import { LoopOnce } from "three";

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(modelSrc);
  const { actions } = useAnimations(animations, group);
  const [play, setPlay] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      actions.presentTopPeek.stop();
      actions.presentTopPeek.play();
      actions.presentTopPeek.setLoop(LoopOnce, 1);
      setPlay(!play);
    }, 3500);
  }, [play]);

  return (
    <group
      position-y={-0.8}
      position-x={-0.1}
      ref={group}
      {...props}
      dispose={null}
    >
      <group name="Scene">
        <mesh
          name="present"
          geometry={nodes.present.geometry}
          material={materials["palette.002"]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          name="presentbear"
          geometry={nodes.presentbear.geometry}
          material={materials["palette.002"]}
          position={[0, -1, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <mesh
            name="bearhead-1"
            geometry={nodes["bearhead-1"].geometry}
            material={materials["palette.004"]}
            position={[-0.7, -1.07, -0.45]}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload(modelSrc);
