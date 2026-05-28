// 团队贡献网站数据
// 数据来源: 2026上半年团队工作总结.md, 基于团队周报的项目列表.md, 飞书通讯录
// 生成时间: 2026-05-28

const META = {
  title: "后摩智能 · 芯片算法部 · 2026 上半年",
  subtitle: "把复杂模型，从能跑单点，推到可量化、可导出、可评测、可交付、可复用",
  generatedAt: "2026-05-28",
  scope: "2026 年 1 月 - 5 月",
  oneliner: "团队的工作重心从 XH1 存量维护明显切到 XH2/XH2A 模型生态、量化工具链稳定化、重点客户交付，以及月辉/YH/XH3 软硬协同预研。"
};

const PEOPLE = [
  {
    id: "yu-jiangyong",
    name: "余江勇",
    avatar: "avatars/余江勇-2242547d.png",
    keywords: ["Qwen3.5", "DFlash", "MTP", "TurboQuant", "Gemma4"],
    summary: "Qwen3.5 DFlash/MTP/SpecDecode 主线、TurboQuant 设计、Gemma4 与 Qwen3-Omni 推进、M50/XH3 压缩方案。",
    highlights: [
      "推进 Qwen3.5 9B / Qwen3.6 27B / 35B DFlash 导出，Qwen3.5 9B 芯片侧 decode 平均提速约 20%",
      "补完整 MTP、SpecDecode、DFlash 导出和验证链路，跟进接收率与精度对齐",
      "TurboQuant M50/XH2 方案设计与 4bit NC 在 NPU 端到端落地分析",
      "Gemma4-31B/26B-A4B AutoRound/GPTQModel 量化与 MTP 图修改",
      "Qwen3-Omni LLM 部分 GPTQModel/HF 优化与客户问题定位"
    ],
    representativeProjects: ["qwen35-dflash-mtp", "turboquant-kvcache", "gemma4-series", "qwen3-omni"]
  },
  {
    id: "xu-chen",
    name: "许晨",
    avatar: "avatars/许晨-g2439773.png",
    keywords: ["DLLM", "Token压缩", "QAT", "FunASR", "前沿调研"],
    summary: "量化策略、DLLM/Token 压缩、QAT、前沿生图/视频/Agent 调研、FunASR 结构分析、客户精度调试指南。",
    highlights: [
      "DLLMQuant、Token 压缩实验计划、多模态扩散解码视觉 Token 压缩创新点梳理",
      "FunASR 通过等价变换把数值溢出量级从 48 万降到约 7000，w8a8 demo 与浮点对齐",
      "QAT 工程化推进，配合客户精度调试指南",
      "前沿生图/视频模型调研 (Z-Image、flux-2、WAN、ERNIE-Image 等)",
      "校准集热区响应、MMGDC、head focus、peak 惩罚正则项研究"
    ],
    representativeProjects: ["dllm-token-compression", "funasr-huachuang", "calib-research", "frontier-research"]
  },
  {
    id: "xu-zukang",
    name: "徐祖康",
    avatar: "avatars/徐祖康-6c2bcb22.png",
    keywords: ["XH2/YH", "工具链", "Qwen3-Omni", "阶段总结"],
    summary: "XH2/YH 相关模型适配、工具链建设和阶段总结，参与 Qwen3-Omni 等复杂模型链路。",
    highlights: [
      "XH2/YH 模型适配链路推进，参与多类复杂模型工程化",
      "Qwen3-Omni Code2wav、talker 模块、mm_rope 等子链路支持",
      "阶段总结与跨模型适配规范沉淀",
      "月辉/YH reference model 与编译器对齐协作"
    ],
    representativeProjects: ["qwen3-omni", "yh-reference-model", "xh2-modelzoo"]
  },
  {
    id: "chen-zhixuan",
    name: "陈志轩",
    avatar: "avatars/陈志轩-9dag99d3.png",
    keywords: ["Qwen3-VL", "Qwen3.5", "Gemma4", "校准集", "月辉验证"],
    summary: "Qwen3-VL 系列精度优化、Qwen3.5 精度验证、Gemma4 适配、校准集热区响应研究、月辉模型大规模验证。",
    highlights: [
      "Qwen3-VL 2B/4B/8B 视觉幻觉与重复输出问题大幅收敛",
      "Qwen3-VL 30B-A3B W4/W5/W8、Hessian 加权、后处理路线推进",
      "Qwen3.5 Dense W4A8 导出与 hm-eval 接入",
      "Gemma4 多模态测试与 vision bug 修复",
      "校准集热区响应实验与月辉 reference model 大规模精度验证"
    ],
    representativeProjects: ["qwen3-vl-series", "qwen35-dense-moe", "gemma4-series", "calib-research", "yh-reference-model"]
  },
  {
    id: "li-hui",
    name: "李辉",
    avatar: "avatars/李辉-ab89437e.png",
    keywords: ["Qwen3-VL", "FlashAttention", "ModelZoo", "客户支持"],
    summary: "Qwen3-VL 精度与导出、FlashAttention/算子优化、ModelZoo 治理与客户问题支持。",
    highlights: [
      "Qwen3-VL 系列导出与精度修复，多图/视频输入支持",
      "FlashAttention 工具链和算子能力补齐",
      "ModelZoo 治理与发版规范推进",
      "中兴/讯飞/星网等客户模型问题支持与复现流程"
    ],
    representativeProjects: ["qwen3-vl-series", "xh2-quantool", "xh2-modelzoo", "customer-zte", "customer-xunfei"]
  },
  {
    id: "hu-xing",
    name: "胡幸",
    avatar: "avatars/胡幸-f726c71e.png",
    keywords: ["月辉/YH", "GPTQModel", "FlashAttention", "MoE", "软硬协同"],
    summary: "月辉/YH 软硬协同、XH2ModelZoo/GPTQModel、FlashAttention、MoE 推理、vLLM/RKLLM、评估数据集与低精度研究。",
    highlights: [
      "月辉/YH reference model 与编译器 matmul、softmax bit-wise 对齐",
      "GPTQModel 对 VL Vision 旋转、W5、Hessian MSE、Block Rotation、MXFP4/MXFP6 等支持",
      "FlashAttention 工具链与 MoE 推理 (Triton/Fast 模式带来 1.5 - 5 倍加速)",
      "vLLM-HMONNX/XH2 后端插件设计与 Runner/worker、KVCache 数据交互",
      "低精度训练/推理调研、PIM+DDR 架构与 FP4/Int5 方案分析"
    ],
    representativeProjects: ["yh-reference-model", "gptqmodel-advanced", "moe-inference", "vllm-hmonnx", "xh3-low-precision", "yh-pim-arch"]
  },
  {
    id: "gao-she",
    name: "高射",
    avatar: "avatars/高射-72c93fcb.png",
    keywords: ["VLA", "World Model", "PI05", "CosyVoice", "算力latency"],
    summary: "VLA/World Model/PI05 方向适配与精度闭环、CosyVoice 模块导出、算力 latency 分析与量化闭环。",
    highlights: [
      "PI0.5/OpenVLA/PI05 适配与精度测试框架，Flow Matching 精度敏感问题处理",
      "World Model 架构分析、LingBot-World 推理全流程拆解、GigaWorld 视频扩散世界模型分析",
      "CosyVoice/CosyVoice3 模块导出与 Demo 串联",
      "MiniCPM 适配与算力 latency 分析",
      "OpenVLA v1.3 导出问题修复与 VLA 整体量化闭环"
    ],
    representativeProjects: ["vla-pi05", "world-model", "cosyvoice-tts", "minicpm"]
  },
  {
    id: "li-zhe",
    name: "李哲",
    avatar: "avatars/李哲-2b1b533e.png",
    keywords: ["ASR/TTS", "UI-TARS", "QAT", "MTP/DFlash", "客户支持"],
    summary: "ASR/TTS 模型适配、UI-TARS/Agent、QAT、客户支持、xhquanttool 算子测试覆盖、MTP/DFlash 支持梳理。",
    highlights: [
      "Qwen-TTS 0.6B 迁移到 xh2modelzoo 并完成导出，Qwen-ASR 调研支持",
      "Whisper-large-v3-turbo、SenseVoice LayerNorm 溢出、流式推理链路",
      "UI-TARS-1.5-7B 流程尝试、ScreenSpot benchmark、Agent benchmark ClawArena",
      "xhquanttool commit 与算子测试覆盖度提升",
      "MTP/DFlash 工程支持梳理与客户复现流程"
    ],
    representativeProjects: ["asr-tts-platform", "ui-tars-agent", "xh2-quantool", "qwen35-dflash-mtp"]
  },
  {
    id: "wei-chuyuan",
    name: "魏楚元",
    avatar: "avatars/魏楚元-ff1b87bg.png",
    keywords: ["xh2modelzoo_merak", "GPTQModel", "compressed-tensors", "HMONNX", "AutoRound"],
    summary: "xh2modelzoo_merak、GPTQModel/外部量化格式加载、compressed-tensors、HMONNX 加速、fp16 溢出扫描、AutoRound 混合精度。",
    highlights: [
      "xh2modelzoo_merak 兼容 GPTQModel、AWQ、AutoRound、compressed-tensors/llmcompressor 等外部量化格式",
      "HMONNX 推理与 Golden 链路加速 (HMONNXRuntime load hmonnx 推理、HMONNXGoldenInfer)",
      "Transformers 权重/激活 fp16 溢出扫描，覆盖 Gemma、Qwen、GLM、TTS、ASR、生图等模型",
      "AutoRound 混合精度/激活量化推进",
      "外部量化模型读入与 HMONNX 导出客户量化流程"
    ],
    representativeProjects: ["xh2-modelzoo-merak", "hmonnx-inference", "gptqmodel-advanced", "fp16-overflow"]
  }
];

