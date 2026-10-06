/**
 * Chinese beginner coffee journey. No runtime dependencies.
 * Render states are storyboards, NOT a fluid, extraction or thermal simulation.
 * Values named `visual*` / `*01` are unitless art-direction parameters.
 * Only mass arithmetic in espressoState / finishedState represents a calculation.
 */

export const modelNotice = '操作与画面用于说明原理；变化速度、液面和颜色是教学示意，不预测真实萃取或风味';

export const sources = Object.freeze({
  cherry: { title: 'NCA · 咖啡果的结构', url: 'https://www.aboutcoffee.org/origins/what-is-coffee/' },
  processing: { title: 'NCA · 咖啡处理法', url: 'https://www.aboutcoffee.org/beans/processes/' },
  roast: { title: 'IKAWA · 烘焙入门', url: 'https://www.ikawacoffee.com/wp-content/uploads/2021/04/How-to-roast-with-IKAWA.pdf' },
  grind: { title: 'La Marzocco · 研磨粗细', url: 'https://www.lamarzocco.com/uk/en/grind-size-for-espresso/' },
  preparation: { title: 'La Marzocco · 浓缩入门', url: 'https://www.lamarzocco.com/ca/en/beginners-guide-to-espresso/' },
  espresso: { title: 'La Marzocco · 浓缩粉液比', url: 'https://www.lamarzocco.com/uk/en/using-espresso-brew-ratios/' },
  milk: { title: 'La Marzocco · 蒸汽打奶', url: 'https://www.lamarzocco.com/uk/en/steaming-milk-on-the-linea-mini/' },
  art: { title: 'La Marzocco · 拉花动作', url: 'https://www.lamarzocco.com/uk/en/how-to-pour-latte-art/' },
  milkAmount: { title: 'La Marzocco · 奶量与杯型', url: 'https://www.lamarzocco.com/uk/en/pro-tips-for-latte-art/' },
});

function deepFreeze(value) {
  Object.values(value).forEach(child => {
    if (child && typeof child === 'object' && !Object.isFrozen(child)) deepFreeze(child);
  });
  return Object.freeze(value);
}

