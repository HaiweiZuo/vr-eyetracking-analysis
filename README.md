# 眼动数据分析系统 (Eye-tracking Data Analysis System)

## 📋 项目概述

这是一个基于Python + Flask的眼动数据分析平台，专门用于处理和分析眼球追踪实验数据。系统支持多种分析模式，包括递归量化分析(RQA)、轨迹可视化、ROI(感兴趣区域)分析等功能。

### 🎯 主要功能
- ✅ **眼动数据预处理** - 时间校准、噪声过滤、数据标准化
- ✅ **递归量化分析(RQA)** - 1D/2D信号分析、递归图生成、量化指标计算
- ✅ **可视化分析** - 轨迹图、热力图、amplitude图、递归图
- ✅ **ROI区域分析** - 基于All_Events.csv的精确ROI着色和标注
- ✅ **Web界面** - 现代化响应式界面，支持参数配置和结果查看
- 🆕 **RQA参数化分析流程** - 完整的五步骤自动化分析流程，支持参数管理和结果对比
- 🆕 **眼动系数与MMSE对比分析** - 基于眼动特征的认知评估对比分析，支持多维度相关性研究

---

## 🏗️ 系统架构

### 核心模块架构
```
眼动数据分析系统
├── 📊 数据处理模块 (Data Processing)
│   ├── 时间校准 (Time Calibration)
│   ├── 数据预处理 (Preprocessing) 
│   └── 数据验证 (Validation)
├── 🔬 RQA分析模块 (RQA Analysis)
│   ├── 信号嵌入 (Signal Embedding)
│   ├── 递归矩阵计算 (Recurrence Matrix)
│   ├── 量化指标提取 (RQA Measures)
│   └── 可视化渲染 (Visualization)
├── 🎨 可视化模块 (Visualization)
│   ├── 轨迹图 (Trajectory Plots)
│   ├── 热力图 (Heatmaps)
│   ├── ROI分析图 (ROI Analysis)
│   └── 递归图 (Recurrence Plots)
├── 🔄 RQA分析流程模块 (RQA Pipeline) 🆕
│   ├── RQA计算 (RQA Calculation)
│   ├── 数据合并 (Data Merging)
│   ├── 特征补充 (Feature Enrichment)
│   ├── 统计分析 (Statistical Analysis)
│   ├── 可视化生成 (Visualization Generation)
│   └── 参数管理 (Parameter Management)
├── 📊 数据整合模块 (Module 7) 🆕
│   ├── 多源数据加载 (Multi-source Data Loading)
│   ├── 特征抽取整合 (Feature Extraction & Integration)
│   ├── 十属性归一化 (10-Feature Normalization)
│   ├── 智能异常值处理 (Intelligent Outlier Handling)
│   ├── RQA参数化管理 (RQA Parameter Management)
│   └── 结构化数据存储 (Structured Data Storage)
├── 🧠 眼动系数与MMSE对比分析模块 (Module 8) 🆕
│   ├── 眼动数据处理 (Eye Movement Data Processing)
│   ├── 眼动系数计算 (Eye Movement Coefficient Calculation)
│   ├── MMSE数据加载 (MMSE Data Loading)
│   ├── 多维度对比分析 (Multi-dimensional Comparison)
│   ├── 子问题详细分析 (Sub-question Analysis)
│   ├── 5图表可视化 (5-Chart Visualization)
│   ├── 相关性分析 (Correlation Analysis)
│   └── 自动CSV导出 (Auto CSV Export)
└── 🌐 Web界面模块 (Web Interface)
    ├── 数据管理界面
    ├── 分析配置界面
    ├── 结果展示界面
    ├── 🆕 RQA分析流程界面
    ├── 🆕 数据整合界面 (模块7)
    ├── 🆕 眼动系数与MMSE对比界面 (模块8)
    └── API接口
```

### 技术栈
- **后端**: Python 3.8+, Flask, NumPy, Pandas, Matplotlib
- **前端**: HTML5, CSS3, JavaScript (ES6+), Bootstrap
- **数据处理**: SciPy, scikit-learn
- **可视化**: Matplotlib, Seaborn
- **API**: RESTful API, JSON数据交换

---

## 📁 项目文件结构

```
az/
├── 📂 analysis/                    # 核心分析模块
│   ├── rqa_batch_renderer.py      # RQA批量渲染器 (核心类)
│   ├── time_calibration.py        # 时间校准模块
│   └── data_processor.py          # 数据预处理器
├── 📂 visualization/               # 可视化模块  
│   ├── rqa_api_extension.py       # RQA API扩展
│   ├── rqa_pipeline_api.py        # 🆕 RQA分析流程API
│   ├── mmse_api_extension.py      # 🆕 MMSE数据API扩展
│   ├── real_data_integration_api.py # 🆕 真实数据整合API
│   ├── web_api.py                 # Web API接口
│   └── templates/
│       └── enhanced_index.html    # 主界面模板(含模块7-8)
├── 📂 data/                       # 数据目录
│   ├── calibrated/                # 眼动校准数据(按组别目录)
│   │   ├── control/               # 对照组数据
│   │   ├── mci/                   # MCI组数据
│   │   └── ad/                    # AD组数据
│   ├── MMSE_Score/                # 🆕 MMSE认知评估数据
│   │   ├── 对照组.csv             # 对照组MMSE分数
│   │   ├── 轻度认知障碍组.csv      # MCI组MMSE分数
│   │   └── 阿尔兹海默症组.csv      # AD组MMSE分数
│   ├── event_analysis_results/    # ROI事件分析结果
│   │   ├── All_Events.csv         # ROI事件数据
│   │   └── All_ROI_Summary.csv    # 🆕 ROI时间统计汇总
│   ├── normalized_features/       # 🆕 标准化特征数据(模块7)
│   │   ├── subjects.csv           # 受试者信息
│   │   ├── tasks.csv              # 任务信息
│   │   ├── game_sessions.csv      # 游戏会话数据
│   │   ├── roi_features.csv       # ROI特征数据
│   │   ├── rqa_features.csv       # RQA特征数据
│   │   └── normalized_features_summary.csv # 综合特征汇总
│   ├── module7_integrated_results/ # 🆕 模块7数据整合结果
│   │   └── m{m}_tau{τ}_eps{ε}_lmin{l}/ # 按RQA参数分目录
│   │       ├── individual_comparison_m{m}_tau{τ}_eps{ε}_lmin{l}_{timestamp}.csv # 个体特征数据
│   │       └── metadata.json      # 元数据信息
│   ├── module8_analysis_results/  # 🆕 模块8分析结果
│   │   └── m{m}_tau{τ}_eps{ε}_lmin{l}/ # 按RQA参数分目录
│   │       ├── individual_comparison_*.csv    # 个人对比数据
│   │       ├── group_comparison_*.csv         # 群体对比数据
│   │       ├── subquestion_comparison_*.csv   # 子问题对比数据
│   │       └── exported_reports/              # 导出报告目录
│   ├── rqa_results/               # RQA分析结果
│   │   └── mode_*/                # 按参数组织的结果
│   └── rqa_pipeline_results/      # 🆕 RQA分析流程结果
│       └── m{m}_tau{τ}_eps{ε}_lmin{l}/  # 参数化目录
├── 📂 static/                     # 静态资源
│   ├── css/                       # 样式文件
│   ├── js/                        # JavaScript文件
│   └── images/                    # 图片资源
├── start_server.py                # 服务器启动脚本
└── README.md                      # 项目文档
```

