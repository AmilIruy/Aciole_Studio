import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Configuration
const settings = {
  color: 'rgba(255, 255, 255, 1)', // blue-light
  secondaryColor: 'rgba(255, 255, 255, 1)', // purple-light
  wireframe: false,
  roughness: 0.3,
  metalness: 0.5,
  autoRotate: false,
  autoRotateSpeed: 0.7,
  interactiveTilt: true,
  tiltIntensity: 0.5,
  particleCount: 150,
  particleColor: 'rgba(85, 74, 153, 1)',
  lightIntensity: 8,
  ambientColor: 'rgba(85, 74, 153, 1)', // bg-dark
  showGrid: false,
  materialType: 'physical',
  scale: 2.2,
  rotationY: 0,
  rotationX: 83,
};

export function initHero3D() {
  const container = document.getElementById('hero-canvas');
  if (!container) return;

  const parentContainer = document.getElementById('hero');
  
  const width = parentContainer.clientWidth;
  const height = parentContainer.clientHeight || 500;

  // Create Scene
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2('rgba(85, 74, 153, 1)', 0.1);

  // Create Camera
  const camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 500);
  camera.position.set(0, 0, 8);

  // Create Renderer
  const renderer = new THREE.WebGLRenderer({ canvas: container, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Lights Setup
  const ambientLight = new THREE.AmbientLight(settings.ambientColor, 2);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, settings.lightIntensity);
  mainLight.position.set(20, 12, 20);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 1024;
  mainLight.shadow.mapSize.height = 1024;
  scene.add(mainLight);

  // Dynamic Colored Spotlight
  const spotLight = new THREE.SpotLight(settings.color, 4, 15, Math.PI / 4, 0.5, 1);
  spotLight.position.set(0, 0, 4);
  scene.add(spotLight);

  // Create Groups
  const mainGroup = new THREE.Group();
  scene.add(mainGroup);

  const logoGroup = new THREE.Group();
  mainGroup.add(logoGroup);

  // Background Particles
  const particleCount = settings.particleCount;
  const particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const speeds = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 25;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    speeds[i] = 0.01 + Math.random() * 0.02;
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMaterial = new THREE.PointsMaterial({
    color: new THREE.Color(settings.particleColor),
    size: 0.08,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });
  
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  const updateModelMaterials = (object) => {
    let meshIndex = 0;
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        meshIndex++;

        const isPrimary = meshIndex % 2 !== 0;
        const activeColor = isPrimary ? settings.color : settings.secondaryColor;
        
        child.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(activeColor),
          roughness: settings.roughness,
          metalness: settings.metalness,
          wireframe: settings.wireframe,
          clearcoat: 0.2,
          clearcoatRoughness: 0.2,
        });
      }
    });
  };


  const load3DModel = (url) => {
    while (logoGroup.children.length > 0) {
      logoGroup.remove(logoGroup.children[0]);
    }

    const loader = new GLTFLoader();
    loader.load(
      url,
      (gltf) => {
        const loadedModel = gltf.scene;
        
        const box = new THREE.Box3().setFromObject(loadedModel);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scaleFactor = (3.2 / maxDim) * settings.scale;
        loadedModel.scale.setScalar(scaleFactor);
        
        box.setFromObject(loadedModel);
        const center = box.getCenter(new THREE.Vector3());
        loadedModel.position.sub(center);

        loadedModel.position.y += 0.8;

        updateModelMaterials(loadedModel);
        logoGroup.add(loadedModel);
      },
      undefined,
      (err) => {
        console.error('Error loading GLTF model:', err);
      }
    );
  };

  load3DModel(new URL('../../assets/Logo3d.glb', import.meta.url).href);

  let animationFrameId;
  const clock = new THREE.Clock();
  let isVisible = true;

  let baseOffsetX = 0;

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    
    if (!isVisible) return; 

    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    let baseOffsetY = 0;

    // Dynamically calculate offset and scale based on the invisible .hero-image layout div
    const heroImageEl = document.querySelector('.hero-image');
    if (heroImageEl) {
      const rect = heroImageEl.getBoundingClientRect();
      const parentRect = parentContainer.getBoundingClientRect();
      
      const ndcX = ((rect.left + rect.width / 2) - (parentRect.left + parentRect.width / 2)) / (parentRect.width / 2);
      const ndcY = -((rect.top + rect.height / 2) - (parentRect.top + parentRect.height / 2)) / (parentRect.height / 2);
      
      const vFOV = THREE.MathUtils.degToRad(camera.fov);
      const vHeight = 2 * Math.tan(vFOV / 2) * camera.position.z;
      const vWidth = vHeight * camera.aspect;
      
      baseOffsetX = ndcX * (vWidth / 2);

      if (window.innerWidth <= 1024) {
        mainLight.intensity = settings.lightIntensity * 2.8;
        spotLight.intensity = 2.8;
      } else {
        baseOffsetX -= 1.9;
        mainLight.intensity = settings.lightIntensity;
      }

      baseOffsetY = ndcY * (vHeight / 2);

      const responsiveScale = rect.width / 480;
      logoGroup.scale.setScalar(responsiveScale);
    } else {
      baseOffsetX = 0;
      baseOffsetY = 0;
      logoGroup.scale.setScalar(1);
    }

    spotLight.position.x = Math.sin(time * 0.8) * 3.5;
    spotLight.position.y = Math.cos(time * 1.1) * 2.5;

    const positionsAttr = particleGeometry.attributes.position;
    for (let i = 0; i < particleCount; i++) {
      let py = positionsAttr.getY(i);
      py -= speeds[i] * 0.2;
      if (py < -5) py = 5;
      positionsAttr.setY(i, py);

      let px = positionsAttr.getX(i);
      px += Math.sin(time + i) * 0.001;
      positionsAttr.setX(i, px);
    }
    particleGeometry.attributes.position.needsUpdate = true;

    if (settings.autoRotate) {
      logoGroup.rotation.y += settings.autoRotateSpeed * delta;
    } else {
      const targetRadY = (settings.rotationY * Math.PI) / 180;
      logoGroup.rotation.y += (targetRadY - logoGroup.rotation.y) * 0.15;
    }

    const targetRadX = (settings.rotationX * Math.PI) / 180
    if (settings.interactiveTilt) {
      const targetX = targetRadX + Math.sin(time * 0.6) * 0.18 * settings.tiltIntensity;
      logoGroup.rotation.x += (targetX - logoGroup.rotation.x) * 0.15;
      logoGroup.rotation.z = Math.cos(time * 0.8) * 0.12 * settings.tiltIntensity;
      
      logoGroup.position.y = baseOffsetY + Math.sin(time * 1.2) * 0.15;
      logoGroup.position.x = baseOffsetX + Math.cos(time * 0.5) * 0.05;
    } else {
      logoGroup.rotation.x += (targetRadX - logoGroup.rotation.x) * 0.15;
      logoGroup.rotation.z = 0;
      logoGroup.position.y = baseOffsetY;
      logoGroup.position.x = baseOffsetX;
    }

    particles.rotation.y = time * 0.02;

    renderer.render(scene, camera);
  };

  animate();

  const handleResize = () => {
    const newWidth = parentContainer.clientWidth;
    const newHeight = parentContainer.clientHeight || 500;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  const resizeObserver = new ResizeObserver(() => {
    handleResize();
  });
  resizeObserver.observe(parentContainer);
  
  const io = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
  });
  io.observe(parentContainer);

  const handleMouseMove = (e) => {
    if (!isVisible) return;
    const rect = parentContainer.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    
    settings.rotationY = 0 + x * 3; 
    settings.rotationX = 83 - y * 3;
  };
  
  window.addEventListener('mousemove', handleMouseMove);

  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animationFrameId);
    resizeObserver.disconnect();
    io.disconnect();
    window.removeEventListener('mousemove', handleMouseMove);
    scene.clear();
    renderer.dispose();
  });
}
