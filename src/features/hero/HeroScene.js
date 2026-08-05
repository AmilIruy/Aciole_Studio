import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Hero scene configuration
const heroSceneSettings = {
  primaryColor: 'rgba(255, 255, 255, 1)', // blue-light
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
  const canvasElement = document.getElementById('hero-canvas');
  if (!canvasElement) return;

  const heroSection = document.getElementById('hero');
  
  const width = heroSection.clientWidth;
  const height = heroSection.clientHeight || 500;

  // Create Scene
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2('rgba(85, 74, 153, 1)', 0.1);

  // Create Camera
  const camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 500);
  camera.position.set(0, 0, 8);

  // Create Renderer
  const renderer = new THREE.WebGLRenderer({ canvas: canvasElement, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  // Lights Setup
  const ambientLight = new THREE.AmbientLight(heroSceneSettings.ambientColor, 2);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, heroSceneSettings.lightIntensity);
  mainLight.position.set(20, 12, 20);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 1024;
  mainLight.shadow.mapSize.height = 1024;
  scene.add(mainLight);

  // Dynamic Colored Spotlight
  const spotLight = new THREE.SpotLight(heroSceneSettings.primaryColor, 4, 15, Math.PI / 4, 0.5, 1);
  spotLight.position.set(0, 0, 4);
  scene.add(spotLight);

  // Create Groups
  const sceneGroup = new THREE.Group();
  scene.add(sceneGroup);

  const heroModelGroup = new THREE.Group();
  sceneGroup.add(heroModelGroup);

  // Background particles
  const particleCount = heroSceneSettings.particleCount;
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleSpeeds = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 25;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 15;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    particleSpeeds[i] = 0.01 + Math.random() * 0.02;
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMaterial = new THREE.PointsMaterial({
    color: new THREE.Color(heroSceneSettings.particleColor),
    size: 0.08,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
  });

  const particleField = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particleField);

  const updateHeroModelMaterials = (object) => {
    let meshIndex = 0;
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        meshIndex++;

        const isPrimary = meshIndex % 2 !== 0;
        const activeColor = isPrimary ? heroSceneSettings.primaryColor : heroSceneSettings.secondaryColor;
        
        child.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(activeColor),
          roughness: heroSceneSettings.roughness,
          metalness: heroSceneSettings.metalness,
          wireframe: heroSceneSettings.wireframe,
          clearcoat: 0.2,
          clearcoatRoughness: 0.2,
        });
      }
    });
  };


  const loadHeroModel = (url) => {
    while (heroModelGroup.children.length > 0) {
      heroModelGroup.remove(heroModelGroup.children[0]);
    }

    const loader = new GLTFLoader();
    loader.load(
      url,
      (gltf) => {
        const heroModel = gltf.scene;
        
        const modelBounds = new THREE.Box3().setFromObject(heroModel);
        const modelSize = modelBounds.getSize(new THREE.Vector3());
        const maxModelDimension = Math.max(modelSize.x, modelSize.y, modelSize.z);
        const modelScaleFactor = (3.2 / maxModelDimension) * heroSceneSettings.scale;
        heroModel.scale.setScalar(modelScaleFactor);
        
        modelBounds.setFromObject(heroModel);
        const center = modelBounds.getCenter(new THREE.Vector3());
        heroModel.position.sub(center);

        heroModel.position.y += 0.8;

        updateHeroModelMaterials(heroModel);
        heroModelGroup.add(heroModel);
      },
      undefined,
      (err) => {
        console.error('Error loading GLTF model:', err);
      }
    );
  };

  loadHeroModel(new URL('../../assets/Logo3d.glb', import.meta.url).href);

  let animationFrameId;
  let previousTime = performance.now();
  let elapsedTime = 0;
  let isVisible = true;

  let baseOffsetX = 0;

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    
    if (!isVisible) return; 

    const now = performance.now();
    const delta = (now - previousTime) / 1000;
    previousTime = now;
    elapsedTime += delta;
    const time = elapsedTime;

    let baseOffsetY = 0;

    // Dynamically calculate offset and scale based on the invisible .hero-image layout div
    const heroImageEl = document.querySelector('.hero-image');
    if (heroImageEl) {
      const rect = heroImageEl.getBoundingClientRect();
      const heroSectionRect = heroSection.getBoundingClientRect();
      
      const ndcX = ((rect.left + rect.width / 2) - (heroSectionRect.left + heroSectionRect.width / 2)) / (heroSectionRect.width / 2);
      const ndcY = -((rect.top + rect.height / 2) - (heroSectionRect.top + heroSectionRect.height / 2)) / (heroSectionRect.height / 2);
      
      const vFOV = THREE.MathUtils.degToRad(camera.fov);
      const vHeight = 2 * Math.tan(vFOV / 2) * camera.position.z;
      const vWidth = vHeight * camera.aspect;
      
      baseOffsetX = ndcX * (vWidth / 2);

      if (window.innerWidth <= 1024) {
        mainLight.intensity = heroSceneSettings.lightIntensity * 2.8;
        spotLight.intensity = 2.8;
      } else {
        baseOffsetX -= 1.9;
        mainLight.intensity = heroSceneSettings.lightIntensity;
      }

      baseOffsetY = ndcY * (vHeight / 2);

      const responsiveScale = rect.width / 480;
      heroModelGroup.scale.setScalar(responsiveScale);
    } else {
      baseOffsetX = 0;
      baseOffsetY = 0;
      heroModelGroup.scale.setScalar(1);
    }

    spotLight.position.x = Math.sin(time * 0.8) * 3.5;
    spotLight.position.y = Math.cos(time * 1.1) * 2.5;

    const positionsAttr = particleGeometry.attributes.position;
    for (let i = 0; i < particleCount; i++) {
      let py = positionsAttr.getY(i);
      py -= particleSpeeds[i] * 0.2;
      if (py < -5) py = 5;
      positionsAttr.setY(i, py);

      let px = positionsAttr.getX(i);
      px += Math.sin(time + i) * 0.001;
      positionsAttr.setX(i, px);
    }
    particleGeometry.attributes.position.needsUpdate = true;

    if (heroSceneSettings.autoRotate) {
      heroModelGroup.rotation.y += heroSceneSettings.autoRotateSpeed * delta;
    } else {
      const targetRadY = (heroSceneSettings.rotationY * Math.PI) / 180;
      heroModelGroup.rotation.y += (targetRadY - heroModelGroup.rotation.y) * 0.15;
    }

    const targetRadX = (heroSceneSettings.rotationX * Math.PI) / 180;
    if (heroSceneSettings.interactiveTilt) {
      const targetX = targetRadX + Math.sin(time * 0.6) * 0.18 * heroSceneSettings.tiltIntensity;
      heroModelGroup.rotation.x += (targetX - heroModelGroup.rotation.x) * 0.15;
      heroModelGroup.rotation.z = Math.cos(time * 0.8) * 0.12 * heroSceneSettings.tiltIntensity;
      
      heroModelGroup.position.y = baseOffsetY + Math.sin(time * 1.2) * 0.15;
      heroModelGroup.position.x = baseOffsetX + Math.cos(time * 0.5) * 0.05;
    } else {
      heroModelGroup.rotation.x += (targetRadX - heroModelGroup.rotation.x) * 0.15;
      heroModelGroup.rotation.z = 0;
      heroModelGroup.position.y = baseOffsetY;
      heroModelGroup.position.x = baseOffsetX;
    }

    particleField.rotation.y = time * 0.02;

    renderer.render(scene, camera);
  };

  animate();

  const handleResize = () => {
    const newWidth = heroSection.clientWidth;
    const newHeight = heroSection.clientHeight || 500;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  const resizeObserver = new ResizeObserver(() => {
    handleResize();
  });
  resizeObserver.observe(heroSection);
  
  const io = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
  });
  io.observe(heroSection);

  const handleMouseMove = (e) => {
    if (!isVisible) return;
    const rect = heroSection.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    
    heroSceneSettings.rotationY = 0 + x * 3;
    heroSceneSettings.rotationX = 83 - y * 3;
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