---

## 🔬 模块详解

### 1️⃣ 数据处理模块 (Data Processing)

**功能**: 眼动数据的预处理和标准化

**主要文件**: `analysis/time_calibration.py`, `analysis/data_processor.py`

**核心功能**:
- ⏰ **时间校准**: 毫秒级时间戳标准化
- 🔧 **数据清洗**: 异常值检测和过滤
- 📊 **格式转换**: 多种数据格式支持
- ✅ **数据验证**: 完整性和一致性检查

**支持的数据列**:
```python
Required: ['timestamp', 'x', 'y']
Optional: ['milliseconds', 'ROI', 'SequenceID']
```

### 2️⃣ RQA分析模块 (RQA Analysis)

**功能**: 递归量化分析的完整实现

**主要文件**: `analysis/rqa_batch_renderer.py`

**核心类**: `RQABatchRenderer`

**分析模式**:
- 🔢 **1D信号(X坐标)**: `1d_x`
- 📈 **1D信号(幅度)**: `1d_amplitude` 
- 📊 **2D信号(X,Y坐标)**: `2d_xy`

**距离度量**:
- 📏 **1D绝对差**: `1d_abs`
- 📐 **欧几里得距离**: `euclidean`

**参数设置**:
```python
{
    "analysis_mode": "2d_xy",           # 分析模式
    "distance_metric": "euclidean",     # 距离度量
    "embedding_dimension": 2,           # 嵌入维度(m)
    "time_delay": 1,                    # 时间延迟(τ)
    "recurrence_threshold": 0.05,       # 递归阈值(ε)
    "min_line_length": 2,               # 最小线长(l_min)
    "color_theme": "green_gradient"     # 渲染主题
}
```

**生成图表**:
- 🎯 **轨迹图**: 2D眼动轨迹路径
- 📈 **Amplitude图**: 信号幅度时间序列
- 🔲 **递归图(RP)**: 黑白递归矩阵

**RQA指标**:
- 📊 **递归率(RR)**: Recurrence Rate
- 🔗 **确定性(DET)**: Determinism  
- 📈 **熵(ENT)**: Entropy

### 3️⃣ 可视化模块 (Visualization)

**功能**: 多种图表的生成和渲染

**主要文件**: `visualization/web_api.py`, `visualization/rqa_api_extension.py`

**图表类型**:

#### 🎯 轨迹图 (Trajectory Plot)
- **样式**: 蓝色主线 + 绿色ROI散点
- **标注**: ROI序号和名称
- **比例**: 1:1正方形

#### 📈 Amplitude图 (Amplitude Plot)  
- **样式**: 蓝色信号线 + 绿色ROI填充区域
- **ROI着色**: fill_between半透明效果
- **Y轴**: 根据分析模式自动调整(Amplitude/X Coordinate)

#### 🔲 递归图 (Recurrence Plot)
- **样式**: 黑白二值化矩阵
- **ROI标记**: 半透明绿色矩形
- **指标显示**: RR, DET, ENT数值

**ROI着色系统**:
```python
# 优先级: INST > KW > BG
roi_colors = {
    'INST': '#0d5016',  # 深绿色
    'KW': '#2d7016',    # 中绿色  
    'BG': '#4d9016'     # 浅绿色
}
```

### 4️⃣ Web界面模块 (Web Interface)

**功能**: 现代化Web界面和API服务

**主要文件**: `visualization/templates/enhanced_index.html`

**界面功能**:
- 📋 **数据管理**: 分组浏览、状态监控
- ⚙️ **参数配置**: 实时RQA参数调整
- 📊 **结果展示**: 5列网格自动布局
- 🔍 **过滤搜索**: 按组别、问题、参数过滤

**API接口**:
```http
GET  /api/group/{group}/data          # 获取组数据
POST /api/rqa-batch-render            # 启动RQA渲染
GET  /api/rqa-render-status           # 获取渲染状态
GET  /api/rqa-rendered-results        # 获取渲染结果

# 🆕 模块7 - 数据整合API
POST /api/integrate-real-features     # 触发数据整合
GET  /api/integrated-features/{config} # 获取整合结果
GET  /api/available-rqa-configs       # 获取可用RQA配置
GET  /api/data-statistics             # 获取数据统计信息

# 🆕 模块8 - MMSE对比分析API  
GET  /api/mmse-scores/control         # 获取对照组MMSE数据
GET  /api/mmse-scores/mci             # 获取MCI组MMSE数据
GET  /api/mmse-scores/ad              # 获取AD组MMSE数据
POST /api/save-module8-results        # 保存分析结果
```

### 5️⃣ RQA分析流程模块 (RQA Pipeline) 🆕

**功能**: 完整的参数化RQA分析流程，从数据处理到统计分析再到可视化

**主要文件**: `visualization/rqa_pipeline_api.py`

**核心特性**:
- 🔄 **五步骤流程**: 自动化的端到端分析
- 📊 **参数化管理**: 支持多参数组合的并行分析
- 💾 **结构化存储**: 基于参数签名的目录管理
- 📈 **统计可视化**: 自动生成分析图表和报告
- 🗂️ **历史管理**: 参数历史记录和结果对比

**五步骤流程**:

#### 步骤1: RQA计算
- 对所有数据文件执行RQA分析
- 生成按组别分类的RQA指标CSV文件
- 支持自定义RQA参数(m, τ, ε, l_min)

#### 步骤2: 数据合并  
- 合并三组(Control/MCI/AD)的RQA计算结果
- 生成统一的受试者RQA指标文件
- 自动添加组别和ID标识

#### 步骤3: 特征补充
- 补充眼动事件特征(注视、扫视统计)
- 添加ROI相关统计信息
- 支持多种列名格式的自动映射

#### 步骤4: 统计分析
- 组级统计分析(均值、标准差、计数)
- 多层次统计(组别×任务×参与者)
- 生成描述性统计报告

#### 步骤5: 可视化
- 组级RQA指标条形图(RR, DET, ENT)
- 任务间变化趋势图("Average RR across tasks by Group")
- PNG图片文件自动保存
- JSON格式的图表数据

**参数化目录结构**:
```
rqa_pipeline_results/
├── m2_tau1_eps0.05_lmin2/     # 参数组合1
│   ├── step1_rqa_calculation/
│   ├── step2_data_merging/
│   ├── step3_feature_enrichment/
│   ├── step4_statistical_analysis/
│   └── step5_visualization/
└── m3_tau2_eps0.08_lmin3/     # 参数组合2
    └── [相同的步骤结构]
```