export const stageData = deepFreeze([
  {
    id: 'cherry', title: '从一颗果实开始', kicker: '01 / 果实',
    question: '我们喝的咖啡，藏在果实的哪一层？',
    control: { type: 'range', key: 'open', label: '展开剖面观察', min: 0, max: 100, step: 1, defaultValue: 0, ends: ['完整果实', '观察两粒种子'] },
    visualEffect: {
      mode: 'named-mesh', assetKey: 'cherry-cross-section',
      nodeKeys: ['Skin_A', 'Skin_B', 'Pulp_A', 'Pulp_B', 'Mucilage_A', 'Mucilage_B', 'Parchment_A', 'Parchment_B', 'Silverskin_A', 'Silverskin_B', 'Seed_A', 'Seed_B', 'Calyx'],
      response: '果皮与果肉分开观察；两颗种子连同薄的羊皮层、黏液质和贴附银皮保留相互位置，通过观察窗区分，不把软组织整片剥成硬壳',
      restraint: '使用真实建模的剖面与实体层；不是把红色球体换成绿色椭球。典型双籽结构，不暗示每颗果实都恰好两粒',
    },
    summary: '咖啡豆，其实是咖啡果里的种子',
    explanation: '多数咖啡果有两颗种子，较平的侧面相对。外面是果皮和果肉；内侧的果胶是湿黏部分，羊皮层是每颗种子的薄壳，银皮紧贴豆体。这些组织并不是六层独立硬壳',
    sourceLinks: [sources.cherry, {title:'FAO / Codex · 咖啡组织与水洗处理',url:'https://www.fao.org/input/download/standards/11250/CXP_069e.pdf'}, {title:'Geromel 等 · 咖啡种子组织研究',url:'https://academic.oup.com/jxb/article/57/12/3243/449464'}],
  },
  {
    id: 'washed', title: '去掉果肉，留下种子', kicker: '02 / 水洗处理',
    question: '去掉果肉后，黏黏的果胶怎么离开？',
    control: {
      type: 'steps', key: 'step', label: '推进水洗处理', defaultValue: 0,
      options: [{ value: 0, label: '鲜果' }, { value: 1, label: '去果皮、果肉' }, { value: 2, label: '发酵分解果胶' }, { value: 3, label: '清水洗净' }],
    },
    visualEffect: {
      mode: 'named-mesh-and-clip', assetKey: 'washed-process',
      nodeKeys: ['Wash_Cherry', 'Wash_Pulp_Removed', 'Wash_Mucilage', 'Wash_Parchment_Beans', 'Wash_Water'],
      response: '果肉从种子旁分离；透明果胶层先残留、再变薄，清洗后留下湿的带壳豆。羊皮层始终保留',
      restraint: '固定相机拍同一批豆的变化；发酵表示果胶的分解，不把果胶当作一层硬壳剥走，也不在此处脱去羊皮层',
    },
    summary: '去果肉 → 发酵去果胶 → 清洗，羊皮层还在',
    explanation: '这里走的是一种典型水洗路线：先去果皮与果肉，再经发酵使果胶易于去除，随后洗净。现在的豆子仍带羊皮层，下一步才是干燥',
    sourceLinks: [sources.processing],
  },
  {
    id: 'dry', title: '先干燥，再脱壳', kicker: '03 / 生豆',
    question: '羊皮层什么时候才离开种子？',
    control: {
      type: 'steps', key: 'step', label: '推进干燥与脱壳', defaultValue: 0,
      options: [{ value: 0, label: '湿的带壳豆' }, { value: 1, label: '带壳干燥完成' }, { value: 2, label: '脱壳成生豆', requires: 'dryingComplete', disabledReason: '先完成带壳干燥，再脱壳' }],
    },
    visualEffect: {
      mode: 'named-mesh-and-clip', assetKey: 'parchment-to-green',
      nodeKeys: ['Dry_Parchment_Beans', 'Dry_Parchment_Shells', 'Dry_Green_Beans', 'Dry_Rake'],
      response: '晾晒床上的豆子翻动，表面由湿转干；完成干燥后羊皮壳才分开，露出青绿色生豆',
      restraint: '第 0、1 档都保留羊皮层；第 2 档的转场必须先经历干燥完成。不要让壳在晾晒时自行蒸发',
    },
    summary: '水洗豆带着羊皮层干燥，干燥后再脱壳',
    explanation: '干燥为储存做准备；脱壳移除干燥的羊皮层，得到待烘焙的生豆。这是两件先后发生的事',
    sourceLinks: [sources.processing],
  },
  {
    id: 'roast', title: '热，让香气展开', kicker: '04 / 烘焙',
    question: '生豆受热后，颜色和结构怎样改变？',
    control: {
      type: 'steps', key: 'step', label: '推进烘焙', defaultValue: 0,
      options: [{ value: 0, label: '生豆' }, { value: 1, label: '脱水转黄' }, { value: 2, label: '褐变' }, { value: 3, label: '一爆' }, { value: 4, label: '继续发展' }],
    },
    visualEffect: {
      mode: 'named-mesh-and-clip', assetKey: 'roast-development',
      nodeKeys: ['Roast_Beans', 'Roast_Drum', 'Roast_Chaff'],
      response: '同一批豆由青绿转黄、转褐；一爆时豆体略膨胀，裂隙更明显，之后颜色继续加深',
      restraint: '纹理、裂隙和形体一起变，不只叠棕色滤镜；节点并非均匀时长，不显示虚构的万能温度曲线',
    },
    summary: '烘焙会改变豆子的颜色、结构与香气',
    explanation: '一爆是烘焙中的重要标记，之后仍可继续发展。实际结果由生豆与整个加热过程共同决定；结束后还要冷却，不能只凭颜色预测味道',
    sourceLinks: [sources.roast],
  },
  {
    id: 'grind', title: '给水一条路', kicker: '05 / 研磨与压粉',
    question: '其他条件相同时，磨细一点，水通常会怎样流？',
    control: {
      type: 'steps', key: 'grind', label: '比较研磨粗细', defaultValue: 'reference',
      options: [{ value: 'coarser', label: '稍粗' }, { value: 'reference', label: '对照' }, { value: 'finer', label: '稍细' }],
      contextLabel: '固定 18 g 粉量；均匀布粉、水平压粉；机器条件相同',
    },
    visualEffect: {
      mode: 'named-mesh-and-clip', assetKey: 'grind-and-tamp',
      nodeKeys: ['Grind_Burrs', 'Grind_Grounds', 'Grind_Basket', 'Grind_Tamper'],
      response: '颗粒纹理真实变细或变粗；每次都演示相同的布粉、压粉动作，再比较水通过粉饼的相对快慢',
      restraint: '相对流速仅演示趋势，不显示预测秒数、压力或萃取率；对照不是“标准答案”，颗粒也不能随意缩放成漂浮球',
    },
    summary: '在其他条件相近时，磨细通常会增加阻力、减慢出液',
    explanation: '保持粉量和准备方式一致，才容易看懂研磨的影响。真实萃取还受布粉、通道效应与设备影响，不是越细越好',
    sourceLinks: [sources.grind, sources.preparation],
  },
  {
    id: 'espresso', title: '在这一刻停下', kicker: '06 / 浓缩萃取',
    question: '同样 18 g 咖啡粉，接到多少克浓缩时停？',
    control: { type: 'range', key: 'yieldG', label: '杯中浓缩液的目标重量', min: 18, max: 54, step: 1, defaultValue: 36, unit: 'g', ends: ['18 g', '54 g'], contextLabel: '咖啡粉固定 18 g；36 g 是入门对照点' },
    visualEffect: {
      mode: 'prerender-seek', assetKey: 'espresso-collection',
      nodeKeys: ['Espresso_Cup', 'Espresso_Surface', 'Espresso_Stream', 'Espresso_Scale'],
      response: '改变停机目标，同一支浓缩的预渲染片段在相应接液位置结束；电子秤与粉液比同时更新',
      restraint: '秤显示杯中饮液质量；画面液面不是体积换算。不要把产液量当作注水量，也不要自动判定酸、甜、苦',
    },
    summary: '18 g 粉 → 36 g 浓缩液，就是 1:2 的粉液比',
    explanation: '粉液比比较干咖啡粉与杯中浓缩液的重量，不是机器的注水量。1:2 只是常见起点，还需结合咖啡、时间和实际品尝调整',
    sourceLinks: [sources.espresso],
  },
  {
    id: 'steam', title: '让牛奶变得细腻', kicker: '07 / 打奶',
    question: '进气方式变了，奶泡会有什么不同？',
    control: {
      type: 'steps', key: 'method', label: '比较三种打奶动作', defaultValue: 'integrated',
      options: [{ value: 'little-air', label: '进气很少' }, { value: 'integrated', label: '少量进气后打旋' }, { value: 'extra-air', label: '持续较多进气' }],
      contextLabel: '三种表面质地的建模对照；切换不会修复上一壶奶',
    },
    visualEffect: {
      mode: 'named-mesh-variants', assetKey: 'milk-texture-comparison',
      nodeKeys: ['Steam_Pitcher', 'Steam_Wand', 'Steam_Milk_Surface'],
      response: '选择动作后，调整蒸汽头位置并切换对应的已建模奶面：泡沫较少、细腻有光泽、泡沫偏厚。用表面状态对比说明典型结果',
      restraint: '当前资产是静态奶面，不宣称演示真实打旋或流动奶泡。流动差异可作为以后有连续离线片段时的扩展；不靠白色球粒冒出冒充微奶泡',
    },
    summary: '拉花需要细腻、能流动的奶泡',
    explanation: '蒸汽头接近液面时引入空气，位置稍深并保持旋转有助于融合。目标是有光泽、像湿颜料一样流动的质地；奶种与设备也会改变结果',
    sourceLinks: [sources.milk, sources.art],
  },
  {
    id: 'pour', title: '高处融合，低处成形', kicker: '08 / 拉花',
    question: '为什么同样的奶，一会儿融进去，一会儿留在表面？',
    control: { type: 'range', key: 'progress', label: '亲手推进这次注奶', min: 0, max: 100, step: 1, defaultValue: 0, ends: ['高位融合', '细流收尾'], milestones: [{ value: 0, label: '高' }, { value: 35, label: '低' }, { value: 79, label: '提壶' }, { value: 86, label: '穿过' }] },
    visualEffect: {
      mode: 'prerender-seek', assetKey: 'latte-heart-pour',
      nodeKeys: ['Pour_Pitcher', 'Pour_Cup', 'Pour_Stream', 'Pour_Surface'],
      response: '拖动直接控制已烘焙的写实注奶画面：高位细流融入基底，贴近液面时白色展开，最后提壶、减小流量并穿过图案',
      restraint: '固定机位、连续液流与杯面变化须来自同一段离线渲染；不在静态咖啡上盖一张心形图。进度是动作回放，不是实时流体求解',
    },
    summary: '先高位融合，再贴面成形，最后提壶细流收尾',
    explanation: '壶嘴较高时牛奶融入咖啡；靠近液面并适当增大流量时，白色更容易留在表面。杯子将满时收细液流，提壶后穿过图案',
    sourceLinks: [sources.art],
  },
  {
    id: 'finished', title: '把这一杯，调成你的', kicker: '09 / 完成',
    question: '同一份浓缩，加奶多少会改变什么？',
    control: {
      type: 'steps', key: 'milkG', label: '重新比较一杯的加奶量', defaultValue: 120,
      options: [{ value: 90, label: '90 g 奶' }, { value: 120, label: '120 g 奶' }, { value: 150, label: '150 g 奶' }],
      contextLabel: '保留第 6 步的浓缩液重量；参考成品杯不代表每一种配方',
    },
    visualEffect: {
      mode: 'reference-scene-and-mass-comparison', assetKey: 'finished-reference-cup',
      nodeKeys: ['Final_Cup', 'Final_Surface', 'Final_Saucer', 'Final_Pitcher'],
      response: '保留同一个明确标注的参考成品杯。选择奶量后，旁边的重量组成条与总重更新，让浓缩饮液占比的变化可见',
      restraint: '没有配套成品渲染时，不让参考杯液面、心形或颜色随配方假装变化。重量条是算术示意；占比不是 TDS、萃取率或风味评分',
    },
    summary: '浓缩不变，奶越多，浓缩饮液占整杯的比例越小',
    explanation: '这是按加入杯中的饮液重量做的比较，不是在预测甜度或香气。你已经知道咖啡种子怎样变成杯中的饮液；下一杯，可以只改变一个变量再品尝',
    sourceLinks: [sources.espresso, sources.milkAmount],
  },
]);

