// 个人详情页
(function () {
  const D = window.__DATA__;
  const { PEOPLE, PROJECTS, CATEGORIES, TIMELINE } = D;

  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const person = PEOPLE.find(p => p.id === id);

  const $ = sel => document.querySelector(sel);
  const el = (tag, attrs = {}, children = []) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') n.className = v;
      else if (k === 'html') n.innerHTML = v;
      else n.setAttribute(k, v);
    }
    for (const c of [].concat(children)) {
      if (c == null) continue;
      n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    }
    return n;
  };

  if (!person) {
    document.querySelector('main').innerHTML = '<p class="empty">未找到该成员，请返回 <a href="index.html">首页</a>。</p>';
    return;
  }

  const monthOrder = ['2026-01', '2026-02', '2026-03', '2026-04', '2026-05'];
  const monthLabel = { '2026-01': '1 月', '2026-02': '2 月', '2026-03': '3 月', '2026-04': '4 月', '2026-05': '5 月' };

  // ===== Hero =====
  document.title = `${person.name} · 后摩智能 2026 H1`;
  $('#crumb-name').textContent = person.name;
  $('#person-avatar').src = person.avatar;
  $('#person-avatar').alt = person.name;
  $('#person-name').textContent = person.name;
  $('#person-summary').textContent = person.summary;
  const kw = $('#person-keywords');
  person.keywords.forEach(k => kw.appendChild(el('span', { class: 'tag tag--solid' }, k)));

  // ===== Highlights =====
  const hl = $('#person-highlights');
  person.highlights.forEach(h => hl.appendChild(el('li', {}, h)));

  // ===== Projects =====
  const myProjects = PROJECTS.filter(p => p.members.includes(person.id));
  $('#person-projcount').textContent = `${myProjects.length} 个项目`;
  const projGrid = $('#person-projects');
  if (myProjects.length === 0) {
    projGrid.appendChild(el('p', { class: 'empty' }, '暂无项目记录'));
  }
  myProjects.forEach(pr => {
    const cat = CATEGORIES.find(c => c.id === pr.category);
    const card = el('a', { href: `project.html?id=${pr.id}`, class: 'proj-card' }, [
      el('div', { class: 'proj-card__head' }, [
        el('h4', { class: 'proj-card__title' }, pr.title),
        el('span', { class: 'proj-card__status', 'data-status': pr.status }, pr.status)
      ]),
      el('p', { class: 'proj-card__summary' }, pr.summary),
      el('div', { class: 'proj-card__meta' }, [
        el('span', { style: `color:${cat ? cat.color : 'var(--ink-3)'}` }, cat ? cat.title : ''),
        el('span', {}, pr.months.map(m => m.slice(5)).join(' · '))
      ])
    ]);
    projGrid.appendChild(card);
  });

  // ===== Collaborators =====
  const collabCount = {};
  myProjects.forEach(pr => {
    pr.members.forEach(mid => {
      if (mid === person.id) return;
      collabCount[mid] = (collabCount[mid] || 0) + 1;
    });
  });
  const collabList = $('#person-collabs');
  const collabs = Object.entries(collabCount)
    .sort((a, b) => b[1] - a[1])
    .map(([mid, n]) => ({ person: PEOPLE.find(p => p.id === mid), count: n }))
    .filter(x => x.person);
  if (collabs.length === 0) {
    collabList.appendChild(el('li', {}, [el('span', { class: 'empty' }, '暂无项目证据的协作记录')]));
  }
  collabs.forEach(c => {
    collabList.appendChild(el('li', {}, [
      el('img', { class: 'mini-avatar', src: c.person.avatar, alt: c.person.name }),
      el('a', { href: `person.html?id=${c.person.id}` }, c.person.name),
      el('span', { class: 'collab-list__count' }, `共同参与 ${c.count} 项`)
    ]));
  });

  // ===== Months footprint =====
  const monthsRoot = $('#person-months');
  const monthCounts = {};
  monthOrder.forEach(m => monthCounts[m] = 0);
  myProjects.forEach(pr => pr.months.forEach(m => { if (monthCounts[m] != null) monthCounts[m]++; }));
  monthOrder.forEach(m => {
    const n = monthCounts[m];
    monthsRoot.appendChild(el('li', {}, [
      el('span', { style: 'font-family:var(--font-mono); color:var(--ink-3); font-size:13px;' }, monthLabel[m]),
      el('span', { class: 'collab-list__count' }, `${n} 个项目活跃`)
    ]));
  });
})();
