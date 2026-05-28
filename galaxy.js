// 协作星图：3D Force Galaxy + SVG 降级
(function () {
  const container = document.getElementById('galaxy-canvas');
  if (!container) return;

  const D = window.__DATA__;
  const { PEOPLE, PROJECTS, CATEGORIES } = D;

  const CAT_COLORS = {
    'xh2-model-ecosystem': '#86efac',
    'quant-toolchain':     '#67e8f9',
    'customer-delivery':   '#fdba74',
    'yh-xh3-codesign':     '#c4b5fd',
    'research-frontier':   '#f9a8d4'
  };
  const catColor = (id) => CAT_COLORS[id] || '#a78bfa';

  // ---- Build graph data ----
  const nodes = [
    ...PEOPLE.map(p => ({
      id: p.id,
      type: 'person',
      name: p.name,
      summary: p.summary,
      avatar: p.avatar,
      val: 18
    })),
    ...PROJECTS.map(p => ({
      id: p.id,
      type: 'project',
      name: p.title,
      category: p.category,
      catTitle: (CATEGORIES.find(c => c.id === p.category) || {}).title,
      summary: p.summary,
      status: p.status,
      val: 5
    }))
  ];
  const links = PROJECTS.flatMap(pr =>
    pr.members.map(mid => ({
      source: mid,
      target: pr.id,
      color: catColor(pr.category)
    }))
  );
  const graphData = { nodes, links };

  // ---- Render legend ----
  const legend = document.getElementById('galaxy-legend');
  if (legend) {
    CATEGORIES.forEach(cat => {
      const span = document.createElement('span');
      const dot = document.createElement('span');
      dot.className = 'legend__dot';
      dot.style.background = catColor(cat.id);
      dot.style.color = catColor(cat.id);
      span.appendChild(dot);
      span.appendChild(document.createTextNode(cat.title));
      legend.appendChild(span);
    });
    const tail = document.createElement('span');
    tail.style.marginLeft = 'auto';
    tail.style.color = 'var(--ink-4)';
    tail.textContent = '人物 = 头像球，项目 = 彩色光球';
    legend.appendChild(tail);
  }

  // ---- WebGL availability check ----
  const hasWebGL = (() => {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) { return false; }
  })();

  const THREE = window.THREE;

  if (!hasWebGL || typeof ForceGraph3D === 'undefined' || !THREE) {
    renderSVGFallback();
    return;
  }

  // ---- Avatar texture cache (round + aurora ring) ----
  const textureCache = {};
  function makeAvatarTexture(url, onReady) {
    if (textureCache[url]) { onReady(textureCache[url]); return; }
    const img = new Image();
    img.onload = () => {
      const size = 256;
      const canvas = document.createElement('canvas');
      canvas.width = size; canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.save();
      ctx.beginPath();
      ctx.arc(size/2, size/2, size/2 - 6, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, 0, 0, size, size);
      ctx.restore();
      // Aurora ring
      const ringGrad = ctx.createLinearGradient(0, 0, size, size);
      ringGrad.addColorStop(0, '#a78bfa');
      ringGrad.addColorStop(0.5, '#f472b6');
      ringGrad.addColorStop(1, '#22d3ee');
      ctx.lineWidth = 6;
      ctx.strokeStyle = ringGrad;
      ctx.beginPath();
      ctx.arc(size/2, size/2, size/2 - 4, 0, Math.PI * 2);
      ctx.stroke();
      const tex = new THREE.CanvasTexture(canvas);
      if (THREE.SRGBColorSpace) tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
      textureCache[url] = tex;
      onReady(tex);
    };
    img.onerror = () => onReady(null);
    img.src = url;
  }

  // ---- Soft radial halo texture (cached per color) ----
  const haloCache = {};
  function makeHaloTexture(hex) {
    if (haloCache[hex]) return haloCache[hex];
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
    grad.addColorStop(0,    hex + 'cc');
    grad.addColorStop(0.35, hex + '55');
    grad.addColorStop(1,    hex + '00');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    if (THREE.SRGBColorSpace) tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    haloCache[hex] = tex;
    return tex;
  }

  // ---- Initialize 3D Force Graph ----
  // controlType: 'orbit' is required — TrackballControls (the default) has no autoRotate.
  const Graph = ForceGraph3D({
    rendererConfig: { antialias: true, alpha: true },
    controlType: 'orbit'
  })(container)
    .graphData(graphData)
    .backgroundColor('rgba(0,0,0,0)')
    .showNavInfo(false)
    .nodeLabel(node =>
      node.type === 'person'
        ? `<div style="padding:4px 8px;color:#f5f3ff;font-weight:600">${node.name}</div>`
        : `<div style="padding:4px 8px;color:#f5f3ff"><div style="font-weight:600">${node.name}</div><div style="opacity:.6;font-size:11px;color:#c4b5fd">${node.catTitle || ''}</div></div>`
    )
    .linkColor(l => l.color)
    .linkOpacity(0.4)
    .linkWidth(0.6)
    .linkCurvature(0.05)
    .linkDirectionalParticles(0)
    .nodeRelSize(4)
    .cooldownTicks(150)
    .d3VelocityDecay(0.32);

  // Custom 3D node objects
  Graph.nodeThreeObject(node => {
    if (node.type === 'person') {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
        color: 0xffffff, transparent: true, opacity: 1, depthWrite: false
      }));
      sprite.scale.set(16, 16, 1);
      makeAvatarTexture(node.avatar, (tex) => {
        if (tex) {
          sprite.material.map = tex;
          sprite.material.needsUpdate = true;
        }
      });
      const halo = new THREE.Sprite(new THREE.SpriteMaterial({
        map: makeHaloTexture('#a78bfa'),
        transparent: true, opacity: 0.7,
        blending: THREE.AdditiveBlending, depthWrite: false
      }));
      halo.scale.set(34, 34, 1);
      const group = new THREE.Group();
      group.add(halo);
      group.add(sprite);
      return group;
    }
    const colorHex = catColor(node.category);
    const color = new THREE.Color(colorHex);
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(2.6, 18, 18),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95 })
    );
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeHaloTexture(colorHex),
      transparent: true, opacity: 0.85,
      blending: THREE.AdditiveBlending, depthWrite: false
    }));
    halo.scale.set(10, 10, 1);
    const group = new THREE.Group();
    group.add(halo);
    group.add(mesh);
    return group;
  });

  // ---- Hover highlight ----
  let hoverNode = null;
  const linkedLinks = new Set();
  const linkedNodeIds = new Set();
  Graph
    .onNodeHover(node => {
      hoverNode = node || null;
      linkedLinks.clear();
      linkedNodeIds.clear();
      if (hoverNode) {
        graphData.links.forEach(l => {
          const s = typeof l.source === 'object' ? l.source.id : l.source;
          const t = typeof l.target === 'object' ? l.target.id : l.target;
          if (s === hoverNode.id || t === hoverNode.id) {
            linkedLinks.add(l);
            linkedNodeIds.add(s); linkedNodeIds.add(t);
          }
        });
      }
      Graph
        .linkOpacity(l => hoverNode ? (linkedLinks.has(l) ? 0.95 : 0.04) : 0.4)
        .linkWidth(l => hoverNode && linkedLinks.has(l) ? 1.6 : 0.6);
      container.style.cursor = node ? 'pointer' : 'grab';
    })
    .onNodeClick(node => {
      if (!node) return;
      const url = node.type === 'person'
        ? `person.html?id=${node.id}`
        : `project.html?id=${node.id}`;
      window.location.href = url;
    });

  // ---- Always-on slow auto-rotation, briefly paused while user interacts ----
  // Requires controlType: 'orbit' above. three-render-objects already calls controls.update()
  // every frame, so we only need to flip autoRotate on/off based on user activity.
  let lastInteraction = 0;
  const onInteract = () => { lastInteraction = Date.now(); };
  container.addEventListener('mousedown', onInteract);
  container.addEventListener('wheel', onInteract);
  container.addEventListener('touchstart', onInteract, { passive: true });
  (function bootRotation() {
    const controls = Graph.controls();
    if (!controls || controls.autoRotate === undefined) {
      // controls not ready yet, or somehow not OrbitControls — retry shortly
      setTimeout(bootRotation, 120);
      return;
    }
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;  // ~one orbit / minute, clearly visible but unhurried
    setInterval(() => {
      controls.autoRotate = (Date.now() - lastInteraction) > 1500;
    }, 200);
  })();

  // ---- Resize handling ----
  const resize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    Graph.width(w).height(h);
  };
  window.addEventListener('resize', resize);
  setTimeout(resize, 100);

  // After initial render, zoom out a bit to see the full sphere
  setTimeout(() => {
    Graph.cameraPosition({ x: 0, y: 0, z: 320 }, undefined, 1500);
  }, 600);

  // ---- Spotlight captions: minimal title pills next to the 3-5 front-most projects ----
  const captionLayer = document.createElement('div');
  captionLayer.className = 'galaxy-captions';
  container.appendChild(captionLayer);

  const MAX_CAPTIONS = 4;
  const captionPool = [];
  for (let i = 0; i < MAX_CAPTIONS; i++) {
    const pill = document.createElement('div');
    pill.className = 'galaxy-caption';
    pill.innerHTML = '<span class="galaxy-caption__dot"></span><span class="galaxy-caption__title"></span>';
    captionLayer.appendChild(pill);
    captionPool.push({
      el:      pill,
      dot:     pill.querySelector('.galaxy-caption__dot'),
      title:   pill.querySelector('.galaxy-caption__title'),
      nodeId:  null,
      opacity: 0
    });
  }

  const tmpVec = new THREE.Vector3();
  function updateCaptions() {
    requestAnimationFrame(updateCaptions);
    const camera = Graph.camera();
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!camera || !w || !h) return;

    // Score every project node by NDC depth (smaller z = more front-facing)
    const ranked = [];
    for (const n of graphData.nodes) {
      if (n.type !== 'project') continue;
      if (n.x === undefined) continue;
      tmpVec.set(n.x, n.y, n.z);
      tmpVec.project(camera);
      if (Math.abs(tmpVec.x) > 0.92 || Math.abs(tmpVec.y) > 0.85) continue;
      ranked.push({ node: n, ndcX: tmpVec.x, ndcY: tmpVec.y, ndcZ: tmpVec.z });
    }
    ranked.sort((a, b) => a.ndcZ - b.ndcZ);
    ranked.length = Math.min(ranked.length, MAX_CAPTIONS);

    const rankedById = new Map(ranked.map(r => [r.node.id, r]));

    // Drop any slot whose node has rotated out of the spotlight (fade-out)
    for (const slot of captionPool) {
      if (slot.nodeId && !rankedById.has(slot.nodeId)) {
        slot.opacity = Math.max(0, slot.opacity - 0.04);
        slot.el.style.opacity = slot.opacity;
        if (slot.opacity === 0) slot.nodeId = null;
      }
    }

    // Bind ranked nodes that don't already have a slot to free slots
    for (const r of ranked) {
      if (captionPool.some(s => s.nodeId === r.node.id)) continue;
      const free = captionPool.find(s => s.nodeId === null);
      if (!free) continue;
      const c = catColor(r.node.category);
      free.nodeId = r.node.id;
      free.title.textContent = r.node.name;
      free.dot.style.background = c;
      free.dot.style.boxShadow = '0 0 8px ' + c;
      free.el.style.color = c;
      free.el.style.borderColor = c + '66';
    }

    // Update on-screen position and fade in
    for (const slot of captionPool) {
      if (!slot.nodeId || !rankedById.has(slot.nodeId)) continue;
      const r = rankedById.get(slot.nodeId);
      const sx = (r.ndcX + 1) * 0.5 * w;
      const sy = (1 - (r.ndcY + 1) * 0.5) * h;
      // Place pill just to the right of the node, flipping if too close to the right edge
      const pillW = slot.el.offsetWidth || 140;
      const placeRight = sx + pillW + 28 < w;
      const left = placeRight ? sx + 16 : sx - pillW - 16;
      const top  = sy - 14;
      slot.el.style.transform = 'translate(' + left + 'px, ' + top + 'px)';
      slot.opacity = Math.min(1, slot.opacity + 0.05);
      slot.el.style.opacity = slot.opacity;
    }
  }
  setTimeout(() => requestAnimationFrame(updateCaptions), 1200);

  // ---- SVG fallback ----
  function renderSVGFallback() {
    container.innerHTML = '';
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'galaxy-svg');
    svg.setAttribute('viewBox', '0 0 1200 620');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    container.appendChild(svg);

    const W = 1200, H = 620, cx = W/2, cy = H/2;
    const personR = Math.min(W, H) * 0.42;

    const personPos = {};
    PEOPLE.forEach((p, i) => {
      const a = (i / PEOPLE.length) * Math.PI * 2 - Math.PI / 2;
      personPos[p.id] = { x: cx + Math.cos(a) * personR, y: cy + Math.sin(a) * personR };
    });

    const projPos = {};
    CATEGORIES.forEach((cat, ci) => {
      const projs = PROJECTS.filter(p => p.category === cat.id);
      const ca = (ci / CATEGORIES.length) * Math.PI * 2 - Math.PI / 2;
      const cR = 165;
      const cCx = cx + Math.cos(ca) * cR;
      const cCy = cy + Math.sin(ca) * cR;
      projs.forEach((pr, pi) => {
        const ia = (pi / Math.max(projs.length, 1)) * Math.PI * 2;
        const iR = projs.length === 1 ? 0 : 22 + projs.length * 3.2;
        projPos[pr.id] = {
          x: cCx + Math.cos(ia) * iR,
          y: cCy + Math.sin(ia) * iR,
          color: catColor(cat.id)
        };
      });
    });

    PROJECTS.forEach(pr => {
      pr.members.forEach(mid => {
        if (!personPos[mid] || !projPos[pr.id]) return;
        const path = document.createElementNS(NS, 'path');
        path.setAttribute('class', 'edge');
        path.setAttribute('d', `M${personPos[mid].x},${personPos[mid].y} Q${cx},${cy} ${projPos[pr.id].x},${projPos[pr.id].y}`);
        path.setAttribute('stroke', projPos[pr.id].color);
        path.setAttribute('stroke-width', '0.8');
        svg.appendChild(path);
      });
    });

    PROJECTS.forEach(pr => {
      const pos = projPos[pr.id];
      if (!pos) return;
      const r = document.createElementNS(NS, 'rect');
      r.setAttribute('x', pos.x - 5); r.setAttribute('y', pos.y - 5);
      r.setAttribute('width', 10); r.setAttribute('height', 10);
      r.setAttribute('rx', 2);
      r.setAttribute('fill', pos.color);
      r.setAttribute('fill-opacity', '0.85');
      r.style.cursor = 'pointer';
      r.addEventListener('click', () => location.href = `project.html?id=${pr.id}`);
      const t = document.createElementNS(NS, 'title'); t.textContent = `${pr.title} · ${pr.status}`;
      r.appendChild(t);
      svg.appendChild(r);
    });

    PEOPLE.forEach(p => {
      const pos = personPos[p.id];
      const g = document.createElementNS(NS, 'g');
      g.style.cursor = 'pointer';
      g.addEventListener('click', () => location.href = `person.html?id=${p.id}`);
      const c = document.createElementNS(NS, 'circle');
      c.setAttribute('cx', pos.x); c.setAttribute('cy', pos.y); c.setAttribute('r', 28);
      c.setAttribute('fill', '#1e0a3c');
      c.setAttribute('stroke', '#a78bfa'); c.setAttribute('stroke-width', '1.8');
      g.appendChild(c);
      const txt = document.createElementNS(NS, 'text');
      txt.setAttribute('x', pos.x); txt.setAttribute('y', pos.y + 4);
      txt.setAttribute('text-anchor', 'middle');
      txt.setAttribute('font-size', '12'); txt.setAttribute('fill', '#f5f3ff');
      txt.textContent = p.name;
      g.appendChild(txt);
      svg.appendChild(g);
    });
  }
})();
