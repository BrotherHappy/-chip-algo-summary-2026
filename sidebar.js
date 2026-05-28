(function() {
  'use strict';

  const PAGE_NAV = {
    index: [
      { id: 'position', label: '01 · 我们所处的位置' },
      { id: 'directions', label: '02 · 四个核心方向' },
      { id: 'value-loop', label: '03 · 价值闭环' },
      { id: 'maturity', label: '04 · 成熟度状态' },
      { id: 'vision', label: '05 · 愿景与目标' },
    ],
    h1: [
      { id: 'people', label: '01 · 人物群像' },
      { id: 'projects', label: '02 · 项目地图' },
      { id: 'timeline', label: '03 · 半年时间线' },
      { id: 'galaxy', label: '04 · 协作星图' },
      { id: 'conclusions', label: '05 · 结论沉淀' },
    ],
    h2: [
      { id: 'transition', label: '01 · H2 核心转变' },
      { id: 'lanes', label: '02 · 四个方向行动' },
      { id: 'delivery-loop', label: '03 · 客户交付闭环' },
      { id: 'priority', label: '04 · 高优事项' },
      { id: 'checkpoints', label: '05 · 阶段检查点' },
    ],
    personal: [
      { id: 'slide-1', label: '01 · 封面' },
      { id: 'slide-2', label: '02 · 目录' },
      { id: 'slide-3', label: '03 · 总览' },
      { id: 'slide-5', label: '04 · 工具链' },
      { id: 'slide-6', label: '05 · 模型适配' },
      { id: 'slide-7', label: '06 · 芯片定义' },
      { id: 'slide-8', label: '07 · 前沿研究' },
      { id: 'slide-9', label: '08 · 客户交付' },
      { id: 'slide-12', label: '09 · H2 计划' },
      { id: 'slide-14', label: '10 · XH3 + 月辉' },
    ],
  };

  const page = document.body.dataset.page || '';
  const items = PAGE_NAV[page];
  if (!items) return;

  // Build sidebar
  const sidebar = document.createElement('aside');
  sidebar.className = 'page-sidebar';
  sidebar.style.cssText = 'position:fixed;left:0;top:0;width:180px;height:100vh;padding-top:88px;padding-left:20px;padding-right:12px;padding-bottom:24px;overflow-y:auto;z-index:90;pointer-events:none;';
  sidebar.innerHTML = '<nav class="page-sidebar__nav" style="pointer-events:auto;">' +
    items.map(it => `<a href="#${it.id}" class="page-sidebar__link" data-target="${it.id}" style="display:block;font-size:13px;line-height:1.5;color:rgba(255,255,255,0.45);margin-bottom:14px;padding-left:12px;border-left:2px solid rgba(255,255,255,0.08);transition:all 0.25s ease;text-decoration:none;">${it.label}</a>`).join('') +
    '</nav>';
  document.body.appendChild(sidebar);

  // Offset main content
  document.body.classList.add('has-sidebar');

  // Mobile hamburger
  const ham = document.createElement('button');
  ham.className = 'sidebar-toggle';
  ham.setAttribute('aria-label', 'Toggle navigation');
  ham.innerHTML = '<span></span><span></span><span></span>';
  document.body.appendChild(ham);

  ham.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    ham.classList.toggle('open');
  });

  // Overlay for mobile
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    ham.classList.remove('open');
  });
  document.body.appendChild(overlay);

  sidebar.addEventListener('click', (e) => {
    const a = e.target.closest('.page-sidebar__link');
    if (!a) return;
    e.preventDefault();
    let target = document.getElementById(a.dataset.target);
    if (!target && page === 'personal') {
      const num = a.dataset.target.replace('slide-', '');
      target = document.querySelector(`article[data-slide="${num}"]`);
    }
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      sidebar.classList.remove('open');
      ham.classList.remove('open');
    }
  });

  // IntersectionObserver for active highlight
  const links = sidebar.querySelectorAll('.page-sidebar__link');
  let currentActive = null;
  const ACTIVE_STYLE = 'color:#fff;border-left:3px solid transparent;border-image:linear-gradient(180deg,#a78bfa,#f472b6,#22d3ee) 1;padding-left:11px;';
  const INACTIVE_STYLE = 'color:rgba(255,255,255,0.45);border-left:2px solid rgba(255,255,255,0.08);padding-left:12px;';
  const observer = new IntersectionObserver((entries) => {
    const headerOffset = 100;
    let best = null;
    let bestDist = Infinity;
    entries.forEach(entry => {
      const rect = entry.target.getBoundingClientRect();
      const dist = Math.abs(rect.top - headerOffset);
      if (dist < bestDist) {
        bestDist = dist;
        best = entry.target;
      }
    });
    if (best) {
      links.forEach(l => {
        l.classList.remove('active');
        l.style.cssText = INACTIVE_STYLE;
      });
      let targetId = best.id;
      if (!targetId && page === 'personal') {
        targetId = 'slide-' + best.dataset.slide;
      }
      const active = sidebar.querySelector(`[data-target="${targetId}"]`);
      if (active) {
        active.classList.add('active');
        active.style.cssText = ACTIVE_STYLE;
        currentActive = active;
      }
    }
  }, { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: '-100px 0px -40% 0px' });

  items.forEach(it => {
    let el = document.getElementById(it.id);
    if (!el && page === 'personal') {
      const num = it.id.replace('slide-', '');
      el = document.querySelector(`article[data-slide="${num}"]`);
    }
    if (el) observer.observe(el);
  });
})();