**API接口**:
```http
POST /api/rqa-pipeline/calculate      # 步骤1: RQA计算
POST /api/rqa-pipeline/merge          # 步骤2: 数据合并
POST /api/rqa-pipeline/enrich         # 步骤3: 特征补充
POST /api/rqa-pipeline/analyze        # 步骤4: 统计分析
POST /api/rqa-pipeline/visualize      # 步骤5: 可视化
GET  /api/rqa-pipeline/status         # 获取流程状态
GET  /api/rqa-pipeline/param-history  # 参数历史记录
GET  /api/rqa-pipeline/results/{sig}  # 获取特定结果
DELETE /api/rqa-pipeline/delete/{sig} # 删除参数结果
```

**前端功能**:
- 📋 **参数配置面板**: m, τ, ε, l_min实时配置
- 📊 **五步骤进度指示器**: 可视化流程状态
- 📚 **历史参数管理**: 加载、查看、删除历史运行
- 📈 **结果展示**: 图表展示和统计数据显示
- 🔄 **一键执行**: 支持完整流程一键运行

### 6️⃣ 数据整合模块 (Module 7) 🆕

**功能**: 真实眼动数据的自动整合、标准化和可视化分析

**主要文件**: `visualization/real_data_integration_api.py`

**核心特性**:
- 🔗 **多源数据整合**: 自动整合校准数据、ROI分析结果、RQA计算结果
- 📊 **智能数据标准化**: 支持百分位截断和Min-Max标准化策略
- 🎯 **RQA参数化配置**: 动态检测和选择不同RQA参数组合
- 💾 **结果缓存机制**: 基于RQA参数的智能缓存和增量更新
- 📈 **实时统计更新**: 动态计算受试者、会话、特征数量

**数据整合流程**:

#### 🔄 五步骤数据整合
1. **📊 数据源加载**
   - 校准数据: `data/*/calibrated/*.csv` (游戏时长提取)
   - ROI特征: `All_ROI_Summary.csv` (注视区域时间统计)
   - RQA特征: `rqa_pipeline_results/*/step2_*/combined_rqa_features.csv`

2. **🎯 会话ID匹配**
   ```python
   # 自动提取会话信息
   session_pattern = r'([a-z]+\d+)q(\d+)'  # 如: c10q1 -> c10, Q1
   subject_id, task_id = extract_session_info(session_id)
   group_type = determine_group_type(subject_id)  # control/mci/ad
   ```

3. **🔗 特征数据整合**
   ```python
   # 十个特征的数据整合
   record = {
       'session_id': session_id,
       'subject_id': subject_id,
       'task_id': task_id,
       'group_type': group_type,
       'game_duration': game_durations.get(session_id, 0),
       'roi_kw_time': roi_features.get(session_id, {}).get('KW', 0),
       'roi_inst_time': roi_features.get(session_id, {}).get('INST', 0),
       'roi_bg_time': roi_features.get(session_id, {}).get('BG', 0),
       'rr_1d': rqa_features.get(session_id, {}).get('rr_1d', 0),
       'det_1d': rqa_features.get(session_id, {}).get('det_1d', 0),
       'ent_1d': rqa_features.get(session_id, {}).get('ent_1d', 0),
       'rr_2d': rqa_features.get(session_id, {}).get('rr_2d', 0),
       'det_2d': rqa_features.get(session_id, {}).get('det_2d', 0),
       'ent_2d': rqa_features.get(session_id, {}).get('ent_2d', 0)
   }
   ```

4. **📈 智能归一化处理**
   - 异常值检测与截断
   - 特征特定的归一化策略
   - 数据质量验证

5. **💾 结构化存储**
   - 按RQA参数分目录存储
   - 带时间戳的文件命名
   - JSON元数据记录

**支持的特征类型**:
```python
# 10个核心特征
features = {
    'game_duration': '游戏时长',           # 基础特征
    'kw_roi_time': 'KW-ROI时间',          # ROI特征
    'inst_roi_time': 'INST-ROI时间',      # ROI特征  
    'bg_roi_time': 'BG-ROI时间',          # ROI特征
    'rr_1d': 'RR-1D',                    # RQA 1D特征
    'det_1d': 'DET-1D',                  # RQA 1D特征
    'ent_1d': 'ENT-1D',                  # RQA 1D特征
    'rr_2d': 'RR-2D',                    # RQA 2D特征
    'det_2d': 'DET-2D',                  # RQA 2D特征
    'ent_2d': 'ENT-2D'                   # RQA 2D特征
}
```

**十个属性归一化详解**:

#### 📊 归一化策略分类
```python
# 基于数据分布特性的差异化归一化策略
normalization_strategies = {
    # 时间类特征 - 使用百分位截断处理异常值
    'game_duration': {'method': 'percentile_clip', 'percentile': 95},
    'roi_kw_time': {'method': 'percentile_clip', 'percentile': 98},
    'roi_inst_time': {'method': 'percentile_clip', 'percentile': 98}, 
    'roi_bg_time': {'method': 'percentile_clip', 'percentile': 98},
    
    # RQA特征 - 理论范围固定，使用标准Min-Max
    'rr_1d': {'method': 'minmax'},      # 递归率 [0,1]
    'det_1d': {'method': 'minmax'},     # 确定性 [0,1]
    'ent_1d': {'method': 'minmax'},     # 熵值 [0,∞)
    'rr_2d': {'method': 'minmax'},      # 递归率 [0,1]
    'det_2d': {'method': 'minmax'},     # 确定性 [0,1] 
    'ent_2d': {'method': 'minmax'}      # 熵值 [0,∞)
}
```

#### 🔢 归一化算法实现
```python
def normalize_features(self, integrated_data):
    df = pd.DataFrame(integrated_data)
    
    for feature, strategy in normalization_strategies.items():
        if strategy['method'] == 'percentile_clip':
            # 百分位截断 + Min-Max标准化
            percentile = strategy['percentile']
            upper_bound = np.percentile(df[feature], percentile)
            df[feature] = np.clip(df[feature], 0, upper_bound)
            df[feature] = (df[feature] - df[feature].min()) / (df[feature].max() - df[feature].min())
            
        elif strategy['method'] == 'minmax':
            # 标准Min-Max标准化
            df[feature] = (df[feature] - df[feature].min()) / (df[feature].max() - df[feature].min())
    
    return df.to_dict('records')
```

#### 📈 归一化结果特性
- **输出范围**: 所有特征统一归一化到 [0, 1] 区间
- **异常值处理**: 时间类特征采用百分位截断，避免极端值影响
- **数据分布**: 保持原始数据的相对关系和分布特征
- **计算效率**: 向量化操作，支持大批量数据处理

**数据结构与文件存储**:

#### 📂 输出文件结构
```
data/module7_integrated_results/
├── m2_tau1_eps0.055_lmin2/               # RQA参数配置目录
│   ├── individual_comparison_m2_tau1_eps0.055_lmin2_20250805_143022.csv
│   └── metadata.json                     # 元数据信息
├── m2_tau1_eps0.06_lmin2/                # 另一个RQA配置
│   ├── individual_comparison_m2_tau1_eps0.06_lmin2_20250805_150315.csv
│   └── metadata.json
└── ...                                   # 其他RQA配置
```

