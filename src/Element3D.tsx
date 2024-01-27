import { Box, OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';
// import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Mesh } from 'three';
import * as THREE from 'three';

function Element3D() {
  const refMesh = useRef<Mesh | null>(null);
  const refWireMesh = useRef<Mesh | null>(null);

  const {
    radius,
    widthSegments,
    heightSegments,
    phiStart,
    phiLength,
    thetaStart,
    thetaLength,
  } = useControls({
    radius: { value: 1, min: 0.1, max: 5, step: 0.01 },
    widthSegments: { value: 32, min: 3, max: 256, step: 1 },
    heightSegments: { value: 32, min: 2, max: 256, step: 1 },
    phiStart: { value: 0, min: 0, max: 360, step: 0.1 },
    phiLength: { value: 360, min: 0, max: 360, step: 0.1 },
    thetaStart: { value: 0, min: 0, max: 180, step: 0.1 },
    thetaLength: { value: 180, min: 0, max: 180, step: 0.1 },
  });
  // useFrame((state, delta) => {
  //   if (refMesh.current) {
  //     refMesh.current.rotation.z += delta;
  //   }
  // });

  useEffect(() => {
    if (refWireMesh.current && refMesh.current) {
      refWireMesh.current.geometry = refMesh.current.geometry;
    }
  }, [
    radius,
    widthSegments,
    heightSegments,
    phiStart,
    phiLength,
    thetaStart,
    thetaLength,
  ]);

  return (
    <>
      <directionalLight position={[1, 1, 1]} />
      {/* 월드 좌표계 */}
      {/* <axesHelper scale={10} /> */}
      <OrbitControls />
      <mesh ref={refMesh}>
        <sphereGeometry
          args={[
            radius,
            widthSegments,
            heightSegments,
            phiStart * (Math.PI / 180),
            phiLength * (Math.PI / 180),
            thetaStart * (Math.PI / 180),
            thetaLength * (Math.PI / 180),
          ]}
        />
        <meshStandardMaterial color="#e67e22" />
        {/* 로컬 좌표계 */}
        {/* <axesHelper /> */}
        {/* <mesh scale={[0.1, 0.1, 0.1]} position={[0, 2, 0]}>
          <sphereGeometry />
          <meshStandardMaterial color={'red'} />
          <axesHelper scale={5} />
        </mesh> */}
      </mesh>
      <mesh ref={refWireMesh}>
        <meshStandardMaterial emissive="yellow" wireframe />
      </mesh>

      <axesHelper scale={10} />
    </>
  );
}

export default Element3D;
