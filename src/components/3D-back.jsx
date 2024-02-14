import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function Scene() {
  const mountRef = useRef(null);
  const [scene] = useState(new THREE.Scene());
  const [camera] = useState(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState({ x: 0.0005, y: 0.0005 });

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;

    // Galaxy parameters
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1,
      sizeAttenuation: true
    });
    
   

    const starsVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 1200;
      const y = (Math.random() - 0.5) * 1200;
      const z = (Math.random() - 0.5) * 1200;
      starsVertices.push(x, y, z);
    }

     <h1>
        comming soon 
     </h1>
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    camera.position.z = 5;

    let frameId;
    const animate = function () {
      frameId = requestAnimationFrame(animate);

      if (isAnimating) {
        stars.rotation.x += animationSpeed.x;
        stars.rotation.y += animationSpeed.y;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Event listeners for mouse interaction
    const onMouseDown = (event) => {
      setIsAnimating(true);
      setAnimationSpeed({ x: 0.001, y: 0.001 });
    };

    const onMouseUp = (event) => {
      setIsAnimating(false);
    };

    const onMouseMove = (event) => {
      if (isAnimating) {
        // Update the speed based on mouse movement
        const deltaX = (event.movementX / window.innerWidth) * 0.005;
        const deltaY = (event.movementY / window.innerHeight) * 0.005;
        setAnimationSpeed((prevSpeed) => ({
          x: prevSpeed.x + deltaX,
          y: prevSpeed.y + deltaY
        }));
      }
    };

    window.addEventListener('mousedown', onMouseDown, false);
    window.addEventListener('mouseup', onMouseUp, false);
    window.addEventListener('mousemove', onMouseMove, false);

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize, false);

    // Clean up on unmount
    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      cancelAnimationFrame(frameId);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [camera, scene]);

  return <div ref={mountRef} />;
}

export default Scene;


