// 首页主逻辑（不含协作图，协作图见 galaxy.js）
(function () {
  const D = window.__DATA__;
  const { META, PEOPLE, CATEGORIES, PROJECTS, TIMELINE, CONCLUSIONS } = D;

  const $ = (sel) => document.querySelector(sel);
  const el = (tag, attrs = {}, children = []) => {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') node.className = v;
      else if (k === 'html') node.innerHTML = v;
      else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v);
    }
    for (const c of [].concat(children)) {
      if (c == null) continue;
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    }
    return node;
  };
  const personById = (id) => PEOPLE.find(p => p.id === id);

  const monthOrder = ['2026-01', '2026-02', '2026-03', '2026-04', '2026-05'];
  const monthLabel = { '2026-01': '1月', '2026-02': '2月', '2026-03': '3月', '2026-04': '4月', '2026-05': '5月' };
  const catKey = {
    'xh2-model-ecosystem': '',
    'quant-toolchain': 'tool',
    'customer-delivery': 'customer',
    'yh-xh3-codesign': 'yh',
    'research-frontier': 'research'
  };

  // ============ HERO ============
  $('#hero-lead').textContent = META.oneliner;
  const stats = [
    { num: PEOPLE.length, label: '在职成员' },
    { num: PROJECTS.length, label: '项目条线' },
    { num: CATEGORIES.length, label: '一级方向' },
    { num: 235, label: '飞书 Wiki 文档' },
    { num: 5, label: '月份覆盖' }
  ];
  const statsEl = $('#hero-stats');
  stats.forEach(s => {
    statsEl.appendChild(el('div', {}, [
      el('div', { class: 'hero__stat-num' }, String(s.num)),
      el('div', { class: 'hero__stat-label' }, s.label)
    ]));
  });

  // ============ PEOPLE GRID ============
  const peopleGrid = $('#people-grid');
  PEOPLE.forEach(p => {
    const projCount = PROJECTS.filter(pr => pr.members.includes(p.id)).length;
    peopleGrid.appendChild(el('a', { href: `person.html?id=${p.id}`, class: 'person-card' }, [
      el('div', { class: 'person-card__top' }, [
        el('img', { class: 'person-card__avatar', src: p.avatar, alt: p.name, loading: 'lazy' }),
        el('div', {}, [
          el('div', { class: 'person-card__name' }, p.name),
          el('div', { class: 'person-card__role' }, `参与 ${projCount} 个项目条线`)
        ])
      ]),
      el('p', { class: 'person-card__summary' }, p.summary),
      el('div', { class: 'person-card__keywords' },
        p.keywords.map(k => el('span', { class: 'kw-tag' }, k))
      )
    ]));
  });

  // ============ PROJECTS / CATEGORIES ============
  const catRoot = $('#categories');
  $('#proj-count').textContent = `共 ${PROJECTS.length} 个项目`;
  CATEGORIES.forEach(cat => {
    const projs = PROJECTS.filter(p => p.category === cat.id);
    const block = el('div', { class: 'cat-block', id: `cat-${cat.id}` }, [
      el('div', { class: 'cat-block__head' }, [
        el('div', { class: 'cat-block__bar', style: `background:${cat.color}; color:${cat.color}` }),
        el('h3', { class: 'cat-block__title' }, cat.title),
        el('span', { class: 'cat-block__count' }, `${projs.length} 项`)
      ]),
      el('p', { class: 'cat-block__desc' }, cat.description)
    ]);
    const grid = el('div', { class: 'proj-grid' });
    projs.forEach(pr => {
      const monthsEl = el('div', { class: 'proj-card__months' });
      monthOrder.forEach(m => {
        const active = pr.months.includes(m);
        const cls = `month-chip${active ? ' active ' + (catKey[cat.id] || '') : ''}`;
        monthsEl.appendChild(el('span', { class: cls.trim(), title: monthLabel[m] }, m.slice(5)));
      });
      const membersEl = el('div', { class: 'proj-card__members' });
      pr.members.slice(0, 5).forEach(mid => {
        const p = personById(mid);
        if (!p) return;
        membersEl.appendChild(el('img', { class: 'mini-avatar', src: p.avatar, alt: p.name, title: p.name }));
      });
      grid.appendChild(el('a', { href: `project.html?id=${pr.id}`, class: 'proj-card' }, [
        el('div', { class: 'proj-card__head' }, [
          el('h4', { class: 'proj-card__title' }, pr.title),
          el('span', { class: 'proj-card__status', 'data-status': pr.status }, pr.status)
        ]),
        el('p', { class: 'proj-card__summary' }, pr.summary),
        el('div', { class: 'tag-row', style: 'margin-bottom:10px' },
          pr.tags.slice(0, 4).map(t => el('span', { class: 'tag' }, t))
        ),
        el('div', { class: 'proj-card__meta' }, [monthsEl, membersEl])
      ]));
    });
    block.appendChild(grid);
    catRoot.appendChild(block);
  });

  // ============ TIMELINE ============
  const tlRoot = $('#timeline-list');
  TIMELINE.forEach(t => {
    tlRoot.appendChild(el('div', { class: 'tl-item' }, [
      el('div', { class: 'tl-item__head' }, [
        el('span', { class: 'tl-item__month' }, t.month),
        el('h3', { class: 'tl-item__title' }, t.title)
      ]),
      el('p', { class: 'tl-item__summary' }, t.summary),
      el('ul', { class: 'tl-item__list' },
        t.highlights.map(h => el('li', {}, h))
      )
    ]));
  });

  // ============ CONCLUSIONS ============
  const concRoot = $('#conclusions-list');
  CONCLUSIONS.forEach(c => concRoot.appendChild(el('li', {}, c)));

  // ============ AVATAR WALL ============
  const wall = $('#avatar-wall');
  PEOPLE.forEach(p => {
    const link = el('a', { href: `person.html?id=${p.id}` }, [
      el('img', { src: p.avatar, alt: p.name, title: p.name }),
      el('div', { class: 'name' }, p.name)
    ]);
    wall.appendChild(link);
  });

  // ============ NAV ACTIVE on scroll (only for in-page anchors) ============
  const navLinks = document.querySelectorAll('.site-nav a');
  const anchorLinks = [...navLinks].filter(a => (a.getAttribute('href') || '').startsWith('#'));
  if (anchorLinks.length > 0) {
    const sectionIds = ['people', 'projects', 'timeline', 'galaxy', 'conclusions'];
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    const onScroll = () => {
      const y = window.scrollY + 120;
      let active = sections[0];
      for (const s of sections) if (s.offsetTop <= y) active = s;
      anchorLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${active.id}`));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();