const CATEGORIES = [
  { id: "xh2-model-ecosystem", title: "XH2 模型生态", color: "#6B8E5A", description: "围绕 XH2/XH2A 的重点模型适配、量化、导出、评测和发版。覆盖文本、多模态、语音、OCR、具身智能和生图/视频方向。" },
  { id: "quant-toolchain", title: "量化与工具链", color: "#5A8A8A", description: "XH2Quantool、ModelZoo、GPTQModel、HMONNX、vLLM、CI 与发版治理，从修 bug 进化到工程化体系。" },
  { id: "customer-delivery", title: "客户交付", color: "#C99B5C", description: "中兴、华创、讯飞、星网、长城、国铁、中建材、全志、商汤、深启等客户的模型交付与问题支持，沉淀模板和回归集。" },
  { id: "yh-xh3-codesign", title: "月辉/YH/XH3 软硬协同", color: "#7A6BA0", description: "Reference Model、bit-wise 对齐、PIM/DDR、TE 算子、Hadamard、TurboQuant/VQ —— 进入软硬协同设计深水区。" },
  { id: "research-frontier", title: "研究与前沿预研", color: "#B26B7A", description: "MoE 量化加速、TurboQuant/KV Cache、DLLM/Token 压缩、校准集、低精度/fp16 溢出、World Model/生图。" }
];

