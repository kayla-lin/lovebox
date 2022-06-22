import Model from "../../../../assets/models/Present";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function BoxAnimated(props) {  
  return (
    <>
      <Canvas camera={{ fov: 55, position: [8, 4, 4] }}>
        <Suspense fallback={null}>
          <directionalLight
            color={0xffffff}
            intensity={0.6}
            position={[10, 20, 0]}
          />
          <ambientLight color={0xffffff} intensity={0.6} />
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
