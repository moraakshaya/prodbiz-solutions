"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { PerspectiveCamera, useTexture } from "@react-three/drei";
import * as THREE from "three";

// ── BACKGROUND PARTICLES ──────────────────────────────────────────────────────
function BackgroundParticles() {
  const ref = useRef<THREE.Points>(null);
  const { pos, col } = useMemo(() => {
    const count = 220;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const teal = new THREE.Color("#2197A1");
    const dark = new THREE.Color("#0a2535");
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 44;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 4;
      const c = teal.clone().lerp(dark, Math.random() * 0.8);
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    return { pos, col };
  }, []);
  useFrame(({ clock }) => { if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.013; });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} count={220} array={pos} itemSize={3} />
        <bufferAttribute attach="attributes-color"    args={[col, 3]} count={220} array={col} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.075} vertexColors transparent opacity={0.72} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// ── DISSOLVE PARTICLES ────────────────────────────────────────────────────────
const DC = 360;
function DissolveParticles({ trigRef }: { trigRef: React.MutableRefObject<boolean> }) {
  const pRef  = useRef<THREE.Points>(null);
  const mRef  = useRef<THREE.PointsMaterial>(null);
  const B = 1.15;
  const { iPos, vel } = useMemo(() => {
    const iPos = new Float32Array(DC * 3);
    const vel  = new Float32Array(DC * 3);
    for (let i = 0; i < DC; i++) {
      const f = i % 4;
      let x = 0, y = 0, z = 0;
      if      (f === 0) { x = B;  y = (Math.random()-.5)*B*2; z = (Math.random()-.5)*B*2; }
      else if (f === 1) { x = -B; y = (Math.random()-.5)*B*2; z = (Math.random()-.5)*B*2; }
      else if (f === 2) { x = (Math.random()-.5)*B*2; y = (Math.random()-.5)*B*2; z =  B; }
      else              { x = (Math.random()-.5)*B*2; y = (Math.random()-.5)*B*2; z = -B; }
      iPos[i*3]=x; iPos[i*3+1]=y; iPos[i*3+2]=z;
      vel[i*3]   = (Math.random()-.5)*1.4;
      vel[i*3+1] = Math.random()*2.2 + 0.7;
      vel[i*3+2] = (Math.random()-.5)*1.4;
    }
    return { iPos, vel };
  }, []);
  const cur  = useRef(iPos.slice());
  const op   = useRef(0);
  const t    = useRef(0);
  useFrame((_, dt) => {
    if (!pRef.current || !mRef.current) return;
    if (!trigRef.current) { op.current = 0; mRef.current.opacity = 0; t.current = 0; cur.current.set(iPos); return; }
    t.current += dt;
    op.current = Math.min(1, op.current + dt * 2.5);
    const fade = t.current > 2.5 ? Math.max(0, 1 - (t.current - 2.5) * 0.6) : 1;
    mRef.current.opacity = op.current * 0.9 * fade;
    const p = cur.current;
    for (let i = 0; i < DC; i++) {
      p[i*3]   += vel[i*3]   * dt;
      p[i*3+1] += vel[i*3+1] * dt * (1 + t.current * 0.35);
      p[i*3+2] += vel[i*3+2] * dt;
    }
    (pRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });
  return (
    <points ref={pRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[cur.current, 3]} count={DC} array={cur.current} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial ref={mRef} size={0.065} color="#2197A1" transparent opacity={0} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// ── GLASS WALL PANEL ──────────────────────────────────────────────────────────
function GlassWall({ pos, size, opRef }: { pos: [number,number,number]; size: [number,number,number]; opRef: React.MutableRefObject<number> }) {
  const mRef = useRef<THREE.Mesh>(null);
  const lRef = useRef<THREE.LineSegments>(null);
  const [geo, eg] = useMemo(() => {
    const g = new THREE.BoxGeometry(size[0], size[1], size[2]);
    return [g, new THREE.EdgesGeometry(g)];
  }, [size]);
  useFrame(() => {
    const o = opRef.current;
    if (mRef.current) (mRef.current.material as THREE.MeshPhysicalMaterial).opacity = o * 0.13;
    if (lRef.current) (lRef.current.material as THREE.LineBasicMaterial).opacity     = o * 0.8;
  });
  return (
    <group position={pos}>
      <mesh ref={mRef} geometry={geo}>
        <meshPhysicalMaterial color="#2197A1" transparent opacity={0.13} roughness={0} metalness={0.05} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <lineSegments ref={lRef} geometry={eg}>
        <lineBasicMaterial color="#2197A1" transparent opacity={0.8} />
      </lineSegments>
    </group>
  );
}

// ── CHARACTER / BALL COMPONENT ────────────────────────────────────────────────
function CentralAsset({ ballRef, characterSrc }: { ballRef: any; characterSrc?: string }) {
  const texture = characterSrc ? useTexture(characterSrc) : null;
  const R = 0.30;

  return (
    <group ref={ballRef} visible={false}>
      {characterSrc && texture ? (
        <sprite scale={[2, 2.8, 1]}>
          <spriteMaterial map={texture} transparent={true} />
        </sprite>
      ) : (
        <mesh>
          <sphereGeometry args={[R, 32, 32]} />
          <meshPhysicalMaterial color="#1a8fa0" metalness={0.45} roughness={0.08} emissive="#0a4a55" emissiveIntensity={0.65} />
        </mesh>
      )}
    </group>
  );
}

// ── MAIN SCENE ────────────────────────────────────────────────────────────────
function AnimatedScene({ playSignalRef, stayOpen = false, characterSrc }: { playSignalRef: React.MutableRefObject<number>; stayOpen?: boolean; characterSrc?: string }) {
  const boxRef  = useRef<THREE.Group>(null);
  const fpRef   = useRef<THREE.Group>(null); // front pivot
  const bpRef   = useRef<THREE.Group>(null); // back pivot
  const lpRef   = useRef<THREE.Group>(null); // left pivot
  const rpRef   = useRef<THREE.Group>(null); // right pivot
  const lidRef  = useRef<THREE.Group>(null);
  const ballRef = useRef<THREE.Group>(null);
  const blRef   = useRef<THREE.PointLight>(null);

  const boxOp   = useRef(1);
  const dissRef  = useRef(false);
  const lastSig  = useRef(0);

  const st = useRef({
    ph: "falling" as "falling"|"opening"|"dissolving"|"bouncing"|"stayOpen",
    timer:0, posY:11, velY:0, bounces:0,
    fA:0, bA:0, lA:0, rA:0, lidY:0,
    bY:0, bX:0, bDir: 1 as 1|-1, bShown:false,
  });

  const { viewport, size } = useThree();
  const isMobile = size.width < 768;

  const B=1.15, T=0.055;
  const SCREEN = viewport.width / 2;
  const BOX_X  = isMobile ? 0 : Math.min(4.0, viewport.width / 2 - 2.8);

  const resetAll = () => {
    const box=boxRef.current, fp=fpRef.current, bp=bpRef.current;
    const lp=lpRef.current, rp=rpRef.current, lid=lidRef.current;
    const ball=ballRef.current, bL=blRef.current;
    if (!box||!fp||!bp||!lp||!rp||!lid||!ball) return;
    st.current = { ph:"falling", timer:0, posY:11, velY:0, bounces:0, fA:0, bA:0, lA:0, rA:0, lidY:0, bY:0, bX:BOX_X, bDir:-1, bShown:false };
    boxOp.current=1; dissRef.current=false;
    box.visible=true; box.position.y=11;
    fp.rotation.x=0; bp.rotation.x=0; lp.rotation.z=0; rp.rotation.z=0;
    lid.position.y=0; ball.visible=false;
    if (bL) bL.visible=false;
  };

  useFrame((_,dt) => {
    const s = st.current;
    s.timer += dt;
    if (playSignalRef.current !== lastSig.current) {
      lastSig.current = playSignalRef.current;
      resetAll(); return;
    }
    const box=boxRef.current, fp=fpRef.current, bp=bpRef.current;
    const lp=lpRef.current,   rp=rpRef.current, lid=lidRef.current;
    const ball=ballRef.current, bL=blRef.current;
    if (!box||!fp||!bp||!lp||!rp||!lid||!ball) return;

    if (s.ph==="falling") {
      s.velY -= 22*dt; s.posY += s.velY*dt;
      if (s.posY<=0) {
        s.velY=Math.abs(s.velY)*0.28; s.posY=0; s.bounces++;
        if (s.bounces>=3||s.velY<1.2) { s.posY=0; s.velY=0; s.ph="opening"; s.timer=0; }
      }
      box.position.y=s.posY; return;
    }

    box.position.y = Math.sin(s.timer*0.55)*0.07;
    const bwy = box.position.y;

    if (s.ph==="opening") {
      const sp=dt*2.1, max=Math.PI/2;
      s.fA=Math.min(max,s.fA+sp); fp.rotation.x =  s.fA;
      s.bA=Math.min(max,s.bA+sp); bp.rotation.x = -s.bA;
      s.lA=Math.min(max,s.lA+sp); lp.rotation.z =  s.lA;
      s.rA=Math.min(max,s.rA+sp); rp.rotation.z = -s.rA;
      s.lidY=Math.min(B*4, s.lidY+dt*5); lid.position.y=s.lidY;
      if (s.timer>0.45&&!s.bShown) {
        s.bShown=true; ball.visible=true;
        s.bY = bwy; s.bX = BOX_X; s.bDir = -1;
        ball.position.set(BOX_X, s.bY, 0);
        if (bL) { bL.position.set(BOX_X, s.bY, 0); bL.visible=true; }
      }
      if (s.bShown) {
        if (!stayOpen) {
          s.bX += s.bDir * 5.5 * dt;
          if (s.bX <= -SCREEN) { s.bX = -SCREEN; s.bDir = 1; }
          if (s.bX >=  SCREEN) { s.bX =  SCREEN; s.bDir = -1; }
        } else {
          s.bX = BOX_X;
        }
        
        // Add floating effect to Y
        const floatY = s.bY + Math.sin(s.timer * 2) * 0.15;
        ball.position.set(s.bX, floatY, 0);
        
        if (!characterSrc) {
            ball.rotation.y += dt*3.5; ball.rotation.z += s.bDir*dt*0.9;
        }
        if (bL) { bL.position.x=s.bX; bL.position.y=floatY; }
      }
      if (s.fA>=max) { 
          if (stayOpen) {
              s.ph = "stayOpen";
              s.timer = 0;
          } else {
              dissRef.current=true; s.ph="dissolving"; s.timer=0; 
          }
      } return;
    }

    if (s.ph==="stayOpen") {
        s.bX = BOX_X;
        const floatY = s.bY + Math.sin(s.timer * 2) * 0.15;
        ball.position.set(s.bX, floatY, 0);
        if (!characterSrc) {
            ball.rotation.y += dt*3.5; ball.rotation.z += s.bDir*dt*0.9;
        }
        if (bL) { bL.position.x=s.bX; bL.position.y=floatY; }
        return;
    }

    if (s.ph==="dissolving") {
      boxOp.current = Math.max(0, boxOp.current - dt*1.5);
      if (boxOp.current<=0) box.visible=false;
      s.bX += s.bDir * 5.5 * dt;
      if (s.bX <= -SCREEN) { s.bX = -SCREEN; s.bDir = 1; }
      if (s.bX >=  SCREEN) { s.bX =  SCREEN; s.bDir = -1; }
      ball.position.set(s.bX, s.bY, 0);
      if (!characterSrc) {
        ball.rotation.y += dt*3.5; ball.rotation.z += s.bDir*dt*0.9;
      }
      if (bL) { bL.position.x=s.bX; bL.position.y=s.bY; }
      if (boxOp.current<=0) { s.ph="bouncing"; s.timer=0; } return;
    }

    if (s.ph==="bouncing") {
      s.bX += s.bDir * 5.5 * dt;
      if (s.bX <= -SCREEN) { s.bX = -SCREEN; s.bDir = 1; }
      if (s.bX >=  SCREEN) { s.bX =  SCREEN; s.bDir = -1; }
      ball.position.set(s.bX, s.bY, 0);
      if (!characterSrc) {
        ball.rotation.y += dt*3.5; ball.rotation.z += s.bDir*dt*0.9;
      }
      if (bL) { bL.position.x=s.bX; bL.position.y=s.bY; }
    }
  });

  return (
    <>
      <group ref={boxRef} position={[BOX_X,11,0]}>
        <GlassWall pos={[0,-B,0]}  size={[B*2,T*2,B*2]} opRef={boxOp} />
        <group ref={fpRef} position={[0,-B,B]}>
          <GlassWall pos={[0,B,0]} size={[B*2,B*2,T*2]} opRef={boxOp} />
        </group>
        <group ref={bpRef} position={[0,-B,-B]}>
          <GlassWall pos={[0,B,0]} size={[B*2,B*2,T*2]} opRef={boxOp} />
        </group>
        <group ref={lpRef} position={[-B,-B,0]}>
          <GlassWall pos={[0,B,0]} size={[T*2,B*2,B*2]} opRef={boxOp} />
        </group>
        <group ref={rpRef} position={[B,-B,0]}>
          <GlassWall pos={[0,B,0]} size={[T*2,B*2,B*2]} opRef={boxOp} />
        </group>
        <group ref={lidRef}>
          <GlassWall pos={[0,B,0]} size={[B*2,T*2,B*2]} opRef={boxOp} />
        </group>
      </group>

      <CentralAsset ballRef={ballRef} characterSrc={characterSrc} />

      <pointLight ref={blRef} intensity={2.5} color="#2197A1" distance={6} decay={2} visible={false} />
      <group position={[BOX_X, 0, 0]}>
        <DissolveParticles trigRef={dissRef} />
      </group>
    </>
  );
}

function Scene({ showBox, playSignalRef, stayOpen, characterSrc }: { showBox?: boolean; playSignalRef: React.MutableRefObject<number>; stayOpen?: boolean; characterSrc?: string }) {
  return (
    <group>
      <ambientLight intensity={0.45} color="#081e28" />
      <pointLight position={[6,8,5]}   intensity={4}   color="#2197A1" />
      <pointLight position={[-7,3,-3]} intensity={2.5} color="#155f70" />
      <pointLight position={[0,-4,6]}  intensity={1.5} color="#ffffff" />
      <BackgroundParticles />
      {showBox && <AnimatedScene playSignalRef={playSignalRef} stayOpen={stayOpen} characterSrc={characterSrc} />}
    </group>
  );
}

export default function WhoWeAreHero3D({ 
  showBox = false, 
  stayOpen = false, 
  characterSrc 
}: { 
  showBox?: boolean; 
  stayOpen?: boolean;
  characterSrc?: string;
}) {
  const wrapRef       = React.useRef<HTMLDivElement>(null);
  const playSignalRef = React.useRef(0);

  React.useEffect(() => {
    if (!showBox) return;
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) playSignalRef.current++; },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [showBox]);

  return (
    <div ref={wrapRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%",
      background:"linear-gradient(135deg,#030e12 0%,#051820 40%,#082430 70%,#0a2e3a 100%)" }}>
      <Canvas dpr={[1,1.5]} gl={{ antialias:true, alpha:true }} style={{ width:"100%", height:"100%" }}>
        <PerspectiveCamera makeDefault position={[0,0,9]} fov={52} />
        <React.Suspense fallback={null}>
          <Scene showBox={showBox} playSignalRef={playSignalRef} stayOpen={stayOpen} characterSrc={characterSrc} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
