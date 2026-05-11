import { ThreeElement } from '@react-three/fiber'
import * as THREE from 'three'

declare module 'meshline' {
  export class MeshLineGeometry extends THREE.BufferGeometry {
    constructor();
    setPoints(points: THREE.Vector3[] | number[]): void;
  }
  export class MeshLineMaterial extends THREE.ShaderMaterial {
    constructor(parameters?: any);
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: ThreeElement<any>
    meshLineMaterial: ThreeElement<any>
  }
}

declare module '*.glb' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}
