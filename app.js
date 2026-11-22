const roomData = {
  start: {
    type: "START NODE",
    code: "S-00",
    title: "入口房间",
    description: "安全教学空间。展示移动、瞄准和首个可破坏物，不放复杂敌人组合。",
    details: [
      ["敌人", "2 个低速近战单位"],
      ["奖励", "基础弹药与路线地图"],
      ["出口", "普通战斗 / 精英分支"],
      ["验收", "玩家 10 秒内完成首次射击"],
    ],
    check: "PASS",
  },
  combat: {
    type: "COMBAT NODE",
    code: "C-07",
    title: "压力测试房",
    description: "第一场真正的群怪战斗。近战敌人从正面施压，远程敌人迫使玩家更换站位。",
    details: [
      ["敌人", "4 近战 / 2 远程"],
      ["奖励", "武器或改装二选一"],
      ["出口", "通往分叉节点"],
      ["验收", "60 秒内可清场，不出现不可躲避的包围"],
    ],
    check: "PASS",
  },
  elite: {
    type: "ELITE NODE",
    code: "E-03",
    title: "精英风险房",
    description: "一只带护盾词缀的精英单位控制中央区域，周围敌人阶段性增援。",
    details: [
      ["敌人", "护盾精英 + 增援组"],
      ["奖励", "稀有改装 + 高价值资源"],
      ["出口", "可直接跳过，形成风险选择"],
      ["验收", "战斗时间 90–150 秒，奖励明显高于普通房"],
    ],
    check: "REWARD > RISK",
  },
  junction: {
    type: "JUNCTION NODE",
    code: "J-02",
    title: "路线分叉",
    description: "没有战斗的中继房。让小地图、灯光和门型在数秒内传达两条路线差异。",
    details: [
      ["敌人", "无"],
      ["奖励", "显示后续 2–3 个节点"],
      ["出口", "宝箱路线 / 商店路线"],
      ["验收", "玩家不打开大地图也能理解路线"],
    ],
    check: "CLEAR ROUTE",
  },
  treasure: {
    type: "TREASURE NODE",
    code: "T-01",
    title: "宝箱房",
    description: "低风险补给节点。玩家在有限时间与背包容量之间做选择。",
    details: [
      ["敌人", "无，或 1 个守卫"],
      ["奖励", "三选一武器部件"],
      ["出口", "汇入主路径"],
      ["验收", "奖励差异一眼可懂，不用阅读长说明"],
    ],
    check: "3 OPTIONS",
  },
  shop: {
    type: "SHOP NODE",
    code: "M-01",
    title: "黑市改造房",
    description: "消耗本轮资源购买稳定战力，帮助玩家补齐构筑短板或赌一个强力组合。",
    details: [
      ["敌人", "无"],
      ["奖励", "武器、维修、改装三栏"],
      ["出口", "汇入主路径"],
      ["验收", "资源不足时仍有至少一种有意义的操作"],
    ],
    check: "CHOICE",
  },
  rest: {
    type: "REST NODE",
    code: "R-02",
    title: "维修与改装",
    description: "Boss 前的节奏缓冲。玩家恢复部分状态并锁定一项本局强化。",
    details: [
      ["敌人", "无"],
      ["奖励", "维修或改装二选一"],
      ["出口", "Boss 房"],
      ["验收", "玩家能理解选择对 Boss 战的影响"],
    ],
    check: "PRE-BOSS",
  },
  boss: {
    type: "BOSS NODE",
    code: "B-01",
    title: "组装厂监督者",
    description: "大型机械 Boss，通过破坏地面、召唤小怪和暴露弱点改变战斗空间。",
    details: [
      ["阶段", "50% 血量后进入暴走"],
      ["机制", "弱点窗口 + 场景炮台"],
      ["奖励", "区域通行权限与研究数据"],
      ["验收", "战斗可在 3–5 分钟内读懂并完成"],
    ],
    check: "CLIMAX",
  },
};

