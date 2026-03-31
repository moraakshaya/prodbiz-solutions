"use client";

import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Html } from "@react-three/drei";
import * as THREE from "three";
import { Code2, Megaphone, Smartphone, Laptop, Globe, LineChart, LucideIcon } from "lucide-react";

//
// ── PARTICLE MESH ──────────────────────────────────────────────────────────────
//

interface ParticleData {
    targetPositions: Float32Array;
    cloudPositions: Float32Array;
    colors: Float32Array;
    count: number;
}

function ParticleMesh({ data }: { data: ParticleData }) {
    const pointsRef = useRef<THREE.Points>(null);
    const positionsRef = useRef<Float32Array>(data.cloudPositions.slice());
    const velocitiesRef = useRef<Float32Array>(new Float32Array(data.count * 3).fill(0));
    const phaseRef = useRef<"cloud" | "forming" | "formed">("cloud");
    const timerRef = useRef(0);
    const posAttrRef = useRef<THREE.BufferAttribute>(null);

    useFrame((_, delta) => {
        timerRef.current += delta;

        if (timerRef.current > 1.2 && phaseRef.current === "cloud") {
            phaseRef.current = "forming";
        }

        const pos = positionsRef.current;
        const targets = data.targetPositions;
        const vel = velocitiesRef.current;

        if (phaseRef.current === "forming") {
            let allDone = true;
            const spring = 0.09;
            const damp = 0.72;
            for (let i = 0; i < data.count; i++) {
                const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;
                const dx = targets[ix] - pos[ix];
                const dy = targets[iy] - pos[iy];
                const dz = targets[iz] - pos[iz];
                vel[ix] = vel[ix] * damp + dx * spring;
                vel[iy] = vel[iy] * damp + dy * spring;
                vel[iz] = vel[iz] * damp + dz * spring;
                pos[ix] += vel[ix];
                pos[iy] += vel[iy];
                pos[iz] += vel[iz];
                if (Math.abs(dx) + Math.abs(dy) + Math.abs(dz) > 0.06) allDone = false;
            }
            if (allDone) { phaseRef.current = "formed"; }
        } else if (phaseRef.current === "cloud") {
            const t = timerRef.current;
            for (let i = 0; i < data.count; i++) {
                const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;
                pos[ix] += Math.sin(t * 0.8 + i * 0.1) * 0.012;
                pos[iy] += Math.cos(t * 0.7 + i * 0.13) * 0.012;
                pos[iz] += Math.sin(t * 0.6 + i * 0.17) * 0.008;
            }
        } else {
            const t = timerRef.current;
            for (let i = 0; i < data.count; i++) {
                const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;
                pos[ix] = targets[ix] + Math.sin(t * 0.4 + i * 0.05) * 0.04;
                pos[iy] = targets[iy] + Math.cos(t * 0.35 + i * 0.05) * 0.04;
                pos[iz] = targets[iz] + Math.sin(t * 0.3 + i * 0.07) * 0.03;
            }
        }

        if (posAttrRef.current) {
            posAttrRef.current.set(pos);
            posAttrRef.current.needsUpdate = true;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    ref={posAttrRef}
                    args={[positionsRef.current, 3]}
                    count={data.count}
                    array={positionsRef.current}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[data.colors, 3]}
                    count={data.count}
                    array={data.colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.16}
                vertexColors={true}
                transparent={true}
                opacity={0.92}
                sizeAttenuation={true}
                depthWrite={false}
            />
        </points>
    );
}

//
// ── ORBITAL ICONS ──────────────────────────────────────────────────────────────
//

const devMarketingIcons = [
    { icon: Code2, color: "#2197A1", label: "Web Dev" },
    { icon: Megaphone, color: "#e76038", label: "Marketing" },
    { icon: Laptop, color: "#2197A1", label: "Digital" },
    { icon: LineChart, color: "#e76038", label: "Growth" },
    { icon: Globe, color: "#2197A1", label: "Global SEO" },
    { icon: Smartphone, color: "#e76038", label: "Mobile" },
];

const VerticalOrbitIcon = ({ icon: Icon, angle, radius, color, label }: { icon: LucideIcon, angle: number, radius: number, color: string, label: string }) => {
    const ref = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!ref.current) return;
        const t = state.clock.getElapsedTime() * 0.25; // Gentle pace
        const currentAngle = angle + t;

        // Vertical Y-axis orbit
        ref.current.position.x = Math.cos(currentAngle) * radius * 0.5; // Narrow X
        ref.current.position.y = Math.sin(currentAngle) * radius;       // Full Y Top-to-Bottom
        ref.current.position.z = Math.cos(currentAngle) * radius * 0.6; // Slight Z depth
    });

    return (
        <group ref={ref}>
            <Html center transform distanceFactor={10}>
                <div className="flex flex-col items-center gap-2 group cursor-pointer" title={label}>
                    <div
                        className="p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-300 group-hover:scale-125 hover:bg-[#2197A1] hover:border-[#2197A1]"
                        style={{ color: color }}
                    >
                        <Icon size={40} className="group-hover:text-white transition-colors" />
                    </div>
                </div>
            </Html>
        </group>
    );
};