function bounded(value, min, max, fallback) {
  const n = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
}
function stepValue(value, maximum, fallback = 0) { return Math.round(bounded(value, 0, maximum, fallback)); }
function choice(value, values, fallback) { return values.includes(value) ? value : fallback; }
function rounded(value, places = 2) { return Number(value.toFixed(places)); }
function smooth01(value) { const x = bounded(value, 0, 1, 0); return x * x * (3 - 2 * x); }

/** Opening an anatomical display; no claim that processing uses this motion. */
export function cherryState(open = 0) {
  const open01 = bounded(open, 0, 100, 0) / 100;
  const skin = smooth01(open01 / 0.6);
  const pulp = smooth01((open01 - 0.15) / 0.65);
  const parchment = smooth01((open01 - 0.5) / 0.5);
  return {
    open01, variant: open01 === 0 ? 'intact' : 'exploded-anatomy',
    visualSkinSeparation01: skin,
    visualPulpSeparation01: pulp,
    visualParchmentSeparation01: parchment,
    // Offsets are dimensionless coefficients; renderer multiplies by model width.
    nodeTransforms: {
      Skin_A: { offset: [-0.7 * skin, 0, 0] }, Skin_B: { offset: [0.7 * skin, 0, 0] },
      Pulp_A: { offset: [-0.48 * pulp, 0, 0] }, Pulp_B: { offset: [0.48 * pulp, 0, 0] },
      Mucilage_A: { offset: [-0.3 * pulp, 0, 0] }, Mucilage_B: { offset: [0.3 * pulp, 0, 0] },
      Parchment_A: { offset: [-0.18 * parchment, 0, 0] }, Parchment_B: { offset: [0.18 * parchment, 0, 0] },
      Silverskin_A: { offset: [0, 0, 0] }, Silverskin_B: { offset: [0, 0, 0] },
      Seed_A: { offset: [0, 0, 0] }, Seed_B: { offset: [0, 0, 0] },
      Calyx: { offset: [0, 0.4 * skin, 0] },
    },
    showLabels: open01 > 0.4,
    readout: open01 < 0.5 ? '果皮与果肉包在外面' : '里面的种子，才是咖啡豆',
  };
}

