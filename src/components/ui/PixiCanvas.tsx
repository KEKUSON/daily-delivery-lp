import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

interface PixiCanvasProps {
  onInit: (app: PIXI.Application) => void | (() => void);
  className?: string;
}

export const PixiCanvas = ({ onInit, className = '' }: PixiCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const onInitRef = useRef(onInit);

  // Keep the latest onInit reference to avoid unnecessary re-renders
  useEffect(() => {
    onInitRef.current = onInit;
  }, [onInit]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check for WebGL support
    const isWebGLSupported = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    };

    if (!isWebGLSupported()) {
      console.warn('WebGL not supported, particle effects disabled');
      return;
    }

    let isMounted = true;
    let cleanupFn: void | (() => void);
    let cleanupVisibility: (() => void) | null = null;

    const initPixi = async () => {
      const container = containerRef.current;
      if (!container) return;

      const app = new PIXI.Application();
      await app.init({
        backgroundAlpha: 0,
        antialias: false,
        // Force resolution 1 for all devices to maintain true pixel art aesthetic
        resolution: 1,
        autoDensity: true,
        resizeTo: container,
        // NES aesthetic: pixel snapping
        roundPixels: true,
      });

      if (!isMounted) {
        app.destroy(true, { children: true });
        return;
      }

      appRef.current = app;
      
      // Ensure canvas is correctly positioned and pixelated
      const canvas = app.canvas;
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '0';
      canvas.style.imageRendering = 'pixelated';

      container.appendChild(canvas);

      cleanupFn = onInitRef.current(app);

      // Visibility API for background tab optimization
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
          app.ticker.stop();
        } else {
          app.ticker.start();
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      cleanupVisibility = () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    };

    initPixi();

    return () => {
      isMounted = false;
      if (cleanupFn) {
        cleanupFn();
      }
      if (cleanupVisibility) {
        cleanupVisibility();
      }
      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
        appRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} className={`absolute inset-0 z-0 pointer-events-none ${className}`} />;
};