#### 📊 CSV文件数据格式
```csv
session_id,subject_id,task_id,group_type,game_duration,roi_kw_time,roi_inst_time,roi_bg_time,rr_1d,det_1d,ent_1d,rr_2d,det_2d,ent_2d
c10q1,c10,Q1,control,0.751,0.234,0.456,0.123,0.892,0.345,0.678,0.912,0.234,0.567
c10q2,c10,Q2,control,0.832,0.345,0.234,0.567,0.723,0.456,0.789,0.834,0.345,0.678
mci05q1,mci05,Q1,mci,0.634,0.567,0.345,0.234,0.634,0.567,0.234,0.723,0.456,0.345
ad12q1,ad12,Q1,ad,0.345,0.234,0.567,0.456,0.345,0.234,0.567,0.456,0.234,0.345
...
```

#### 🏷️ 数据字段说明
| 字段名 | 含义 | 数据类型 | 归一化范围 |
|--------|------|----------|------------|
| `session_id` | 会话标识符 (如: c10q1) | String | - |
| `subject_id` | 受试者ID (如: c10) | String | - |
| `task_id` | 任务ID (Q1-Q5) | String | - |
| `group_type` | 组别 (control/mci/ad) | String | - |
| `game_duration` | 游戏时长 (秒) | Float | [0, 1] |
| `roi_kw_time` | 关键词ROI时间 (秒) | Float | [0, 1] |
| `roi_inst_time` | 指令ROI时间 (秒) | Float | [0, 1] |
| `roi_bg_time` | 背景ROI时间 (秒) | Float | [0, 1] |
| `rr_1d` | 1D递归率 | Float | [0, 1] |
| `det_1d` | 1D确定性 | Float | [0, 1] |
| `ent_1d` | 1D熵值 | Float | [0, 1] |
| `rr_2d` | 2D递归率 | Float | [0, 1] |
| `det_2d` | 2D确定性 | Float | [0, 1] |
| `ent_2d` | 2D熵值 | Float | [0, 1] |

#### 🎯 数据统计特征
- **总记录数**: 300条 (60受试者 × 5任务)
- **组别分布**: Control(100), MCI(100), AD(100)
- **任务分布**: Q1-Q5 各60条记录
- **归一化完整性**: 所有数值特征均在[0,1]范围内
- **时间戳命名**: 文件名包含生成时间，支持版本追踪

**API接口**:
```http
POST /api/integrate-real-features       # 触发数据整合
GET  /api/integrated-features/{config}  # 获取整合结果
GET  /api/available-rqa-configs         # 获取可用RQA配置
GET  /api/data-statistics               # 获取数据统计信息
```

### 7️⃣ 眼动系数与MMSE对比分析模块 (Module 8) 🆕

**功能**: 基于眼动特征的认知评估对比分析，支持多维度相关性研究

**主要文件**: `visualization/mmse_api_extension.py`, `enhanced_index.html`

**核心特性**:
- 🧠 **MMSE数据整合**: 自动加载对照组、MCI组、AD组认知评估数据
- 📊 **眼动系数计算**: 基于10个标准化特征的综合眼动表现系数
- 🔍 **多维度对比**: 个人级、群体级、子问题级三种分析维度
- 📈 **5图表可视化**: Q1-Q5任务的分离式散点图展示
- 🔗 **相关性分析**: Pearson相关系数和标准差统计
- 📁 **自动CSV导出**: 所有分析结果自动保存为CSV格式

**数据处理流程**:

#### 眼动系数计算
```python
# 特征方向性处理
lower_is_better = ['game_duration', 'kw_roi_time', 'inst_roi_time', 'bg_roi_time']
higher_is_better = ['rr_1d', 'det_1d', 'ent_1d', 'rr_2d', 'det_2d', 'ent_2d']

# 系数计算
for feature in lower_is_better:
    inverted_features.append(1 - normalized_value)
for feature in higher_is_better:
    inverted_features.append(normalized_value)
    
eye_movement_coefficient = mean(inverted_features)
```

#### MMSE数据结构
```python
mmse_tasks = {
    'Q1': {'max_score': 5, 'sub_questions': ['年份', '季节', '月份', '星期']},
    'Q2': {'max_score': 5, 'sub_questions': ['楼层', '省份', '城市', '地区']},
    'Q3': {'max_score': 3, 'sub_questions': ['复述1', '复述2', '复述3']},
    'Q4': {'max_score': 5, 'sub_questions': ['减法计算']},
    'Q5': {'max_score': 3, 'sub_questions': ['回忆词语']}
}
```

**三种分析视图**:

#### 🔸 个人视图 (Individual View)
- **数据内容**: 每个受试者的眼动系数与MMSE分数对应
- **表格结构**: Subject_ID | Task_ID | Group_Type | Eye_Movement_Coefficient | MMSE_Score | Performance_Ratio
- **应用场景**: 个体差异分析、异常值检测

#### 🔸 群体视图 (Group View)  
- **数据内容**: 按组别(Control/MCI/AD)统计的平均值和相关性
- **表格结构**: Task_ID | Group_Type | Subject_Count | Avg_Eye_Movement_Coefficient | Avg_MMSE_Score | Correlation_Coefficient
- **应用场景**: 组间差异比较、群体特征研究

#### 🔸 子问题详细视图 (Sub-question View)
- **数据内容**: 每个子问题的详细得分与眼动表现
- **表格结构**: Subject_ID | Task_ID | Sub_Question_Name | Eye_Movement_Coefficient | Sub_Question_Score | Performance_Ratio
- **应用场景**: 精细化认知功能分析

**5图表可视化系统**:
```html
<!-- 布局: 上3下2 -->
<div class="row">
    <div class="col-md-4">Q1 - 时间定向</div>
    <div class="col-md-4">Q2 - 地点定向</div>  
    <div class="col-md-4">Q3 - 即时记忆</div>
</div>
<div class="row">
    <div class="col-md-6">Q4 - 注意力与计算</div>
    <div class="col-md-6">Q5 - 延迟回忆</div>
</div>
```

**图表特性**:
- **X轴**: 眼动系数 (0-1范围)
- **Y轴**: MMSE完成率 (分数/满分，0-100%)
- **颜色**: 按组别区分 (蓝色=Control, 橙色=MCI, 红色=AD)
- **工具提示**: 显示详细信息(受试者ID、分数、系数等)

**自动CSV导出**:
- **触发时机**: 每次完成MMSE对比分析后自动生成
- **文件类型**: 3种视图对应3个CSV文件
- **命名规则**: `{type}_comparison_{rqa_config}_{timestamp}.csv`
- **存储路径**: `data/module8_analysis_results/{rqa_config}/`

**API接口**:
```http
GET  /api/mmse-scores/control           # 获取对照组MMSE数据
GET  /api/mmse-scores/mci               # 获取MCI组MMSE数据  
GET  /api/mmse-scores/ad                # 获取AD组MMSE数据
POST /api/save-module8-results          # 保存分析结果
```