export function washedState(step = 0) {
  const i = stepValue(step, 3);
  const variants = ['fresh-cherry', 'pulped-with-mucilage', 'fermented-mucilage-loosened', 'washed-wet-parchment'];
  return {
    step: i, variant: variants[i],
    fruitPresent: i === 0, pulpSeparated: i >= 1,
    mucilageState: ['intact', 'adhering', 'broken-down', 'washed-away'][i],
    parchmentPresent: true, dry: false, greenReadyForRoast: false,
    readout: ['完整鲜果', '果肉离开，果胶仍在', '发酵使果胶易于去除', '洗去果胶，留下湿的带壳豆'][i],
  };
}

export function dryState(step = 0) {
  const i = stepValue(step, 2);
  return {
    step: i, variant: ['wet-parchment', 'dry-parchment', 'hulled-green'][i],
    parchmentOnSeed: i < 2, parchmentShellsSeparated: i === 2,
    dryingComplete: i >= 1, hullingComplete: i === 2, greenReadyForRoast: i === 2,
    requiredTransitionOrder: ['wet-parchment', 'dry-parchment', 'hulled-green'].slice(0, i + 1),
    readout: ['带着羊皮层干燥', '已经干燥，羊皮层仍在', '脱去羊皮层，得到生豆'][i],
  };
}

