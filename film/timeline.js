/** Action timings follow the unchanged 71-second mechanism film. */
export const cues=[
 {start:0,end:1.3,stage:'cherry',label:'采收成熟果实',material:'同一批咖啡 · 成熟红果',text:'采收红果。'},
 {start:1.3,end:2.3,stage:'washed',mechanism:'depulp',label:'去果肉机：果实进入',material:'代表其中一颗 · 机器剖面示意',text:'进机器。'},
 {start:2.3,end:4.1,stage:'washed',mechanism:'depulp',label:'转动工作面分离果肉',material:'果肉软 · 种子仍完整',text:'去果肉，留种子。'},
 {start:4.1,end:5.3,stage:'washed',mechanism:'depulp',label:'不同部分，走向不同出口',material:'湿带壳种子继续前行',text:'种子留下。'},
 {start:5.3,end:7.1,stage:'washed',mechanism:'ferment',label:'局部剖面：外面还有果胶',material:'层厚夸张 · 绿为豆体，淡黄为羊皮层',text:'果胶在薄壳外。'},
 {start:7.1,end:9.3,stage:'washed',mechanism:'ferment',label:'发酵槽内：让黏液质易于去除',material:'剖面与层厚夸张 · 发酵时间压缩',text:'发酵让果胶容易洗除。'},
 {start:9.3,end:11.4,stage:'washed',label:'清水带走果胶，薄壳留下',material:'局部剖面示意 · 羊皮层仍在',text:'洗掉果胶，薄壳仍在。'},
 {start:11.4,end:13.8,stage:'dry',label:'摊开、翻动，带壳干燥',material:'层厚夸张 · 干燥时间压缩',text:'翻动干燥，便于保存。'},
 {start:13.8,end:16.8,stage:'dry',mechanism:'hull',label:'干燥后：机械接触脱去薄壳',material:'剖面与层厚夸张 · 保留豆体',text:'机械去掉干壳，种子留下。'},
 {start:16.8,end:19.1,stage:'dry',mechanism:'hull',label:'同一批生豆，送去烘焙',material:'羊皮层已去除 · 尚未烘焙',text:'这些生豆，进入烘焙。'},
 {start:19.1,end:20.9,stage:'roast',label:'装入滚筒式烘焙机',material:'通用机器原理剖面',text:'生豆装进滚筒。'},
 {start:20.9,end:23.3,stage:'roast',label:'热空气进入，叶片持续翻动',material:'橙色点：热风示踪 · 不是火星',text:'热风供热，叶片翻动。'},
 {start:23.3,end:26.3,stage:'roast',label:'失水、褐变，结构也在改变',material:'体积与裂隙变化示意 · 时间压缩',text:'失去水分，颜色和结构改变。'},
 {start:26.3,end:28.3,stage:'roast',label:'排出热豆，进入冷却盘',material:'烘焙结束后仍需冷却',text:'热豆排到冷却盘。'},
 {start:28.3,end:31.1,stage:'roast',label:'搅拌和通风，带走热量',material:'蓝色点：冷却空气 · 不是水',text:'搅拌，空气带走热量。'},
 {start:31.1,end:32.5,stage:'grind',label:'看一粒豆，进入锥形磨盘',material:'剖面原理 · 颗粒与间隙放大',text:'看这一粒豆。'},
 {start:32.5,end:34.5,stage:'grind',label:'上部宽齿：先预碎',material:'同一粒豆分成较粗碎块',text:'宽齿先把它预碎。'},
 {start:34.5,end:38.5,stage:'grind',label:'继续向下，碎块逐渐变小',material:'较细工作区 · 断裂轨迹为教学编排',text:'碎块向下，在更细的工作区继续变小。'},
 {start:38.5,end:41.1,stage:'grind',label:'从间隙排出不规则颗粒',material:'不是相同大小的小球 · 不是毫米标尺',text:'较小颗粒，从间隙排出。'},
 {start:41.1,end:43.4,stage:'grind',label:'均匀布粉，水平压实',material:'同一滤篮中的咖啡粉 → 粉饼',text:'布粉后，水平压实。'},
 {start:43.4,end:44.8,stage:'espresso',label:'准备让热水经过粉饼',material:'粉饼留在滤篮中',text:'装好粉饼。'},
 {start:44.8,end:46.133,stage:'espresso',label:'切换剖面视角：看粉饼内部',material:'局部放大观察窗',text:'看粉粒之间。'},
 {start:46.133,end:47.8,stage:'espresso',label:'水进入相连的颗粒间隙',material:'流路着色示意 · 不是直通水管',text:'水进入相连空隙。'},
 {start:47.8,end:50.217,stage:'espresso',label:'可溶成分进入水中',material:'小点代表溶出物 · 并非分子照片',text:'可溶成分进入水里。'},
 {start:50.217,end:52.133,stage:'espresso',label:'液体经过真实开口的滤孔',material:'大部分固体仍保留 · 不是理想过滤膜',text:'咖啡液穿过滤孔。'},
 {start:52.133,end:53.8,stage:'espresso',label:'出液汇合，落进杯中',material:'留下湿粉饼，得到浓缩',text:'咖啡液入杯。'},
 {start:53.8,end:55,stage:'espresso',label:'这杯浓缩，等待牛奶',material:'保留同一只杯',text:'浓缩好了。'},
 {start:55,end:57,stage:'steam',label:'另一边，牛奶少量进气',material:'后来加入的原料 · 牛奶',text:'牛奶先少量进气。'},
 {start:57,end:59.1,stage:'steam',label:'稍微下沉，让牛奶旋转',material:'牛奶 → 细腻奶泡',text:'下沉，让奶液旋转。'},
 {start:59.1,end:60.25,stage:'steam',label:'先停汽，再移开',material:'停汽后抽出蒸汽棒',text:'先停汽。'},
 {start:60.25,end:62,stage:'steam',label:'这壶奶泡，来到杯边',material:'同一只奶缸 · 准备注奶',text:'奶缸移到杯边。'},
 {start:62,end:64,stage:'pour',label:'高位注奶，先融合',material:'浓缩 + 奶泡',text:'高处注奶，先融合。'},
 {start:64,end:66.7,stage:'pour',label:'贴近液面，白色展开',material:'杯面形成图案',text:'贴近液面，白色展开。'},
 {start:66.7,end:68,stage:'pour',label:'提壶，细流收尾',material:'完成心形',text:'细流收尾。'},
 {start:68,end:71,stage:'finished',label:'这一批咖啡，来到杯中',material:'一杯拿铁',text:'从果实到浓缩，加奶成为拿铁。'}
];
export const chapters=[['cherry','果实',0],['washed','水洗',1.3],['dry','干燥脱壳',11.4],['roast','烘焙',19.1],['grind','研磨压粉',31.1],['espresso','浓缩',43.4],['steam','打奶',55],['pour','拉花',62],['finished','完成',68]];
export function cueAt(time){return cues.find(c=>time>=c.start&&time<c.end)||cues[time>=cues.at(-1).end?cues.length-1:0];}
export function chapterAt(time){return [...chapters].reverse().find(c=>time>=c[2])||chapters[0];}
export function timeLabel(time){const s=Math.max(0,Math.floor(Number.isFinite(time)?time:0));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');}
export function inspectionValue(time){const stage=cueAt(time).stage;if(stage==='cherry')return 100;if(stage==='washed')return time<5.3?1:time<9.3?2:3;if(stage==='dry')return time<12.6?0:time<13.8?1:2;if(stage==='roast')return time<21?0:time<23.8?1:time<25.5?2:time<26.3?3:4;if(stage==='grind')return'reference';if(stage==='espresso')return 36;if(stage==='steam')return time<57?'little-air':'integrated';if(stage==='pour')return Math.max(0,Math.min(100,Math.round((time-62)/6*100)));return 120;}

/** Whole action sentences, shared by speech and subtitles; small visual cuts never restart speech. */
export const narrationCues=[
 {
  "start": 0,
  "end": 5.3,
  "text": "红果去掉果肉，留下种子。"
 },
 {
  "start": 5.3,
  "end": 11.4,
  "text": "发酵让果胶易洗除，洗净后仍带壳。"
 },
 {
  "start": 11.4,
  "end": 16.8,
  "text": "先带壳干燥，再机械脱壳。"
 },
 {
  "start": 16.8,
  "end": 19.1,
  "text": "留下生豆。"
 },
 {
  "start": 19.1,
  "end": 23.3,
  "text": "生豆在热滚筒里翻动。"
 },
 {
  "start": 23.3,
  "end": 26.3,
  "text": "豆子褐变并膨胀。"
 },
 {
  "start": 26.3,
  "end": 31.1,
  "text": "热豆排出，搅拌通风冷却。"
 },
 {
  "start": 31.1,
  "end": 34.5,
  "text": "宽齿先把熟豆预碎。"
 },
 {
  "start": 34.5,
  "end": 41.1,
  "text": "碎块继续变小，从磨盘间隙排出。"
 },
 {
  "start": 41.1,
  "end": 44.8,
  "text": "滤篮中，布粉压实。"
 },
 {
  "start": 44.8,
  "end": 50.217,
  "text": "水穿过空隙，带走可溶成分。"
 },
 {
  "start": 50.217,
  "end": 55,
  "text": "液体穿过滤孔，汇成杯中浓缩。"
 },
 {
  "start": 55,
  "end": 59.1,
  "text": "少量进气，再旋转融合。"
 },
 {
  "start": 59.1,
  "end": 62,
  "text": "停汽后移开奶缸。"
 },
 {
  "start": 62,
  "end": 66.7,
  "text": "先高位融合，再贴近成形。"
 },
 {
  "start": 66.7,
  "end": 71,
  "text": "细流收尾，拿铁完成。"
 }
];
export function narrationAt(time){return narrationCues.find(c=>time>=c.start&&time<c.end)||narrationCues[time>=narrationCues.at(-1).end?narrationCues.length-1:0];}