const phaseData = [
  {
    count: "PHASE 00",
    status: "IN PROGRESS / NEXT",
    title: "方向锁定",
    summary: "把三种参考游戏收敛为一个主视角、一套循环和一个可测量范围，并建立后续所有资产与代码的验收标准。",
    items: ["一页核心 PRD", "四种视觉方向概念图", "技术原型约束与性能目标", "MVP 功能清单"],
    gates: ["能够用一句话复述游戏", "确认 3D 固定俯视 2.5D", "明确第一版不做什么", "视觉目标通过游戏尺寸检查"],
    progress: "12%",
    label: "CONCEPT",
  },
  {
    count: "PHASE 01",
    status: "NEXT AFTER CONCEPT",
    title: "房间灰盒",
    summary: "只使用带碰撞的原型几何搭建入口、战斗、分叉、休息和 Boss 房，验证玩家尺度、镜头与清房流程。",
    items: ["1 个完整区域地图", "8–10 个可步行房间", "门、出生点和刷怪点接口", "从入口到 Boss 的路线图"],
    gates: ["房间之间可双向通行", "地图无软锁", "镜头能覆盖交战区域", "不依赖正式美术也能理解空间"],
    progress: "25%",
    label: "BLOCKOUT",
  },
  {
    count: "PHASE 02",
    status: "CRITICAL GATE",
    title: "战斗垂直切片",
    summary: "制作一场 90 秒的核心战斗：玩家移动、瞄准、射击、闪避、两种敌人、掉落、HUD 和完整胜负反馈。",
    items: ["第三人称俯视控制器", "相机跟随与鼠标瞄准", "两种敌人 AI", "HUD、伤害和命中反馈"],
    gates: ["60 FPS 目标环境下运行稳定", "弹道从枪口正确命中", "敌人不会穿墙或卡死", "首次试玩可完整清房"],
    progress: "40%",
    label: "PLAYABLE",
  },
  {
    count: "PHASE 03",
    status: "ASSET PIPELINE",
    title: "角色与资产管线",
    summary: "用 Blender 完成一个可反复使用的角色生产流程，并验证从 GLB 到 Godot 动画树的完整往返。",
    items: ["主角低多边形模型", "骨架、蒙皮与三组动画", "武器挂点和碰撞代理", "GLB 导出与导入检查"],
    gates: ["比例、朝向和原点正确", "动画循环无跳帧", "材质和贴图正确落位", "在真实玩法镜头下保持可读"],
    progress: "58%",
    label: "ASSET",
  },
  {
    count: "PHASE 04",
    status: "RUN SYSTEM",
    title: "跑局与房间系统",
    summary: "把独立房间组合成可重玩的跑局，并验证地图生成、路线选择、奖励、死亡与永久成长闭环。",
    items: ["随机房间图", "清房后开门", "三选一改装", "研究资源与基地升级"],
    gates: ["每局均能到达 Boss", "不存在孤立或重复房间", "死亡与重开不会丢存档", "至少 5 局测试产生不同构筑"],
    progress: "72%",
    label: "RUN",
  },
  {
    count: "PHASE 05",
    status: "CONTENT PASS",
    title: "内容制作",
    summary: "在已经稳定的战斗和跑局结构上扩充武器、敌人、房间组合、Boss 与场景演出。",
    items: ["4 类武器", "5 类敌人", "3 个区域主题", "1 个区域 Boss"],
    gates: ["新内容不破坏既有节奏", "武器 TTK 在目标区间", "每个区域有独立视觉识别", "资源加载无明显卡顿"],
    progress: "85%",
    label: "CONTENT",
  },
  {
    count: "PHASE 06",
    status: "POLISH + QA",
    title: "打磨与验收",
    summary: "完成音效、画面反馈、设置、存档可靠性、性能分析和完整通关测试，停止增加新系统。",
    items: ["音效与混音", "画面震动和命中停顿", "完整设置与存档迁移", "性能与稳定性报告"],
    gates: ["从新档到胜利无阻断问题", "存档可连续 20 次正常读写", "目标设备达到性能预算", "所有已知严重问题清零"],
    progress: "93%",
    label: "QA",
  },
  {
    count: "PHASE 07",
    status: "SHIP",
    title: "公开构建与发布",
    summary: "导出 Windows Release 构建，准备商店页面、截图、预告素材与 AI 内容披露，并完成发布前冒烟测试。",
    items: ["Windows 发布构建", "商店页面素材", "版本说明与已知问题", "回滚包与校验文件"],
    gates: ["干净电脑可启动", "安装包包含所有资源和许可证", "存档路径正确", "发布版本可完整通关"],
    progress: "100%",
    label: "RELEASE",
  },
];

