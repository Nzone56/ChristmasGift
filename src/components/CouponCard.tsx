import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface CouponCardProps {
  name: string;
  instructions: string[];
  image?: string;
  logo: string;
}

export default function CouponCard({
  name,
  instructions,
  image,
  logo,
}: CouponCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasFlippedOnce, setHasFlippedOnce] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [lastTime, setLastTime] = useState(0);
  const animationFrameRef = useRef<number>();
  const touchStartRef = useRef({ x: 0, y: 0, dist: 0 });

  // Image-only zoom - ONLY for coupon image on back side
  const handleCouponImageClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip
    if (image) {
      setIsFullscreen(true);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!hasFlippedOnce) {
      setHasFlippedOnce(true);
    }
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
    setVelocity({ x: 0, y: 0 });
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const handleZoom = (delta: number, centerX?: number, centerY?: number) => {
    setZoomLevel((prev) => {
      const newZoom = Math.min(Math.max(prev + delta, 1), 4);

      // Zoom towards cursor/touch point
      if (centerX !== undefined && centerY !== undefined && newZoom !== prev) {
        const scale = newZoom / prev;
        setPosition((pos) => ({
          x: centerX - (centerX - pos.x) * scale,
          y: centerY - (centerY - pos.y) * scale,
        }));
      }

      return newZoom;
    });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.2 : 0.2;
    handleZoom(delta, e.clientX, e.clientY);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
    setLastTime(Date.now());
    setVelocity({ x: 0, y: 0 });
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const now = Date.now();
      const dt = now - lastTime;
      const dx = e.clientX - lastPos.x;
      const dy = e.clientY - lastPos.y;

      setPosition((pos) => ({
        x: pos.x + dx,
        y: pos.y + dy,
      }));

      if (dt > 0) {
        setVelocity({ x: (dx / dt) * 16, y: (dy / dt) * 16 });
      }

      setLastPos({ x: e.clientX, y: e.clientY });
      setLastTime(now);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    // Apply inertia
    const applyInertia = () => {
      setVelocity((vel) => {
        const friction = 0.95;
        const newVel = { x: vel.x * friction, y: vel.y * friction };

        if (Math.abs(newVel.x) > 0.1 || Math.abs(newVel.y) > 0.1) {
          setPosition((pos) => ({
            x: pos.x + newVel.x,
            y: pos.y + newVel.y,
          }));
          animationFrameRef.current = requestAnimationFrame(applyInertia);
        }

        return newVel;
      });
    };

    if (Math.abs(velocity.x) > 1 || Math.abs(velocity.y) > 1) {
      applyInertia();
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (zoomLevel === 1) {
      handleZoom(1, e.clientX, e.clientY);
    } else {
      setZoomLevel(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dist = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      touchStartRef.current = {
        x: (touch1.clientX + touch2.clientX) / 2,
        y: (touch1.clientY + touch2.clientY) / 2,
        dist,
      };
    } else if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setLastPos({ x: touch.clientX, y: touch.clientY });
      setVelocity({ x: 0, y: 0 });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();

    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dist = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      const centerX = (touch1.clientX + touch2.clientX) / 2;
      const centerY = (touch1.clientY + touch2.clientY) / 2;

      const scale = dist / touchStartRef.current.dist;
      handleZoom((scale - 1) * 0.5, centerX, centerY);

      touchStartRef.current = { x: centerX, y: centerY, dist };
    } else if (e.touches.length === 1 && isDragging) {
      const touch = e.touches[0];
      const dx = touch.clientX - lastPos.x;
      const dy = touch.clientY - lastPos.y;

      setPosition((pos) => ({
        x: pos.x + dx,
        y: pos.y + dy,
      }));

      setLastPos({ x: touch.clientX, y: touch.clientY });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="coupon-wrapper">
        <div className={`coupon-card ${isFlipped ? "flipped" : ""}`}>
          <div
            className="coupon-inner"
            onClick={handleFlip}
            style={{
              animation:
                !hasFlippedOnce && !isFlipped
                  ? "subtle-tilt 3s ease-in-out infinite"
                  : "none",
              cursor: "pointer",
            }}
          >
            <div className="coupon-front">
              <div
                className="rounded-2xl shadow-2xl p-0 h-full flex flex-col items-center justify-center overflow-hidden relative theme-transition"
                style={{ backgroundColor: "var(--theme-card-bg)" }}
              >
                {/* Logo - NOT zoomable */}
                {logo && (
                  <img
                    src={logo}
                    alt={name}
                    className="w-full h-auto object-contain"
                  />
                )}

                {/* Persistent flip indicator - top-right corner */}
                <div
                  className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    pointerEvents: "none",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <span
                    className="text-white text-xl"
                    style={{
                      animation: "slow-rotate 4s ease-in-out infinite",
                      display: "inline-block",
                    }}
                  >
                    ↻
                  </span>
                </div>
              </div>
            </div>
            <div className="coupon-back">
              <div
                className="rounded-2xl shadow-2xl p-0 h-full flex flex-col items-center justify-center overflow-hidden relative theme-transition"
                style={{ background: "var(--theme-card-bg)" }}
              >
                {/* Coupon image - ONLY this is zoomable */}
                {image && (
                  <div
                    className="w-full cursor-zoom-in relative group"
                    onClick={handleCouponImageClick}
                  >
                    <img
                      src={image}
                      alt={name}
                      className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Zoom indicator overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-sm">
                      <div className="bg-white/90 backdrop-blur-md rounded-full p-4 shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-12 h-12 text-gray-800"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Persistent zoom hint badge */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-md bg-black/40 shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                        />
                      </svg>
                      <span className="text-white text-xs font-medium">
                        Click to zoom
                      </span>
                    </div>
                  </div>
                )}

                {/* Persistent flip indicator - top-right corner */}
                <div
                  className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    pointerEvents: "none",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <span
                    className="text-white text-xl"
                    style={{
                      animation: "slow-rotate 4s ease-in-out infinite",
                      display: "inline-block",
                    }}
                  >
                    ↻
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {instructions.length > 0 && (
          <div
            className="mt-6 backdrop-blur-sm rounded-xl p-4 theme-transition"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <h4
              className="font-bold mb-2 theme-transition"
              style={{
                color: "var(--theme-secondary)",
                textTransform: "var(--text-transform)",
              }}
            >
              Coupon Instructions:
            </h4>
            <ul
              className="text-xs space-y-2 list-none theme-transition"
              style={{ color: "var(--theme-text)" }}
            >
              {instructions.map((instruction, index) => (
                <li key={index} className="leading-relaxed">
                  {instruction}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Portal-based Fullscreen Image Viewer - ONLY for coupon image */}
      {isFullscreen &&
        image &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.97)",
              backdropFilter: "blur(20px)",
            }}
            onClick={handleCloseFullscreen}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 z-[10000] text-white text-3xl w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-all"
              onClick={handleCloseFullscreen}
              style={{
                textShadow: "0 2px 8px rgba(0,0,0,0.8)",
              }}
            >
              ✕
            </button>

            {/* Zoom level indicator */}
            <div className="absolute top-6 left-6 z-[10000] bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
              {Math.round(zoomLevel * 100)}%
            </div>

            {/* Image container with Gmail-style interactions */}
            <div
              className="relative w-full h-full flex items-center justify-center overflow-hidden touch-none"
              onClick={(e) => e.stopPropagation()}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onDoubleClick={handleDoubleClick}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                cursor: isDragging
                  ? "grabbing"
                  : zoomLevel > 1
                    ? "grab"
                    : "zoom-in",
              }}
            >
              <img
                src={image}
                alt={name}
                className="max-w-full max-h-full object-contain select-none"
                style={{
                  transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
                  transition: isDragging ? "none" : "transform 0.15s ease-out",
                  willChange: "transform",
                }}
                draggable={false}
              />
            </div>

            {/* Instructions */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/60 text-sm text-center px-4">
              <p>
                Double-click or scroll to zoom • Drag to pan • Pinch to zoom on
                mobile
              </p>
            </div>
          </div>,
          document.body
        )}

      {/* CSS for animations */}
      <style>{`
        @keyframes subtle-tilt {
          0%, 100% {
            transform: rotateY(0deg) rotateX(0deg);
          }
          25% {
            transform: rotateY(2deg) rotateX(-1deg);
          }
          50% {
            transform: rotateY(0deg) rotateX(0deg);
          }
          75% {
            transform: rotateY(-2deg) rotateX(1deg);
          }
        }
        
        @keyframes slow-rotate {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(180deg);
          }
        }
      `}</style>
    </>
  );
}