**前端功能**:
- 🎛️ **数据源选择**: 从模块7的处理结果中选择RQA配置
- 📊 **实时数据统计**: 动态显示加载的眼动数据和MMSE数据数量
- 🔄 **视图切换**: 个人/群体视图一键切换
- 🔍 **详细模式**: 主任务/子问题详细分析切换
- 📈 **相关性计算**: 自动计算Pearson相关系数和标准差
- 📁 **报告导出**: JSON格式的完整分析报告
- 🌐 **双语支持**: 中英文界面完全支持

**眼动特征指标说明**:
- **越低越好指标**: 游戏时长、KW-ROI时间、INST-ROI时间、BG-ROI时间
- **越高越好指标**: RR-1D、DET-1D、ENT-1D、RR-2D、DET-2D、ENT-2D
- **系数计算**: 将"越低越好"指标反转后与"越高越好"指标平均

---

## 🚀 开发指南

### 环境配置

```bash
# 1. 创建虚拟环境
python -m venv venv
source venv/bin/activate  # Linux/Mac
# 或
venv\Scripts\activate     # Windows

# 2. 安装依赖
pip install flask numpy pandas matplotlib scipy scikit-learn

# 3. 启动服务
python start_server.py
```

### 启动系统

```bash
# 启动Web服务器
python start_server.py

# 访问界面
http://localhost:8080
```

### 添加新的分析模式

1. **在RQABatchRenderer中添加信号处理逻辑**:
```python
def prepare_signal_data(self, df, analysis_mode):
    if analysis_mode == "your_new_mode":
        # 实现新的信号提取逻辑
        return processed_signal
```

2. **在绘图函数中添加支持**:
```python
def plot_amplitude_with_roi_enhanced(self, ...):
    if params["analysis_mode"] == "your_new_mode":
        # 添加新的绘图逻辑
```

3. **更新前端参数选项**:
```javascript
// enhanced_index.html 中添加新选项
<option value="your_new_mode">新分析模式</option>
```

### 自定义ROI着色

```python
# 在create_roi_color_mapping_enhanced中修改
def create_roi_color_mapping_enhanced(self, roi_names):
    custom_colors = {
        'YOUR_ROI': '#your_color_hex',
        # 添加更多自定义颜色
    }
    return custom_colors
```

---

## 📊 使用说明

### 数据准备

1. **数据格式要求**:
```csv
timestamp,x,y,milliseconds,ROI,SequenceID
1641024000000,500.2,300.1,0,BG,0
1641024000016,502.1,301.5,16,INST,1
...
```

2. **文件命名规范**:
```
{group}{id}q{question}_preprocessed_calibrated.csv
例如: n1q1_preprocessed_calibrated.csv (对照组1号Q1)
     m1q1_preprocessed_calibrated.csv (MCI组1号Q1)
```

3. **目录结构**:
```
data/
├── control_calibrated/    # 对照组数据
├── mci_calibrated/       # MCI组数据
└── event_analysis_results/
    └── All_Events.csv    # ROI事件数据
```

### 运行分析

#### 传统RQA分析
1. **启动系统**: `python start_server.py`
2. **访问界面**: http://localhost:8080
3. **选择RQA分析选项卡**
4. **配置参数**:
   - 分析模式: 1D信号(X坐标)/1D信号(幅度)/2D信号(X,Y坐标)
   - 距离度量: 1D绝对差/欧几里得距离
   - 嵌入维度: 通常为2-10
   - 时间延迟: 通常为1
   - 递归阈值: 0.01-0.1范围
   - 最小线长: 2-5
5. **启动渲染**: 点击"开始RQA渲染"
6. **查看结果**: 渲染完成后在结果区域查看

#### 🆕 RQA分析流程 (推荐)
1. **启动系统**: `python start_server.py`
2. **访问界面**: http://localhost:8080
3. **选择"RQA分析流程"选项卡**
4. **配置RQA参数**:
   - 嵌入维度(m): 2 (默认)
   - 时间延迟(τ): 1 (默认)
   - 递归阈值(ε): 0.05 (默认)
   - 最小线长(l_min): 2 (默认)
5. **查看参数签名**: 系统自动生成 `m2_tau1_eps0.05_lmin2`
6. **执行分析流程**:
   - 点击"步骤1: RQA计算" 或
   - 点击"完整流程" (一键执行所有步骤)
7. **监控进度**: 观察五步骤进度指示器
8. **查看结果**: 在可视化区域查看生成的图表
9. **管理历史**: 使用"历史参数"功能管理和对比不同参数的结果

#### 🆕 模块7: 数据整合分析
1. **启动系统**: `python start_server.py`
2. **访问界面**: http://localhost:8080
3. **选择"模块7-数据整合"选项卡**
4. **选择RQA参数配置**:
   - 从下拉框选择可用的RQA配置
   - 系统自动检测`data/rqa_pipeline_results`目录
5. **查看实时统计**:
   - 受试者总数: 动态计算
   - 游戏会话数: 实时更新
   - VR-MMSE任务: 任务类型统计
   - 归一化特征: 特征数量统计
6. **执行数据整合**:
   - 点击"刷新数据"触发整合流程
   - 系统自动整合校准数据、ROI数据、RQA结果
7. **查看标准化说明**:
   - 游戏时长: 5%-95%百分位截断
   - ROI时间: 5%-98%百分位截断
   - RQA特征: Min-Max标准化
8. **可视化分析**:
   - 点击"生成图表"查看分布图
   - 支持按组别排序 (Control→MCI→AD)
   - 显示所有10个标准化特征
9. **数据导出**:
   - 点击"导出数据"保存整合结果
   - 结果自动缓存到`module7_integrated_results`

#### 🆕 模块8: 眼动系数与MMSE对比分析

##### 📊 **功能概述**
模块8实现了VR眼动追踪特征与MMSE认知评估的深度融合分析，通过将10个归一化眼动特征转换为综合眼动系数，与MMSE量表的Q1-Q5任务分数进行个人和群体层面的对比研究。

##### 🧮 **眼动系数计算原理**
```javascript
眼动系数 = (
  game_duration_norm + roi_kw_time_norm + roi_inst_time_norm + roi_bg_time_norm +
  rr_1d_norm + det_1d_norm + ent_1d_norm + rr_2d_norm + det_2d_norm + ent_2d_norm
) / 10
```

**特征方向性处理**：
- **"越低越好"特征**: 游戏时长、ROI时间 → 归一化后取反
- **"越高越好"特征**: RQA参数 → 直接归一化
- **统一目标**: 所有特征归一化到[0,1]，数值越高表示眼动表现越好

##### 🧠 **MMSE任务分组**
| 任务ID | 任务名称 | 满分 | 子问题数量 | 具体内容 |
|--------|---------|------|-----------|----------|
| **Q1** | 时间定向 | 5分 | 4题 | 年份(1)、季节(1)、月份(1)、星期(2) |
| **Q2** | 空间定向 | 5分 | 4题 | 省市区(2)、街道(1)、建筑(1)、楼层(1) |
| **Q3** | 即刻记忆 | 3分 | 1题 | 即刻记忆(3) |
| **Q4** | 注意力计算 | 5分 | 5题 | 100-7, 93-7, 86-7, 79-7, 72-7 |
| **Q5** | 延迟回忆 | 3分 | 3题 | 词1(1)、词2(1)、词3(1) |

