// === THREE.JS PROCESSOR NETWORK — ULTIMATE EDITION ===
(function initProcessorNetwork() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const colorNeon = new THREE.Color('#00f0ff');
    const colorPurple = new THREE.Color('#7b2ff7');
    const colorWhite = new THREE.Color('#ffffff');

    // === CIRCUIT GRID BACKGROUND ===
    const gridHelper = new THREE.Group();
    const gridMat = new THREE.LineBasicMaterial({ color: 0x1a1a3a, transparent: true, opacity: 0.3 });
    for (let i = -8; i <= 8; i += 1.5) {
        const g1 = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(i, -5, -2), new THREE.Vector3(i, 5, -2)
        ]);
        const l1 = new THREE.Line(g1, gridMat); gridHelper.add(l1);
        const g2 = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-8, i, -2), new THREE.Vector3(8, i, -2)
        ]);
        const l2 = new THREE.Line(g2, gridMat); gridHelper.add(l2);
    }
    scene.add(gridHelper);

    // === CPU NODOS MEJORADOS ===
    const nodePositions = [];
    const nodeCount = 35;
    const nodeGroup = new THREE.Group();
    const nodeMeshes = [];
    const nodeGlows = [];
    const nodeRings = [];
    const clickFlash = [];

    for (let i = 0; i < nodeCount; i++) {
        const x = (Math.random() - 0.5) * 18;
        const y = (Math.random() - 0.5) * 12;
        const z = (Math.random() - 0.5) * 6;

        nodePositions.push({ x, y, z, ox: x, oy: y, oz: z });

        // CPU body
        const size = 0.15 + Math.random() * 0.1;
        const cpuGeo = new THREE.BoxGeometry(size, size, size * 0.2);
        const cpuMat = new THREE.MeshBasicMaterial({
            color: i % 2 === 0 ? colorNeon : colorPurple,
            transparent: true,
            opacity: 0.6,
        });
        const cpu = new THREE.Mesh(cpuGeo, cpuMat);
        cpu.position.set(x, y, z);
        cpu.userData = {
            phase: Math.random() * Math.PI * 2,
            speed: 0.15 + Math.random() * 0.4,
            pulsePhase: Math.random() * Math.PI * 2,
            baseOpacity: 0.4 + Math.random() * 0.4,
            size: size,
            flashIntensity: 0,
        };
        nodeGroup.add(cpu);
        nodeMeshes.push(cpu);

        // Core glow sphere
        const glowGeo = new THREE.SphereGeometry(size * 0.7, 12, 12);
        const glowMat = new THREE.MeshBasicMaterial({
            color: i % 2 === 0 ? colorNeon : colorPurple,
            transparent: true,
            opacity: 0.15,
        });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        glow.position.set(x, y, z);
        nodeGroup.add(glow);
        nodeGlows.push(glow);

        // Outer ring (processor detail)
        const ringGeo = new THREE.RingGeometry(size * 0.5, size * 0.8, 16);
        const ringMat = new THREE.MeshBasicMaterial({
            color: colorNeon,
            transparent: true,
            opacity: 0.2,
            side: THREE.DoubleSide,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.set(x, y, z);
        ring.rotation.x = Math.random() * Math.PI;
        ring.rotation.y = Math.random() * Math.PI;
        nodeGroup.add(ring);
        nodeRings.push(ring);

        clickFlash.push(0);
    }
    scene.add(nodeGroup);

    // === LÍNEAS DE CONEXIÓN ===
    const linePairs = [];
    for (let i = 0; i < nodePositions.length; i++) {
        for (let j = i + 1; j < nodePositions.length; j++) {
            const a = nodePositions[i];
            const b = nodePositions[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dz = a.z - b.z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dist < 4.5 && Math.random() < 0.12) {
                linePairs.push({ i, j, dist });
            }
        }
    }

    const lineMeshes = [];
    linePairs.forEach((pair) => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(6);
        const a = nodePositions[pair.i];
        const b = nodePositions[pair.j];
        positions[0] = a.x; positions[1] = a.y; positions[2] = a.z;
        positions[3] = b.x; positions[4] = b.y; positions[5] = b.z;
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const mat = new THREE.LineBasicMaterial({
            color: colorNeon,
            transparent: true,
            opacity: 0.04 + Math.random() * 0.06,
        });
        const line = new THREE.Line(geo, mat);
        line.userData.pair = pair;
        line.userData.baseOpacity = mat.opacity;
        line.userData.flashIntensity = 0;
        scene.add(line);
        lineMeshes.push(line);
    });

    // === PARTÍCULAS VIAJERAS (data pulses) ===
    const pulseCount = 20;
    const pulseGeo = new THREE.BufferGeometry();
    const pulsePos = new Float32Array(pulseCount * 3);
    const pulseData = [];

    for (let i = 0; i < pulseCount; i++) {
        pulseData.push({
            pairIdx: Math.floor(Math.random() * Math.max(linePairs.length, 1)),
            t: Math.random(),
            speed: 0.003 + Math.random() * 0.005,
            wait: Math.random() * 500,
            phase: Math.random() * Math.PI * 2,
            size: 0.04 + Math.random() * 0.06,
        });
    }
    pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePos, 3));

    const pulseMat = new THREE.PointsMaterial({
        color: colorNeon,
        size: 0.07,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
    });
    const pulseMesh = new THREE.Points(pulseGeo, pulseMat);
    scene.add(pulseMesh);

    // === BINARY FLOATING TEXT ===
    const binaryGroup = new THREE.Group();
    const binaryParticles = [];
    const binaryCount = 40;
    const binaryCanvas = document.createElement('canvas');
    binaryCanvas.width = 32;
    binaryCanvas.height = 32;
    const bCtx = binaryCanvas.getContext('2d');

    for (let i = 0; i < binaryCount; i++) {
        bCtx.clearRect(0, 0, 32, 32);
        bCtx.fillStyle = '#00f0ff';
        bCtx.font = '24px monospace';
        bCtx.textAlign = 'center';
        bCtx.textBaseline = 'middle';
        bCtx.fillText(Math.random() > 0.5 ? '1' : '0', 16, 18);

        const texture = new THREE.CanvasTexture(binaryCanvas);
        const spriteMat = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            opacity: 0.08 + Math.random() * 0.12,
            blending: THREE.AdditiveBlending,
        });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 14,
            (Math.random() - 0.5) * 8 - 1
        );
        sprite.scale.set(0.5, 0.5, 1);
        sprite.userData = {
            floatSpeed: 0.1 + Math.random() * 0.3,
            floatPhase: Math.random() * Math.PI * 2,
            rotationSpeed: 0.001 + Math.random() * 0.003,
        };
        binaryGroup.add(sprite);
        binaryParticles.push(sprite);
    }
    scene.add(binaryGroup);

    // === MOUSE & CLICK ===
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, worldX: 0, worldY: 0 };
    let mouseTimer = 0;
    let clickEffect = 0;

    document.addEventListener('mousemove', (event) => {
        mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
        mouse.worldX = (event.clientX / window.innerWidth) * 18 - 9;
        mouse.worldY = -(event.clientY / window.innerHeight) * 12 + 6;
        mouseTimer = 60;
    });

    document.addEventListener('click', (event) => {
        clickEffect = 1;

        // Ripple DOM element
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        ripple.style.left = (event.clientX - 100) + 'px';
        ripple.style.top = (event.clientY - 100) + 'px';
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);

        // Flash nodes near click
        const cx = (event.clientX / window.innerWidth) * 18 - 9;
        const cy = -(event.clientY / window.innerHeight) * 12 + 6;
        nodeMeshes.forEach((cpu, i) => {
            const d = Math.sqrt(
                (cpu.position.x - cx) ** 2 + (cpu.position.y - cy) ** 2
            );
            if (d < 3) {
                const intensity = 1 - d / 3;
                cpu.userData.flashIntensity = Math.max(cpu.userData.flashIntensity, intensity);
                clickFlash[i] = 1;
            }
        });

        // Flash lines near click
        lineMeshes.forEach((line) => {
            const pair = line.userData.pair;
            const a = nodeMeshes[pair.i].position;
            const b = nodeMeshes[pair.j].position;
            const midX = (a.x + b.x) / 2;
            const midY = (a.y + b.y) / 2;
            const d = Math.sqrt((midX - cx) ** 2 + (midY - cy) ** 2);
            if (d < 4) {
                line.userData.flashIntensity = 1 - d / 4;
            }
        });
    });

    camera.position.z = 10;

    // === RAFAELLO COORDINATES ===
    const raf = new THREE.Vector3();

    function animate() {
        requestAnimationFrame(animate);
        const frame = performance.now() / 16;

        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;
        if (mouseTimer > 0) mouseTimer--;

        const mouseStrength = mouseTimer > 0 ? 1 : 0.3;
        clickEffect *= 0.95;

        // Update CPU nodes
        nodeMeshes.forEach((cpu, i) => {
            const data = cpu.userData;
            const orig = nodePositions[i];

            const waveX = Math.sin(frame * 0.002 + data.phase) * 0.4;
            const waveY = Math.cos(frame * 0.0018 + data.phase * 1.3) * 0.3;
            const waveZ = Math.sin(frame * 0.0015 + data.phase * 0.7) * 0.2;

            const mx = mouse.x * 3 * mouseStrength;
            const my = mouse.y * 2 * mouseStrength;
            const attractX = (mx - orig.x - waveX) * 0.008 * mouseStrength;
            const attractY = (my - orig.y - waveY) * 0.008 * mouseStrength;

            cpu.position.x = orig.x + waveX + attractX * 2;
            cpu.position.y = orig.y + waveY + attractY * 2;
            cpu.position.z = orig.z + waveZ + attractX * 0.4;

            // Pulse + click flash
            const pulse = Math.sin(frame * 0.03 + data.pulsePhase) * 0.5 + 0.5;
            const flash = data.flashIntensity;
            data.flashIntensity *= 0.95;
            if (data.flashIntensity < 0.01) data.flashIntensity = 0;

            const finalOpacity = Math.min(data.baseOpacity * (0.5 + pulse * 0.5) + flash * 0.8, 1);
            cpu.material.opacity = finalOpacity;
            const lerpAmt = pulse * 0.3 + flash * 0.5;
            cpu.material.color.lerp(colorPurple, lerpAmt);
            if (flash > 0.1) cpu.material.color.lerp(colorWhite, flash * 0.3);

            // Rotate CPU
            cpu.rotation.x += 0.005 + flash * 0.05;
            cpu.rotation.y += 0.01 + flash * 0.05;
        });

        // Update glows
        nodeGlows.forEach((glow, i) => {
            const cpu = nodeMeshes[i];
            glow.position.copy(cpu.position);
            const flash = clickFlash[i] || 0;
            clickFlash[i] *= 0.92;
            if (clickFlash[i] < 0.01) clickFlash[i] = 0;
            glow.material.opacity = 0.15 + flash * 0.7;
            const s = 1 + flash * 2;
            glow.scale.set(s, s, s);
        });

        // Update rings
        nodeRings.forEach((ring, i) => {
            const cpu = nodeMeshes[i];
            ring.position.copy(cpu.position);
            ring.rotation.z += 0.005 * (1 + mouseStrength);
            ring.rotation.x += 0.003 * (1 + mouseStrength);
            ring.material.opacity = 0.15 + clickFlash[i] * 0.5;
        });

        // Update lines
        lineMeshes.forEach((line) => {
            const pair = line.userData.pair;
            const a = nodeMeshes[pair.i].position;
            const b = nodeMeshes[pair.j].position;
            const pos = line.geometry.attributes.position;
            pos.array[0] = a.x; pos.array[1] = a.y; pos.array[2] = a.z;
            pos.array[3] = b.x; pos.array[4] = b.y; pos.array[5] = b.z;
            pos.needsUpdate = true;

            const flash = line.userData.flashIntensity;
            line.userData.flashIntensity *= 0.93;
            if (line.userData.flashIntensity < 0.01) line.userData.flashIntensity = 0;

            const opacity = Math.min(line.userData.baseOpacity + mouseStrength * 0.08 + flash * 0.5, 0.5);
            line.material.opacity = opacity;
            line.material.color.lerp(colorPurple, (Math.sin(frame * 0.005 + pair.i) * 0.5 + 0.5) * 0.2 + flash * 0.5);
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

            pd.t += pd.speed * (1 + mouseStrength * 0.5 + clickEffect);
            if (pd.t >= 1) {
                pd.t = 0;
                pd.pairIdx = Math.floor(Math.random() * linePairs.length);
                pd.wait = 50 + Math.random() * 200;
            }

            const pair = linePairs[pd.pairIdx];
            if (pair && pair.i < nodeMeshes.length && pair.j < nodeMeshes.length) {
                const a = nodeMeshes[pair.i].position;
                const b = nodeMeshes[pair.j].position;
                pulsePosAttr.array[i * 3] = a.x + (b.x - a.x) * pd.t;
                pulsePosAttr.array[i * 3 + 1] = a.y + (b.y - a.y) * pd.t;
                pulsePosAttr.array[i * 3 + 2] = a.z + (b.z - a.z) * pd.t;
            }
        }
        pulsePosAttr.needsUpdate = true;

        // Binary floating
        binaryParticles.forEach((sprite, i) => {
            const ud = sprite.userData;
            sprite.position.y += Math.sin(frame * 0.005 + ud.floatPhase) * 0.002;
            sprite.position.x += Math.cos(frame * 0.003 + ud.floatPhase * 0.7) * 0.001;
            sprite.rotation.z += ud.rotationSpeed;
            sprite.material.opacity = 0.08 + mouseStrength * 0.15 + Math.sin(frame * 0.01 + ud.floatPhase) * 0.05;
        });

        // Rotate scene
        nodeGroup.rotation.x += mouse.y * 0.0008;
        nodeGroup.rotation.y += mouse.x * 0.0008;
        nodeGroup.rotation.z += Math.sin(frame * 0.0005) * 0.0001;

        gridHelper.rotation.x = nodeGroup.rotation.x * 0.3;
        gridHelper.rotation.y = nodeGroup.rotation.y * 0.3;
        gridHelper.rotation.z = nodeGroup.rotation.z * 0.3;

        binaryGroup.rotation.x = nodeGroup.rotation.x * 0.5;
        binaryGroup.rotation.y = -nodeGroup.rotation.y * 0.3;

        // Pulse material effects
        pulseMesh.material.opacity = 0.4 + Math.sin(frame * 0.02) * 0.2 + clickEffect * 0.3;
        pulseMesh.material.size = 0.06 + mouseStrength * 0.04;

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
})();

// === CUSTOM CURSOR ===
(function initCursor() {
    const cursor = document.getElementById('customCursor');
    if (!cursor) return;

    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.classList.add('clicking');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('clicking');
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';
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

// === 3D TILT EFFECT FOR ALL CARDS ===
(function initTilt3D() {
    const selectors = '.skill-card, .project-card, .news-card';
    document.querySelectorAll(selectors).forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;

            // Dynamic glow position
            const pctX = (x / rect.width) * 100;
            const pctY = (y / rect.height) * 100;
            card.style.setProperty('--glow-x', pctX + '%');
            card.style.setProperty('--glow-y', pctY + '%');
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
