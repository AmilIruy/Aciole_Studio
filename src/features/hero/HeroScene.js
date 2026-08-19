import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Hero scene configuration
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
  scale: 2.2,
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

  // ── Scene ────────────────────────────────────────────────────────────────
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2('rgba(85, 74, 153, 1)', 0.1);

  // ── Camera ───────────────────────────────────────────────────────────────
  const camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 500);
  camera.position.set(0, 0, 8);

  // ── Renderer ─────────────────────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({ canvas: canvasElement, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  // ── Lights ───────────────────────────────────────────────────────────────
  const ambientLight = new THREE.AmbientLight(heroSceneSettings.ambientColor, 2);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, heroSceneSettings.lightIntensity);
  mainLight.position.set(20, 12, 20);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 1024;
  mainLight.shadow.mapSize.height = 1024;
  scene.add(mainLight);

  const spotLight = new THREE.SpotLight(heroSceneSettings.primaryColor, 4, 15, Math.PI / 4, 0.5, 1);
  spotLight.position.set(0, 0, 4);
  scene.add(spotLight);

  // ── Groups ───────────────────────────────────────────────────────────────
  const sceneGroup = new THREE.Group();
  scene.add(sceneGroup);

  const heroModelGroup = new THREE.Group();
  sceneGroup.add(heroModelGroup);

  // ── Particles ────────────────────────────────────────────────────────────
  const particleCount = heroSceneSettings.particleCount;
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleSpeeds = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3]     = (Math.random() - 0.5) * 25;
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

  // ── Material helper ───────────────────────────────────────────────────────
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

  // ── Layout cache — calculado uma vez, atualizado somente em resize ────────
  // Evita getBoundingClientRect() e getBoundingClientRect() a cada frame.
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

    const vFOV = THREE.MathUtils.degToRad(camera.fov);
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

  // ── Visibility (IntersectionObserver — pausa/retoma RAF quando fora/entrar na tela)
  let isVisible = true;
  let animationFrameId = null;

  const io = new IntersectionObserver((entries) => {
    const entry = entries[0];
    const currentlyVisible = entry.isIntersecting;

    if (currentlyVisible && !animationFrameId) {
      isVisible = true;
      previousTime = performance.now();
      // inicia o loop de animação quando voltar a ficar visível
      animate();
    } else if (!currentlyVisible && animationFrameId) {
      isVisible = false;
      // cancela o RAF para desligar efetivamente as animações
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    } else {
      isVisible = currentlyVisible;
    }
  }, { threshold: 0.01 });
  io.observe(heroSection);

  // ── Animation loop ────────────────────────────────────────────────────────
  // O loop SÓ é iniciado após o GLB ser carregado e a cena estar pronta.
  // Isso elimina o "flash" de posição errada nos primeiros frames.
  let previousTime = performance.now();
  let elapsedTime = 0;

  const animate = () => {
    const now = performance.now();
    const delta = (now - previousTime) / 1000;
    previousTime = now;
    elapsedTime += delta;
    const time = elapsedTime;

    // Usar cache de layout — sem getBoundingClientRect por frame
    heroModelGroup.scale.setScalar(layoutCache.responsiveScale);

    // Spotlight dinâmico (calculado por frame — é apenas trig, sem layout)
    spotLight.position.x = Math.sin(time * 0.8) * 3.5;
    spotLight.position.y = Math.cos(time * 1.1) * 2.5;

    // Atualizar partículas
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

    // Rotação do modelo
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

    // Agendar próximo frame somente se a seção estiver visível
    if (isVisible) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      animationFrameId = null;
    }
  };

  // ── GLB Loader ────────────────────────────────────────────────────────────
  // O animate() só começa após o modelo estar carregado, posicionado e pronto.
  // Isso elimina o "flash" de posição errada nos primeiros frames.
  const loader = new GLTFLoader();
  loader.load(
    new URL('../../assets/Logo3d.glb', import.meta.url).href,
    (gltf) => {
      const heroModel = gltf.scene;

      // Centralizar e escalar o modelo
      const modelBounds = new THREE.Box3().setFromObject(heroModel);
      const modelSize = modelBounds.getSize(new THREE.Vector3());
      const maxModelDimension = Math.max(modelSize.x, modelSize.y, modelSize.z);
      const modelScaleFactor = (3.2 / maxModelDimension) * heroSceneSettings.scale;
      heroModel.scale.setScalar(modelScaleFactor);

      // Recentrar após o scale
      modelBounds.setFromObject(heroModel);
      const center = modelBounds.getCenter(new THREE.Vector3());
      heroModel.position.sub(center);
      heroModel.position.y += 0.8;

      updateHeroModelMaterials(heroModel);
      heroModelGroup.add(heroModel);

      // Cache de layout calculado com o modelo já em cena e o renderer configurado
      refreshLayoutCache();

      // Renderizar um frame "silencioso" para garantir que a GPU está pronta
      renderer.render(scene, camera);

      // Revelar o canvas e ocultar o SVG fallback somente depois de tudo pronto
      canvasElement.classList.add('ready');
      if (svgLogo) svgLogo.classList.add('hidden');

      // Iniciar o loop de animação somente agora se a seção estiver visível
      if (isVisible && !animationFrameId) {
        previousTime = performance.now();
        animate();
      }
    },
    undefined,
    (err) => {
      console.error('Erro ao carregar o modelo 3D:', err);
      // Em caso de erro, o SVG permanece visível (fallback garantido)
    }
  );

  // ── Resize ───────────────────────────────────────────────────────────────
  const handleResize = () => {
    const newWidth = heroSection.clientWidth;
    const newHeight = heroSection.clientHeight || 500;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Recalcular offsets de layout após resize
    refreshLayoutCache();
  };

  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(heroSection);

  // ── Mouse interaction ─────────────────────────────────────────────────────
  const handleMouseMove = (e) => {
    if (!isVisible) return;
    const rect = heroSection.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    heroSceneSettings.rotationY = 0 + x * 3;
    heroSceneSettings.rotationX = 83 - y * 3;
  };

  window.addEventListener('mousemove', handleMouseMove);

  // ── Cleanup ───────────────────────────────────────────────────────────────
  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animationFrameId);
    resizeObserver.disconnect();
    io.disconnect();
    window.removeEventListener('mousemove', handleMouseMove);
    scene.clear();
    renderer.dispose();
  });
}