const PROJECTS = [
  // ===== XH2 模型生态 =====
  {
    id: "qwen3-vl-series",
    title: "Qwen3-VL 系列",
    category: "xh2-model-ecosystem",
    months: ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05"],
    status: "持续推进",
    tags: ["多模态", "VL", "Qwen", "FlashAttention"],
    summary: "2B/4B/8B 精度优化和模型重出，解决 Deepstack Feature 重复量化、视觉幻觉、简单题重复；30B-A3B W4/W5/W8、Hessian 加权、后处理、FlashAttention、多图/视频输入推进。",
    highlights: [
      "2B/4B/8B 视觉幻觉与重复输出问题大幅收敛",
      "30B-A3B W4/W5/W8 多精度路线推进",
      "支持高分辨率、多图、视频输入和客户自量化流程"
    ],
    members: ["chen-zhixuan", "li-hui", "yu-jiangyong", "gao-she"]
  },
  {
    id: "qwen35-dflash-mtp",
    title: "Qwen3.5 / Qwen3.6 DFlash & MTP",
    category: "xh2-model-ecosystem",
    months: ["2026-04", "2026-05"],
    status: "进行中",
    tags: ["DFlash", "MTP", "SpecDecode", "性能优化"],
    summary: "完成多规格 DFlash 导出和 MTP Head 裁剪，Qwen3.5 9B 芯片实测 decode 平均提速约 20%；MTP 接受率下降约 1%。",
    highlights: [
      "Qwen3.5 9B / Qwen3.6 27B / 35B DFlash 导出完成",
      "Qwen3.5 9B 芯片侧 decode 平均提速约 20%",
      "MTP/SpecDecode 链路验证与接收率对齐"
    ],
    members: ["yu-jiangyong", "li-zhe"]
  },
  {
    id: "qwen35-linear-attention",
    title: "Qwen3.5 Linear Attention 大算子",
    category: "xh2-model-ecosystem",
    months: ["2026-05"],
    status: "进行中",
    tags: ["Linear Attention", "算子融合"],
    summary: "将求逆、chunk recurrent、recurrent 迭代拆成大算子；完成初版方案和单算子 Golden 导出。",
    highlights: ["大算子拆分与融合方案", "单算子 Golden 导出"],
    members: ["yu-jiangyong"]
  },
  {
    id: "qwen35-dense-moe",
    title: "Qwen3.5 Dense / MoE 系列",
    category: "xh2-model-ecosystem",
    months: ["2026-05"],
    status: "进行中",
    tags: ["MoE", "Dense", "评测"],
    summary: "Dense W4A8 导出、hm-eval 接入；MoE 导出修复和评测；Qwen3.6 35B-A3B 专家激活重叠率分析。",
    highlights: ["Dense W4A8 导出完成", "MoE 导出与评测", "专家激活重叠率分析"],
    members: ["chen-zhixuan", "yu-jiangyong", "wei-chuyuan", "hu-xing", "li-hui"]
  },
  {
    id: "qwen3-next-80b",
    title: "Qwen3 Next 80B-A3B",
    category: "xh2-model-ecosystem",
    months: ["2026-01", "2026-02", "2026-03", "2026-04"],
    status: "阶段完成",
    tags: ["Qwen3 Next", "量化", "M50"],
    summary: "linear attention 拆分、Rotate + GPTQModel、ONNX 导出、cache tensor bug 修复、CEval/PPL 评估、M50 验证。",
    highlights: ["80B 模型链路打通", "M50 验证完成"],
    members: ["hu-xing", "yu-jiangyong"]
  },
  {
    id: "qwen3-omni",
    title: "Qwen3-Omni",
    category: "xh2-model-ecosystem",
    months: ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05"],
    status: "进行中",
    tags: ["Omni", "多模态", "语音"],
    summary: "Code2wav、talker 模块、mm_rope、LLM 部分 GPTQModel/HF 优化、客户问题定位、流式语音链路收尾。",
    highlights: ["LLM 部分 GPTQModel/HF 优化", "流式语音链路收尾"],
    members: ["yu-jiangyong", "xu-zukang"]
  },
  {
    id: "qwen3-coder-reranker",
    title: "Qwen3 Coder / Reranker / Thinking",
    category: "xh2-model-ecosystem",
    months: ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05"],
    status: "阶段完成",
    tags: ["Qwen3", "评测", "发版"],
    summary: "Coder 针对代码题场景优化并发版；Reranker 完成 ModelZoo 支持和 MTEB 评测；Thinking 修复 context length 导致的数学任务精度下降。",
    highlights: ["Coder 发版", "Reranker MTEB 评测", "Thinking 精度修复"],
    members: ["chen-zhixuan", "li-hui", "li-zhe", "yu-jiangyong"]
  },
  {
    id: "gemma4-series",
    title: "Gemma4 系列",
    category: "xh2-model-ecosystem",
    months: ["2026-04", "2026-05"],
    status: "进行中",
    tags: ["Gemma", "MTP", "多模态"],
    summary: "Gemma4-31B/26B-A4B 适配；AutoRound/GPTQModel 支持；MTP 图修改；Gemma4-E vision bug 修复；多模态测试。",
    highlights: ["Gemma4 多规格适配", "MTP 图修改", "Vision bug 修复"],
    members: ["yu-jiangyong", "chen-zhixuan", "wei-chuyuan", "xu-zukang"]
  },
  {
    id: "glm-47-flash",
    title: "GLM-4.7-Flash",
    category: "xh2-model-ecosystem",
    months: ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05"],
    status: "阶段完成",
    tags: ["GLM", "MLA", "MoE"],
    summary: "基于 DeepSeekV3 架构，完成 MLA + 分组/共享 MoE 量化开发与导出；MLA 融合推理使 Cache 降低约 10 倍。",
    highlights: ["MLA 融合", "Cache 降低约 10 倍", "精度损失控制在 1% 内"],
    members: ["hu-xing", "wei-chuyuan", "xu-zukang"]
  },
  {
    id: "deepseek-ocr",
    title: "DeepSeekOCR / OCR 系列",
    category: "xh2-model-ecosystem",
    months: ["2026-01", "2026-02", "2026-03", "2026-04"],
    status: "阶段完成",
    tags: ["OCR", "DeepSeek", "多模态"],
    summary: "Vision/LLM 等 4 个子模块量化导出支持；MinerU 2.5、PaddleOCR-VL、GLM-OCR 多尺寸图片输入；OmniDocBench 测试。",
    highlights: ["DeepSeekOCR 端到端 Demo", "OmniDocBench 测试"],
    members: ["chen-zhixuan", "li-hui", "xu-zukang"]
  },
  {
    id: "asr-tts-platform",
    title: "ASR / TTS 平台 (Whisper / SenseVoice / CosyVoice / Qwen-ASR)",
    category: "xh2-model-ecosystem",
    months: ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05"],
    status: "持续推进",
    tags: ["ASR", "TTS", "语音"],
    summary: "Whisper-large-v3-turbo、Whisper-medium cross attention KV cache、SenseVoice LayerNorm 溢出、CosyVoice/CosyVoice3 模块导出和 Demo 串联；Qwen-TTS 迁移与流式推理。",
    highlights: ["流式语音链路", "LayerNorm 溢出处理", "Qwen-TTS 迁移完成"],
    members: ["li-zhe", "gao-she", "xu-chen", "yu-jiangyong"]
  },
  {
    id: "vla-pi05",
    title: "VLA / PI05 / OpenVLA",
    category: "xh2-model-ecosystem",
    months: ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05"],
    status: "持续推进",
    tags: ["VLA", "具身智能"],
    summary: "PI0.5/OpenVLA/PI05 适配、Demo、精度测试框架、Flow Matching 精度敏感问题、OpenVLA v1.3 导出问题修复。",
    highlights: ["PI0.5 适配", "精度测试框架", "Flow Matching 处理"],
    members: ["gao-she", "chen-zhixuan", "wei-chuyuan", "yu-jiangyong"]
  },
  {
    id: "world-model",
    title: "World Model / LingBot / GigaWorld",
    category: "xh2-model-ecosystem",
    months: ["2026-02", "2026-03", "2026-04", "2026-05"],
    status: "调研/适配中",
    tags: ["World Model", "视频", "VLA"],
    summary: "World Model 架构分析、LingBot-World 推理全流程拆解、GigaWorld 视频扩散世界模型分析、算力和 latency 分析。",
    highlights: ["架构分析", "推理流程拆解", "算力 latency 分析"],
    members: ["gao-she"]
  },
  {
    id: "cosyvoice-tts",
    title: "CosyVoice / 生图视频生成",
    category: "xh2-model-ecosystem",
    months: ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05"],
    status: "预研/进行中",
    tags: ["TTS", "生成式", "XH3"],
    summary: "CosyVoice 模块导出，Qwen-Image、Z-Image、GLM_IMAGE、flux-2-klein-base、WAN 等生图/视频方向调研、适配评估和精度框架建设。",
    highlights: ["CosyVoice 导出 Demo", "生图/视频精度框架"],
    members: ["gao-she", "xu-chen"]
  },
  {
    id: "minicpm",
    title: "MiniCPM",
    category: "xh2-model-ecosystem",
    months: ["2026-01", "2026-02", "2026-03"],
    status: "持续推进",
    tags: ["小模型", "适配"],
    summary: "MiniCPM 适配与算力 latency 分析。",
    highlights: ["MiniCPM 适配", "算力 latency 分析"],
    members: ["gao-she"]
  },
  {
    id: "ui-tars-agent",
    title: "UI-TARS / Agent 模型",
    category: "xh2-model-ecosystem",
    months: ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05"],
    status: "进行中",
    tags: ["Agent", "GUI", "评测"],
    summary: "UI-TARS-1.5-7B 流程尝试、ScreenSpot benchmark、Agent benchmark ClawArena、Agent 自动支持模型计划。",
    highlights: ["UI-TARS 流程", "ScreenSpot benchmark"],
    members: ["li-zhe"]
  },
  {
    id: "hunyuan-video",
    title: "HunyuanVideo 80B-A13B 生成视频",
    category: "xh2-model-ecosystem",
    months: ["2026-04", "2026-05"],
    status: "适配中",
    tags: ["生成视频", "MoE", "Hunyuan"],
    summary: "Hunyuan-80B-A13B 视频生成模型量化与导出，沉淀大规模 MoE 视频模型的适配链路。",
    highlights: ["Hunyuan 80B-A13B 量化", "视频生成链路打通", "校准/导出脚本沉淀"],
    members: ["xu-zukang", "xu-chen"]
  },

  // ===== 量化与工具链 =====
  {
    id: "xh2-quantool",
    title: "XH2Quantool 工具链增强",
    category: "quant-toolchain",
    months: ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05"],
    status: "持续推进",
    tags: ["工具链", "量化", "算子"],
    summary: "LSTM/Loop、FlashAttention、RMSNorm/LayerNorm、Conv/Depthwise、Resizer、Softmax、MoE、A5 混合精度、SEFP/MXFP 等能力补齐。",
    highlights: ["关键算子能力补齐", "CUDA/设备/融合 pass 修复"],
    members: ["li-hui", "li-zhe", "hu-xing", "xu-chen", "xu-zukang", "wei-chuyuan"]
  },
  {
    id: "xh2-modelzoo",
    title: "XH2ModelZoo 生态建设",
    category: "quant-toolchain",
    months: ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05"],
    status: "持续推进",
    tags: ["ModelZoo", "模型交付"],
    summary: "Converter 抽象、Demo 基建、模型适配规范、量化导出接口、模型发布流程、支持模型清单、评测流水集成。",
    highlights: ["Converter 抽象", "发版流程治理", "评测流水"],
    members: ["xu-zukang", "li-hui", "hu-xing", "chen-zhixuan", "gao-she", "li-zhe", "xu-chen", "wei-chuyuan", "yu-jiangyong"]
  },
  {
    id: "xh2-modelzoo-merak",
    title: "xh2modelzoo_merak / 外部量化格式兼容",
    category: "quant-toolchain",
    months: ["2026-02", "2026-03", "2026-04", "2026-05"],
    status: "进行中",
    tags: ["量化兼容", "ModelZoo"],
    summary: "兼容 GPTQModel、AWQ、AutoRound、compressed-tensors/llmcompressor 等外部量化模型格式，减少重复适配成本。",
    highlights: ["多种外部格式加载", "客户量化流程对齐"],
    members: ["wei-chuyuan"]
  },
  {
    id: "gptqmodel-advanced",
    title: "GPTQModel / 高阶量化能力",
    category: "quant-toolchain",
    months: ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05"],
    status: "持续推进",
    tags: ["GPTQ", "AutoRound", "量化算法"],
    summary: "支持 VL Vision 旋转、W5、Hessian MSE、Block Rotation、MXFP4/MXFP6、AutoRound 格式兼容、Qwen3Next 支持、校准集生成加速。",
    highlights: ["VL Vision 旋转", "W5 / Block Rotation", "MXFP4/MXFP6"],
    members: ["hu-xing", "wei-chuyuan", "chen-zhixuan", "gao-she", "xu-zukang", "yu-jiangyong"]
  },
  {
    id: "hmonnx-inference",
    title: "HMONNX 推理与 Golden 链路",
    category: "quant-toolchain",
    months: ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05"],
    status: "持续推进",
    tags: ["HMONNX", "推理", "Golden"],
    summary: "HMONNXRuntime load hmonnx 推理、HMONNXGoldenInfer、板端推理脚本、Golden 导出、HMONNX 推理 Demo。",
    highlights: ["HMONNXRuntime 推理", "板端推理 Demo"],
    members: ["wei-chuyuan", "hu-xing", "li-hui", "xu-zukang", "yu-jiangyong"]
  },
  {
    id: "vllm-hmonnx",
    title: "vLLM-HMONNX / XH2 后端插件",
    category: "quant-toolchain",
    months: ["2026-05"],
    status: "进行中",
    tags: ["vLLM", "后端", "推理"],
    summary: "基于 vLLM 原版实现 XH2 后端插件，支持 HMONNX、Runner/worker 创建、KVCache 与 ModelZoo cache 数据交互。",
    highlights: ["vLLM XH2 后端插件", "KVCache 数据交互"],
    members: ["hu-xing"]
  },
  {
    id: "moe-inference",
    title: "MoE 推理优化",
    category: "quant-toolchain",
    months: ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05"],
    status: "持续推进",
    tags: ["MoE", "推理", "性能"],
    summary: "Triton/Fast 模式带来 1.5 - 5 倍级别加速；Group GEMM、MoE bias、超参数搜索、A5 混合精度等问题持续收敛。",
    highlights: ["Triton/Fast 模式", "1.5 - 5 倍加速"],
    members: ["hu-xing", "gao-she", "chen-zhixuan", "li-hui", "xu-zukang", "yu-jiangyong"]
  },
  {
    id: "release-ci",
    title: "XH2 发版治理与 CI",
    category: "quant-toolchain",
    months: ["2026-04", "2026-05"],
    status: "进行中",
    tags: ["工程治理", "CI", "发版"],
    summary: "pre-commit、commit message 规范、pre-push 最小回归、算子覆盖率、基础模型测试流水、配置规范、发版命名治理。",
    highlights: ["pre-commit/pre-push", "算子覆盖率", "发版命名治理"],
    members: ["li-zhe", "li-hui", "hu-xing", "xu-zukang", "yu-jiangyong"]
  },

  // ===== 客户交付 =====
  {
    id: "customer-zte",
    title: "中兴 / ZTE 模型支持",
    category: "customer-delivery",
    months: ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05"],
    status: "持续支持",
    tags: ["客户", "中兴", "模型交付"],
    summary: "L3/L1/LSTM/MLP/TIMI、多 batch、Qwen2.5、线性反传精度测试；输出量化导出教程、精度评测和复现流程。",
    highlights: ["多模型类型支持", "量化导出教程", "复现流程"],
    members: ["li-hui", "hu-xing", "yu-jiangyong"]
  },
  {
    id: "customer-huachuang",
    title: "华创 ASR (FunASR)",
    category: "customer-delivery",
    months: ["2026-01", "2026-02", "2026-03"],
    status: "阶段完成",
    tags: ["客户", "ASR", "M50"],
    summary: "FunASR 数值溢出、decoder LayerNorm INF、w8a8 demo 精度对齐、完整 M50 方案。",
    highlights: ["数值溢出量级从 48 万降到约 7000", "w8a8 与浮点对齐"],
    members: ["xu-chen", "li-zhe"]
  },
  {
    id: "customer-xunfei",
    title: "讯飞系列支持",
    category: "customer-delivery",
    months: ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05"],
    status: "持续支持",
    tags: ["客户", "讯飞", "Qwen"],
    summary: "30B MoE、政法 Qwen3-8B、扫描 Qwen3-VL-2B、GGUF/HMONNX 输出差异、缺字少字 badcase、交付包迭代。",
    highlights: ["多场景模型适配", "GGUF/HMONNX 差异处理"],
    members: ["li-hui", "chen-zhixuan"]
  },
  {
    id: "customer-misc",
    title: "星网 / 锐捷 / 长城 / 国铁 / 中建材 / 全志",
    category: "customer-delivery",
    months: ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05"],
    status: "阶段完成/跟踪",
    tags: ["客户", "多类模型"],
    summary: "Qwen3VL/LoRA、Qwen3.5-0.8B 端到端、SAM2、RAFT 光流、语音 w16a16 修复等。",
    highlights: ["客户自量化流程", "端到端闭环", "GridSample 精度"],
    members: ["li-hui", "chen-zhixuan", "xu-zukang", "yu-jiangyong"]
  },

  // ===== 月辉 / YH / XH3 =====
  {
    id: "yh-reference-model",
    title: "月辉 / YH Reference Model 与算子对齐",
    category: "yh-xh3-codesign",
    months: ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05"],
    status: "持续推进",
    tags: ["月辉", "YH", "软硬协同"],
    summary: "Conv、Sort、TopK、Softmax、MatMul、RMSNorm、FlashAttention、Load 单元、bit-wise 对齐、DV 验证支持。",
    highlights: ["bit-wise 对齐", "Load 单元", "DV 验证"],
    members: ["hu-xing", "chen-zhixuan", "xu-zukang"]
  },
  {
    id: "yh-pim-arch",
    title: "月辉 / YH2 / PIM 架构分析",
    category: "yh-xh3-codesign",
    months: ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05"],
    status: "预研推进",
    tags: ["YH2", "PIM", "架构"],
    summary: "PIM+DDR、Decode 阶段 DDR 带宽瓶颈、非 FFN 权重常驻 PIM、动态 overlap、FP4/Int5 方案。",
    highlights: ["PIM+DDR 设计", "FP4/Int5 方案"],
    members: ["hu-xing"]
  },
  {
    id: "xh3-low-precision",
    title: "XH3 工程化与低精度能力",
    category: "yh-xh3-codesign",
    months: ["2026-05"],
    status: "启动/预研",
    tags: ["XH3", "低精度", "Profile"],
    summary: "TE 算子、Hadamard 在线旋转、TurboQuant/VQ 查表需求、hm-onnx-profile、一维矢量量化方法研究。",
    highlights: ["TE 算子", "Hadamard 在线旋转", "VQ 查表"],
    members: ["hu-xing", "yu-jiangyong"]
  },

  // ===== 研究与前沿预研 =====
  {
    id: "moe-quant-research",
    title: "MoE 量化加速与理论研究",
    category: "research-frontier",
    months: ["2026-03", "2026-04", "2026-05"],
    status: "研究推进",
    tags: ["MoE", "GPTQ", "论文/专利"],
    summary: "GPTQ 加速、边界采样、专家 token 稀少 Hessian 问题、BoA 专家内部 linear 影响建模；80B 单层量化从约 1 天降至约 1 小时。",
    highlights: ["80B 单层量化耗时降低", "35B-A3B 从数小时到约 10 分钟"],
    members: ["hu-xing"]
  },
  {
    id: "turboquant-kvcache",
    title: "TurboQuant / KV Cache 压缩",
    category: "research-frontier",
    months: ["2026-04", "2026-05"],
    status: "预研/方案设计",
    tags: ["TurboQuant", "KV Cache"],
    summary: "TurboQuant M50/XH2 方案设计、4bit NC 在 NPU 端到端落地分析、KV Cache 压缩与 XH3 查表需求。",
    highlights: ["M50/XH2 方案", "NPU 端到端分析"],
    members: ["yu-jiangyong"]
  },
  {
    id: "dllm-token-compression",
    title: "DLLM / Token 压缩",
    category: "research-frontier",
    months: ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05"],
    status: "研究推进",
    tags: ["DLLM", "Token Compression"],
    summary: "DLLMQuant、Token 压缩实验计划、多模态扩散解码视觉 Token 压缩、创新点梳理。",
    highlights: ["DLLMQuant 实验", "视觉 Token 压缩"],
    members: ["xu-chen"]
  },
  {
    id: "calib-research",
    title: "校准集与热区响应研究",
    category: "research-frontier",
    months: ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05"],
    status: "研究推进",
    tags: ["校准集", "量化目标"],
    summary: "校准集热区响应、MMGDC、head focus、peak 惩罚正则项、量化目标函数重叠区域实验。",
    highlights: ["热区响应", "正则项设计"],
    members: ["xu-chen", "chen-zhixuan"]
  },
  {
    id: "fp16-overflow",
    title: "低精度训练/推理与 fp16 溢出扫描",
    category: "research-frontier",
    months: ["2026-05"],
    status: "持续推进",
    tags: ["低精度", "fp16", "稳定性"],
    summary: "Transformers 权重/激活 fp16 溢出扫描，覆盖 Gemma、Qwen、GLM、TTS、ASR、生图等模型；低精度训练/推理调研。",
    highlights: ["全栈 fp16 溢出扫描", "低精度训练调研"],
    members: ["wei-chuyuan"]
  },
  {
    id: "frontier-research",
    title: "前沿模型调研",
    category: "research-frontier",
    months: ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05"],
    status: "持续",
    tags: ["前沿", "模型选型"],
    summary: "ERNIE-Image、DreamLite、Step1X-Edit、flux-2-klein-base、DeepSeek V4、VLA/World Model 等方向评估；Sinkhorn 算法工程化。",
    highlights: ["前沿模型评估", "Sinkhorn 工程化"],
    members: ["xu-chen"]
  }
];

