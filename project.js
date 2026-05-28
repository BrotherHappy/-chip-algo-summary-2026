// 项目详情页
(function () {
  const D = window.__DATA__;
  const { PEOPLE, PROJECTS, CATEGORIES, RELATIONS } = D;

  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const project = PROJECTS.find(p => p.id === id);

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

  if (!project) {
    document.querySelector('main').innerHTML = '<p class="empty">未找到该项目，请返回 <a href="index.html">首页</a>。</p>';
    return;
  }

  const cat = CATEGORIES.find(c => c.id === project.category);
  const monthLabel = { '2026-01': '1 月', '2026-02': '2 月', '2026-03': '3 月', '2026-04': '4 月', '2026-05': '5 月' };
  const relationTypeLabel = {
    depends_on: '依赖',
    shared_tooling: '共用工具',
    shared_model_family: '同模型家族',
    customer_driven: '客户驱动',
    feeds_into: '产出复用',
    parallel_track: '并行推进'
  };

  document.title = `${project.title} · 后摩智能 2026 H1`;
  $('#crumb-cat').textContent = cat ? cat.title : '';
  $('#crumb-title').textContent = project.title;
  $('#proj-cat').textContent = cat ? cat.title : '';
  $('#proj-cat').style.color = cat ? cat.color : '';
  $('#proj-title').textContent = project.title;
  $('#proj-summary').textContent = project.summary;

  const meta = $('#proj-meta');
  meta.appendChild(el('span', {}, [
    el('span', { class: 'proj-card__status', 'data-status': project.status, style: 'margin-right:8px' }, project.status)
  ]));
  meta.appendChild(el('span', {}, `时间：${project.months.map(m => monthLabel[m]).join(' · ')}`));
  meta.appendChild(el('span', {}, `参与成员：${project.members.length} 位`));

  const tagsRow = $('#proj-tags');
  project.tags.forEach(t => tagsRow.appendChild(el('span', { class: 'tag' }, t)));

  // ===== Highlights =====
  const hl = $('#proj-highlights');
  if (!project.highlights || project.highlights.length === 0) {
    hl.appendChild(el('li', {}, '暂无具体进展记录。'));
  }
  (project.highlights || []).forEach(h => hl.appendChild(el('li', {}, h)));

  // ===== Relations =====
  const relsRoot = $('#proj-relations');
  const relsAll = RELATIONS.filter(r => r.from === project.id || r.to === project.id);
  if (relsAll.length === 0) {
    relsRoot.appendChild(el('li', {}, '暂无与其他项目的明确关联。'));
  }
  relsAll.forEach(r => {
    const otherId = r.from === project.id ? r.to : r.from;
    const other = PROJECTS.find(p => p.id === otherId);
    const direction = r.from === project.id ? '→' : '←';
    const label = relationTypeLabel[r.type] || r.type;
    relsRoot.appendChild(el('li', {}, [
      el('strong', { style: 'color:var(--c-tool); font-weight:600' }, `${label} ${direction} `),
      other
        ? el('a', { href: `project.html?id=${other.id}` }, other.title)
        : el('span', {}, otherId),
      el('span', { style: 'color:var(--ink-3); display:block; font-size:13px; margin-top:4px;' }, r.reason)
    ]));
  });

  // ===== Members =====
  const membersRoot = $('#proj-members');
  if (project.members.length === 0) {
    membersRoot.appendChild(el('li', {}, [el('span', { class: 'empty' }, '暂无成员归因，待人工补充。')]));
  }
  project.members.forEach(mid => {
    const p = PEOPLE.find(x => x.id === mid);
    if (!p) return;
    membersRoot.appendChild(el('li', {}, [
      el('img', { class: 'mini-avatar', src: p.avatar, alt: p.name }),
      el('a', { href: `person.html?id=${p.id}` }, p.name),
      el('span', { class: 'collab-list__count' }, p.keywords.slice(0, 2).join(' · '))
    ]));
  });
})();
