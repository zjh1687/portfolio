import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';
import * as THREE from 'three';

function Element3D() {
  const refMesh = useRef<Mesh | null>(null);

  useFrame((state, delta) => {
    if (refMesh.current) {
      refMesh.current.rotation.z += delta;
    }
  });

  return (
    <>
      <directionalLight position={[1, 1, 1]} />
      {/* 월드 좌표계 */}
      <axesHelper scale={10} />
      <OrbitControls />
      <mesh
        ref={refMesh}
        position={[0, 2, 0]}
        rotation={[0, 0, THREE.MathUtils.degToRad(45)]}
        scale={[2, 1, 1]}
      >
        <boxGeometry />
        <meshStandardMaterial color="#e67e22" opacity={0.2} transparent />
        {/* 로컬 좌표계 */}
        <axesHelper />
        <mesh scale={[0.1, 0.1, 0.1]} position={[0, 2, 0]}>
          <sphereGeometry />
          <meshStandardMaterial color={'red'} />
          <axesHelper scale={5} />
        </mesh>
      </mesh>
    </>
  );
}

export default Element3D;