const RELATIONS = [
  { from: "qwen35-dflash-mtp", to: "xh2-modelzoo", type: "depends_on", reason: "DFlash/MTP 导出依赖 ModelZoo 量化导出链路。" },
  { from: "qwen35-dflash-mtp", to: "gptqmodel-advanced", type: "shared_tooling", reason: "共用 GPTQModel 量化能力，特别是 MoE/Hessian 路线。" },
  { from: "qwen3-vl-series", to: "xh2-quantool", type: "shared_tooling", reason: "VL 系列依赖 FlashAttention 与算子工具链。" },
  { from: "qwen3-vl-series", to: "gptqmodel-advanced", type: "shared_tooling", reason: "VL Vision 旋转能力来自 GPTQModel 高阶量化。" },
  { from: "customer-huachuang", to: "asr-tts-platform", type: "customer_driven", reason: "华创需求驱动了 FunASR 的工程化适配。" },
  { from: "customer-zte", to: "xh2-modelzoo", type: "customer_driven", reason: "中兴的多模型支持沉淀为 ModelZoo 适配规范。" },
  { from: "customer-xunfei", to: "qwen3-vl-series", type: "customer_driven", reason: "讯飞 Qwen3-VL-2B 扫描场景驱动 VL 优化。" },
  { from: "qwen3-next-80b", to: "qwen35-dense-moe", type: "shared_model_family", reason: "同属 Qwen3 家族，共享 MoE 量化路线。" },
  { from: "yh-reference-model", to: "xh3-low-precision", type: "feeds_into", reason: "月辉 reference model 与编译器对齐沉淀进 XH3 低精度方案。" },
  { from: "moe-quant-research", to: "moe-inference", type: "feeds_into", reason: "MoE 量化研究产出反哺 MoE 推理工程实现。" },
  { from: "turboquant-kvcache", to: "xh3-low-precision", type: "feeds_into", reason: "TurboQuant 是 XH3 查表与低精度能力的核心方向。" },
  { from: "vllm-hmonnx", to: "hmonnx-inference", type: "depends_on", reason: "vLLM-HMONNX 后端基于 HMONNXRuntime 推理能力。" },
  { from: "qwen35-dflash-mtp", to: "qwen35-linear-attention", type: "parallel_track", reason: "Qwen3.5 上的两条工程主线并行推进。" },
  { from: "world-model", to: "vla-pi05", type: "shared_model_family", reason: "VLA/World Model 同源，共用精度框架。" },
  { from: "fp16-overflow", to: "calib-research", type: "feeds_into", reason: "fp16 溢出扫描结果反哺校准集与量化目标研究。" },
  { from: "xh2-modelzoo-merak", to: "gptqmodel-advanced", type: "shared_tooling", reason: "外部量化格式加载与 GPTQModel 共享解码器。" },
  { from: "release-ci", to: "xh2-modelzoo", type: "depends_on", reason: "发版治理基于 ModelZoo 的目录与配置规范。" },
  { from: "hunyuan-video", to: "moe-inference", type: "shared_tooling", reason: "Hunyuan 80B-A13B 视频模型属于大规模 MoE，复用 MoE 推理工程能力。" },
  { from: "hunyuan-video", to: "cosyvoice-tts", type: "shared_model_family", reason: "生成视频与生图视频研究共享精度评估与导出经验。" },
  { from: "calib-research", to: "qwen3-vl-series", type: "feeds_into", reason: "校准集热区研究直接服务 Qwen3-VL 等视觉模型精度调优。" },
  { from: "frontier-research", to: "world-model", type: "feeds_into", reason: "前沿模型调研锁定 World Model / VLA 等方向作为重点跟进。" }
];