##### 🔄 **操作流程**
1. **启动系统**: `python start_server.py`
2. **访问界面**: http://localhost:8080
3. **选择"模块8-MMSE对比分析"选项卡**
4. **选择数据源**:
   - 从"模块7数据源选择"下拉框选择RQA配置
   - 必须先在模块7中生成对应配置的数据
5. **加载眼动数据**:
   - 点击"加载眼动数据"从模块7获取归一化特征
   - 系统显示加载的数据记录数量和统计信息
6. **计算眼动系数**:
   - 点击"计算眼动系数"进行综合评分计算
   - 自动处理特征方向性和归一化
   - 生成每个受试者-任务对的眼动系数
7. **MMSE对比分析**:
   - 点击"MMSE对比分析"开始认知评估对比
   - 自动加载三组MMSE数据: `控制组.csv`、`轻度认知障碍组.csv`、`阿尔兹海默症组.csv`
   - 进行受试者ID智能匹配和数据整合
8. **多维度分析结果**:
   - **个人视图**: 每个受试者的详细对比数据
   - **群体视图**: 按组别统计的平均值和相关性分析
   - **主问题模式**: Q1-Q5任务级别分析
   - **子问题模式**: 17个具体子问题的精细分析
9. **智能可视化**:
   - **Q1-Q5分离式散点图**: 任务特异性相关性展示
   - **三色分组**: 蓝色=Control, 橙色=MCI, 红色=AD
   - **完成率轴**: Y轴显示MMSE完成率(0-100%)
   - **交互表格**: 可排序、可筛选的详细数据展示
10. **智能数据导出**:
    - **自动CSV保存**: 3个维度的分析结果自动保存
    - **保存路径**: `data/module8_analysis_results/{rqa_config}/`
    - **文件格式**: 带时间戳的CSV文件，包含配置信息
    - **JSON报告**: 完整的结构化分析报告，包含统计摘要

##### 🔌 **后端API架构**
```python
# MMSE数据API (mmse_api_extension.py)
GET /api/mmse-scores/control      # 控制组MMSE分数
GET /api/mmse-scores/mci          # MCI组MMSE分数  
GET /api/mmse-scores/ad           # AD组MMSE分数
GET /api/normalized-features      # 归一化眼动特征

# 数据保存API (real_data_integration_api.py)
POST /api/save-module8-results    # 保存分析结果
```

##### 💡 **技术特性**
- **智能数据复用**: 与模块7无缝数据共享，避免重复计算
- **容错机制**: API不可用时自动生成符合统计规律的模拟数据
- **ID智能匹配**: 自动处理不同组别受试者ID格式差异
- **多语言支持**: 完整的中英文界面和动态内容
- **统计分析**: 皮尔逊相关系数、群体差异分析、趋势识别
- **性能优化**: 异步数据处理、高效内存管理、Chart.js优化渲染

### 结果解读

#### 轨迹图
- **蓝色线条**: 眼动轨迹路径
- **绿色点**: ROI区域标记
- **标注**: S{序号}({ROI名称})

#### Amplitude图  
- **蓝色线条**: 信号幅度变化
- **绿色填充**: ROI时间段
- **Y轴**: 幅度值或坐标值

#### 递归图
- **黑色点**: 递归点
- **绿色矩形**: ROI时间段
- **数值**: RR(递归率), DET(确定性), ENT(熵)

#### 🆕 RQA分析流程结果
- **组级条形图**: 三组(Control/MCI/AD)的RQA指标对比
  - RR-2D-xy条形图: 递归率组间比较
  - DET-2D-xy条形图: 确定性组间比较  
  - ENT-2D-xy条形图: 熵组间比较
- **趋势图**: "Average RR (2D-xy) across tasks by Group"
  - X轴: 任务(Q1-Q5)
  - Y轴: 平均递归率值
  - 线条: 三组的变化趋势
  - 阴影: 标准差区域
  - 图例: 显示样本数量
- **统计数据**: JSON格式的组别统计摘要
- **文件输出**: PNG图片文件保存在对应目录

#### 🆕 模块7: 数据整合结果
- **标准化特征表格**: 显示所有受试者的10个标准化特征
  - **排序**: Control→MCI→AD组别顺序
  - **特征**: 游戏时长、3个ROI时间、6个RQA指标
  - **标准化值**: 0-1范围的标准化数值
- **分布图表**: 按特征类型的箱线图展示
  - **X轴**: 三个组别(Control/MCI/AD)
  - **Y轴**: 标准化特征值
  - **颜色**: 按组别区分
- **统计信息**: 实时数据统计
  - 受试者总数、游戏会话数、任务数、特征数
- **缓存文件**: 
  - `integrated_features_summary.csv`: 整合特征数据
  - `metadata.json`: 元数据和配置信息

#### 🆕 模块8: 眼动系数与MMSE对比结果
- **5图表散点图**: Q1-Q5任务的分离式可视化
  - **布局**: 上3图(Q1-Q3) + 下2图(Q4-Q5)
  - **X轴**: 眼动系数 (0-1范围)
  - **Y轴**: MMSE完成率 (0-100%)
  - **点颜色**: 蓝色(Control) | 橙色(MCI) | 红色(AD)
  - **工具提示**: 受试者ID、具体分数、系数值

- **三种数据表格**:
  - **个人视图**: 每个受试者的眼动系数与MMSE分数对应关系
  - **群体视图**: 按组别统计的平均值、相关系数、标准差
  - **子问题视图**: 每个MMSE子问题的详细分析

- **相关性分析**: 
  - **Pearson相关系数**: 眼动系数与MMSE分数的线性相关强度
  - **标准差**: 组内数据分散程度
  - **显著性**: 相关性的统计显著性判断

- **眼动系数解释**:
  - **计算方法**: 10个特征的加权平均(考虑方向性)
  - **取值范围**: 0-1，越高表示眼动表现越好
  - **特征权重**: 等权重处理(反转"越低越好"特征)

- **自动生成文件**:
  - `individual_comparison_*.csv`: 个人对比数据
  - `group_comparison_*.csv`: 群体统计数据
  - `subquestion_comparison_*.csv`: 子问题详细数据
  - JSON报告: 完整分析摘要和图表数据

---

## 🔧 技术细节

### RQA算法实现

```python
# 1. 信号嵌入 (Phase Space Reconstruction)
embedded = embed_signal(signal, m=2, tau=1)

# 2. 距离矩阵计算
distances = compute_distance_matrix(embedded, metric='euclidean')

# 3. 递归矩阵生成
recurrence_matrix = distances < threshold

# 4. RQA指标计算
RR = np.sum(recurrence_matrix) / (N * N)
DET = calculate_determinism(recurrence_matrix)
ENT = calculate_entropy(recurrence_matrix)
```

### 性能优化

