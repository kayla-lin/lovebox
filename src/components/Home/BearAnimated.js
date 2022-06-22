import Model from "../../assets/models/BearPeek";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function BoxAnimated(props) {
  return (
    <>
      <Canvas camera={{ fov: 10, position: [-4, 3, 16] }}>
        <Suspense fallback={null}>
          <directionalLight
            color={0xffffff}
            intensity={0.6}
            position={[-4, 4, 16]}
          />
          <ambientLight color={0xffffff} intensity={0.8} />
          <Model setActions={props.setActions} />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={false}
          />
        </Suspense>
      </Canvas>
    </>
  );
}
export default BoxAnimated;
