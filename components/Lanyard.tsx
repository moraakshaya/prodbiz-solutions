/* eslint-disable react/no-unknown-property */
'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useTexture, Environment, Lightformer, PerspectiveCamera } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial });

// ── UTILS: Runtime Texture Generation ──────────────────────────────────────────

function createCardTexture(name = 'PRODBIZ ADMIN', role = 'LEGAL & COMPLIANCE') {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 540;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const mid = canvas.width / 2;

    // Background: More solid Glassy Teal 
    ctx.fillStyle = 'rgba(15, 60, 64, 0.6)'; // Deeper, more opaque teal base
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle Grid/Pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
    }

    // Prominent Border (Key for visibility)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 16;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Modern Header Accent
    const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
    grad.addColorStop(0, '#2197A1');
    grad.addColorStop(1, '#3fe1f0');
    ctx.fillStyle = grad;
    ctx.fillRect(8, 8, canvas.width - 16, 40);

    // Profile Placeholder
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.roundRect(mid - 110, 140, 220, 220, 30);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Icon in placeholder
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 90px Figtree';
    ctx.textAlign = 'center';
    ctx.fillText('PB', mid, 285);

    // Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px Figtree';
    ctx.fillText(name, mid, 450);

    // Role
    ctx.fillStyle = '#3fe1f0';
    ctx.font = 'bold 28px Figtree';
    ctx.fillText(role, mid, 500);

    // ID Number
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = '22px monospace';
    ctx.fillText('ID: PB-2026-0502', mid, 550);

    // Footer Logo
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 38px Figtree';
    ctx.fillText('PRODBIZ SOLUTIONS', mid, 740);

    return canvas;
}

function createStrapTexture() {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = '#2197A1';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.font = 'bold 64px Figtree';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Repeating text
    for (let i = 0; i < 4; i++) {
        ctx.fillText('PRODBIZ SOLUTIONS', (i * 256) + 128, 64);
    }

    return canvas;
}

