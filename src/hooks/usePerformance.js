import { useState, useEffect } from 'react';

export default function usePerformance() {
  const [metrics, setMetrics] = useState({
    fps: 0,
    memory: 0,
    domNodes: 0,
    isCrashing: false
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = Date.now();
    
    // FPS计算器
    const fpsCounter = () => {
      frameCount++;
      const now = Date.now();
      if (now - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime));
        
        // 获取性能数据
        const memory = (performance.memory?.usedJSHeapSize || 0) / 1048576;
        const domNodes = document.getElementsByTagName('*').length;
        const isCrashing = fps < 25 || memory > 500;
        
        setMetrics({
          fps,
          memory: parseFloat(memory.toFixed(2)),
          domNodes,
          isCrashing
        });
        
        frameCount = 0;
        lastTime = now;
      }
      requestAnimationFrame(fpsCounter);
    };
    
    requestAnimationFrame(fpsCounter);
    
    return () => cancelAnimationFrame(fpsCounter);
  }, []);

  return metrics;
}