const TIMELINE = [
  {
    month: "2026-01",
    title: "1 月",
    summary: "Qwen3-VL 视觉幻觉/重复输出问题大幅收敛；MoE 加速、Qwen3 系列、FlashAttention、月辉 reference model 和客户交付同步推进。",
    highlights: [
      "Qwen3-VL 2B/4B/8B 视觉幻觉问题收敛",
      "MoE 推理 Triton/Fast 加速 1.5 - 5x",
      "FunASR 数值溢出处理 (华创)",
      "整体计划完成度约 70%，客户交付挤占了部分前沿模型探索"
    ]
  },
  {
    month: "2026-02",
    title: "2 月",
    summary: "重点扩展 XH2 生态，推进 PI05/VLA、PaddleOCR/DeepSeekOCR、FunASR、LSTM/Loop、LUT/SEFP GPU 加速、Qwen3 Next 等。",
    highlights: [
      "PI05 / VLA / OpenVLA 适配",
      "PaddleOCR / DeepSeekOCR 推进",
      "LSTM/Loop、LUT/SEFP GPU 加速",
      "Qwen3 Next 80B 链路打通"
    ]
  },
  {
    month: "2026-03",
    title: "3 月",
    summary: "XH2 工具链和 ModelZoo 继续增强，Qwen3 Next、Qwen3-VL、ASR/TTS、FlashAttention、Qwen3.5、ZTE 等进入密集适配和发版阶段。",
    highlights: [
      "Qwen3.5 适配启动",
      "FireRedASR LoRA 导出",
      "MoE 量化研究取得突破 (80B 单层 1 天 → 1 小时)",
      "ZTE 多模型支持沉淀"
    ]
  },
  {
    month: "2026-04",
    title: "4 月",
    summary: "Qwen3.5、Gemma4、Qwen3 Omni、Qwen3-VL 高分辨率、FireRedASR、LoRA、GPTQModel/AutoRound 和 1.2.0 发版相关工作集中落地。",
    highlights: [
      "Qwen3.5 9B DFlash 芯片实测 decode 提速 ~20%",
      "Gemma4 31B/26B-A4B 适配",
      "TurboQuant M50/XH2 方案设计",
      "1.2.0 版本相关工作落地"
    ]
  },
  {
    month: "2026-05",
    title: "5 月",
    summary: "主线切到 Qwen3.5/Qwen3.6 DFlash、MTP、Linear Attention、vLLM-HMONNX/XH2 后端、Gemma4 版本统一、XH3 工程化、客户项目收口和工具链治理。",
    highlights: [
      "Qwen3.6 27B/35B DFlash 导出",
      "Linear Attention 大算子初版方案",
      "vLLM-HMONNX/XH2 后端插件",
      "XH3 工程化与低精度能力启动",
      "全栈 fp16 溢出扫描"
    ]
  }
];

const CONCLUSIONS = [
  "团队上半年核心价值不是单个模型适配，而是把复杂模型交付链路系统化：量化、导出、评测、编译器联调、板端推理、客户复现和发版治理都在补齐。",
  "XH2 已经成为主要产出平台，模型覆盖从 Qwen/Gemma/GLM 扩展到 OCR、ASR/TTS、VLA、World Model 和生图方向。",
  "量化工具链进入工程化阶段，GPTQModel、AutoRound、HMONNX、ModelZoo、CI、配置规范和外部格式兼容都有实质进展。",
  "客户支持压力很大，但也推动团队沉淀了模型适配模板、诊断规则、评测基线和交付规范。",
  "月辉/YH/XH3 的工作正在从验证转向软硬协同设计，后续需要继续围绕 bit 对齐、PIM/DDR、低精度、查表和 profile 工具形成长期技术资产。"
];

// 暴露到全局，供 HTML 页面使用
window.__DATA__ = {
  META, PEOPLE, CATEGORIES, PROJECTS, RELATIONS, TIMELINE, CONCLUSIONS
};
