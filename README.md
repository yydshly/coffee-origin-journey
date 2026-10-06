# 一杯咖啡的诞生 · Coffee Origin Journey

## [在线体验 · 打开咖啡之旅](https://yydshly.github.io/coffee-origin-journey/)

无需下载或安装，直接在浏览器中观看和探索。

从咖啡果到拿铁的中文教学演示。包含约 71 秒连续过程影片、可旋转三维物件、材料结构标注和分层工艺说明。

## 本地运行

无需构建、后台、账号或运行时付费模型 API。使用静态 HTTP 服务，例如：

    python3 -m http.server 8000

然后访问 http://localhost:8000/ 。不要直接用 file:// 打开 ES modules。

## GitHub Pages

在 Settings → Pages 中选择 Deploy from a branch，分支 main，目录 /(root)，保存。项目已使用相对路径，适配仓库子路径。

## 说明与限制

- 默认连续影片为离线制作的原理动画；自由旋转查看是独立实时 3D，不等于真实物理或同画质自由视角电影。
- 材料数量、层厚、剖面和时间经过教学简化，不能用作真实工艺参数或产量预测。
- 中文讲解使用设备/浏览器可用的 speechSynthesis 中文音色；没有合适声音时保留字幕。无需 Blender 即可浏览。
- 网站包含完整静态应用源码与运行素材。Blender 制作源另见 authoring/（如有）；不包含全部历史帧缓存。
- 已检查影片解码、模型结构和交互状态；不同设备的 WebGL、语音和移动布局仍需实际验证。
- 现有素材和代码的公开不等于统一授予任意再许可。第三方许可见 THIRD_PARTY_NOTICES.md。

## 文件

film/ 连续过程与字幕；journey/ 独立三维探索；proof/ 历次效果样板；vendor/ 本地 Three.js 依赖。
