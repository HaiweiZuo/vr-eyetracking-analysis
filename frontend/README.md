# VR眼球追踪数据可视化平台 - React前端

这是VR眼球追踪数据可视化平台的现代化React前端重构版本。

## 🚀 快速开始

### 环境要求

- Node.js >= 16.x
- npm >= 8.x 或 yarn >= 1.22.x

### 安装依赖

```bash
# 进入frontend目录
cd frontend

# 安装依赖
npm install
# 或
yarn install
```

### 启动开发服务器

```bash
# 启动React开发服务器
npm start
# 或
yarn start
```

应用将在 `http://localhost:3000` 启动。

**注意**: 确保后端服务器在 `http://localhost:8080` 运行，React应用已配置代理到后端API。

### 构建生产版本

```bash
# 构建生产版本
npm run build
# 或
yarn build
```

## 📁 项目结构

```
frontend/
├── public/                 # 静态资源
│   └── index.html         # HTML模板
├── src/
│   ├── components/        # React组件
│   │   ├── Common/        # 通用组件
│   │   │   └── LanguageSwitch/
│   │   ├── Layout/        # 布局组件
│   │   │   ├── Header.js
│   │   │   ├── Sidebar.js
│   │   │   └── Layout.js
│   │   └── Modules/       # 功能模块组件
│   │       ├── DataVisualization/
│   │       ├── DataImport/
│   │       ├── RQAAnalysis/
│   │       ├── EventAnalysis/
│   │       ├── RQAPipeline/
│   │       ├── FeatureExtraction/
│   │       └── DataOrganization/
│   ├── services/          # API服务
│   │   └── api.js
│   ├── store/             # 状态管理
│   │   └── useAppStore.js
│   ├── utils/             # 工具函数
│   │   └── languages.js
│   ├── App.js             # 主应用组件
│   ├── App.css            # 应用样式
│   ├── index.js           # 应用入口
│   └── index.css          # 全局样式
├── package.json           # 项目配置
└── README.md              # 项目说明
```

## 🎯 技术架构

### 核心技术栈

- **React 18** - 前端框架
- **React Router v6** - 路由管理
- **Zustand** - 轻量级状态管理
- **React Query** - 服务端状态管理和缓存
- **Axios** - HTTP客户端
- **Bootstrap 5** - UI框架
- **React Hot Toast** - 通知组件

### 架构特点

1. **组件化设计**: 每个功能模块都是独立的React组件
2. **路由系统**: 使用React Router实现SPA路由
3. **状态管理**: Zustand管理全局状态，React Query管理服务端状态
4. **类型安全**: 预留TypeScript支持
5. **响应式设计**: 支持桌面端和移动端

## 🎨 组件架构

### 布局组件

- **Layout**: 主布局容器，管理整体布局和数据初始化
- **Header**: 顶部横幅，包含标题、统计信息和控制按钮
- **Sidebar**: 侧边栏导航，支持展开/收缩

### 功能模块

#### 1. 数据可视化 (DataVisualization)
- **功能**: 眼动轨迹可视化、实时参数控制
- **子组件**:
  - `DataList`: 数据列表展示
  - `VisualizationDisplay`: 可视化图像显示
  - `VisualizationControls`: 可视化参数控制
  - `GroupFilter`: 组别过滤器
  - `QuestionFilter`: 任务过滤器

#### 2. 数据导入 (DataImport)
- **功能**: 文件拖拽上传、批量处理
- **特性**: 支持.txt和.csv格式，实时进度显示

#### 3-7. 其他模块
- 目前为基础框架，后续将逐步实现完整功能

## 🔧 开发指南

### 添加新组件

1. 在 `src/components/` 下创建组件目录
2. 创建 `ComponentName.js` 和 `ComponentName.css`
3. 在需要的地方导入和使用

### 状态管理

使用Zustand进行状态管理：

```javascript
import useAppStore from '../store/useAppStore';

const MyComponent = () => {
  const { currentView, setCurrentView } = useAppStore();
  
  return (
    <div onClick={() => setCurrentView('newView')}>
      Current: {currentView}
    </div>
  );
};
```

### API调用

使用封装的API服务：

```javascript
import { apiService } from '../services/api';

const fetchData = async () => {
  try {
    const data = await apiService.getGroups();
    console.log(data);
  } catch (error) {
    console.error('API错误:', error);
  }
};
```

### 多语言支持

```javascript
import { languageTexts } from '../utils/languages';
import useAppStore from '../store/useAppStore';

const MyComponent = () => {
  const { currentLanguage } = useAppStore();
  const texts = languageTexts[currentLanguage];
  
  return <h1>{texts.title}</h1>;
};
```

## 🔗 与后端集成

### API代理配置

在 `package.json` 中配置了代理：

```json
{
  "proxy": "http://localhost:8080"
}
```

所有 `/api/*` 请求将自动代理到后端服务器。

### 环境变量

可以通过 `.env` 文件配置API地址：

```env
REACT_APP_API_URL=http://localhost:8080
```

## 📱 响应式设计

- **桌面端** (≥1200px): 完整布局，侧边栏展开
- **平板端** (768px-1199px): 紧凑布局，侧边栏可展开
- **移动端** (<768px): 垂直布局，侧边栏覆盖式展开

## 🎭 样式规范

### CSS组织

- 每个组件都有对应的CSS文件
- 使用BEM命名规范
- 响应式断点统一管理

### 颜色主题

- 主色调: `#3b82f6` (蓝色)
- 成功色: `#22c55e` (绿色)  
- 警告色: `#f97316` (橙色)
- 错误色: `#ef4444` (红色)
- 灰色系: `#6b7280`, `#9ca3af`, `#d1d5db`

## 🚧 开发状态

### ✅ 已完成
- [x] 项目基础架构
- [x] 布局组件 (Header, Sidebar, Layout)
- [x] 路由系统
- [x] 状态管理
- [x] API服务层
- [x] 数据可视化模块 (完整功能)
- [x] 数据导入模块 (基础功能)
- [x] 多语言支持
- [x] 响应式设计

### 🚧 进行中
- [ ] 其他5个功能模块的详细实现
- [ ] 单元测试
- [ ] 性能优化

### 📋 待开发
- [ ] TypeScript迁移
- [ ] 更多可视化图表
- [ ] 离线数据缓存
- [ ] PWA支持

## 🤝 贡献指南

1. Fork项目
2. 创建功能分支: `git checkout -b feature/新功能`
3. 提交更改: `git commit -am '添加新功能'`
4. 推送到分支: `git push origin feature/新功能`
5. 提交Pull Request

## 📄 许可证

本项目使用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

## 💡 下一步计划

1. **完善现有模块**: 实现RQA分析、事件分析等模块的详细功能
2. **性能优化**: 添加虚拟滚动、懒加载等优化
3. **测试覆盖**: 添加单元测试和集成测试
4. **类型安全**: 迁移到TypeScript
5. **用户体验**: 添加更多交互动画和反馈

如有任何问题或建议，请创建Issue或联系开发团队。