export function roastState(step = 0) {
  const i = stepValue(step, 4);
  return {
    step: i, variant: ['green', 'yellow', 'brown', 'first-crack', 'developed'][i],
    visualBeanScale: [1, 1.02, 1.06, 1.12, 1.16][i],
    firstCrackReached: i >= 3,
    eventCue: i === 3 ? 'first-crack' : null,
    readout: ['青绿色生豆', '失水，颜色转黄', '褐变，香气逐渐形成', '一爆：膨胀与爆裂声', '一爆后继续发展，再冷却'][i],
  };
}

/** Unitless visual comparison only. Never use this as a real shot-time estimate. */
export function grindState(grind = 'reference') {
  const selected = choice(grind, ['coarser', 'reference', 'finer'], 'reference');
  const i = ['coarser', 'reference', 'finer'].indexOf(selected);
  return {
    variant: selected, doseG: 18, preparation: 'distributed-and-level-tamped',
    visualParticleScale: [1.35, 1, 0.72][i],
    visualRelativeFlowRate: [1.4, 1, 0.65][i],
    readout: ['相对较快', '对照流速', '通常相对较慢'][i],
    assumption: '同一咖啡、粉量、粉饼准备与机器条件；不包含通道效应',
  };
}

/** Exact dry-dose to beverage-mass arithmetic; no input-water estimate. */
export function espressoState(yieldG = 36) {
  const beverageG = Math.round(bounded(yieldG, 18, 54, 36));
  const ratio = beverageG / 18;
  return {
    doseG: 18, yieldG: beverageG, ratio, ratioLabel: `1:${rounded(ratio)}`,
    reference: beverageG === 36,
    visualFill01: beverageG / 54,
    seek01: beverageG / 54,
    readout: `18 g 粉 → ${beverageG} g 浓缩液 · 1:${rounded(ratio)}`,
    measurement: 'beverage-mass-not-input-water',
  };
}

export function steamState(method = 'integrated') {
  const selected = choice(method, ['little-air', 'integrated', 'extra-air'], 'integrated');
  const i = ['little-air', 'integrated', 'extra-air'].indexOf(selected);
  return {
    variant: selected,
    surfaceKey: `steam-${selected}`,
    texture: ['thin-low-foam', 'glossy-flowing-microfoam', 'thicker-foam'][i],
    restartsFromColdMilk: true,
    readout: ['泡沫较少', '细腻、有光泽、能流动', '泡沫偏厚，流动性降低'][i],
    note: '典型质地对照，不是对所有牛奶与设备的结果保证',
  };
}

