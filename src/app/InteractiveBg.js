"use client";
import React, { useEffect, useRef } from "react";

export default function InteractiveBg() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const anim = useRef({ x: 0.5, y: 0.5 });
  const STARS = 120;
  const stars = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Initialize stars
    stars.current = Array.from({ length: STARS }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.7 + Math.random() * 1.7,
      speed: 0.1 + Math.random() * 0.2,
      twinkle: Math.random() * Math.PI * 2,
      color: Math.random() > 0.7 ? "#4f8cff" : "#fff"
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);
      // More sensitive lerp and parallax
      anim.current.x += (mouse.current.x - anim.current.x) * 0.22;
      anim.current.y += (mouse.current.y - anim.current.y) * 0.22;
      for (let s of stars.current) {
        // Stronger parallax
        const px = (anim.current.x - 0.5) * 220 * s.speed;
        const py = (anim.current.y - 0.5) * 220 * s.speed;
        // Twinkle effect
        s.twinkle += 0.03 + s.speed * 0.04;
        const tw = 0.7 + Math.abs(Math.sin(s.twinkle)) * 0.7;
        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x * width + px, s.y * height + py, s.r * tw, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = 0.18 + 0.18 * tw;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 12 + 12 * tw;
        ctx.fill();
        ctx.restore();
      }
      requestAnimationFrame(draw);
    }
    draw();

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    function handleMouse(e) {
      mouse.current.x = e.clientX / width;
      mouse.current.y = e.clientY / height;
    }
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouse);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
} 