// ── BAND COMPONENT ─────────────────────────────────────────────────────────────

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false, name = 'PRODBIZ ADMIN', role = 'LEGAL & COMPLIANCE' }) {
    const band = useRef<any>(null);
    const fixed = useRef<any>(null);
    const j1 = useRef<any>(null);
    const j2 = useRef<any>(null);
    const j3 = useRef<any>(null);
    const card = useRef<any>(null);

    const vec = new THREE.Vector3();
    const ang = new THREE.Vector3();
    const rot = new THREE.Euler();
    const dir = new THREE.Vector3();
    
    const segmentProps: any = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };

    const cardTex = useMemo(() => {
        const canv = createCardTexture(name, role);
        if (!canv) return null;
        const tex = new THREE.CanvasTexture(canv);
        tex.anisotropy = 16;
        return tex;
    }, [name, role]);

    const strapTex = useMemo(() => {
        const canv = createStrapTexture();
        if (!canv) return null;
        const tex = new THREE.CanvasTexture(canv);
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        return tex;
    }, []);

    const [curve] = useState(() => new THREE.CatmullRomCurve3([
        new THREE.Vector3(), 
        new THREE.Vector3(), 
        new THREE.Vector3(), 
        new THREE.Vector3()
    ]));

    const [dragged, drag] = useState<THREE.Vector3 | false>(false);
    const [hovered, hover] = useState(false);

    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
    useSphericalJoint(j3, card, [
        [0, 0, 0],
        [0, 1.1, 0]
    ]);

    useEffect(() => {
        if (hovered) {
            document.body.style.cursor = dragged ? 'grabbing' : 'grab';
            return () => void (document.body.style.cursor = 'auto');
        }
    }, [hovered, dragged]);

    useFrame((state, delta) => {
        if (dragged && card.current) {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
            dir.copy(vec).sub(state.camera.position).normalize();
            vec.add(dir.multiplyScalar(state.camera.position.length()));
            [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
            card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
        }
        
        if (fixed.current && j1.current && j2.current && j3.current && card.current) {
            // Realistic handheld momentum: wide sway + micro-jitter + tilting
            const t = state.clock.getElapsedTime();
            
            // X: Wide horizontal sway + subtle shake
            // Y: Subtle vertical bobbing to simulate walking/breathing
            const x = Math.sin(t * 0.6) * 1.5 + Math.sin(t * 2.2) * 0.1;
            const y = 4 + Math.cos(t * 0.8) * 0.2 + Math.sin(t * 1.5) * 0.05;
            
            fixed.current.setNextKinematicTranslation({ x, y, z: 0 });
            
            // Tilting the anchor point (simulating hand rotation)
            // This pulls the rest of the chain in a more natural way
            const rotZ = Math.cos(t * 0.6) * 0.25; 
            fixed.current.setNextKinematicRotation(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, rotZ)));

            [j1, j2].forEach(ref => {
                if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
                const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
                ref.current.lerped.lerp(
                    ref.current.translation(),
                    delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
                );
            });
            
            curve.points[0].copy(j3.current.translation());
            curve.points[1].copy(j2.current.lerped);
            curve.points[2].copy(j1.current.lerped);
            curve.points[3].copy(fixed.current.translation());
            
            if (band.current) {
                band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
            }

            const cardAng = card.current.angvel();
            const cardRot = card.current.rotation();
            card.current.setAngvel({ x: cardAng.x, y: cardAng.y - cardRot.y * 0.25, z: cardAng.z });
        }
    });

    return (
        <>
            <group position={[0, 4, 0]}>
                <RigidBody ref={fixed} {...segmentProps} type="kinematicPosition" />
                <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                
                <RigidBody 
                    position={[2, 0, 0]} 
                    ref={card} 
                    {...segmentProps} 
                    type={dragged ? 'kinematicPosition' : 'dynamic'}
                >
                    <CuboidCollider args={[1.0, 1.125, 0.05]} />
                    
                    {/* Synthetic Card Mesh (Replacing the missing GLB) */}
                    <group
                        scale={1.0}
                        position={[0, 0, 0]}
                        onPointerOver={() => hover(true)}
                        onPointerOut={() => hover(false)}
                        onPointerUp={e => ((e.target as any).releasePointerCapture(e.pointerId), drag(false))}
                        onPointerDown={e => (
                            ((e.target as any).setPointerCapture(e.pointerId)),
                            drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
                        )}
                    >
                        {/* Main Card Body */}
                        <mesh position={[0, 0, 0]}>
                            <boxGeometry args={[2.0, 2.25, 0.05]} />
                            <meshPhysicalMaterial 
                                map={cardTex} 
                                color="#2197A1"
                                transmission={0.65} // Reduced transparency for clarity
                                roughness={0.1}
                                thickness={0.8}
                                ior={1.45}
                                clearcoat={1} 
                                clearcoatRoughness={0.1} 
                                metalness={0.1}
                                transparent={true}
                                attenuationColor="#2197A1"
                                attenuationDistance={0.4}
                                emissive="#156b73"
                                emissiveIntensity={0.2} // Subtle glow to pop from background
                            />
                        </mesh>
                        
                        {/* Clip/Connector Primitive */}
                        <mesh position={[0, 1.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
                            <cylinderGeometry args={[0.07, 0.07, 0.2, 16]} />
                            <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
                        </mesh>
                    </group>
                </RigidBody>
            </group>
            
            <mesh ref={band}>
                <meshLineGeometry attach="geometry" />
                <meshLineMaterial
                    attach="material"
                    color="white"
                    depthTest={false}
                    resolution={isMobile ? [1000, 2000] : [1000, 1000]}
                    useMap
                    map={strapTex}
                    repeat={[-4, 1]}
                    lineWidth={1}
                    transparent
                    opacity={1}
                />
            </mesh>
        </>
    );
}

// ── MAIN EXPORT ────────────────────────────────────────────────────────────────

export default function Lanyard({ position = [0, 0, 24], gravity = [0, -40, 0], fov = 20, transparent = true, name = 'PRODBIZ ADMIN', role = 'LEGAL & COMPLIANCE' }) {
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [webglAvailable, setWebglAvailable] = useState(false);

    useEffect(() => {
        setMounted(true);
        setIsMobile(window.innerWidth < 768);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        
        const checkWebGL = () => {
            try {
                const canvas = document.createElement('canvas');
                return !!(window.WebGLRenderingContext && 
                  (canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
                );
            } catch (e) {
                return false;
            }
        };
        const isAvailable = checkWebGL();
        setWebglAvailable(isAvailable);
        if (!isAvailable) {
            console.warn("Lanyard: WebGL not available.");
        }
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!mounted) return <div className="w-full h-full" />;

    if (!webglAvailable) {
        return (
            <div className="relative w-full h-full flex justify-center items-center bg-transparent">
                <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 text-white text-center">
                    <h3 className="text-xl font-bold mb-2">Interactive Preview</h3>
                    <p className="opacity-60 text-sm">WebGL is required for the interactive lanyard.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative z-0 w-full h-full flex justify-center items-center overflow-visible">
            <Canvas
                shadows
                camera={{ position: position as any, fov: isMobile ? 30 : fov }}
                dpr={[1, isMobile ? 1.5 : 2]}
                gl={{ alpha: true, antialias: true }}
                onCreated={({ gl }) => {
                    gl.setClearColor(new THREE.Color(0x000000), 0);
                }}
            >
                <ambientLight intensity={Math.PI} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
                
                <React.Suspense fallback={null}>
                    <Physics gravity={gravity as any} timeStep={isMobile ? 1 / 30 : 1 / 60}>
                        <Band isMobile={isMobile} name={name} role={role} />
                    </Physics>
                </React.Suspense>

                <Environment blur={0.75}>
                    <Lightformer
                        intensity={2}
                        color="white"
                        position={[0, -1, 5]}
                        rotation={[0, 0, Math.PI / 3]}
                        scale={[100, 0.1, 1]}
                    />
                    <Lightformer
                        intensity={3}
                        color="white"
                        position={[-1, -1, 1]}
                        rotation={[0, 0, Math.PI / 3]}
                        scale={[100, 0.1, 1]}
                    />
                    <Lightformer
                        intensity={10}
                        color="white"
                        position={[-10, 0, 14]}
                        rotation={[0, Math.PI / 2, Math.PI / 3]}
                        scale={[100, 10, 1]}
                    />
                </Environment>
            </Canvas>
        </div>
    );
}
