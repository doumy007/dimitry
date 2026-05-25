// === THREE.JS PROCESSOR NETWORK ===
(function initProcessorNetwork() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const colorNeon = new THREE.Color('#00f0ff');
    const colorPurple = new THREE.Color('#7b2ff7');

    // === CPU NODOS ===
    const nodePositions = [];
    const nodeCount = 30;
    const nodeGroup = new THREE.Group();
    const nodeMeshes = [];

    const cpuGeo = new THREE.BoxGeometry(0.12, 0.12, 0.03);
    const cpuMat = new THREE.MeshBasicMaterial({ color: colorNeon, transparent: true, opacity: 0.7 });

    for (let i = 0; i < nodeCount; i++) {
        const x = (Math.random() - 0.5) * 16;
        const y = (Math.random() - 0.5) * 10;
        const z = (Math.random() - 0.5) * 6;

        nodePositions.push({ x, y, z, ox: x, oy: y, oz: z });

        const cpu = new THREE.Mesh(cpuGeo, cpuMat.clone());
        cpu.position.set(x, y, z);
        cpu.userData = {
            phase: Math.random() * Math.PI * 2,
            speed: 0.2 + Math.random() * 0.3,
            pulsePhase: Math.random() * Math.PI * 2,
            baseOpacity: 0.4 + Math.random() * 0.4,
        };
        nodeGroup.add(cpu);
        nodeMeshes.push(cpu);

        const glowGeo = new THREE.SphereGeometry(0.06, 8, 8);
        const glowMat = new THREE.MeshBasicMaterial({
            color: i % 2 === 0 ? colorNeon : colorPurple,
            transparent: true,
            opacity: 0.25,
        });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        glow.position.set(x, y, z);
        nodeGroup.add(glow);
    }
    scene.add(nodeGroup);

    // === LÍNEAS DE CONEXIÓN ===
    const lineMaterial = new THREE.LineBasicMaterial({
        color: colorNeon,
        transparent: true,
        opacity: 0.1,
    });

    const linePairs = [];
    for (let i = 0; i < nodePositions.length; i++) {
        for (let j = i + 1; j < nodePositions.length; j++) {
            const a = nodePositions[i];
            const b = nodePositions[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dz = a.z - b.z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dist < 4 && Math.random() < 0.15) {
                linePairs.push({ i, j, dist });
            }
        }
    }

    const lineGeos = [];
    const lineMeshes = [];
    linePairs.forEach((pair, idx) => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(6);
        const a = nodePositions[pair.i];
        const b = nodePositions[pair.j];
        positions[0] = a.x; positions[1] = a.y; positions[2] = a.z;
        positions[3] = b.x; positions[4] = b.y; positions[5] = b.z;
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const mat = lineMaterial.clone();
        mat.opacity = 0.05 + Math.random() * 0.1;
        const line = new THREE.Line(geo, mat);
        line.userData.pair = pair;
        line.userData.baseOpacity = mat.opacity;
        scene.add(line);
        lineGeos.push(geo);
        lineMeshes.push(line);
    });

    // === PARTÍCULAS VIAJERAS (data pulses) ===
    const pulseCount = 15;
    const pulseGeo = new THREE.BufferGeometry();
    const pulsePos = new Float32Array(pulseCount * 3);
    const pulseSizes = new Float32Array(pulseCount);
    const pulseData = [];

    for (let i = 0; i < pulseCount; i++) {
        const pair = linePairs[Math.floor(Math.random() * linePairs.length)];
        pulseData.push({
            pairIdx: Math.floor(Math.random() * linePairs.length),
            t: Math.random(),
            speed: 0.002 + Math.random() * 0.004,
            wait: Math.random() * 500,
            phase: Math.random() * Math.PI * 2,
        });
        pulseSizes[i] = 0.04 + Math.random() * 0.04;
    }
    pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePos, 3));

    const pulseMat = new THREE.PointsMaterial({
        color: colorNeon,
        size: 0.06,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
    });
    const pulseMesh = new THREE.Points(pulseGeo, pulseMat);
    scene.add(pulseMesh);

    // === MOUSE ===
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let mouseTimer = 0;

    document.addEventListener('mousemove', (event) => {
        mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
        mouseTimer = 60;
    });

    camera.position.z = 9;

    let frame = 0;

    function animate() {
        requestAnimationFrame(animate);
        frame++;

        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;
        if (mouseTimer > 0) mouseTimer--;

        const mouseStrength = mouseTimer > 0 ? 1 : 0.2;

        // Update node positions with mouse attraction
        nodeMeshes.forEach((cpu, i) => {
            const data = cpu.userData;
            const orig = nodePositions[i];

            const waveX = Math.sin(frame * 0.002 + data.phase) * 0.3;
            const waveY = Math.cos(frame * 0.0015 + data.phase * 1.3) * 0.2;
            const waveZ = Math.sin(frame * 0.001 + data.phase * 0.7) * 0.15;

            const mx = mouse.x * 2 * mouseStrength;
            const my = mouse.y * 1.5 * mouseStrength;
            const attractX = (mx - orig.x - waveX) * 0.01 * mouseStrength;
            const attractY = (my - orig.y - waveY) * 0.01 * mouseStrength;

            cpu.position.x = orig.x + waveX + attractX * 1.5;
            cpu.position.y = orig.y + waveY + attractY * 1.5;
            cpu.position.z = orig.z + waveZ + attractX * 0.3;

            const pulse = Math.sin(frame * 0.03 + data.pulsePhase) * 0.5 + 0.5;
            cpu.material.opacity = data.baseOpacity * (0.5 + pulse * 0.5);
            cpu.material.color.lerp(colorPurple, pulse * 0.3);
        });

        // Update line positions
        lineMeshes.forEach((line) => {
            const pair = line.userData.pair;
            const a = nodeMeshes[pair.i].position;
            const b = nodeMeshes[pair.j].position;
            const pos = line.geometry.attributes.position;
            pos.array[0] = a.x; pos.array[1] = a.y; pos.array[2] = a.z;
            pos.array[3] = b.x; pos.array[4] = b.y; pos.array[5] = b.z;
            pos.needsUpdate = true;

            const opacity = line.userData.baseOpacity + mouseStrength * 0.08;
            line.material.opacity = Math.min(opacity, 0.4);
            line.material.color.lerp(colorPurple, (Math.sin(frame * 0.005 + pair.i) * 0.5 + 0.5) * 0.3);
        });

        // Update traveling particles
        const pulsePosAttr = pulseMesh.geometry.attributes.position;
        for (let i = 0; i < pulseCount; i++) {
            const pd = pulseData[i];
            if (pd.wait > 0) {
                pd.wait -= 1;
                pulsePosAttr.array[i * 3] = -100;
                pulsePosAttr.array[i * 3 + 1] = -100;
                pulsePosAttr.array[i * 3 + 2] = -100;
                continue;
            }

            pd.t += pd.speed * (1 + mouseStrength * 0.5);
            if (pd.t >= 1) {
                pd.t = 0;
                pd.pairIdx = Math.floor(Math.random() * linePairs.length);
                pd.wait = 100 + Math.random() * 300;
            }

            const pair = linePairs[pd.pairIdx];
            if (pair) {
                const a = nodeMeshes[pair.i].position;
                const b = nodeMeshes[pair.j].position;
                pulsePosAttr.array[i * 3] = a.x + (b.x - a.x) * pd.t;
                pulsePosAttr.array[i * 3 + 1] = a.y + (b.y - a.y) * pd.t;
                pulsePosAttr.array[i * 3 + 2] = a.z + (b.z - a.z) * pd.t;
            }
        }
        pulsePosAttr.needsUpdate = true;

        // Rotate entire scene slowly
        nodeGroup.rotation.x += mouse.y * 0.0005;
        nodeGroup.rotation.y += mouse.x * 0.0005;

        const p = pulseMesh.material;
        p.opacity = 0.3 + Math.sin(frame * 0.02) * 0.2;

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
})();

// === TYPING EFFECT ===
(function initTyping() {
    const el = document.getElementById('typingText');
    if (!el) return;

    const phrases = [
        'IT Manager & Developer',
        'Apasionado por la IA',
        'Especialista en RAG',
        'Automatización TI',
        'Java • C • PHP • Python',
        'Angular & JavaScript',
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            currentText = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        el.textContent = currentText;

        let delay = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentPhrase.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 500;
        }

        setTimeout(type, delay);
    }

    type();
})();

// === NAVBAR SCROLL EFFECT ===
(function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
})();

// === MOBILE NAV TOGGLE ===
(function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');

    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        links.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            links.classList.remove('open');
        });
    });
})();

// === SKILL CARDS 3D TILT ===
(function initSkillTilt() {
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
})();

// === SCROLL REVEAL ANIMATION ===
(function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        if (section.id !== 'hero') {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        }
    });
})();