/**
 * Timeline for one offline-rendered continuous pour.
 * Numeric boundaries/width/height are normalized storyboard marks, not physics.
 * Same input must seek to the same baked frame when revisiting a stage.
 */
export function pourState(progress = 0) {
  const p = bounded(progress, 0, 100, 0);
  let phase;
  if (p < 35) phase = 'integrate';
  else if (p < 79) phase = 'place-white';
  else if (p < 86) phase = 'lift-and-thin';
  else if (p < 100) phase = 'cut-through';
  else phase = 'complete';
  const deposition01 = smooth01((p - 35) / 44);
  const lift01 = smooth01((p - 79) / 7);
  const cut01 = smooth01((p - 86) / 14);
  const pitcherHeight01 = p < 35 ? 0.88 : p < 79 ? 0.12 : 0.12 + 0.76 * lift01;
  return {
    progress: p, seek01: p / 100, phase,
    visualPitcherHeight01: rounded(pitcherHeight01, 4),
    visualStreamWidth01: p === 100 ? 0 : p < 35 ? 0.25 : p < 79 ? 0.65 : 0.65 - 0.45 * lift01,
    visualWhiteArea01: rounded(0.58 * deposition01, 4),
    visualCutThrough01: rounded(cut01, 4),
    streamVisible: p > 0 && p < 100,
    variant: p < 35 ? 'blending' : p < 86 ? 'white-disc' : 'heart-forming',
    readout: { integrate: '高位细流：融入基底', 'place-white': '壶嘴贴近：白色展开', 'lift-and-thin': '提壶，收细液流', 'cut-through': '细流穿过，收出心尖', complete: '停止注奶，图案留在杯面' }[phase],
  };
}

/**
 * Ingredient-mass arithmetic. Espresso beverage share is NOT coffee-solids/TDS.
 * Milk means milk that reaches the cup, not the starting pitcher fill.
 */
export function finishedState(milkG = 120, espressoYieldG = 36) {
  const milk = choice(Number(milkG), [90, 120, 150], 120);
  const espresso = Math.round(bounded(espressoYieldG, 18, 54, 36));
  const totalG = espresso + milk;
  return {
    milkG: milk, espressoYieldG: espresso, totalG,
    espressoBeverageShare: espresso / totalG,
    compositionBars: { espresso: espresso / totalG, milk: milk / totalG },
    espressoBeverageSharePercent: rounded(100 * espresso / totalG, 1),
    variant: `milk-${milk}`,
    recipeKey: `espresso-${espresso}-milk-${milk}`,
    readout: `${espresso} g 浓缩液 + ${milk} g 奶 = ${totalG} g 饮品`,
    shareLabel: `浓缩饮液占 ${rounded(100 * espresso / totalG, 1)}%（按重量）`,
    measurement: 'ingredient-beverage-mass-share-not-TDS',
  };
}

const stateFunctions = {
  cherry: cherryState, washed: washedState, dry: dryState, roast: roastState,
  grind: grindState, espresso: espressoState, steam: steamState, pour: pourState,
  finished: finishedState,
};

/** Unified adapter; value omitted means the visible stage's specified default. */
export function getStageState(stageId, value, context = {}) {
  const stage = stageData.find(item => item.id === stageId);
  if (!stage) throw new RangeError(`Unknown coffee stage: ${stageId}`);
  const selection = value === undefined ? stage.control.defaultValue : value;
  return stateFunctions[stageId](selection, context.espressoYieldG);
}

/** Discrete asset selections must animate every intervening operation in order. */
export function operationStepsBetween(stageId, from, to) {
  const lengths = { washed: 4, dry: 3, roast: 5 };
  if (!(stageId in lengths)) throw new RangeError(`No operation sequence for: ${stageId}`);
  const max = lengths[stageId] - 1;
  const a = stepValue(from, max); const b = stepValue(to, max);
  // Backward seeking is a replay, never an assertion that processing is reversible.
  const direction = b >= a ? 1 : -1;
  return Array.from({ length: Math.abs(b - a) + 1 }, (_, i) => a + i * direction);
}

