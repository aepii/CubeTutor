import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function FiberCanvas() {
  return (
    <div className="flex-grow bg-emerald-800">
      <Canvas className="w-full h-full">
        <OrbitControls>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
        </OrbitControls>
      </Canvas>
    </div>
  );
}

export default FiberCanvas;