- ⚡ **批量处理**: 并行处理多个数据文件
- 💾 **内存管理**: 及时释放图形对象和内存
- 🔄 **增量渲染**: 支持参数变更时的增量更新
- 📁 **结果缓存**: 按参数签名组织结果文件

### 错误处理

- 🛡️ **数据验证**: 自动检测和处理缺失列
- 🔧 **异常恢复**: 单个文件失败不影响整体处理
- 📝 **详细日志**: 完整的错误追踪和状态报告

---

## 📈 扩展计划

### 即将添加的功能
- 🎯 **更多RQA指标**: LAM, TT, RATIO等
- 📊 **统计分析增强**: 显著性检验、假设检验
- 📤 **高级导出**: PDF报告、Excel数据导出
- 🔍 **智能过滤**: 基于RQA指标和MMSE分数的数据筛选
- 🧠 **机器学习**: 基于眼动特征的认知状态预测模型
- 📈 **纵向分析**: 多时间点的眼动变化趋势分析

### 技术改进
- ⚡ **性能优化**: 多线程/多进程处理
- 📱 **移动适配**: 响应式设计改进
- 🔒 **用户系统**: 登录认证和权限管理
- ☁️ **云端部署**: Docker容器化支持

---

## 🐛 常见问题

### Q: 渲染失败怎么办？
A: 检查数据格式、文件路径和参数设置，查看服务器日志获取详细错误信息。

### Q: ROI着色不正确？
A: 确保All_Events.csv文件存在且格式正确，检查ADQ_ID映射关系。

### Q: 图片显示异常？
A: 清除浏览器缓存，检查网络连接，确认渲染已完成。

### Q: 性能问题？
A: 减少同时处理的文件数量，调整图片分辨率，增加系统内存。

### 🆕 Q: 模块7数据整合失败？
A: 
- 检查`data/calibrated`目录是否包含校准数据
- 确认`data/event_analysis_results/All_ROI_Summary.csv`文件存在
- 验证`data/rqa_pipeline_results`中有对应RQA参数的结果
- 查看服务器日志获取详细错误信息

### 🆕 Q: 模块8 MMSE数据加载异常？
A:
- 确认`data/MMSE_Score`目录包含三个组别的CSV文件
- 检查CSV文件的列名格式(受试者/试者列名不一致)
- 验证受试者ID格式匹配(如`n01` vs `n1q`)
- 确保先在模块7中生成对应RQA配置的数据

### 🆕 Q: 模块8眼动系数计算结果异常？
A:
- 确认已从模块7成功加载归一化特征数据
- 检查10个特征是否完整: game_duration, 3个ROI时间, 6个RQA参数
- 验证特征方向性处理: 时长/ROI时间取反，RQA参数直接使用
- 查看控制台日志确认系数计算过程(应为0-1范围)
- 确保归一化特征数据格式正确(包含session_id、subject_id等)

### 🆕 Q: 模块8 MMSE对比分析失败？
A:
- 确认`data/MMSE_Score`目录包含三个CSV文件: 控制组.csv、轻度认知障碍组.csv、阿尔兹海默症组.csv
- 检查CSV文件格式: 第一列为"受试者"或"试者"，包含年份、季节等21个MMSE题目列
- 验证受试者ID匹配: 眼动数据的session_id需要与MMSE的受试者ID对应
- 查看API状态: 确认MMSE API `/api/mmse-scores/{group}` 正常响应
- 检查数据匹配日志: 系统会显示成功匹配的受试者数量

### 🆕 Q: 模块8可视化图表显示异常？
A:
- 确认已完成眼动系数计算和MMSE对比分析两个步骤
- 检查Chart.js库是否正确加载和渲染
- 验证数据完整性: 需要同时有眼动系数和MMSE分数
- 查看散点图颜色: 蓝色=Control, 橙色=MCI, 红色=AD
- 确认Q1-Q5任务切换功能正常工作
- 检查浏览器控制台是否有JavaScript错误

### 🆕 Q: 模块8 CSV导出文件为空或格式错误？
A:
- 确认已完成完整的分析流程(加载→计算→对比)
- 检查`data/module8_analysis_results/{rqa_config}/`目录权限
- 验证分析结果数据结构: individual/group视图、main/subQuestion模式
- 查看时间戳格式: 文件名应包含完整时间戳
- 确认JSON报告导出功能正常
- 检查CSV内容: 应包含subject_id、task_id、眼动系数、MMSE分数等字段

### 🆕 Q: 5图表显示不完整？
A:
- 检查Chart.js库是否正确加载
- 确认数据是否包含所有Q1-Q5任务
- 验证浏览器兼容性(推荐Chrome/Firefox)
- 清除浏览器缓存并刷新页面

### 🆕 Q: 模块9.1数据预处理失败？
A:
- 确认模块7已生成对应RQA配置的眼动数据
- 检查`data/MMSE_Score`目录包含三组CSV文件
- 验证受试者ID格式匹配(n1q→n01, ad3q→ad01等)
- 查看控制台日志确认特征方向校正是否成功
- 确保眼动数据包含`Eye_Movement_Coefficient`列

### 🆕 Q: 模块9.2 CV训练出现错误？
A:
- 确认已完成模块9.1数据预处理步骤
- 检查TensorFlow/Keras是否正确安装
- 验证特征维度是否为10个（eye_coeff相关特征）
- 确认训练样本数量≥48（5-fold CV要求）
- 查看标签归一化是否正常([0,1]范围)

### 🆕 Q: CV训练性能不佳(R²为负)？
A:
- 检查MMSE子分数是否存在异常值(超出满分)
- 确认标签归一化MAX_SCORES=[5,5,3,5,3]设置
- 验证特征方向校正是否正确应用
- 考虑调整CV参数(dropout, l2_reg, patience)
- 查看各折验证性能是否一致

### 🆕 Q: 集成预测API调用失败？
A:
- 确认已成功完成CV训练保存了5个模型
- 检查`cv_models/fold0~4.keras`文件是否存在
- 验证特征预处理scaler是否正确保存
- 确认输入特征格式与训练时一致
- 查看API路由是否正确注册

---

## 📞 技术支持

如有问题或建议，请通过以下方式联系：
- 📧 创建Issue描述问题
- 📝 查看项目Wiki获取更多信息
- 🔧 提交Pull Request参与开发

---

**版本**: v1.3.0  
**最后更新**: 2025年8月5日  
**开发状态**: 活跃开发中 🚀  

### 🆕 模块9 - 机器学习预测分析

#### 📊 **子模块9.1 - 数据预处理与整合**
- **MMSE子分数提取**: 
  - Q1(时间定向): 5分, Q2(空间定向): 5分, Q3(即刻记忆): 3分
  - Q4(注意力计算): 5分, Q5(延迟回忆): 3分
  - 基于标准评分规则自动计算各子分数
- **眼动特征聚合**: 
  - 统计特征: eye_coeff_mean, eye_coeff_std, eye_coeff_min, eye_coeff_max
  - 任务特征: eye_coeff_q1~q5（按任务ID分离）
  - 缺失处理: task_count, missing_count, flag_missing_task