//
// ── SCENE ──────────────────────────────────────────────────────────────────────
//

function Scene({ image }: { image: string }) {
    const [data, setData] = useState<ParticleData | null>(null);

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            const W = 100, H = 100;
            const canvas = document.createElement("canvas");
            canvas.width = W;
            canvas.height = H;
            const ctx = canvas.getContext("2d")!;
            ctx.drawImage(img, 0, 0, W, H);
            const px = ctx.getImageData(0, 0, W, H).data;

            const points: { x: number; y: number; r: number; g: number; b: number }[] = [];
            const step = 1;
            for (let y = 0; y < H; y += step) {
                for (let x = 0; x < W; x += step) {
                    const idx = (y * W + x) * 4;
                    const alpha = px[idx + 3];
                    // Pick up relatively opaque pixels, ignoring mostly white background
                    const isWhite = px[idx] > 240 && px[idx + 1] > 240 && px[idx + 2] > 240;
                    if (alpha > 30 && !isWhite) {
                        points.push({
                            x, y,
                            r: px[idx] / 255,
                            g: px[idx + 1] / 255,
                            b: px[idx + 2] / 255,
                        });
                    }
                }
            }

            const count = points.length;
            if (count === 0) return;

            const scale = 0.16; // Slight adjustment for presence
            const spread = 20;

            const targetPositions = new Float32Array(count * 3);
            const cloudPositions = new Float32Array(count * 3);
            const colors = new Float32Array(count * 3);

            points.forEach((p, i) => {
                targetPositions[i * 3] = (p.x - W / 2) * scale;
                targetPositions[i * 3 + 1] = -(p.y - H / 2) * scale;
                targetPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.8;

                cloudPositions[i * 3] = (Math.random() - 0.5) * spread;
                cloudPositions[i * 3 + 1] = (Math.random() - 0.5) * spread;
                cloudPositions[i * 3 + 2] = (Math.random() - 0.5) * spread;

                colors[i * 3] = p.r;
                colors[i * 3 + 1] = p.g;
                colors[i * 3 + 2] = p.b;
            });

            setData({ targetPositions, cloudPositions, colors, count });
        };
        img.src = image;
        img.src = "/images/about-heroimg.png";
        img.src = image;
    }, [image]);

    return (
        <group>
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={1.2} color="#2197A1" />
            <pointLight position={[-10, 5, 8]} intensity={0.8} color="#e76038" />

            {data && <ParticleMesh data={data} />}
        </group>
    );
}

//
// ── EXPORT ─────────────────────────────────────────────────────────────────────
//

export default function WhoWeAreHero3D({
    image = "/images/about-heroimg.png",
}: {
    image?: string;
}) {
    const [ready, setReady] = useState(false);
    const containerRef = useCallback((node: HTMLDivElement | null) => {
        if (node) setReady(true);
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full" style={{ minHeight: 400 }}>
            {ready && (
                <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} frameloop="always">
                    <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={55} />
                    <Scene image={image} />
                </Canvas>
            )}
        </div>
    );
}
