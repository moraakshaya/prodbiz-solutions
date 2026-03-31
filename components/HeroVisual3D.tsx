"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, PerspectiveCamera, Text } from "@react-three/drei";
import * as THREE from "three";
import { Code2, Smartphone, Globe, Shield, Database, Cpu, LucideIcon } from "lucide-react";

interface IconItem {
    icon: LucideIcon;
    color: string;
    label: string;
}

const IconCircle = ({ icon: Icon, angle, radius, color }: { icon: LucideIcon, angle: number, radius: number, color: string, label: string }) => {
    const ref = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!ref.current) return;
        const t = state.clock.getElapsedTime() * 0.4; // Slightly slower for elegance
        const currentAngle = angle + t;

        // Symmetric 360-degree orbital path
        ref.current.position.x = Math.cos(currentAngle) * radius;
        ref.current.position.z = Math.sin(currentAngle) * radius;
        ref.current.position.y = Math.sin(currentAngle * 2) * 2; // More dynamic wavy motion

        // Keep icons upright/facing camera
        ref.current.rotation.y = -t;
    });

    return (
        <group ref={ref}>
            <Html center transform distanceFactor={10}>
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div
                        className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-300 group-hover:scale-125 group-hover:bg-[#e76038] group-hover:border-[#e76038]"
                        style={{ color: color }}
                    >
                        <Icon size={54} className="group-hover:text-white transition-colors" />
                    </div>
                </div>
            </Html>
        </group>
    );
};

interface HeroVisual3DProps {
    image?: string;
    icons?: IconItem[];
}

const defaultIcons = [
    { icon: Code2, color: "#2197A1", label: "Software" },
    { icon: Smartphone, color: "#e76038", label: "Mobile" },
    { icon: Globe, color: "#2197A1", label: "Web" },
    { icon: Database, color: "#e76038", label: "Backend" },
    { icon: Shield, color: "#2197A1", label: "Security" },
    { icon: Cpu, color: "#e76038", label: "Architecture" },
];

const CentralPerson = ({ image = "/images/aboutheroimg.png" }: { image?: string }) => {
    return (
        <group>
            <Html center transform distanceFactor={8}>
                <div className="relative group flex items-center justify-center">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-[#2197A1] rounded-full blur-[100px] opacity-15 group-hover:opacity-30 transition-opacity duration-1000 pointer-events-none"></div>

                    {/* Just the Person - Removing circular frame */}
                    <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-[28rem] md:h-[28rem] flex items-center justify-center select-none pointer-events-none">
                        <img
                            src={image}
                            alt="Professional"
                            className="w-full h-full md:h-full lg:h-full object-contain filter drop-shadow-[0_0px_0px_rgba(33,151,161,0.3)] scale-[1.2] sm:scale-[1.5] lg:scale-[1.8] group-hover:scale-[1.9] transition-transform duration-1000"
                        />
                    </div>
                </div>
            </Html>
        </group>
    );
};

const Scene = ({ image, icons = defaultIcons }: HeroVisual3DProps) => {
    const mouse = useRef(new THREE.Vector2());
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;

        // Mouse follow effect
        mouse.current.x = (state.mouse.x * 2);
        mouse.current.y = (state.mouse.y * 2);

        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.current.y * 0.1, 0.1);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.current.x * 0.1, 0.1);
    });

    return (
        <group ref={groupRef}>
            <ambientLight intensity={0.7} />
            <pointLight position={[15, 15, 15]} intensity={1.5} color="#2197A1" />
            <pointLight position={[-15, 10, 10]} intensity={1} color="#e76038" />

            <CentralPerson image={image} />

            {icons.map((item, i) => (
                <IconCircle
                    key={i}
                    icon={item.icon}
                    angle={(i / icons.length) * Math.PI * 2}
                    radius={8}
                    color={item.color}
                    label={item.label}
                />
            ))}
        </group>
    );
};

export default function HeroVisual3D({ image, icons }: HeroVisual3DProps) {
    return (
        <div className="w-full h-full min-h-[180px] sm:min-h-[350px] md:min-h-[600px] lg:min-h-[750px] relative md:top-[100px] pointer-events-auto">
            <Canvas className="w-full h-full !h-[180px] sm:!h-[350px] md:!h-[400px]">
                <PerspectiveCamera makeDefault position={[0, 0, 18]} fov={50} />
                <Scene image={image} icons={icons} />
            </Canvas>
        </div>
    );
}
