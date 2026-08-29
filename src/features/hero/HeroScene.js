import { Scene, FogExp2, PerspectiveCamera, WebGLRenderer, PCFShadowMap, AmbientLight, DirectionalLight, SpotLight, Group, BufferGeometry, BufferAttribute, PointsMaterial, Color, AdditiveBlending, Points, Mesh, MeshPhysicalMaterial, MathUtils, Box3, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const heroSceneSettings = {
  primaryColor: 'rgba(255, 255, 255, 1)',
  secondaryColor: 'rgba(255, 255, 255, 1)',
  wireframe: false,
  roughness: 0.3,
  metalness: 0.5,
  autoRotate: false,
  autoRotateSpeed: 0.7,
  interactiveTilt: true,
  tiltIntensity: 0.5,
  particleCount: 90,
  particleColor: 'rgba(85, 74, 153, 1)',
  lightIntensity: 8,
  ambientColor: 'rgba(85, 74, 153, 1)',
  showGrid: false,
  materialType: 'physical',
  scale: 2.5,
  rotationY: 0,
  rotationX: 83,
};

export function initHero3D() {
  const canvasElement = document.getElementById('hero-canvas');
  if (!canvasElement) return;

  const heroSection = document.getElementById('hero');
  const svgLogo = document.getElementById('hero-logo-svg');

  const width = heroSection.clientWidth;
  const height = heroSection.clientHeight || 500;

  
  const scene = new Scene();
  scene.fog = new FogExp2('rgba(85, 74, 153, 1)', 0.1);

  
  const camera = new PerspectiveCamera(90, width / height, 0.1, 500);
  camera.position.set(0, 0, 8);

  
  const renderer = new WebGLRenderer({ canvas: canvasElement, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;

  
  const ambientLight = new AmbientLight(heroSceneSettings.ambientColor, 2);
  scene.add(ambientLight);

  const mainLight = new DirectionalLight(0xffffff, heroSceneSettings.lightIntensity);
  mainLight.position.set(20, 1, 20);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 1024;
  mainLight.shadow.mapSize.height = 1024;
  scene.add(mainLight);

  const spotLight = new SpotLight(heroSceneSettings.primaryColor, 4, 15, Math.PI / 4, 0.5, 1);
  spotLight.position.set(0, 0, 4);
  scene.add(spotLight);

  
  const sceneGroup = new Group();
  scene.add(sceneGroup);

  const heroModelGroup = new Group();
  sceneGroup.add(heroModelGroup);

  
  const particleCount = heroSceneSettings.particleCount;
  const particleGeometry = new BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleSpeeds = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3]     = (Math.random() - 0.5) * 25;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 15;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    particleSpeeds[i] = 0.01 + Math.random() * 0.02;
  }

  particleGeometry.setAttribute('position', new BufferAttribute(particlePositions, 3));
  const particleMaterial = new PointsMaterial({
    color: new Color(heroSceneSettings.particleColor),
    size: 0.08,
    transparent: true,
    opacity: 0.4,
    blending: AdditiveBlending,
  });

  const particleField = new Points(particleGeometry, particleMaterial);
  scene.add(particleField);

  
  const updateHeroModelMaterials = (object) => {
    let meshIndex = 0;
    object.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        meshIndex++;
        const isPrimary = meshIndex % 2 !== 0;
        const activeColor = isPrimary ? heroSceneSettings.primaryColor : heroSceneSettings.secondaryColor;
        child.material = new MeshPhysicalMaterial({
          color: new Color(activeColor),
          roughness: heroSceneSettings.roughness,
          metalness: heroSceneSettings.metalness,
          wireframe: heroSceneSettings.wireframe,
          clearcoat: 0.2,
          clearcoatRoughness: 0.2,
        });
      }
    });
  };

  
  
  let layoutCache = {
    baseOffsetX: 0,
    baseOffsetY: 0,
    responsiveScale: 1,
    isWide: window.innerWidth > 1024,
  };

  const refreshLayoutCache = () => {
    const heroImageEl = heroSection.querySelector('.hero-image');
    if (!heroImageEl) return;

    const rect = heroImageEl.getBoundingClientRect();
    const heroSectionRect = heroSection.getBoundingClientRect();

    const ndcX = ((rect.left + rect.width / 2) - (heroSectionRect.left + heroSectionRect.width / 2)) / (heroSectionRect.width / 2);
    const ndcY = -(((rect.top + rect.height / 2) - (heroSectionRect.top + heroSectionRect.height / 2)) / (heroSectionRect.height / 2));

    const vFOV = MathUtils.degToRad(camera.fov);
    const vHeight = 2 * Math.tan(vFOV / 2) * camera.position.z;
    const vWidth = vHeight * camera.aspect;

    layoutCache.isWide = window.innerWidth > 1024;
    layoutCache.baseOffsetX = layoutCache.isWide
      ? ndcX * (vWidth / 2) - 1.9
      : ndcX * (vWidth / 2);
    layoutCache.baseOffsetY = ndcY * (vHeight / 2);
    layoutCache.responsiveScale = rect.width / 480;

    if (layoutCache.isWide) {
      mainLight.intensity = heroSceneSettings.lightIntensity;
      spotLight.intensity = 4;
    } else {
      mainLight.intensity = heroSceneSettings.lightIntensity * 2.8;
      spotLight.intensity = 2.8;
    }
  };

  
  let isVisible = true;
  let animationFrameId = null;

  const io = new IntersectionObserver((entries) => {
    const entry = entries[0];
    const currentlyVisible = entry.isIntersecting;

    if (currentlyVisible && !animationFrameId) {
      isVisible = true;
      previousTime = performance.now();
      
      animate();
    } else if (!currentlyVisible && animationFrameId) {
      isVisible = false;
      
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    } else {
      isVisible = currentlyVisible;
    }
  }, { threshold: 0.01 });
  io.observe(heroSection);

  
  
  
  let previousTime = performance.now();
  let elapsedTime = 0;

  const animate = () => {
    const now = performance.now();
    const delta = (now - previousTime) / 1000;
    previousTime = now;
    elapsedTime += delta;
    const time = elapsedTime;

    
    heroModelGroup.scale.setScalar(layoutCache.responsiveScale);

    
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
      heroModelGroup.position.y = layoutCache.baseOffsetY + Math.sin(time * 1.2) * 0.15;
      heroModelGroup.position.x = layoutCache.baseOffsetX + Math.cos(time * 0.5) * 0.05;
    } else {
      heroModelGroup.rotation.x += (targetRadX - heroModelGroup.rotation.x) * 0.15;
      heroModelGroup.rotation.z = 0;
      heroModelGroup.position.y = layoutCache.baseOffsetY;
      heroModelGroup.position.x = layoutCache.baseOffsetX;
    }

    particleField.rotation.y = time * 0.02;

    renderer.render(scene, camera);

    
    if (isVisible) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      animationFrameId = null;
    }
  };

  
  
  
  const loader = new GLTFLoader();
  loader.load(
    new URL('../../assets/Logo3d.glb', import.meta.url).href,
    (gltf) => {
      const heroModel = gltf.scene;

      
      const modelBounds = new Box3().setFromObject(heroModel);
      const modelSize = modelBounds.getSize(new Vector3());
      const maxModelDimension = Math.max(modelSize.x, modelSize.y, modelSize.z);
      const modelScaleFactor = (3.2 / maxModelDimension) * heroSceneSettings.scale;
      heroModel.scale.setScalar(modelScaleFactor);

      
      modelBounds.setFromObject(heroModel);
      const center = modelBounds.getCenter(new Vector3());
      heroModel.position.sub(center);
      heroModel.position.y += 0.8;

      updateHeroModelMaterials(heroModel);
      heroModelGroup.add(heroModel);

      
      refreshLayoutCache();

      
      renderer.render(scene, camera);

      
      canvasElement.classList.add('ready');
      if (svgLogo) svgLogo.classList.add('hidden');

      
      if (isVisible && !animationFrameId) {
        previousTime = performance.now();
        animate();
      }
    },
    undefined,
    (err) => {
      console.error('Erro ao carregar o modelo 3D:', err);
      
    }
  );

  
  const handleResize = () => {
    const newWidth = heroSection.clientWidth;
    const newHeight = heroSection.clientHeight || 500;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    
    refreshLayoutCache();
  };

  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(heroSection);
}
