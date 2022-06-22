import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import modelSrc from "../models/present.glb";
import { useFrame } from "@react-three/fiber";

const Model = ({ ...props }) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(modelSrc);
  const { actions } = useAnimations(animations, group);
  const [move, setMove] = useState({ count: 0, up: false });

  useEffect(() => {
    props.setActions(actions);
  }, []);

  useFrame(() => {
    // Turn
    group.current.rotation.y += 0.005;
    // Move up and down
    if (!move.up) {
      group.current.position.y += 0.001;
      // Increment
      setMove((prevState) => {
        return { ...prevState, count: prevState.count + 1 };
      });
      // If looped 100 times, move down
      if (move.count > 100) {
        setMove((prevState) => {
          return { ...prevState, up: true };
        });
      }
    } else {
      group.current.position.y -= 0.001;
      // Decrement
      setMove((prevState) => {
        return { ...prevState, count: prevState.count - 1 };
      });
      // If looped 100 times, move down
      if (move.count < 0) {
        setMove((prevState) => {
          return { ...prevState, up: false };
        });
      }
    }
  });

  return (
    <group position-y={-0.4} ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="present"
          geometry={nodes.present.geometry}
          material={materials.palette}
          position={[-0.24, 0, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
        >
          <mesh
            name="Cube"
            geometry={nodes.Cube.geometry}
            material={materials.Material}
            position={[0.24, 0.01, -0.43]}
            scale={[0.61, 0.62, 0.44]}
            castShadow
          >
            <meshPhysicalMaterial color={"black"} />
          </mesh>
        </mesh>
        <mesh
          name="present001"
          geometry={nodes.present001.geometry}
          material={materials.palette}
          position={[-0.24, -1, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
        />
      </group>
    </group>
  );
};

useGLTF.preload(modelSrc);

export default Model;