- **特征方向校正**: 
  - 支持reciprocal(倒数)、negate(取负)、identity(恒等)变换
  - 统一所有特征为"数值越高=认知越好"方向
- **数据集生成**: 
  - 80/20训练测试分割，stratified sampling
  - 保存StandardScaler和特征配置
  - ID映射处理（n1q→n01, ad3q→ad01等）

#### 🤖 **子模块9.2 - MLP模型训练（专家优化版）**
- **5-fold交叉验证**: 
  - KFold(n_splits=5, shuffle=True, random_state=42)
  - 每折独立训练，集成平均预测
  - 防过拟合，提升泛化能力
- **专家优化参数**: 
  - dropout=0.35（强正则化）
  - l2_reg=1e-3（L2正则化）
  - batch_size=8（小样本优化）
  - patience=10（早停策略）
  - epochs=200（充足训练）
- **标签归一化**: 
  - MMSE子分数归一化到[0,1]: y_norm = y_raw / [5,5,3,5,3]
  - 训练用归一化标签，评估时恢复原始量纲
  - 提升多输出回归稳定性
- **模型管理**: 
  - 保存5个CV模型到`cv_models/fold0~4.keras`
  - 训练历史保存到`cv_histories/`
  - 详细性能报告和元数据
- **集成预测API**: 
  - `/api/ml/cv-train` - 5-fold CV训练
  - `/api/ml/ensemble-predict` - 集成模型预测
  - 自动特征预处理和量纲转换

### 📈 **核心特性**
- 🆕 **智能特征选择**: 10个眼动系数特征自动筛选
- 🆕 **标签归一化**: 多输出回归优化技术
- 🆕 **交叉验证**: 5-fold CV + 集成平均
- 🆕 **专家调优**: 针对60样本小数据集优化
- 🆕 **容错处理**: 支持缺失任务的受试者
- 🆕 **双量纲管理**: 训练[0,1] + 评估原始量纲

### 📁 **数据流程**
```
模块7 → 眼动系数计算 → Eye_Movement_Coefficient
   ↓
模块9.1 → 数据预处理 → train_dataset.csv + test_dataset.csv
   ↓                     ↓
模块9.2 → CV训练 → 5个fold模型 + 集成预测器
   ↓
API调用 → 实时预测 → MMSE子分数预测 (Q1~Q5)
```

### 🏗️ **技术架构**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   模块7 输出     │    │   模块9.1 处理   │    │   模块9.2 训练   │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│• Eye_Movement_  │───▶│• MMSE子分数提取 │───▶│• 5-fold CV训练  │
│  Coefficient    │    │• 眼动特征聚合   │    │• 标签归一化     │
│• Task_ID (Q1~5) │    │• 特征方向校正   │    │• 早停+正则化   │
│• Subject_ID     │    │• 缺失任务处理   │    │• 集成平均       │
│• Group_Type     │    │• 80/20数据分割  │    │• 模型保存       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   MMSE数据      │    │   特征数据       │    │   训练产物       │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│• Q1~Q5子分数   │    │• 10个eye_coeff  │    │• cv_models/     │
│• 标准评分规则   │    │  特征           │    │• cv_histories/  │
│• 受试者ID映射   │    │• StandardScaler │    │• cv_metrics.json│
│• 三组数据整合   │    │• 特征配置文件   │    │• 集成预测结果   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 🎯 **关键文件结构**
```
data/module9_ml_results/{rqa_config}/
├── train_dataset_*.csv          # 训练数据集
├── test_dataset_*.csv           # 测试数据集  
├── scaler_10features.pkl        # 特征标准化器
├── feature_direction_config.json # 特征方向配置
├── cv_models/                   # CV模型目录
│   ├── fold0.keras             # 折叠0模型
│   ├── fold1.keras             # 折叠1模型
│   └── ...                     # 折叠2-4模型
├── cv_histories/                # 训练历史
│   ├── cv_history_fold0.json   # 折叠0训练历史
│   └── ...                     # 其他折叠历史
├── cv_metrics_*.json           # CV性能指标
└── ensemble_test_predictions_*.csv # 集成预测结果
```

### 🔌 **API接口文档**

#### **模块9.1 数据预处理**
```javascript
// POST /api/ml/preprocess-data
{
  "config_name": "m2_tau1_eps0.06_lmin2",
  "enableFeatureCorrection": true
}

// 响应
{
  "success": true,
  "message": "数据预处理完成",
  "stats": {
    "total_subjects": 60,
    "train_samples": 48,
    "test_samples": 12,
    "feature_count": 10,
    "missing_tasks_handled": 5
  }
}
```

#### **模块9.2 CV训练**
```javascript
// POST /api/ml/cv-train
{
  "config_name": "m2_tau1_eps0.06_lmin2",
  "cv_params": {
    "epochs": 200,
    "patience": 10,
    "dropout": 0.35,
    "l2_reg": 0.001
  }
}

// 响应
{
  "success": true,
  "ensemble_metrics": {
    "rmse": 1.25,
    "mae": 0.98,
    "r2": 0.45
  },
  "cv_stats": {
    "cv_rmse_mean": 1.28,
    "cv_rmse_std": 0.15,
    "best_fold": 2
  },
  "detailed_metrics": {
    "Q1_subscore": {"rmse": 1.1, "mae": 0.9, "r2": 0.52},
    "Q2_subscore": {"rmse": 1.2, "mae": 0.95, "r2": 0.48},
    // ... Q3-Q5
  }
}
```

#### **集成预测API**
```javascript
// POST /api/ml/ensemble-predict
{
  "config_name": "m2_tau1_eps0.06_lmin2",
  "features": {
    "eye_coeff_mean": 0.678,
    "eye_coeff_std": 0.123,
    "eye_coeff_min": 0.234,
    "eye_coeff_max": 0.891,
    // ... 其他6个特征
  }
}

// 响应
{
  "success": true,
  "result": {
    "ensemble_prediction": {
      "Q1_subscore": 4.2,
      "Q2_subscore": 3.8,
      "Q3_subscore": 2.1,
      "Q4_subscore": 3.5,
      "Q5_subscore": 2.3
    },
    "prediction_stats": {
      "mean": {...},
      "std": {...}
    }
  }
}
```

### 📊 **模块功能概览**
- 🔹 **模块7**: 多源数据整合与标准化分析 - 10个眼动特征的归一化处理
- 🔹 **模块8**: 眼动系数与MMSE认知评估对比分析 - 17个子问题级别的深度融合
- 🔹 **模块9.1**: 机器学习数据预处理 - 特征聚合、方向校正、缺失处理
- 🔹 **模块9.2**: 5-fold CV深度学习训练 - 标签归一化、专家调优、集成预测
- 🔹 **自动化导出**: 所有分析结果的智能保存和时间戳管理
- 🔹 **多维可视化**: Q1-Q5任务分离图表、CV训练曲线、预测散点图
- 🔹 **统计分析**: 相关性分析、群体差异、交叉验证性能评估
- 🔹 **智能匹配**: 受试者ID格式自适应、数据完整性校验
- 🔹 **双语支持**: 完整的中英文界面和技术文档 