function stageById(stageId) {
  const stage = stageData.find(item => item.id === stageId);
  if (!stage) throw new RangeError(`Unknown coffee stage: ${stageId}`);
  return stage;
}

export function createStageState(stageId) {
  const stage = stageById(stageId);
  const state = { [stage.control.key]: stage.control.defaultValue };
  if (stageId === 'dry') state.dryingComplete = false;
  if (stageId === 'finished') state.espressoYieldG = 36;
  return state;
}

/** Returns normalized state; drying is an explicit prerequisite, not inferred from a hull request. */
function normalizedState(stageId, candidate = {}) {
  const stage = stageById(stageId);
  const state = { ...createStageState(stageId), ...(candidate && typeof candidate === 'object' ? candidate : {}) };
  if (stage.control.type === 'range') {
    state[stage.control.key] = Math.round(bounded(state[stage.control.key], stage.control.min, stage.control.max, stage.control.defaultValue));
  } else {
    state[stage.control.key] = choice(state[stage.control.key], stage.control.options.map(o => o.value), stage.control.defaultValue);
  }
  if (stageId === 'dry') {
    if (state.step === 0) state.dryingComplete = false;
    else if (state.step === 1) state.dryingComplete = true;
    else if (state.dryingComplete !== true) {
      state.step = 0;
      state.dryingComplete = false;
      state.blockedReason = '先完成带壳干燥，再脱壳';
    }
  }
  if (stageId === 'finished') state.espressoYieldG = espressoState(state.espressoYieldG).yieldG;
  return state;
}

/** Use for primary-control changes. It does not mutate prior state. */
export function updateStageState(stageId, previousState, value) {
  const stage = stageById(stageId);
  const previous = normalizedState(stageId, previousState);
  const next = { ...previous, [stage.control.key]: value };
  delete next.blockedReason;
  if (stageId === 'dry' && value === 2 && previous.dryingComplete !== true) {
    return { ...previous, blockedReason: '先完成带壳干燥，再脱壳' };
  }
  return normalizedState(stageId, next);
}

/**
 * UI adapter. Display feedback + metrics, use visualState for named GLB changes.
 * The offline cinematic remains a separately labeled rendering, not this model.
 */
export function derive(stageId, candidate = {}) {
  const stage = stageById(stageId);
  const state = normalizedState(stageId, candidate);
  const visualState = getStageState(stageId, state[stage.control.key], { espressoYieldG: state.espressoYieldG });
  let metrics = [];
  if (stageId === 'grind') metrics = [
    { label: '固定粉量', value: 18, unit: 'g' },
    { label: '出液对照', value: visualState.readout },
  ];
  else if (stageId === 'espresso') metrics = [
    { label: '咖啡粉', value: 18, unit: 'g' },
    { label: '杯中浓缩液', value: visualState.yieldG, unit: 'g' },
    { label: '粉液比', value: visualState.ratioLabel },
  ];
  else if (stageId === 'finished') metrics = [
    { label: '浓缩液', value: visualState.espressoYieldG, unit: 'g' },
    { label: '杯中奶量', value: visualState.milkG, unit: 'g' },
    { label: '饮品总重', value: visualState.totalG, unit: 'g' },
    { label: '浓缩饮液重量占比', value: visualState.espressoBeverageSharePercent, unit: '%' },
  ];
  else if (stageId === 'dry') metrics = [{ label: '羊皮层', value: visualState.parchmentOnSeed ? '仍包在豆外' : '已脱去' }];
  else if (stageId === 'washed') metrics = [{ label: '保留的保护层', value: '羊皮层' }];
  const blockedReason = state.blockedReason || (stageId === 'dry' && !state.dryingComplete ? '先完成带壳干燥，再脱壳' : null);
  return {
    state,
    feedback: state.blockedReason || visualState.readout,
    metrics,
    visualState,
    controlState: { disabledValues: stageId === 'dry' && !state.dryingComplete ? [2] : [], blockedReason },
  };
}