const progressBar = document.querySelector(".scroll-progress span");
const navLinks = [...document.querySelectorAll(".desktop-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateScrollUI() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  progressBar.style.width = `${Math.min(100, progress * 100)}%`;

  let current = sections[0]?.id;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= window.innerHeight * 0.34) {
      current = section.id;
    }
  }

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
window.addEventListener("resize", updateScrollUI);
updateScrollUI();

const mapNodes = [...document.querySelectorAll(".map-node")];
const roomType = document.querySelector(".room-type");
const roomCode = document.querySelector(".room-code");
const roomTitle = document.querySelector(".room-panel h3");
const roomDescription = document.querySelector(".room-panel > p");
const roomDetails = document.querySelector(".room-panel dl");
const roomGate = document.querySelector(".room-gate strong");

function renderRoom(key) {
  const room = roomData[key];
  if (!room) return;
  roomType.textContent = room.type;
  roomCode.textContent = room.code;
  roomTitle.textContent = room.title;
  roomDescription.textContent = room.description;
  roomDetails.innerHTML = room.details
    .map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`)
    .join("");
  roomGate.textContent = room.check;
  mapNodes.forEach((node) => node.classList.toggle("active", node.dataset.room === key));
}

mapNodes.forEach((node) => {
  node.addEventListener("click", () => renderRoom(node.dataset.room));
});

const phaseButtons = [...document.querySelectorAll(".phase-button")];
const phaseStatus = document.querySelector("[data-phase-status]");
const phaseCount = document.querySelector("[data-phase-count]");
const phaseTitle = document.querySelector("[data-phase-title]");
const phaseSummary = document.querySelector("[data-phase-summary]");
const phaseItems = document.querySelector("[data-phase-items]");
const phaseGates = document.querySelector("[data-phase-gates]");
const phaseProgress = document.querySelector("[data-phase-progress]");
const phaseProgressLabel = document.querySelector("[data-phase-progress-label]");

function renderPhase(index) {
  const phase = phaseData[index];
  phaseStatus.textContent = phase.status;
  phaseCount.textContent = phase.count;
  phaseTitle.textContent = phase.title;
  phaseSummary.textContent = phase.summary;
  phaseItems.innerHTML = phase.items.map((item) => `<li>${item}</li>`).join("");
  phaseGates.innerHTML = phase.gates.map((item) => `<li>${item}</li>`).join("");
  phaseProgress.style.width = phase.progress;
  phaseProgressLabel.textContent = phase.label;
  phaseButtons.forEach((button, buttonIndex) => {
    const active = buttonIndex === index;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
}

phaseButtons.forEach((button) => {
  button.addEventListener("click", () => renderPhase(Number(button.dataset.phase)));
});

document.addEventListener("keydown", (event) => {
  if (!["ArrowUp", "ArrowDown"].includes(event.key)) return;
  const activeButton = document.querySelector(".phase-button.active");
  if (!activeButton) return;
  event.preventDefault();
  const current = Number(activeButton.dataset.phase);
  const next =
    event.key === "ArrowDown"
      ? Math.min(phaseData.length - 1, current + 1)
      : Math.max(0, current - 1);
  renderPhase(next);
  phaseButtons[next].focus();
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotion) {
  const reveals = document.querySelectorAll(
    ".dna-card, .promise, .loop-card, .map-workbench, .tech-layout, .art-grid > *, .roadmap-layout, .scope-board, .done-grid article"
  );
  reveals.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(18px)";
    element.style.transition = "opacity 480ms ease, transform 480ms ease";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach((element) => observer.observe(element));
}
