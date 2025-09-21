        let currentVisualization = null;
        let allData = {};
        let currentGroup = 'all';
        let currentQuestion = 'all';
        let currentLanguage = 'zh';
        let groupsData = null; // 保存组数据用于语言切换
        let currentView = 'visualization'; // 当前视图
        let sidebarExpanded = false; // 侧边栏状态

        // 多语言文本配置
        const languageTexts = {
            zh: {
                title: 'VR眼球追踪数据可视化平台',
                subtitle: '三组认知功能评估的VR眼球追踪数据分析与可视化平台',
                restart: '重启',
                totalData: '数据总数',
                researchGroups: '研究组别',
                controlGroup: '健康对照组',
                mciGroup: '轻度认知障碍组',
                adGroup: '阿尔茨海默组',
                taskFilter: '任务过滤',
                all: '全部',
                task1: '任务1',
                task2: '任务2',
                task3: '任务3',
                task4: '任务4',
                task5: '任务5',
                dataList: '数据列表',
                loading: '加载中...',
                refresh: '刷新',
                selectDataTitle: '选择数据开始分析',
                selectDataSubtitle: '点击左侧的数据项来生成专业的眼动轨迹可视化分析',
                eyeTrackingVis: '眼动轨迹可视化',
                visControls: '可视化控制',
                fixationSize: '注视点大小:',
                trajectoryWidth: '轨迹线宽:',
                pointSize: '数据点大小:',
                trajectoryStyle: '轨迹样式:',
                solidLine: '实线',
                dashedLine: '虚线',
                dottedLine: '点线',
                updateVis: '更新可视化',
                generatingVis: '正在生成可视化...',
                noData: '暂无数据',
                loadFailed: '加载失败',
                dataItems: '个数据',
                overallStats: '整体统计',
                totalPoints: '总数据点',
                totalDuration: '总时长',
                fixationEvents: '注视事件',
                saccadeEvents: '扫视事件',
                avgVelocity: '平均速度',
                maxVelocity: '最大速度',
                roiSequence: 'ROI序列',
                mainRoiStats: '主要ROI统计',
                statInfo: '统计信息',
                restartConfirm: '确定要重启服务器吗？',
                restarting: '服务器正在重启...',
                dataVisualization: '数据可视化',
                newFeature: '数据导入',
                dataImportTitle: '数据导入与处理',
                dataImportDesc: '批量导入原始眼动数据，自动完成预处理和校准步骤',
                stepUpload: '上传文件',
                stepGroup: '选择分组',
                stepProcess: '数据处理',
                stepComplete: '完成',
                uploadTitle: '拖拽或点击选择文件',
                uploadDesc: '请选择5个txt文件，文件名必须为：1.txt, 2.txt, 3.txt, 4.txt, 5.txt',
                selectFiles: '选择文件',
                selectedFiles: '已选择的文件',
                clearFiles: '清空',
                nextStep: '下一步',
                selectGroup: '选择数据分组',
                groupSelectionDesc: '为这批导入的数据选择合适的研究组别',
                controlDesc: '认知功能正常的健康被试',
                mciDesc: '轻度认知功能障碍被试',
                adDesc: '阿尔茨海默病被试',
                prevStep: '上一步',
                startProcess: '开始处理',
                processingData: '正在处理数据',
                overallProgress: '整体进度',
                currentTask: '当前任务',
                processingLog: '处理日志',
                processingComplete: '数据处理完成！',
                processingCompleteDesc: '所有文件已成功处理并添加到系统中',
                viewData: '查看数据',
                importMore: '导入更多',
                importStatus: '导入状态',
                fileRequirements: '文件要求',
                req1: '必须上传5个txt文件',
                req2: '文件名必须是: 1.txt, 2.txt, 3.txt, 4.txt, 5.txt 或 level_1.txt, level_2.txt, level_3.txt, level_4.txt, level_5.txt',
                req3: '代表同一被试的Q1-Q5数据',
                validationStatus: '验证状态',
                processPreview: '处理预览',
                fileValidation: '文件验证失败',
                missingFiles: '缺少必需的文件',
                invalidFileNames: '文件名不符合要求',
                validationPassed: '验证通过，可以进入下一步',
                editCalibration: '校准编辑',
                calibrationEdit: '校准编辑模式',
                calibrationDesc: '调整当前数据的偏移量，实时预览校准效果',
                currentData: '当前数据',
                xOffset: 'X轴偏移',
                yOffset: 'Y轴偏移',
                presetOffsets: '常用偏移量',
                reset: '重置',
                cancel: '取消',
                preview: '预览',
                save: '保存校准',
                calibrationSaved: '校准已保存',
                calibrationError: '校准保存失败',
                timeCalibration: '时间校准',
                timeCalibrationDesc: '调整数据的时间范围，控制轨迹的起始和结束点',
                totalDuration: '总时长',
                dataPoints: '数据点',
                selectedRange: '选择范围',
                startTime: '起始时间',
                endTime: '结束时间',
                timePresets: '时间预设',
                fullRange: '完整',
                trimEdges: '去边缘',
                firstHalf: '前半段',
                secondHalf: '后半段',
                groupControl: '对照组',
                groupMci: '轻度认知障碍组',
                groupAd: '阿尔兹海默组',
                editDataGroup: '编辑数据组别',
                dataId: '数据ID',
                currentGroup: '当前组别',
                selectNewGroup: '选择新组别',
                deleteDataConfirm: '确定要删除数据 "{0}" 吗？\n\n注意：删除单个任务将会导致整个组的数据被删除。',
                deleteDataFailed: '删除数据失败',
                changeGroupFailed: '更改组别失败',
                deleteDataSuccess: '数据删除成功',
                changeGroupSuccess: '组别更改成功',
                confirm: '确认更改',
                cognitiveAssessment: '认知评估 (MMSE)',
                noMMSEData: '该组别暂无MMSE评估数据',
                orientation: '定向力',
                immediateMemory: '即刻记忆',
                calculation: '计算能力',
                delayedRecall: '延迟回忆',
                totalScore: '总分',
                assessmentLevel: '评估等级',
                unitCount: '个',
                unitMs: 'ms',
                unitSecond: 's',
                unitDegreesPerSecond: '°/s',
                // MMSE任务名称
                q1OrientationTime: '时间定向',
                q2OrientationPlace: '地点定向',
                q3ImmediateMemory: '即刻记忆',
                q4Calculation: '计算能力',
                q5DelayedRecall: '延迟回忆',
                year: '年份',
                season: '季节',
                month: '月份',
                weekday: '星期',
                province: '省市区',
                street: '街道',
                building: '建筑',
                floor: '楼层',
                word1: '词1',
                word2: '词2',
                word3: '词3',
                // RQA分析相关
                rqaAnalysis: 'RQA分析',
                rqaAnalysisTitle: '递归量化分析 (RQA)',
                rqaAnalysisDescription: '批量生成和可视化递归图',
                renderControl: '渲染控制',
                filterControl: '筛选控制',
                analysisMode: '分析模式',
                analysis1DX: '1D信号 (X坐标)',
                analysis1DAmplitude: '1D信号 (幅度)',
                analysis2DXY: '2D信号 (X,Y坐标)',
                distanceMetric: '距离度量',
                distance1DAbs: '1D绝对差',
                distanceEuclidean: '欧几里得距离',
                embeddingDimension: '嵌入维度 (m)',
                timeDelay: '时间延迟 (τ)',
                recurrenceThreshold: '递归阈值 (ε)',
                minLineLength: '最小线长 (l_min)',
                colorTheme: '渲染颜色',
                grayscaleTheme: '灰度',
                greenGradientTheme: '墨绿色到白色渐变',
                startRender: '开始渲染',
                checkStatus: '检查状态',
                filterGroup: '筛选组别',
                filterQuestion: '筛选问题',
                allQuestions: '全部问题',
                updateDisplay: '更新显示',
                rqaResultsTitle: '递归图可视化结果',
                rqaResultsDescription: '一行显示5列，按组别和问题排列',
                noRQAImages: '尚未渲染RQA图像',
                renderTip: '请先设置参数并点击"开始渲染"按钮',
                imageType: '图片类型',
                amplitudeImage: '幅度图',
                trajectoryImage: '轨迹图',
                recurrenceImage: '递归图',
                allGroups: '所有组别',
                controlGroup: '控制组',
                mciGroup: 'MCI组',
                adGroup: 'AD组',
                question1: 'Q1',
                question2: 'Q2',
                question3: 'Q3',
                question4: 'Q4',
                question5: 'Q5',
                filterAnalysisMode: '分析模式',
                filterDistanceMetric: '距离度量',
                filterColorTheme: '渲染颜色',
                allAnalysisModes: '所有模式',
                allDistanceMetrics: '所有度量',
                allColorThemes: '所有主题',
                analysis1DAmplitude: '1D信号 (幅度)',
                analysis2DXY: '2D信号 (X,Y坐标)',
                distance1DAbs: '1D绝对差',
                distanceEuclidean: '欧几里得距离',
                rqaTitle: '递归量化分析 (RQA)',
                rqaDescription: '对眼动数据进行递归量化分析，揭示眼动模式的复杂性和规律性',
                
                // 事件分析相关
                eventAnalysis: '事件分析',
                eventAnalysisTitle: '眼动事件分析',
                eventAnalysisDescription: '展示和筛选基于IVT算法的眼动事件分析结果和ROI统计数据',
                dataOverview: '数据概览',
                dataType: '数据类型',
                eventsData: '事件数据',
                roiData: 'ROI统计',
                groupFilter: '组别筛选',
                allGroups: '全部组别',
                controlGroup: '对照组',
                mciGroup: 'MCI组',
                adGroup: 'AD组',
                eventTypeFilter: '事件类型',
                allEvents: '全部事件',
                fixationEvents: 'fixation',
                saccadeEvents: 'saccade',
                pageSize: '每页显示',
                refreshData: '刷新数据',
                regenerateData: '重新生成数据',
                exportData: '导出数据',
                loadingData: '正在加载数据...',
                filterOptions: '筛选选项',
                dataSelection: '数据选择',
                selectGroup: '选择研究组',
                allGroups: '所有组别',
                selectTask: '选择任务',
                allTasks: '所有任务',
                selectData: '选择具体数据',
                selectAll: '全选',
                pleaseSelect: '请先选择组别和任务',
                rqaParameters: 'RQA参数',
                embeddingDimension: '嵌入维度 (m)',
                timeDelay: '时间延迟 (τ)',
                recurrenceThreshold: '递归阈值 (ε)',
                minLineLength: '最小线长 (l_min)',
                runAnalysis: '运行分析',
                resetParams: '重置参数',
                recurrencePlot: '递归图',
                rqaMetrics: 'RQA指标',
                compareResults: '对比分析',
                recurrencePlotTitle: '递归图可视化',
                recurrencePlotDesc: '显示眼动轨迹的递归模式和周期性结构',
                rqaMetricsTitle: 'RQA量化指标',
                rqaMetricsDesc: '定量描述眼动模式的复杂性、确定性和可预测性',
                compareTitle: '组间对比分析',
                compareDesc: '比较不同组别的RQA指标差异',
                noAnalysisYet: '尚未运行分析',
                selectDataAndRun: '请选择数据并设置参数后运行RQA分析',
                noMetricsYet: '尚无指标数据',
                runAnalysisFirst: '请先运行RQA分析以获取量化指标',
                noCompareYet: '尚无对比数据',
                selectMultipleGroups: '请选择多个组别进行对比分析',
                pleaseSelectData: '请先选择要分析的数据',
                
                // 模块7 - 数据整理
                seventhModule: '数据整理',
                dataOrganizationTitle: '数据整理与特征可视化',
                dataOrganizationSubtitle: '基于数据库三大范式设计的归一化特征数据分析',
                loadingNormalizedData: '正在加载归一化特征数据...',
                totalSubjects: '受试者总数',
                totalSessions: '游戏会话数',
                vrMmseTasks: 'VR-MMSE任务',
                normalizedFeatures: '归一化特征',
                dataFilterConfig: '数据筛选与配置',
                selectTask: '选择任务 (Q1-Q5)',
                allTasks: '全部任务',
                taskQ1: '任务 Q1',
                taskQ2: '任务 Q2',
                taskQ3: '任务 Q3',
                taskQ4: '任务 Q4',
                taskQ5: '任务 Q5',
                experimentalGroupFilter: '实验组筛选',
                adGroupLabel: '阿尔兹海默症组',
                mciGroupLabel: '轻度认知障碍组',
                controlGroupLabel: '正常对照组',
                featureType: '特征类型',
                gameDurationOption: '🎮 游戏时长',
                roiFeaturesOption: '👁️ ROI特征 (3项)',
                rqa1dFeaturesOption: '🔄 RQA-1D特征 (3项)',
                rqa2dFeaturesOption: '🔄 RQA-2D特征 (3项)',
                rqaAllFeaturesOption: '🔄 RQA全部特征 (6项)',
                comprehensiveOption: '📈 综合对比 (10项)',
                allFeaturesOption: '📊 全部特征 (10项)',
                visualizationType: '可视化类型',
                barChartOption: '📊 柱状图',
                lineChartOption: '📈 折线图',
                scatterChartOption: '🔸 散点图',
                refreshData: '刷新数据',
                generateChart: '生成图表',
                exportData: '导出数据',
                // 归一化方法说明 - 中文
                normalizationMethods: '归一化方法说明',
                gameDurationTitle: '游戏时长特征',
                gameDurationMethod: '方法',
                gameDurationRange: '范围',
                gameDurationReason: '原因',
                gameDurationReasonText: '避免极端异常值(如0.1秒或4分钟)影响正常数据分布',
                roiTimeTitle: 'ROI时间特征',
                roiTimeMethod: '方法',
                roiTimeRange: '范围',
                roiTimeReason: '原因',
                roiTimeReasonText: '保留更多有效数据，过滤注视时间异常值',
                rqaFeaturesTitle: 'RQA递归量化特征',
                rqaFeaturesMethod: '方法',
                rqaFeaturesRange: '范围',
                rqaFeaturesReason: '原因',
                rqaFeaturesReasonText: 'RQA特征(RR、DET、ENT)具有理论范围限制，无需截断处理',
                rqaFeaturesList: '包含: RR-1D, DET-1D, ENT-1D, RR-2D, DET-2D, ENT-2D',
                percentileClip: '百分位数截断归一化',
                minMaxNormalization: '标准Min-Max归一化',
                dataVisualizationChart: '数据可视化图表',
                clickGenerateChart: '点击"生成图表"开始数据可视化',
                chartGenerationDesc: '选择任务、实验组和特征类型后生成对应的统计图表',
                normalizedFeatureTable: '归一化特征数据表格',
                tableRowCountText: '0 行',
                sessionId: '会话ID',
                subject: '受试者',
                task: '任务',
                experimentalGroup: '实验组',
                gameDuration: '游戏时长',
                kwRoi: 'KW-ROI',
                instRoi: 'INST-ROI',
                bgRoi: 'BG-ROI',
                rr1d: 'RR-1D',
                det1d: 'DET-1D',
                ent1d: 'ENT-1D',
                rr2d: 'RR-2D',
                det2d: 'DET-2D',
                ent2d: 'ENT-2D',
                clickRefreshData: '点击"刷新数据"加载归一化特征数据',
                
                // 模块8 - 智能分析
                eighthModule: '智能分析',
                intelligentAnalysisTitle: '智能分析与AI辅助',
                intelligentAnalysisSubtitle: '基于机器学习和人工智能的眼动数据智能分析平台',
                loadingAiEngine: '正在初始化AI分析引擎...',
                patternsDetected: '检测到的模式',
                predictionAccuracy: '预测准确率',
                aiInsights: 'AI洞察',
                anomaliesDetected: '异常检测',
                aiControlPanel: 'AI分析控制台',
                aiAnalysisMode: 'AI分析模式',
                dataSource: '数据源选择',
                rawEyetrackingData: '原始眼动数据',
                extractedFeatures: '提取特征数据',
                rqaAnalysisData: 'RQA分析数据',
                modelConfig: '模型配置',
                confidenceThreshold: '置信度阈值',
                maxIterations: '最大迭代次数',
                startAiAnalysis: '开始AI分析',
                viewResults: '查看结果',
                exportAiReport: '导出AI报告',
                aiVisualizationResults: 'AI分析结果可视化',
                clickStartAi: '点击"开始AI分析"进行智能数据分析',
                aiAnalysisDesc: 'AI将自动识别数据模式、检测异常并生成洞察报告',
                aiInsightReport: 'AI洞察报告',
                waitingForAnalysis: '等待分析',
                noInsightsYet: '暂无AI洞察数据，请先运行分析',
                
                // 模块8 - 眼动系数与MMSE对比分析
                loadEyeMovementData: '加载眼动数据',
                calculateCoefficients: '计算眼动系数',
                compareWithMMSE: 'MMSE对比分析',
                exportComparisonReport: '导出对比报告',
                eyeMovementMMSEComparison: '眼动系数与MMSE分数对比',
                eyeMovementIndicators: '眼动特征指标说明',
                lowerIsBetter: '越低越好指标',
                higherIsBetter: '越高越好指标',
                gameDuration: '游戏时长',
                kwRoiTime: '关键词ROI时间',
                instRoiTime: '指令ROI时间',
                bgRoiTime: '背景ROI时间',
                rqaFeatures: 'RQA特征',
                rqa2dFeatures: 'RQA-2D特征',
                rqaDescription: '反映眼动模式的复杂性和规律性',
                coefficientCalculation: '眼动系数 = (反向处理的时间指标 + 正向RQA指标) / 10，确保所有指标方向一致',
                selectRqaConfig: '请选择RQA配置数据...',
                pleaseSelectModule7DataSource: '请先选择模块7数据源',
                pleaseLoadEyeMovementDataFirst: '请先加载眼动数据',
                eyeMovementDataLoadFailed: '眼动数据加载失败: {error}\n\n请确保：\n1. 服务器正在运行\n2. 已访问模块7并生成了对应的数据\n3. 选择了正确的RQA配置',
                mmseDataLoadFailed: 'MMSE数据加载失败，请检查服务器状态和数据文件',
                pleaseCalculateCoefficientsFirst: '请先计算眼动系数',
                mmseComparisonFailed: 'MMSE对比分析失败，请重试',
                pleasePerformMmseComparisonFirst: '请先进行MMSE对比分析',
                exportReportFailed: '导出报告失败，请重试',
                gameDurationRangeValue: '5%-95%分位数',
                roiTimeRangeValue: '5%-98%分位数',
                rqaFeaturesRangeValue: '[0, 1]',
                clickStartComparison: '点击"MMSE对比分析"开始分析',
                comparisonAnalysisDesc: '分析眼动系数与MMSE认知评分的相关性',
                comparisonResultsTable: '眼动系数与MMSE对比结果',
                switchToGroupView: '切换到群体视图',
                switchToIndividualView: '切换到个人视图',
                subjectId: '受试者ID',
                taskId: '任务',
                groupType: '组别',
                eyeMovementCoeff: '眼动系数',
                mmseScore: 'MMSE分数',
                mmseMaxScore: '满分',
                performanceRatio: '完成率',
                avgEyeMovementCoeff: '平均眼动系数',
                avgMmseScore: '平均MMSE分数',
                                    subjectCount: '受试者数量',
                    correlationCoeff: '相关系数',
                    standardDeviation: '标准差',
                    subQuestionName: '子问题',
                    subQuestionScore: '子问题分数',
                    subQuestionMaxScore: '满分',
                    subQuestionPerformanceRatio: '完成率',
                noComparisonData: '点击"MMSE对比分析"加载对比数据',
                switchToSubQuestionView: '切换到子问题详细视图',
                switchToMainQuestionView: '切换到主问题视图',
                subQuestionId: '子问题',
                subQuestionName: '子问题名称',
                subQuestionScore: '子问题得分',
                subQuestionMaxScore: '子问题满分',
                // MMSE子问题中文名称
                年份: '年份',
                季节: '季节', 
                月份: '月份',
                星期: '星期',
                省市区: '省市区',
                街道: '街道',
                建筑: '建筑',
                楼层: '楼层',
                即刻记忆: '即刻记忆',
                '100-7': '100-7',
                '93-7': '93-7',
                '86-7': '86-7', 
                '79-7': '79-7',
                '72-7': '72-7',
                词1: '词1',
                词2: '词2',
                词3: '词3',
                
                        // 模块9 - 机器学习预测分析
        ninthModule: '机器学习',
        
        // 模块10 - Eye-Index 综合评估
        tenthModule: 'Eye-Index评估',
        tenthModuleTitle: '模块10 - Eye-Index 综合评估',
        tenthModuleSubtitle: '基于10个眼动特征的综合指标计算与可视化分析',
        
        // 模块10-B PyTorch训练引擎
        module10bTitle: '子模块10-B: PyTorch MLP训练引擎',
        module10bDescription: '基于PyTorch的多层感知机训练系统，支持Q1-Q5任务的独立训练',
        loadingTrainingInterface: '正在加载训练界面...',
        trainingConfig: '训练配置',
        selectDataset: '选择数据集',
        selectTask: '选择训练任务',
        multiSelectHint: '按住Ctrl键多选',
        epochs: '训练轮数',
        learningRate: '学习率',
        batchSize: '批大小',
        earlyStopPatience: '早停耐心值',
        startTraining: '开始训练',
        trainingMonitor: '训练监控',
        readyToTrain: '请选择数据集和任务开始训练',
        trainingProgress: '训练进度',
        currentEpoch: '当前轮次',
        trainLoss: '训练损失',
        valLoss: '验证损失',
        trainingResults: '训练结果',
        task: '任务',
        bestEpoch: '最佳轮次',
        bestValLoss: '最佳验证损失',
        testRmse: '测试RMSE',
        testR2: '测试R²',
        modelPath: '模型路径',

        
        // 模块10-C 数据查看器
        module10cTitle: '子模块10-C: 训练数据查看器',
        module10cDescription: 'NPZ训练数据的表格化展示、统计分析和导出功能',
        selectDataset: '选择数据集',
        selectTask: '选择任务',
        options: '选项',
        includePredictions: '包含预测结果',
        loadDataTable: '加载数据表格',
        showStatistics: '统计摘要',
        exportCSV: '导出CSV',
        exportExcel: '导出Excel',
        compareDatasets: '对比数据集',
        dataStatsSummary: '数据统计摘要',
        trainingDataDetails: '训练数据详情',
        loadingData: '正在加载数据...',
        noDataLoaded: '暂无数据',
        selectDatasetToView: '请选择数据集和任务，然后点击"加载数据表格"',
        showingEntries: '显示第 {start}-{end} 条，共 {total} 条记录',
        correlationAnalysis: '特征相关性分析',
        q1Orientation: 'Q1 定向',
        q2Registration: 'Q2 注册',
        q3AttentionCalculation: 'Q3 注意计算',
        q4Recall: 'Q4 回忆',
        q5DelayedRecall: 'Q5 延迟回忆',
        
        // 模块10-D 性能评估
        module10dTitle: '子模块10-D: 模型性能评估与差异可视化',
        module10dDesc: '深度分析模型预测性能，提供个体残差和任务级误差对比',
        selectModelConfig: '选择模型配置',
        analysisOptions: '分析选项',
        includeGroupAnalysis: '包含组别对比',
        startAnalysis: '开始分析',
        exportData: '导出数据',
        performanceOverview: '性能指标概览',
        residualAnalysis: '个体残差曲线分析',
        taskComparison: '任务级误差对比分析',
        groupPerformanceComparison: '分组性能对比',
        downloadChart: '下载图表',
        showGroups: '显示组别',
        controlGroup: 'Control',
        mciGroup: 'MCI',
        adGroup: 'AD',
        allGroups: '全部',
        residualChartHelp: '残差 = 预测值 - 真实值。正值表示高估，负值表示低估。',
        comparisonChartHelp: '蓝色柱表示平均真实得分，红色柱表示平均绝对误差。',
        analyzing: '正在分析模型性能...',
        selectConfigToStart: '请选择模型配置开始性能分析',
        performanceAnalysisDesc: '分析将展示模型在各任务上的预测准确性和个体差异',
        
        refreshData: '刷新数据',
        selectConfig: '选择RQA配置',
        pleaseSelect: '请选择配置...',
        calculationMode: '计算模式',
        status: '状态',
        notCalculated: '未计算',
        equalWeight: '等权平均',
        pcaMode: 'PCA第一主成分',
        customWeight: '自定义权重',
        
        q1TimeOrientation: 'Q1 时间定向',
        q2SpaceOrientation: 'Q2 空间定向',
        q3ImmediateMemory: 'Q3 即刻记忆',
        q4AttentionCalculation: 'Q4 注意力计算',
        q5DelayedRecall: 'Q5 延迟回忆',
        interpretationPanel: '分析解释',
        pleaseCalculateFirst: '请先选择配置并计算S_eye',
        exportCSV: '导出CSV数据',
        exportJSON: '导出JSON报告',
        exportPDF: '导出PDF报告',
        
        // 子模块10-A多语言配置
        module10aTitle: '子模块10-A: 数据准备与构建',
        selectRqaConfig: '选择RQA配置',
        valSplit: '验证集比例',
        randomState: '随机种子',
        checkPrerequisites: '检查前置条件',
        buildDataset: '构建数据集',
        refreshStatus: '刷新状态',
        statusInfo: '状态信息',
        clickCheckPrerequisites: '请点击"检查前置条件"按钮开始',
        builtDatasets: '已构建数据集',
        loading: '加载中...',
        
        
        subjectRadar: '受试者特征雷达图',
        selectSubject: '选择受试者...',
        statisticsTable: '统计摘要表',
        group: '组别',
        count: '样本数',
        mean: '均值',
        std: '标准差',
        median: '中位数',
        q1q3: '四分位数',
        range: '范围',
        noDataAvailable: '暂无数据',
        customWeights: '自定义权重',
        basicFeatures: '基础特征',
        rqaFeatures: 'RQA特征',
        normalizeWeights: '归一化权重',
                machineLearningTitle: '机器学习预测分析',
                machineLearningSubtitle: '基于眼动特征的MMSE子分数智能预测系统',
                dataPreprocessingTitle: '子模块9.1 - 数据预处理与整合',
                modelTrainingTitle: '子模块9.2 - MLP模型训练',
            trainingMethod: '训练方法',
            trainingMethodHint: '专家建议: CV能显著提升小样本模型性能和稳定性',
            cvParams: '交叉验证参数',
            cvResults: '5-fold交叉验证结果',
            labelNormalization: '标签归一化优化',
            labelNormalizationHint: 'MMSE子分数归一化到[0,1]，提升多输出回归效果',
            featureSelection: '专家特征选择',
            featureSelectionHint: '精选10个核心眼动特征，移除噪声列',
                predictionVisualizationTitle: '子模块9.3 - 预测与可视化',
                featureDirectionCorrection: '特征方向一致性校正',
                enableDirectionCorrection: '启用方向一致性校正',
                directionCorrectionHint: '统一所有特征为"数值越高=认知越好"方向',
                transformMethods: '变换方法',
                selectRqaConfig: '选择RQA配置',
                loadingConfigs: '加载中...',
                dataStatus: '数据状态',
                notProcessed: '未处理',
                ready: '就绪',
                processing: '处理中',
                completed: '完成',
                error: '错误',
                actions: '操作',
                startPreprocessing: '开始预处理',
                refreshData: '刷新数据',
                totalSamples: '总样本数',
                trainSamples: '训练集样本',
                testSamples: '测试集样本',
                featureCount: '特征数量',
                processingLog: '处理日志',
                noLogYet: '暂无日志...',
                // 子模块9.2 - MLP模型训练
                trainingConfig: '训练配置',
                modelPreset: '模型预设',
                modelPresetHint: '专家建议: Simple模型适合当前60样本数据集',
                hiddenLayers: '隐藏层配置',
                hiddenLayersHint: '用逗号分隔，例如32表示单层，64,32表示双层',
                regularization: '正则化设置',
                useDropout: '使用Dropout',
                useL2Reg: '使用L2正则化',
                dropoutRate: 'Dropout比率',
                l2Lambda: 'L2正则化系数',
                epochs: '训练轮数',
                batchSize: '批大小',
                learningRate: '学习率',
                validationSplit: '验证集比例',
                earlyStopping: '早停轮数',
                earlyStoppingHint: '验证损失多少轮不改善后停止训练',
                trainingStatus: '训练状态',
                waitingToTrain: '等待训练',
                training: '训练中',
                trainingCompleted: '训练完成',
                trainingError: '训练错误',
                currentEpoch: '当前轮数',
                trainingLoss: '训练损失',
                validationLoss: '验证损失',
                testMAE: '测试MAE',
                startTraining: '开始训练',
                resetTraining: '重置',
                viewTrainingLog: '查看日志',
                trainingLog: '训练日志',
                noTrainingLogYet: '暂无训练日志...',
                modelTrainingPlaceholder: '模型训练功能正在开发中...',
                predictionVisualizationPlaceholder: '预测与可视化功能正在开发中...',
                
                // 模块10-B 高级参数
                advancedParams: '高级参数设置',
                maxEpochs: '最大轮数',
                earlyStopPatience: '早停耐心值',
                learningRate: '学习率',
                batchSize: '批大小',
                dropout: 'Dropout率',
                l2Regularization: 'L2正则化',
                hiddenLayer1: '第一隐藏层',
                hiddenLayer2: '第二隐藏层',
                enableBatchNorm: '启用批归一化',
                batchNormHint: '可提高训练稳定性',
                enableDropout: '启用Dropout',
                dropoutHint: '设为0关闭，防止过拟合',
                dropoutInfo: '0=关闭，推荐0.25',
                learningCurve: '学习曲线',
                learningCurveDesc: '监控训练/验证损失变化，识别过拟合分叉点',
                predictionAccuracy: '预测准确性分析',
                scatterPlot: '预测vs真实散点图',
                residualPlot: '残差分布图',
                accuracyMetrics: '准确性指标',
                accuracyDesc: '分析模型预测值与真实MMSE分数的相关性和准确性',
                currentEpoch: '当前轮次',
                trainLoss: '训练损失',
                valLoss: '验证损失',
                readyToTrain: '请选择数据集和任务开始训练',
                trainingMonitor: '训练监控',
                
                // 新增高级参数
                enableLRScheduler: '启用学习率调度器',
                lrFactor: '衰减因子',
                lrPatience: '调度耐心值',
                minLR: '最小学习率',
                validationSplit: '验证集比例',
                valSplitHint: '推荐0.3可提高验证可靠性',
                enableCrossValidation: '启用交叉验证',
                cvFolds: '交叉验证折数'
            },
            en: {
                title: 'VR Eye Tracking Data Visualization Platform',
                subtitle: 'VR Eye Tracking Data Analysis and Visualization Platform for Three Cognitive Assessment Groups',
                restart: 'Restart',
                totalData: 'Total Data',
                researchGroups: 'Research Groups',
                controlGroup: 'Healthy Control',
                mciGroup: 'MCI Group',
                adGroup: 'Alzheimer\'s Group',
                taskFilter: 'Task Filter',
                all: 'All',
                task1: 'Task 1',
                task2: 'Task 2',
                task3: 'Task 3',
                task4: 'Task 4',
                task5: 'Task 5',
                dataList: 'Data List',
                loading: 'Loading...',
                refresh: 'Refresh',
                selectDataTitle: 'Select Data to Start Analysis',
                selectDataSubtitle: 'Click on the data items on the left to generate professional eye tracking visualization analysis',
                eyeTrackingVis: 'Eye Tracking Visualization',
                visControls: 'Visualization Controls',
                fixationSize: 'Fixation Size:',
                trajectoryWidth: 'Trajectory Width:',
                pointSize: 'Point Size:',
                trajectoryStyle: 'Trajectory Style:',
                solidLine: 'Solid',
                dashedLine: 'Dashed',
                dottedLine: 'Dotted',
                updateVis: 'Update Visualization',
                generatingVis: 'Generating visualization...',
                noData: 'No Data',
                loadFailed: 'Load Failed',
                dataItems: ' items',
                overallStats: 'Overall Statistics',
                totalPoints: 'Total Points',
                totalDuration: 'Total Duration',
                fixationEvents: 'Fixation Events',
                saccadeEvents: 'Saccade Events',
                avgVelocity: 'Avg Velocity',
                maxVelocity: 'Max Velocity',
                roiSequence: 'ROI Sequence',
                mainRoiStats: 'Main ROI Statistics',
                statInfo: 'Statistical Information',
                restartConfirm: 'Are you sure you want to restart the server?',
                restarting: 'Server is restarting...',
                dataVisualization: 'Data Visualization',
                newFeature: 'Data Import',
                dataImportTitle: 'Data Import & Processing',
                dataImportDesc: 'Batch import raw eye tracking data and automatically complete preprocessing and calibration steps',
                stepUpload: 'Upload Files',
                stepGroup: 'Select Group',
                stepProcess: 'Data Processing',
                stepComplete: 'Complete',
                uploadTitle: 'Drag or click to select files',
                uploadDesc: 'Please select 5 txt files, file names must be: 1.txt, 2.txt, 3.txt, 4.txt, 5.txt',
                selectFiles: 'Select Files',
                selectedFiles: 'Selected Files',
                clearFiles: 'Clear',
                nextStep: 'Next Step',
                selectGroup: 'Select Data Group',
                groupSelectionDesc: 'Choose the appropriate research group for this batch of imported data',
                controlDesc: 'Healthy subjects with normal cognitive function',
                mciDesc: 'Subjects with mild cognitive impairment',
                adDesc: 'Subjects with Alzheimer\'s disease',
                prevStep: 'Previous Step',
                startProcess: 'Start Processing',
                processingData: 'Processing Data',
                overallProgress: 'Overall Progress',
                currentTask: 'Current Task',
                processingLog: 'Processing Log',
                processingComplete: 'Data Processing Complete!',
                processingCompleteDesc: 'All files have been successfully processed and added to the system',
                viewData: 'View Data',
                importMore: 'Import More',
                importStatus: 'Import Status',
                fileRequirements: 'File Requirements',
                req1: 'Must upload 5 txt files',
                req2: 'File names must be: 1.txt, 2.txt, 3.txt, 4.txt, 5.txt',
                req3: 'Representing Q1-Q5 data from the same subject',
                validationStatus: 'Validation Status',
                processPreview: 'Process Preview',
                fileValidation: 'File validation failed',
                missingFiles: 'Missing required files',
                invalidFileNames: 'File names do not meet requirements',
                validationPassed: 'Validation passed, ready for next step',
                editCalibration: 'Edit Calibration',
                calibrationEdit: 'Calibration Edit Mode',
                calibrationDesc: 'Adjust offset values for current data and preview calibration effects in real-time',
                currentData: 'Current Data',
                xOffset: 'X-axis Offset',
                yOffset: 'Y-axis Offset',
                presetOffsets: 'Preset Offsets',
                reset: 'Reset',
                cancel: 'Cancel',
                preview: 'Preview',
                save: 'Save Calibration',
                calibrationSaved: 'Calibration Saved',
                calibrationError: 'Failed to Save Calibration',
                timeCalibration: 'Time Calibration',
                timeCalibrationDesc: 'Adjust the time range of data to control trajectory start and end points',
                totalDuration: 'Total Duration',
                dataPoints: 'Data Points',
                selectedRange: 'Selected Range',
                startTime: 'Start Time',
                endTime: 'End Time',
                timePresets: 'Time Presets',
                fullRange: 'Full Range',
                trimEdges: 'Trim Edges',
                firstHalf: 'First Half',
                secondHalf: 'Second Half',
                groupControl: 'Control Group',
                groupMci: 'MCI Group',
                groupAd: 'Alzheimer\'s Group',
                editDataGroup: 'Edit Data Group',
                dataId: 'Data ID',
                currentGroup: 'Current Group',
                selectNewGroup: 'Select New Group',
                deleteDataConfirm: 'Are you sure you want to delete data "{0}"?\n\nNote: Deleting a single task will result in the entire group\'s data being deleted.',
                deleteDataFailed: 'Failed to delete data',
                changeGroupFailed: 'Failed to change group',
                deleteDataSuccess: 'Data deleted successfully',
                changeGroupSuccess: 'Group changed successfully',
                confirm: 'Confirm',
                cognitiveAssessment: 'Cognitive Assessment (MMSE)',
                noMMSEData: 'No MMSE assessment data available for this group',
                orientation: 'Orientation',
                immediateMemory: 'Immediate Memory',
                calculation: 'Calculation',
                delayedRecall: 'Delayed Recall',
                totalScore: 'Total Score',
                assessmentLevel: 'Assessment Level',
                unitCount: ' items',
                unitMs: 'ms',
                unitSecond: 's',
                unitDegreesPerSecond: '°/s',
                // MMSE task names
                q1OrientationTime: 'Time Orientation',
                q2OrientationPlace: 'Place Orientation',
                q3ImmediateMemory: 'Immediate Memory',
                q4Calculation: 'Calculation',
                q5DelayedRecall: 'Delayed Recall',
                year: 'Year',
                season: 'Season',
                month: 'Month',
                weekday: 'Weekday',
                province: 'Province/City',
                street: 'Street',
                building: 'Building',
                floor: 'Floor',
                word1: 'Word 1',
                word2: 'Word 2',
                word3: 'Word 3',
                            // RQA Analysis
            rqaAnalysis: 'RQA Analysis',
            rqaAnalysisTitle: 'Recurrence Quantification Analysis (RQA)',
            rqaAnalysisDescription: 'Batch generate and visualize recurrence plots',
            renderControl: 'Render Control',
            filterControl: 'Filter Control',
            analysisMode: 'Analysis Mode',
            analysis1DX: '1D Signal (X Coordinate)',
            analysis1DAmplitude: '1D Signal (Amplitude)',
            analysis2DXY: '2D Signal (X,Y Coordinates)',
            distanceMetric: 'Distance Metric',
            distance1DAbs: '1D Absolute Difference',
            distanceEuclidean: 'Euclidean Distance',
            embeddingDimension: 'Embedding Dimension (m)',
            timeDelay: 'Time Delay (τ)',
            recurrenceThreshold: 'Recurrence Threshold (ε)',
            minLineLength: 'Min Line Length (l_min)',
            colorTheme: 'Render Color',
            grayscaleTheme: 'Grayscale',
            greenGradientTheme: 'Green to White Gradient',
            startRender: 'Start Render',
            checkStatus: 'Check Status',
            filterGroup: 'Filter Group',
            filterQuestion: 'Filter Question',
            allQuestions: 'All Questions',
            updateDisplay: 'Update Display',
            rqaResultsTitle: 'Recurrence Plot Visualization Results',
            rqaResultsDescription: 'Display 5 columns per row, arranged by group and question',
            noRQAImages: 'No RQA images rendered yet',
            renderTip: 'Please set parameters and click "Start Render" button first',
            rqaTitle: 'Recurrence Quantification Analysis (RQA)',
            rqaDescription: 'Perform recurrence quantification analysis on eye-tracking data to reveal complexity and regularity of eye movement patterns',
            
            // Event Analysis
            eventAnalysis: 'Event Analysis',
            eventAnalysisTitle: 'Eye Movement Event Analysis',
            eventAnalysisDescription: 'Display and filter eye movement event analysis results and ROI statistics based on IVT algorithm',
            dataOverview: 'Data Overview',
            dataType: 'Data Type',
            eventsData: 'Events Data',
            roiData: 'ROI Statistics',
            groupFilter: 'Group Filter',
            allGroups: 'All Groups',
            controlGroup: 'Control Group',
            mciGroup: 'MCI Group',
            adGroup: 'AD Group',
            eventTypeFilter: 'Event Type',
            allEvents: 'All Events',
            fixationEvents: 'fixation',
            saccadeEvents: 'saccade',
            pageSize: 'Page Size',
            refreshData: 'Refresh Data',
            regenerateData: 'Regenerate Data',
            exportData: 'Export Data',
            // 归一化方法说明 - 英文
            normalizationMethods: 'Normalization Methods',
            gameDurationTitle: 'Game Duration Features',
            gameDurationMethod: 'Method',
            gameDurationRange: 'Range',
            gameDurationReason: 'Reason',
            gameDurationReasonText: 'Avoid extreme outliers (e.g., 0.1s or 4min) affecting normal data distribution',
            roiTimeTitle: 'ROI Time Features',
            roiTimeMethod: 'Method',
            roiTimeRange: 'Range',
            roiTimeReason: 'Reason',
            roiTimeReasonText: 'Preserve more valid data while filtering gaze time outliers',
            rqaFeaturesTitle: 'RQA Recurrence Quantification Features',
            rqaFeaturesMethod: 'Method',
            rqaFeaturesRange: 'Range',
            rqaFeaturesReason: 'Reason',
            rqaFeaturesReasonText: 'RQA features (RR, DET, ENT) have theoretical range limits, no clipping needed',
            rqaFeaturesList: 'Includes: RR-1D, DET-1D, ENT-1D, RR-2D, DET-2D, ENT-2D',
            percentileClip: 'Percentile Clipping Normalization',
            minMaxNormalization: 'Standard Min-Max Normalization',
            loadingData: 'Loading data...',
            filterOptions: 'Filter Options',
                dataSelection: 'Data Selection',
                selectGroup: 'Select Research Group',
                allGroups: 'All Groups',
                selectTask: 'Select Task',
                allTasks: 'All Tasks',
                selectData: 'Select Specific Data',
                selectAll: 'Select All',
                pleaseSelect: 'Please select group and task first',
                rqaParameters: 'RQA Parameters',
                embeddingDimension: 'Embedding Dimension (m)',
                timeDelay: 'Time Delay (τ)',
                recurrenceThreshold: 'Recurrence Threshold (ε)',
                minLineLength: 'Minimum Line Length (l_min)',
                runAnalysis: 'Run Analysis',
                resetParams: 'Reset Parameters',
                recurrencePlot: 'Recurrence Plot',
                rqaMetrics: 'RQA Metrics',
                compareResults: 'Comparison Analysis',
                recurrencePlotTitle: 'Recurrence Plot Visualization',
                recurrencePlotDesc: 'Display recurrence patterns and periodic structures in eye movement trajectories',
                rqaMetricsTitle: 'RQA Quantitative Metrics',
                rqaMetricsDesc: 'Quantitatively describe complexity, determinism and predictability of eye movement patterns',
                compareTitle: 'Inter-group Comparison Analysis',
                compareDesc: 'Compare RQA metric differences between different groups',
                noAnalysisYet: 'No analysis yet',
                selectDataAndRun: 'Please select data and set parameters to run RQA analysis',
                noMetricsYet: 'No metrics data yet',
                runAnalysisFirst: 'Please run RQA analysis first to get quantitative metrics',
                noCompareYet: 'No comparison data yet',
                selectMultipleGroups: 'Please select multiple groups for comparison analysis',
                pleaseSelectData: 'Please select data to analyze first',
                
                // Module 7 - Data Organization
                seventhModule: 'Data Organization',
                dataOrganizationTitle: 'Data Organization & Feature Visualization',
                dataOrganizationSubtitle: 'Normalized feature data analysis based on database normalization principles',
                loadingNormalizedData: 'Loading normalized feature data...',
                totalSubjects: 'Total Subjects',
                totalSessions: 'Game Sessions',
                vrMmseTasks: 'VR-MMSE Tasks',
                normalizedFeatures: 'Normalized Features',
                dataFilterConfig: 'Data Filter & Configuration',
                selectTask: 'Select Task (Q1-Q5)',
                allTasks: 'All Tasks',
                taskQ1: 'Task Q1',
                taskQ2: 'Task Q2',
                taskQ3: 'Task Q3',
                taskQ4: 'Task Q4',
                taskQ5: 'Task Q5',
                experimentalGroupFilter: 'Experimental Group Filter',
                adGroupLabel: 'Alzheimer\'s Disease Group',
                mciGroupLabel: 'Mild Cognitive Impairment Group',
                controlGroupLabel: 'Normal Control Group',
                featureType: 'Feature Type',
                gameDurationOption: '🎮 Game Duration',
                roiFeaturesOption: '👁️ ROI Features (3 items)',
                rqa1dFeaturesOption: '🔄 RQA-1D Features (3 items)',
                rqa2dFeaturesOption: '🔄 RQA-2D Features (3 items)',
                rqaAllFeaturesOption: '🔄 All RQA Features (6 items)',
                comprehensiveOption: '📈 Comprehensive Comparison (10 items)',
                allFeaturesOption: '📊 All Features (10 items)',
                visualizationType: 'Visualization Type',
                barChartOption: '📊 Bar Chart',
                lineChartOption: '📈 Line Chart',
                scatterChartOption: '🔸 Scatter Chart',
                refreshData: 'Refresh Data',
                generateChart: 'Generate Chart',
                exportData: 'Export Data',
                dataVisualizationChart: 'Data Visualization Chart',
                clickGenerateChart: 'Click "Generate Chart" to start data visualization',
                chartGenerationDesc: 'Select task, experimental group and feature type to generate corresponding statistical charts',
                normalizedFeatureTable: 'Normalized Feature Data Table',
                tableRowCountText: '0 rows',
                sessionId: 'Session ID',
                subject: 'Subject',
                task: 'Task',
                experimentalGroup: 'Experimental Group',
                gameDuration: 'Game Duration',
                kwRoi: 'KW-ROI',
                instRoi: 'INST-ROI',
                bgRoi: 'BG-ROI',
                rr1d: 'RR-1D',
                det1d: 'DET-1D',
                ent1d: 'ENT-1D',
                rr2d: 'RR-2D',
                det2d: 'DET-2D',
                ent2d: 'ENT-2D',
                clickRefreshData: 'Click "Refresh Data" to load normalized feature data',
                
                // Module 8 - Eye Movement MMSE Analysis
                eighthModule: 'Intelligent Analysis',
                intelligentAnalysisTitle: 'Eye Movement Coefficient vs MMSE Comparison Analysis',
                intelligentAnalysisSubtitle: 'Real data-based analysis of correlation between eye movement patterns and cognitive abilities',
                loadingAiEngine: 'Initializing analysis system...',
                patternsDetected: 'Patterns Detected',
                predictionAccuracy: 'Prediction Accuracy',
                aiInsights: 'AI Insights',
                anomaliesDetected: 'Anomalies Detected',
                eyeMovementMMSEAnalysis: 'Eye Movement Coefficient vs MMSE Analysis',
                module7DataSource: 'Module 7 Data Source Selection',
                module7DataSourceHelp: 'Select processed normalized feature data from Module 7 for analysis',
                dataOverview: 'Data Overview',
                eyeMovementPatterns: 'Eye Movement Patterns',
                mmseScores: 'MMSE Scores',
                startAiAnalysis: 'Start AI Analysis',
                viewResults: 'View Results',
                exportAiReport: 'Export AI Report',
                aiVisualizationResults: 'AI Analysis Visualization Results',
                clickStartAi: 'Click "Start AI Analysis" for intelligent data analysis',
                aiAnalysisDesc: 'AI will automatically identify data patterns, detect anomalies and generate insight reports',
                aiInsightReport: 'AI Insight Report',
                waitingForAnalysis: 'Waiting for Analysis',
                noInsightsYet: 'No AI insights available yet, please run analysis first',
                
                // Module 8 - Eye Movement Coefficient vs MMSE Comparison
                loadEyeMovementData: 'Load Eye Movement Data',
                calculateCoefficients: 'Calculate Coefficients',
                compareWithMMSE: 'MMSE Comparison Analysis',
                exportComparisonReport: 'Export Comparison Report',
                eyeMovementMMSEComparison: 'Eye Movement Coefficient vs MMSE Score Comparison',
                eyeMovementIndicators: 'Eye Movement Feature Indicators',
                lowerIsBetter: 'Lower is Better Indicators',
                higherIsBetter: 'Higher is Better Indicators',
                gameDuration: 'Game Duration',
                kwRoiTime: 'Keyword ROI Time',
                instRoiTime: 'Instruction ROI Time',
                bgRoiTime: 'Background ROI Time',
                rqaFeatures: 'RQA Features',
                rqa2dFeatures: 'RQA-2D Features',
                rqaDescription: 'Reflect complexity and regularity of eye movement patterns',
                coefficientCalculation: 'Eye Movement Coefficient = (Inverse time indicators + Direct RQA indicators) / 10, ensuring consistent direction',
                selectRqaConfig: 'Please select RQA configuration data...',
                pleaseSelectModule7DataSource: 'Please select Module 7 data source first',
                pleaseLoadEyeMovementDataFirst: 'Please load eye movement data first',
                eyeMovementDataLoadFailed: 'Eye movement data loading failed: {error}\n\nPlease ensure:\n1. Server is running\n2. Module 7 has been accessed and corresponding data generated\n3. Correct RQA configuration is selected',
                mmseDataLoadFailed: 'MMSE data loading failed, please check server status and data files',
                pleaseCalculateCoefficientsFirst: 'Please calculate coefficients first',
                mmseComparisonFailed: 'MMSE comparison analysis failed, please try again',
                pleasePerformMmseComparisonFirst: 'Please perform MMSE comparison analysis first',
                exportReportFailed: 'Export report failed, please try again',
                gameDurationRangeValue: '5%-95% percentile',
                roiTimeRangeValue: '5%-98% percentile',
                rqaFeaturesRangeValue: '[0, 1]',
                clickStartComparison: 'Click "MMSE Comparison Analysis" to start analysis',
                comparisonAnalysisDesc: 'Analyze correlation between eye movement coefficients and MMSE cognitive scores',
                comparisonResultsTable: 'Eye Movement Coefficient vs MMSE Comparison Results',
                switchToGroupView: 'Switch to Group View',
                switchToIndividualView: 'Switch to Individual View',
                noComparisonData: 'Click "MMSE Comparison Analysis" to load comparison data',
                subjectId: 'Subject ID',
                taskId: 'Task',
                groupType: 'Group Type',
                eyeMovementCoeff: 'Eye Movement Coefficient',
                mmseScore: 'MMSE Score',
                mmseMaxScore: 'Max Score',
                performanceRatio: 'Performance Ratio',
                avgEyeMovementCoeff: 'Average Eye Movement Coefficient',
                avgMmseScore: 'Average MMSE Score',
                subjectCount: 'Subject Count',
                correlationCoeff: 'Correlation Coefficient',
                standardDeviation: 'Standard Deviation',
                noComparisonData: 'Click "MMSE Comparison Analysis" to load comparison data',
                switchToSubQuestionView: 'Switch to Sub-Question Detail View',
                switchToMainQuestionView: 'Switch to Main Question View',
                subQuestionId: 'Sub-Question',
                subQuestionName: 'Sub-Question Name',
                subQuestionScore: 'Sub-Question Score',
                subQuestionMaxScore: 'Sub-Question Max Score',
                // MMSE子问题英文名称
                年份: 'Year',
                季节: 'Season',
                月份: 'Month', 
                星期: 'Day of Week',
                省市区: 'Province/City/District',
                街道: 'Street',
                建筑: 'Building',
                楼层: 'Floor',
                即刻记忆: 'Immediate Memory',
                '100-7': '100-7',
                '93-7': '93-7', 
                '86-7': '86-7',
                '79-7': '79-7',
                '72-7': '72-7',
                词1: 'Word 1',
                词2: 'Word 2',
                词3: 'Word 3',
                
                        // Module 9 - Machine Learning Prediction Analysis
        ninthModule: 'Machine Learning',
        
        // Module 10 - Eye-Index Comprehensive Assessment
        tenthModule: 'Eye-Index Assessment',
        tenthModuleTitle: 'Module 10 - Eye-Index Comprehensive Assessment',
        tenthModuleSubtitle: 'Comprehensive Index Calculation and Visualization Analysis Based on 10 Eye Movement Features',
        
        // Module 10-B PyTorch Training Engine
        module10bTitle: 'Sub-module 10-B: PyTorch MLP Training Engine',
        module10bDescription: 'PyTorch-based multi-layer perceptron training system supporting independent training for Q1-Q5 tasks',
        loadingTrainingInterface: 'Loading training interface...',
        trainingConfig: 'Training Configuration',
        selectDataset: 'Select Dataset',
        selectTask: 'Select Training Task',
        multiSelectHint: 'Hold Ctrl for multiple selection',
        epochs: 'Training Epochs',
        learningRate: 'Learning Rate',
        batchSize: 'Batch Size',
        earlyStopPatience: 'Early Stop Patience',
        startTraining: 'Start Training',
        trainingMonitor: 'Training Monitor',
        readyToTrain: 'Please select dataset and task to start training',
        trainingProgress: 'Training Progress',
        currentEpoch: 'Current Epoch',
        trainLoss: 'Train Loss',
        valLoss: 'Val Loss',
        trainingResults: 'Training Results',
        task: 'Task',
        bestEpoch: 'Best Epoch',
        bestValLoss: 'Best Val Loss',
        testRmse: 'Test RMSE',
        testR2: 'Test R²',
        modelPath: 'Model Path',
        
        // Module 10-C Model Service & Management
        module10cTitle: 'Sub-module 10-C: Model Service & Management API',
        module10cDescription: 'Online model service system providing prediction APIs and model management',
        loadingServiceInterface: 'Loading service interface...',
        modelManagement: 'Model Management',
        serviceStatus: 'Service Status',
        checking: 'Checking...',
        activeModels: 'Active Models',
        reloadModels: 'Reload Models',
        viewMetrics: 'View Training Metrics',
        onlinePrediction: 'Online Prediction',
        inputFeatures: 'Input Features (10D)',
        fillRandom: 'Fill Random',
        clear: 'Clear',
        predict: 'Predict',
        predictionResult: 'Prediction Result',
        scoreRange: 'Score Range: 0-1 (Normalized)',
        batchTesting: 'Batch Testing',
        apiTesting: 'API Testing',
        testHealth: 'Health Check',
        testBatch: 'Batch Prediction Test',
        testAll: 'Full Test',
        testResults: 'Test Results',
        noTestRun: 'No test run',
        performanceMetrics: 'Performance Metrics',
        avgLatency: 'Avg Latency',
        successRate: 'Success Rate',
        
        // Module 10-C Data Viewer
        module10cTitle: 'Sub-module 10-C: Training Data Viewer',
        module10cDescription: 'Tabular display, statistical analysis and export of NPZ training data',
        selectDataset: 'Select Dataset',
        selectTask: 'Select Task',
        options: 'Options',
        includePredictions: 'Include Predictions',
        loadDataTable: 'Load Data Table',
        showStatistics: 'Show Statistics',
        exportCSV: 'Export CSV',
        exportExcel: 'Export Excel',
        compareDatasets: 'Compare Datasets',
        dataStatsSummary: 'Data Statistics Summary',
        trainingDataDetails: 'Training Data Details',
        loadingData: 'Loading data...',
        noDataLoaded: 'No Data Loaded',
        selectDatasetToView: 'Please select dataset and task, then click "Load Data Table"',
        showingEntries: 'Showing {start}-{end} of {total} entries',
        correlationAnalysis: 'Feature Correlation Analysis',
        q1Orientation: 'Q1 Orientation',
        q2Registration: 'Q2 Registration',
        q3AttentionCalculation: 'Q3 Attention & Calculation',
        q4Recall: 'Q4 Recall',
        q5DelayedRecall: 'Q5 Delayed Recall',
        
        // Module 10-D Performance Evaluation
        module10dTitle: 'Sub-module 10-D: Model Performance Evaluation & Difference Visualization',
        module10dDesc: 'Deep analysis of model prediction performance with individual residuals and task-level error comparison',
        selectModelConfig: 'Select Model Configuration',
        analysisOptions: 'Analysis Options',
        includeGroupAnalysis: 'Include Group Comparison',
        startAnalysis: 'Start Analysis',
        exportData: 'Export Data',
        performanceOverview: 'Performance Overview',
        residualAnalysis: 'Individual Residual Curve Analysis',
        taskComparison: 'Task-level Error Comparison Analysis',
        groupPerformanceComparison: 'Group Performance Comparison',
        downloadChart: 'Download Chart',
        showGroups: 'Show Groups',
        controlGroup: 'Control',
        mciGroup: 'MCI',
        adGroup: 'AD',
        allGroups: 'All',
        residualChartHelp: 'Residual = Predicted - Actual. Positive values indicate overestimation, negative values indicate underestimation.',
        comparisonChartHelp: 'Blue bars show average actual scores, red bars show average absolute errors.',
        analyzing: 'Analyzing model performance...',
        selectConfigToStart: 'Please select model configuration to start performance analysis',
        performanceAnalysisDesc: 'Analysis will show model prediction accuracy and individual differences across tasks',
        
        refreshData: 'Refresh Data',
        selectConfig: 'Select RQA Configuration',
        pleaseSelect: 'Please select configuration...',
        calculationMode: 'Calculation Mode',
        status: 'Status',
        notCalculated: 'Not Calculated',
        equalWeight: 'Equal Weight Average',
        pcaMode: 'PCA First Component',
        customWeight: 'Custom Weight',
        
        q1TimeOrientation: 'Q1 Time Orientation',
        q2SpaceOrientation: 'Q2 Space Orientation', 
        q3ImmediateMemory: 'Q3 Immediate Memory',
        q4AttentionCalculation: 'Q4 Attention Calculation',
        q5DelayedRecall: 'Q5 Delayed Recall',
        interpretationPanel: 'Analysis Interpretation',
        pleaseCalculateFirst: 'Please select configuration and calculate S_eye first',
        exportCSV: 'Export CSV Data',
        exportJSON: 'Export JSON Report',
        exportPDF: 'Export PDF Report',
        
        // Sub-module 10-A multi-language configuration
        module10aTitle: 'Sub-module 10-A: Data Preparation & Construction',
        selectRqaConfig: 'Select RQA Configuration',
        valSplit: 'Validation Split',
        randomState: 'Random State',
        checkPrerequisites: 'Check Prerequisites',
        buildDataset: 'Build Dataset',
        refreshStatus: 'Refresh Status',
        statusInfo: 'Status Information',
        clickCheckPrerequisites: 'Please click "Check Prerequisites" button to start',
        builtDatasets: 'Built Datasets',
        loading: 'Loading...',
        
        // Sub-module 10-B new multi-language configuration
        subjectRadar: 'Subject Feature Radar Chart',
        selectSubject: 'Select Subject...',
        statisticsTable: 'Statistics Summary Table',
        group: 'Group',
        count: 'Count',
        mean: 'Mean',
        std: 'Std Dev',
        median: 'Median',
        q1q3: 'Quartiles',
        range: 'Range',
        noDataAvailable: 'No Data Available',
        customWeights: 'Custom Weights',
        basicFeatures: 'Basic Features',
        rqaFeatures: 'RQA Features',
        normalizeWeights: 'Normalize Weights',
                machineLearningTitle: 'Machine Learning Prediction Analysis',
                machineLearningSubtitle: 'MMSE Subscores Intelligent Prediction System Based on Eye Movement Features',
                dataPreprocessingTitle: 'Sub-module 9.1 - Data Preprocessing & Integration',
                modelTrainingTitle: 'Sub-module 9.2 - MLP Model Training',
                predictionVisualizationTitle: 'Sub-module 9.3 - Prediction & Visualization',
                featureDirectionCorrection: 'Feature Direction Consistency Correction',
                enableDirectionCorrection: 'Enable Direction Correction',
                directionCorrectionHint: 'Unify all features to "higher value = better cognition" direction',
                transformMethods: 'Transform Methods',
                selectRqaConfig: 'Select RQA Configuration',
                loadingConfigs: 'Loading...',
                dataStatus: 'Data Status',
                notProcessed: 'Not Processed',
                ready: 'Ready',
                processing: 'Processing',
                completed: 'Completed',
                error: 'Error',
                actions: 'Actions',
                startPreprocessing: 'Start Preprocessing',
                refreshData: 'Refresh Data',
                totalSamples: 'Total Samples',
                trainSamples: 'Training Samples',
                testSamples: 'Test Samples',
                featureCount: 'Feature Count',
                processingLog: 'Processing Log',
                noLogYet: 'No logs yet...',
                // Sub-module 9.2 - MLP Model Training
                trainingConfig: 'Training Configuration',
                modelPreset: 'Model Preset',
                modelPresetHint: 'Expert recommendation: Simple model suits current 60-sample dataset',
                hiddenLayers: 'Hidden Layers Configuration',
                hiddenLayersHint: 'Comma separated, e.g., 32 means single layer, 64,32 means dual layers',
                regularization: 'Regularization Settings',
                useDropout: 'Use Dropout',
                useL2Reg: 'Use L2 Regularization',
                dropoutRate: 'Dropout Rate',
                l2Lambda: 'L2 Lambda',
                epochs: 'Training Epochs',
                batchSize: 'Batch Size',
                learningRate: 'Learning Rate',
                validationSplit: 'Validation Split',
                earlyStopping: 'Early Stopping Patience',
                earlyStoppingHint: 'Stop training when validation loss does not improve for this many epochs',
                trainingStatus: 'Training Status',
                waitingToTrain: 'Waiting to Train',
                training: 'Training',
                trainingCompleted: 'Training Completed',
                trainingError: 'Training Error',
                currentEpoch: 'Current Epoch',
                trainingLoss: 'Training Loss',
                validationLoss: 'Validation Loss',
                testMAE: 'Test MAE',
                startTraining: 'Start Training',
                resetTraining: 'Reset',
                viewTrainingLog: 'View Log',
                trainingLog: 'Training Log',
                noTrainingLogYet: 'No training logs yet...',
                modelTrainingPlaceholder: 'Model training feature is under development...',
                predictionVisualizationPlaceholder: 'Prediction and visualization feature is under development...',
                
                // Module 10-B Advanced Parameters
                advancedParams: 'Advanced Parameters',
                maxEpochs: 'Max Epochs',
                earlyStopPatience: 'Early Stop Patience',
                learningRate: 'Learning Rate',
                batchSize: 'Batch Size',
                dropout: 'Dropout Rate',
                l2Regularization: 'L2 Regularization',
                hiddenLayer1: 'Hidden Layer 1',
                hiddenLayer2: 'Hidden Layer 2',
                learningCurve: 'Learning Curve',
                learningCurveDesc: 'Monitor train/val loss changes, identify overfitting divergence',
                predictionAccuracy: 'Prediction Accuracy Analysis',
                scatterPlot: 'Predicted vs Actual Scatter Plot',
                residualPlot: 'Residual Distribution Plot',
                accuracyMetrics: 'Accuracy Metrics',
                accuracyDesc: 'Analyze correlation and accuracy between predicted and actual MMSE scores',
                currentEpoch: 'Current Epoch',
                trainLoss: 'Train Loss',
                valLoss: 'Val Loss',
                readyToTrain: 'Please select dataset and tasks to start training',
                trainingMonitor: 'Training Monitor',
                
                // New Advanced Parameters
                enableLRScheduler: 'Enable LR Scheduler',
                lrFactor: 'Decay Factor',
                lrPatience: 'Scheduler Patience',
                minLR: 'Min Learning Rate',
                validationSplit: 'Validation Split',
                valSplitHint: 'Recommend 0.3 for better validation reliability',
                enableCrossValidation: 'Enable Cross Validation',
                cvFolds: 'CV Folds'
            }
        };

        // 语言文本获取函数
        function getLanguageText(key) {
            return languageTexts[currentLanguage][key] || key;
        }

        // 初始化高级参数控件
        function initAdvancedParamControls() {
            // 学习率调度器控制
            const enableLRScheduler = document.getElementById('enable-lr-scheduler');
            const lrSchedulerParams = document.getElementById('lr-scheduler-params');
            
            if (enableLRScheduler && lrSchedulerParams) {
                function toggleLRSchedulerParams() {
                    lrSchedulerParams.style.display = enableLRScheduler.checked ? 'block' : 'none';
                }
                
                enableLRScheduler.addEventListener('change', toggleLRSchedulerParams);
                toggleLRSchedulerParams(); // 初始化状态
            }
            
            // 交叉验证控制
            const enableCrossValidation = document.getElementById('enable-cross-validation');
            const cvParams = document.getElementById('cv-params');
            const valSplitInput = document.getElementById('val-split-input');
            
            if (enableCrossValidation && cvParams) {
                function toggleCrossValidationParams() {
                    const isEnabled = enableCrossValidation.checked;
                    cvParams.style.display = isEnabled ? 'block' : 'none';
                    
                    // 交叉验证时禁用验证集比例设置
                    if (valSplitInput) {
                        valSplitInput.disabled = isEnabled;
                        if (isEnabled) {
                            valSplitInput.style.opacity = '0.6';
                        } else {
                            valSplitInput.style.opacity = '1';
                        }
                    }
                }
                
                enableCrossValidation.addEventListener('change', toggleCrossValidationParams);
                toggleCrossValidationParams(); // 初始化状态
            }
        }

        // 初始化应用
        document.addEventListener('DOMContentLoaded', function() {
            // 初始化高级参数控件
            initAdvancedParamControls();
            
            // 只初始化与可视化模块无关的功能
            setupEventListeners();
            
            // 检查保存的语言设置
            const savedLang = localStorage.getItem('language');
            if (savedLang && savedLang !== currentLanguage) {
                const langToggle = document.getElementById('langToggle');
                if (langToggle) {
                    langToggle.checked = savedLang === 'en';
                toggleLanguage();
                }
            }
        });

        // 监听模块加载完成事件
        document.addEventListener('moduleLoaded', function(event) {
            if (event.detail.moduleId === 'visualization') {
                console.log('🎯 可视化模块加载完成，开始初始化...');
                
                // 延迟一点确保DOM完全渲染
                setTimeout(() => {
                    loadGroups();
                    setupControlListeners();
                    setupCalibrationListeners();
                    
                    // 初始化可视化模块相关的功能
                    if (typeof initVisualization === 'function') {
                        initVisualization();
                    }
                }, 100);
            } else if (event.detail.moduleId === 'dataImport') {
                console.log('🎯 数据导入模块加载完成，开始初始化...');
                
                // 延迟一点确保DOM完全渲染
                setTimeout(() => {
                    // 初始化数据导入模块相关的功能
                    if (typeof initDataImport === 'function') {
                        initDataImport();
                        console.log('✅ 数据导入模块初始化完成');
                    } else {
                        console.warn('⚠️ initDataImport函数未找到');
                    }
                }, 100);
            } else if (event.detail.moduleId === 'rqaAnalysis') {
                console.log('🎯 RQA分析模块加载完成，开始初始化...');
                
                // 延迟一点确保DOM完全渲染
                setTimeout(() => {
                    // 初始化RQA分析模块相关的功能
                    initRQASliders();
                    
                    if (typeof setupRQAEventListeners === 'function') {
                        setupRQAEventListeners();
                    }
                    
                    if (typeof initRQAAnalysis === 'function') {
                        initRQAAnalysis();
                        console.log('✅ RQA分析模块初始化完成');
                    } else {
                        console.log('✅ RQA分析模块基础初始化完成');
                    }
                }, 100);
            } else if (event.detail.moduleId === 'eventAnalysis') {
                console.log('🎯 事件分析模块加载完成，开始初始化...');
                
                // 延迟一点确保DOM完全渲染
                setTimeout(() => {
                    // 初始化事件分析模块相关的功能
                    updateEventAnalysisData();
                    
                    if (typeof initEventAnalysis === 'function') {
                        initEventAnalysis();
                        console.log('✅ 事件分析模块初始化完成');
                    } else {
                        console.log('✅ 事件分析模块基础初始化完成');
                    }
                }, 100);
            } else if (event.detail.moduleId === 'rqaPipeline') {
                console.log('🎯 RQA流程模块加载完成，开始初始化...');
                
                // 延迟一点确保DOM完全渲染
                setTimeout(() => {
                    // 初始化RQA流程模块相关的功能
                    if (typeof updateParamSignature === 'function') {
                        updateParamSignature(); // 更新参数签名显示
                    }
                    
                    if (typeof initRQAPipeline === 'function') {
                        initRQAPipeline();
                        console.log('✅ RQA流程模块初始化完成');
                    } else {
                        console.log('✅ RQA流程模块基础初始化完成');
                    }
                }, 100);
            } else if (event.detail.moduleId === 'comprehensiveFeature') {
                console.log('🎯 综合特征提取模块加载完成，开始初始化...');
                
                // 延迟一点确保DOM完全渲染
                setTimeout(() => {
                    // 初始化综合特征提取模块相关的功能
                    if (typeof loadExtractionHistory === 'function') {
                        loadExtractionHistory(); // 加载提取历史
                    }
                    
                    if (typeof initComprehensiveFeature === 'function') {
                        initComprehensiveFeature();
                        console.log('✅ 综合特征提取模块初始化完成');
                    } else {
                        console.log('✅ 综合特征提取模块基础初始化完成');
                    }
                }, 100);
            } else if (event.detail.moduleId === 'dataOrganization') {
                console.log('🎯 数据整理模块加载完成，开始初始化...');

                // 延迟一点确保DOM完全渲染
                setTimeout(() => {
                    // 初始化数据整理模块相关的功能
                    console.log('🎯 准备开发数据整理功能...');

                    if (typeof initDataOrganization === 'function') {
                        initDataOrganization();
                        console.log('✅ 数据整理模块初始化完成');
                    } else {
                        console.log('✅ 数据整理模块基础初始化完成（待开发）');
                    }
                }, 100);
            } else if (event.detail.moduleId === 'intelligentAnalysis') {
                console.log('🎯 智能分析模块加载完成，开始初始化...');

                setTimeout(() => {
                    if (typeof initEighthModule === 'function') {
                        initEighthModule();
                        console.log('✅ 智能分析模块初始化完成');
                    } else {
                        console.log('✅ 智能分析模块基础初始化完成');
                    }
                }, 100);
            } else if (event.detail.moduleId === 'machineLearning') {
                console.log('🎯 机器学习模块加载完成，开始初始化...');

                setTimeout(() => {
                    if (typeof initNinthModule === 'function') {
                        initNinthModule();
                        console.log('✅ 机器学习模块初始化完成');
                    } else {
                        console.log('✅ 机器学习模块基础初始化完成');
                    }
                }, 100);
            } else if (event.detail.moduleId === 'eyeIndex') {
                console.log('🎯 Eye-Index 模块加载完成，开始初始化...');

                setTimeout(() => {
                    if (typeof initEyeIndexModule === 'function') {
                        initEyeIndexModule();
                        console.log('✅ Eye-Index 模块初始化完成');
                    } else {
                        console.log('✅ Eye-Index 模块基础初始化完成');
                    }
                }, 100);
            }
        });

        // 语言切换功能
        function toggleLanguage() {
            const toggle = document.getElementById('langToggle');
            currentLanguage = toggle.checked ? 'en' : 'zh';
            
            // 保存语言设置
            localStorage.setItem('language', currentLanguage);
            
            // 更新所有文本
            updateAllTexts();
            
            // 更新HTML lang属性
            document.documentElement.lang = currentLanguage === 'zh' ? 'zh-CN' : 'en';
        }
        // 更新所有文本内容
        function updateAllTexts() {
            const texts = languageTexts[currentLanguage];
            
            // 更新所有带data-lang-key属性的元素
            document.querySelectorAll('[data-lang-key]').forEach(element => {
                const key = element.getAttribute('data-lang-key');
                if (texts[key]) {
                    element.textContent = texts[key];
                }
            });
            
            // 更新模块7的下拉选项
            updateModule7SelectOptions();
            
            // 更新模块8的下拉选项
            updateModule8SelectOptions();
            
            // 更新特殊的模板文本
            updateGroupCounts(groupsData);
        }
        
        // 更新模块7的下拉选项内容
        function updateModule7SelectOptions() {
            const texts = languageTexts[currentLanguage];
            
            // 更新特征类型选项
            const featureTypeSelect = document.getElementById('featureType');
            if (featureTypeSelect) {
                const optionTexts = {
                    'game_duration': currentLanguage === 'zh' ? '🎮 游戏时长' : '🎮 Game Duration',
                    'roi_features': currentLanguage === 'zh' ? '👁️ ROI特征 (3项)' : '👁️ ROI Features (3 items)',
                    'rqa_1d_features': currentLanguage === 'zh' ? '🔄 RQA-1D特征 (3项)' : '🔄 RQA-1D Features (3 items)',
                    'rqa_2d_features': currentLanguage === 'zh' ? '🔄 RQA-2D特征 (3项)' : '🔄 RQA-2D Features (3 items)',
                    'rqa_features': currentLanguage === 'zh' ? '🔄 RQA全部特征 (6项)' : '🔄 All RQA Features (6 items)',
                    'comprehensive': currentLanguage === 'zh' ? '📈 综合对比 (10项)' : '📈 Comprehensive Comparison (10 items)',
                    'all_features': currentLanguage === 'zh' ? '📊 全部特征 (10项)' : '📊 All Features (10 items)'
                };
                
                Array.from(featureTypeSelect.options).forEach(option => {
                    if (optionTexts[option.value]) {
                        option.textContent = optionTexts[option.value];
                    }
                });
            }
            
            // 更新可视化类型选项
            const chartTypeSelect = document.getElementById('chartType');
            if (chartTypeSelect) {
                const chartOptionTexts = {
                    'bar': currentLanguage === 'zh' ? '📊 柱状图' : '📊 Bar Chart',
                    'line': currentLanguage === 'zh' ? '📈 折线图' : '📈 Line Chart',
                    'scatter': currentLanguage === 'zh' ? '🔸 散点图' : '🔸 Scatter Chart'
                };
                
                Array.from(chartTypeSelect.options).forEach(option => {
                    if (chartOptionTexts[option.value]) {
                        option.textContent = chartOptionTexts[option.value];
                    }
                });
            }
        }
        
        // 更新模块8的下拉选项内容
        function updateModule8SelectOptions() {
            // 更新AI分析模式选项
            const aiModeSelect = document.getElementById('aiAnalysisMode');
            if (aiModeSelect) {
                const aiModeTexts = {
                    'pattern_recognition': currentLanguage === 'zh' ? '🔍 模式识别' : '🔍 Pattern Recognition',
                    'anomaly_detection': currentLanguage === 'zh' ? '⚠️ 异常检测' : '⚠️ Anomaly Detection',
                    'predictive_analysis': currentLanguage === 'zh' ? '📈 预测分析' : '📈 Predictive Analysis',
                    'classification': currentLanguage === 'zh' ? '📊 智能分类' : '📊 Smart Classification',
                    'clustering': currentLanguage === 'zh' ? '🎯 聚类分析' : '🎯 Clustering Analysis'
                };
                
                Array.from(aiModeSelect.options).forEach(option => {
                    if (aiModeTexts[option.value]) {
                        option.textContent = aiModeTexts[option.value];
                    }
                });
            }
        }

        // 设置事件监听器
        function setupEventListeners() {
            // 组统计卡片
            document.querySelectorAll('.group-stat-card').forEach(card => {
                card.addEventListener('click', function() {
                    const group = this.dataset.group;
                    selectGroup(group);
                });
            });

            // 过滤按钮
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    currentQuestion = this.dataset.question;
                    filterData();
                });
            });
        }

        // 设置控制器监听
        function setupControlListeners() {
            const controls = ['fixationSize', 'trajectoryWidth', 'pointSize'];
            controls.forEach(control => {
                const slider = document.getElementById(control);
                const valueSpan = document.getElementById(control + 'Value');
                
                if (slider && valueSpan) {
                slider.addEventListener('input', function() {
                    valueSpan.textContent = this.value;
                });
                } else {
                    console.warn(`⚠️ 控制元素不存在: ${control}`);
                }
            });
        }

        // 加载组数据
        async function loadGroups() {
            try {
                const response = await fetch('/api/groups');
                const groups = await response.json();
                groupsData = groups; // 保存到全局变量
                updateGroupCounts(groups);
                
                // 加载所有组数据和MMSE分数
                const dataPromises = Object.keys(groups).map(groupKey => loadGroupData(groupKey));
                const mmsePromises = Object.keys(groups).map(groupKey => loadGroupMMSEScores(groupKey));
                
                await Promise.all([...dataPromises, ...mmsePromises]);
                
                updateTotalCount();
                filterData();
            } catch (error) {
                console.error('加载组数据失败:', error);
                const failText = languageTexts[currentLanguage].loadFailed;
                const dataListElement = document.getElementById('dataList');
                if (dataListElement) {
                    dataListElement.innerHTML = `<div class="loading-text"><i class="fas fa-exclamation-triangle"></i> ${failText}</div>`;
                } else {
                    console.warn('⚠️ dataList元素不存在，无法显示错误信息');
                }
            }
        }

        // 更新组计数
        function updateGroupCounts(groups) {
            const dataText = languageTexts[currentLanguage].dataItems;
            const loadingText = languageTexts[currentLanguage].loading;
            
            // 获取DOM元素并检查是否存在
            const controlElement = document.getElementById('control-count-text');
            const mciElement = document.getElementById('mci-count-text');
            const adElement = document.getElementById('ad-count-text');
            
            if (!controlElement || !mciElement || !adElement) {
                console.warn('⚠️ 组计数元素不存在，跳过更新');
                return;
            }
            
            if (groups) {
                controlElement.textContent = `${groups.control?.data_count || 0}${dataText}`;
                mciElement.textContent = `${groups.mci?.data_count || 0}${dataText}`;
                adElement.textContent = `${groups.ad?.data_count || 0}${dataText}`;
            } else {
                controlElement.textContent = loadingText;
                mciElement.textContent = loadingText;
                adElement.textContent = loadingText;
            }
        }

        // 加载组数据
        async function loadGroupData(groupKey) {
            try {
                const response = await fetch(`/api/group/${groupKey}/data`);
                const data = await response.json();
                allData[groupKey] = data;
            } catch (error) {
                console.error(`加载${groupKey}组数据失败:`, error);
                allData[groupKey] = [];
            }
        }

        // 选择组
        function selectGroup(group) {
            document.querySelectorAll('.group-stat-card').forEach(card => {
                card.classList.remove('active');
            });
            
            if (group !== 'all') {
                document.querySelector(`[data-group="${group}"]`).classList.add('active');
            }
            
            currentGroup = group;
            filterData();
        }

        // 过滤数据
        function filterData() {
            let filteredData = [];
            
            if (currentGroup === 'all') {
                Object.values(allData).forEach(groupData => {
                    filteredData = filteredData.concat(groupData);
                });
            } else {
                filteredData = allData[currentGroup] || [];
            }
            
            if (currentQuestion !== 'all') {
                filteredData = filteredData.filter(item => item.question_num == currentQuestion);
            }
            
            displayFilteredData(filteredData);
        }

        // 显示过滤后的数据
        function displayFilteredData(dataList) {
            const container = document.getElementById('dataList');
            const noDataText = languageTexts[currentLanguage].noData;
            
            if (dataList.length === 0) {
                container.innerHTML = `<div class="loading-text"><i class="fas fa-inbox"></i> ${noDataText}</div>`;
                return;
            }

            let html = '';
            dataList.forEach(item => {
                const groupPrefix = item.data_id.startsWith('ad') ? 'AD' : 
                                   item.data_id.startsWith('m') ? 'MCI' : 'Control';
                const currentGroupType = getGroupType(item.data_id);
                
                // 获取MMSE分数信息
                const groupNum = parseInt(item.group_num);
                const mmseData = currentGroupMMSE[currentGroupType] && currentGroupMMSE[currentGroupType][groupNum];
                let mmseDisplay = '';
                
                if (mmseData) {
                    const score = mmseData.total_score;
                    const assessmentClass = getMMSEAssessmentClass(score);
                    const assessmentText = getMMSEAssessmentText(score);
                    mmseDisplay = `
                        <div class="mmse-info mt-1">
                            <small class="text-secondary">MMSE: </small>
                            <span class="text-dark">${score}/21</span>
                            <small class="text-dark ml-1">${assessmentText}</small>
                        </div>
                    `;
                } else {
                    mmseDisplay = `
                        <div class="mmse-info mt-1">
                            <small class="text-secondary">MMSE: </small>
                            <span class="badge badge-secondary">N/A</span>
                        </div>
                    `;
                }
                
                html += `
                    <div class="data-item" data-id="${item.data_id}">
                        <div class="data-item-content" onclick="visualizeData('${currentGroupType}', '${item.data_id}')">
                            <div class="data-item-info">
                                <div class="data-item-name">${groupPrefix} - ${item.display_name}</div>
                                <div class="data-item-filename">${item.filename}</div>
                                ${mmseDisplay}
                            </div>
                            <span class="question-badge">Q${item.question_num}</span>
                        </div>
                        <div class="data-item-actions">
                            <button class="btn-data-action btn-edit" onclick="editDataGroup(event, '${item.data_id}', '${currentGroupType}')" title="编辑组别">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-data-action btn-delete" onclick="deleteData(event, '${item.data_id}', '${item.display_name}')" title="删除数据">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
            });

            container.innerHTML = html;
        }

        // 获取组类型
        function getGroupType(dataId) {
            if (dataId.startsWith('ad')) return 'ad';
            if (dataId.startsWith('m')) return 'mci';
            return 'control';
        }

        // 删除数据
        function deleteData(event, dataId, displayName) {
            event.stopPropagation(); // 防止触发可视化
            
            const texts = languageTexts[currentLanguage];
            const confirmMessage = texts.deleteDataConfirm.replace('{0}', displayName);
            
            if (confirm(confirmMessage)) {
                fetch(`/api/data/${dataId}`, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // 成功删除，刷新数据
                        loadGroups();
                        showAlert(texts.deleteDataSuccess, 'success');
                    } else {
                        showAlert(texts.deleteDataFailed + ': ' + data.error, 'danger');
                    }
                })
                .catch(error => {
                    console.error(texts.deleteDataFailed + ':', error);
                    showAlert(texts.deleteDataFailed + ': ' + error.message, 'danger');
                });
            }
        }

        // 编辑数据组别
        function editDataGroup(event, dataId, currentGroup) {
            event.stopPropagation(); // 防止触发可视化
            
            const texts = languageTexts[currentLanguage];
            const groupOptions = [
                { value: 'control', label: `${texts.groupControl} (Control)` },
                { value: 'mci', label: `${texts.groupMci} (MCI)` },
                { value: 'ad', label: `${texts.groupAd} (AD)` }
            ];
            
            let optionsHtml = '';
            groupOptions.forEach(option => {
                const selected = option.value === currentGroup ? 'selected' : '';
                optionsHtml += `<option value="${option.value}" ${selected}>${option.label}</option>`;
            });
            
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5>${texts.editDataGroup}</h5>
                            <button type="button" class="btn-close" onclick="closeModal(this)">×</button>
                        </div>
                        <div class="modal-body">
                            <p>${texts.dataId}: <strong>${dataId}</strong></p>
                            <p>${texts.currentGroup}: <strong>${getGroupName(currentGroup)}</strong></p>
                            <div class="form-group">
                                <label for="groupSelect">${texts.selectNewGroup}:</label>
                                <select id="groupSelect" class="form-control">
                                    ${optionsHtml}
                                </select>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onclick="closeModal(this)">${texts.cancel}</button>
                            <button type="button" class="btn btn-primary" onclick="confirmGroupChange('${dataId}', '${currentGroup}', this)">${texts.confirm}</button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
        }

        // 确认组别更改
        function confirmGroupChange(dataId, oldGroup, buttonElement) {
            const texts = languageTexts[currentLanguage];
            const newGroup = document.getElementById('groupSelect').value;
            
            if (newGroup === oldGroup) {
                closeModal(buttonElement);
                return;
            }
            
            fetch(`/api/data/${dataId}/move`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fromGroup: oldGroup,
                    toGroup: newGroup
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    closeModal(buttonElement);
                    loadGroups();
                    showAlert(texts.changeGroupSuccess, 'success');
                } else {
                    showAlert(texts.changeGroupFailed + ': ' + data.error, 'danger');
                }
            })
            .catch(error => {
                console.error(texts.changeGroupFailed + ':', error);
                showAlert(texts.changeGroupFailed + ': ' + error.message, 'danger');
            });
        }

        // 关闭模态框
        function closeModal(element) {
            const modal = element.closest('.modal-overlay');
            modal.remove();
        }

        // 获取组名称
        function getGroupName(groupType) {
            const texts = languageTexts[currentLanguage];
            const names = {
                'control': texts.groupControl,
                'mci': texts.groupMci,
                'ad': texts.groupAd
            };
            return names[groupType] || groupType;
        }

        // 显示提示信息
        function showAlert(message, type) {
            const alertDiv = document.createElement('div');
            alertDiv.className = `alert alert-${type} alert-dismissible`;
            alertDiv.innerHTML = `
                ${message}
                <button type="button" class="btn-close" onclick="this.parentElement.remove()">×</button>
            `;
            
            // 在页面顶部显示提示
            const container = document.querySelector('.container-fluid') || document.body;
            container.insertBefore(alertDiv, container.firstChild);
            
            // 3秒后自动隐藏
            setTimeout(() => {
                if (alertDiv.parentElement) {
                    alertDiv.remove();
                }
            }, 3000);
        }

        // 更新总计数
        function updateTotalCount() {
            const total = Object.values(allData).reduce((sum, groupData) => sum + groupData.length, 0);
            document.getElementById('header-total-count').textContent = total;
        }

        // 可视化数据
        async function visualizeData(groupType, dataId) {
            currentVisualization = { groupType, dataId };
            
            // 更新数据项选中状态
            updateDataItemSelection(dataId);
            
            // 显示Edit按钮
            console.log('显示Edit按钮，当前数据:', dataId);
            const editBtn = document.getElementById('editCalibrationBtn');
            if (editBtn) {
                editBtn.style.display = 'inline-block';
                console.log('Edit按钮已显示');
            } else {
                console.error('未找到Edit按钮元素');
            }
            
            const panel = document.getElementById('visualizationPanel');
            const placeholder = document.getElementById('placeholderMessage');
            const spinner = document.getElementById('loadingSpinner');
            const imageContainer = document.getElementById('imageContainer');
            const statsPanel = document.getElementById('statsPanel');

            // 显示面板并隐藏占位符
            placeholder.style.display = 'none';
            panel.style.display = 'block';
            spinner.style.display = 'block';
            imageContainer.innerHTML = '';
            statsPanel.innerHTML = '';

            try {
                const params = getVisualizationParams();
                const queryString = new URLSearchParams(params).toString();
                const response = await fetch(`/api/visualize/${groupType}/${dataId}?${queryString}`);
                const result = await response.json();

                spinner.style.display = 'none';

                if (result.error) {
                    imageContainer.innerHTML = `
                        <div class="alert alert-danger">
                            <i class="fas fa-exclamation-triangle"></i> ${result.error}
                        </div>
                    `;
                    return;
                }

                // 显示图像
                if (result.image) {
                    imageContainer.innerHTML = `
                        <h5><i class="fas fa-image"></i> ${dataId} - ${result.question}</h5>
                        <img src="data:image/png;base64,${result.image}" alt="眼动轨迹可视化" />
                    `;
                }

                // 显示统计信息
                displayStatistics(result);

            } catch (error) {
                console.error('可视化失败:', error);
                spinner.style.display = 'none';
                imageContainer.innerHTML = `
                    <div class="alert alert-danger">
                        <i class="fas fa-exclamation-triangle"></i> 可视化生成失败: ${error.message}
                    </div>
                `;
            }
        }

        // 获取可视化参数
        function getVisualizationParams() {
            return {
                fixationSize: document.getElementById('fixationSize').value,
                trajectoryWidth: document.getElementById('trajectoryWidth').value,
                trajectoryStyle: document.getElementById('trajectoryStyle').value,
                pointSize: document.getElementById('pointSize').value
            };
        }

        // 更新可视化
        function updateVisualization() {
            if (currentVisualization) {
                visualizeData(currentVisualization.groupType, currentVisualization.dataId);
            }
        }

        // 显示统计信息
        function displayStatistics(result) {
            const statsPanel = document.getElementById('statsPanel');
            const overall = result.overall_statistics;
            const roiStats = result.roi_statistics;
            const texts = languageTexts[currentLanguage];

            let html = `
                <h5><i class="fas fa-chart-bar"></i> ${texts.statInfo}</h5>
                <div class="row">
                    <div class="col-md-6">
                        <h6>${texts.overallStats}</h6>
                        <ul class="list-unstyled">
                            <li><strong>${texts.totalPoints}:</strong> ${overall.total_points}</li>
                            <li><strong>${texts.totalDuration}:</strong> ${overall.total_duration.toFixed(1)}${texts.unitMs}</li>
                            <li><strong>${texts.fixationEvents}:</strong> ${overall.fixation_count}${texts.unitCount}</li>
                            <li><strong>${texts.saccadeEvents}:</strong> ${overall.saccade_count}${texts.unitCount}</li>
                            <li><strong>${texts.avgVelocity}:</strong> ${overall.avg_velocity.toFixed(1)}${texts.unitDegreesPerSecond}</li>
                            <li><strong>${texts.maxVelocity}:</strong> ${overall.max_velocity.toFixed(1)}${texts.unitDegreesPerSecond}</li>
                            <li><strong>${texts.roiSequence}:</strong> ${overall.roi_sequence_count}${texts.unitCount}</li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <h6>${texts.mainRoiStats}</h6>
                        <ul class="list-unstyled">
            `;

            // 显示主要ROI统计
            const sortedROI = Object.entries(roiStats)
                .filter(([name, stats]) => stats.FixTime > 0.1)
                .sort(([,a], [,b]) => b.FixTime - a.FixTime)
                .slice(0, 5);

            sortedROI.forEach(([name, stats]) => {
                html += `<li><strong>${name}:</strong> ${stats.FixTime.toFixed(1)}${texts.unitSecond}</li>`;
            });

            html += `
                        </ul>
                    </div>
                </div>
            `;

            // 添加MMSE信息显示
            if (currentVisualization) {
                const { groupType, dataId } = currentVisualization;
                
                // 从dataId中解析group_num
                const match = dataId.match(/(\d+)/);
                if (match) {
                    const groupNum = parseInt(match[1]);
                    const mmseData = currentGroupMMSE[groupType] && currentGroupMMSE[groupType][groupNum];
                    
                    if (mmseData) {
                        html += displayMMSEDetails(mmseData);
                    } else {
                        html += `
                            <div class="mmse-panel mt-3">
                                <h6 class="text-muted mb-3">
                                    <i class="fas fa-brain"></i> ${texts.cognitiveAssessment}
                                </h6>
                                <div class="alert alert-info">
                                    <small>${texts.noMMSEData}</small>
                                </div>
                            </div>
                        `;
                    }
                }
            }

            statsPanel.innerHTML = html;
        }

        // 重启服务器
        async function restartServer() {
            const texts = languageTexts[currentLanguage];
            if (confirm(texts.restartConfirm)) {
                try {
                    const response = await fetch('/api/restart', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    
                    if (response.ok) {
                        alert(texts.restarting);
                        // 等待一段时间后刷新页面
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    }
                } catch (error) {
                    console.error('重启失败:', error);
                    alert('重启请求失败，请手动重启服务器');
                }
            }
        }

        // 刷新数据
        function refreshData() {
            location.reload();
        }

        // 侧边栏功能
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const icon = document.getElementById('sidebarToggleIcon');
            
            sidebarExpanded = !sidebarExpanded;
            
            if (sidebarExpanded) {
                sidebar.classList.add('expanded');
                icon.className = 'fas fa-times';
            } else {
                sidebar.classList.remove('expanded');
                icon.className = 'fas fa-bars';
            }
        }

        // 切换到数据可视化视图
        function switchToVisualization() {
            if (currentView === 'visualization') return;
            
            // 更新视图
            document.getElementById('visualizationView').style.display = 'block';
            document.getElementById('newFeatureView').style.display = 'none';
            document.getElementById('rqaAnalysisView').style.display = 'none';
            document.getElementById('eventAnalysisView').style.display = 'none';
            document.getElementById('rqaPipelineView').style.display = 'none';
            const featureElement = document.getElementById('comprehensiveFeatureModule') || document.getElementById('featureExtractionView');
            if (featureElement) featureElement.style.display = 'none';
            const seventhElement = document.getElementById('seventhModuleView');
            if (seventhElement) seventhElement.style.display = 'none';
            
            // 更新导航状态
            document.querySelectorAll('.sidebar-nav-item').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelector('[data-view="visualization"]').classList.add('active');
            
            currentView = 'visualization';
        }
                 // 切换到新功能视图
                  function switchToNewFeature() {
             if (currentView === 'newFeature') return;
             
             console.log('切换到数据导入视图');
             
             // 隐藏所有其他视图
            ['visualizationView', 'rqaAnalysisView', 'eventAnalysisView', 'rqaPipelineView', 'comprehensiveFeatureModule', 'seventhModuleView', 'eighthModuleView'].forEach(viewId => {
                 const element = document.getElementById(viewId);
                 if (element) {
                     element.style.display = 'none';
                     console.log(`隐藏视图: ${viewId}`);
                 }
             });
             
             // 显示数据导入视图
             const newFeatureView = document.getElementById('newFeatureView');
             if (newFeatureView) {
                 newFeatureView.style.display = 'block';
                 console.log('显示数据导入视图');
                 console.log('数据导入视图位置信息:', {
                     offsetTop: newFeatureView.offsetTop,
                     offsetLeft: newFeatureView.offsetLeft,
                     offsetHeight: newFeatureView.offsetHeight,
                     offsetWidth: newFeatureView.offsetWidth,
                     innerHTML_length: newFeatureView.innerHTML.length,
                     innerHTML_preview: newFeatureView.innerHTML.substring(0, 200) + '...'
                 });
             } else {
                 console.error('找不到数据导入视图元素');
             }
             
             // 更新导航状态
             document.querySelectorAll('.sidebar-nav-item').forEach(item => {
                 item.classList.remove('active');
             });
             document.querySelector('[data-view="newFeature"]').classList.add('active');
             
             currentView = 'newFeature';
             
            // 注意：数据导入功能现在通过动态模块加载事件初始化
         }
         
         // 切换到RQA分析视图
         function switchToRQAAnalysis() {
             if (currentView === 'rqaAnalysis') return;
             
                         // 更新视图
            document.getElementById('visualizationView').style.display = 'none';
            document.getElementById('newFeatureView').style.display = 'none';
            document.getElementById('eventAnalysisView').style.display = 'none';
            document.getElementById('rqaPipelineView').style.display = 'none';
            const featureElement = document.getElementById('comprehensiveFeatureModule') || document.getElementById('featureExtractionView');
            if (featureElement) featureElement.style.display = 'none';
           const seventhElement = document.getElementById('seventhModuleView');
           if (seventhElement) seventhElement.style.display = 'none';
            document.getElementById('rqaAnalysisView').style.display = 'block';
             
             // 更新导航状态
             document.querySelectorAll('.sidebar-nav-item').forEach(item => {
                 item.classList.remove('active');
             });
             document.querySelector('[data-view="rqaAnalysis"]').classList.add('active');
             
             currentView = 'rqaAnalysis';
             
             // 初始化RQA分析界面
             initializeRQAInterface();
         }
         
         // 切换到事件分析视图
         function switchToEventAnalysis() {
             if (currentView === 'eventAnalysis') return;
             
             console.log('切换到事件分析视图');
             
             // 隐藏所有其他视图
            ['visualizationView', 'newFeatureView', 'rqaAnalysisView', 'rqaPipelineView', 'comprehensiveFeatureModule', 'seventhModuleView', 'eighthModuleView'].forEach(viewId => {
                 const element = document.getElementById(viewId);
                 if (element) {
                     element.style.display = 'none';
                     console.log(`隐藏视图: ${viewId}`);
                 }
             });
             
             // 显示事件分析视图
             const eventView = document.getElementById('eventAnalysisView');
             if (eventView) {
                 eventView.style.display = 'block';
                 console.log('显示事件分析视图');
                 console.log('事件分析视图位置信息:', {
                     offsetTop: eventView.offsetTop,
                     offsetLeft: eventView.offsetLeft,
                     offsetHeight: eventView.offsetHeight,
                     offsetWidth: eventView.offsetWidth,
                     parentElement: eventView.parentElement ? eventView.parentElement.className : 'null',
                     parentOffsetTop: eventView.parentElement ? eventView.parentElement.offsetTop : 'null'
                 });
                 
                 // 检查父容器链
                 let currentElement = eventView;
                 let parentChain = [];
                 while (currentElement.parentElement && parentChain.length < 5) {
                     currentElement = currentElement.parentElement;
                     parentChain.push({
                         tagName: currentElement.tagName,
                         className: currentElement.className,
                         id: currentElement.id,
                         offsetTop: currentElement.offsetTop
                     });
                 }
                 console.log('事件分析视图父容器链:', parentChain);
             } else {
                 console.error('找不到事件分析视图元素');
             }
             
             // 更新导航状态
             document.querySelectorAll('.sidebar-nav-item').forEach(item => {
                 item.classList.remove('active');
             });
             document.querySelector('[data-view="eventAnalysis"]').classList.add('active');
             
             currentView = 'eventAnalysis';
             
                         // 调试页面布局
            debugPageLayout();
            
            // 初始化事件分析界面
            initEventAnalysis();
            
            // 初始化RQA滑动条
            initRQASliders();
         }

         // 切换到RQA分析流程视图
         function switchToRQAPipeline() {
             if (currentView === 'rqaPipeline') return;
             
             console.log('切换到RQA分析流程视图');
             
             // 隐藏所有其他视图
            ['visualizationView', 'newFeatureView', 'rqaAnalysisView', 'eventAnalysisView', 'comprehensiveFeatureModule', 'seventhModuleView', 'eighthModuleView'].forEach(viewId => {
                 const element = document.getElementById(viewId);
                 if (element) {
                     element.style.display = 'none';
                     console.log(`隐藏视图: ${viewId}`);
                 }
             });
             
             // 显示RQA分析流程视图
             const pipelineView = document.getElementById('rqaPipelineView');
             if (pipelineView) {
                 pipelineView.style.display = 'block';
                 console.log('显示RQA分析流程视图');
             } else {
                 console.error('找不到RQA分析流程视图元素');
             }
             
             // 更新导航状态
             document.querySelectorAll('.sidebar-nav-item').forEach(item => {
                 item.classList.remove('active');
             });
             document.querySelector('[data-view="rqaPipeline"]').classList.add('active');
             
             currentView = 'rqaPipeline';
             
             // 初始化RQA分析流程界面
             initRQAPipeline();
         }

         // 初始化RQA分析流程界面
         function initRQAPipeline() {
             console.log('初始化RQA分析流程界面');
             resetPipelineStatus();
         }

         // 切换到综合特征提取视图
         function switchToFeatureExtraction() {
             if (currentView === 'featureExtraction') return;
             
             console.log('🎯 开始切换到综合特征提取视图');
             
             // 隐藏所有其他视图
            ['visualizationView', 'newFeatureView', 'rqaAnalysisView', 'eventAnalysisView', 'rqaPipelineView', 'seventhModuleView', 'eighthModuleView'].forEach(viewId => {
                 const element = document.getElementById(viewId);
                 if (element) {
                     element.style.display = 'none';
                     console.log(`✅ 隐藏视图: ${viewId}`);
                 } else {
                     console.warn(`⚠️ 未找到视图元素: ${viewId}`);
                 }
             });
             
                         // 显示特征提取视图
            const featureView = document.getElementById('comprehensiveFeatureModule');
             if (featureView) {
                 console.log('🔍 找到comprehensiveFeatureModule元素');
                 console.log('📏 元素当前样式:', {
                     display: featureView.style.display,
                     visibility: window.getComputedStyle(featureView).visibility,
                     opacity: window.getComputedStyle(featureView).opacity,
                     height: window.getComputedStyle(featureView).height,
                     width: window.getComputedStyle(featureView).width,
                     position: window.getComputedStyle(featureView).position,
                     zIndex: window.getComputedStyle(featureView).zIndex
                 });
                 
                 featureView.style.display = 'block';
                 featureView.style.visibility = 'visible';
                 featureView.style.opacity = '1';
                 featureView.style.position = 'relative';
                 featureView.style.zIndex = '1';
                 featureView.style.minHeight = '100vh';
                 featureView.style.height = 'auto';
                 featureView.style.overflow = 'visible';
                 
                 // 强制设置container-fluid的高度
                 const containerFluid = featureView.querySelector('.container-fluid');
                 if (containerFluid) {
                     containerFluid.style.minHeight = '100vh';
                     containerFluid.style.height = 'auto';
                     containerFluid.style.display = 'block';
                     console.log('✅ 设置container-fluid样式');
                 }
                 
                 console.log('✅ 设置 comprehensiveFeatureModule display = block 和强制高度样式');
                 
                 // 检查设置后的样式
                 setTimeout(() => {
                     console.log('📏 设置后的样式:', {
                         display: featureView.style.display,
                         visibility: window.getComputedStyle(featureView).visibility,
                         opacity: window.getComputedStyle(featureView).opacity,
                         height: window.getComputedStyle(featureView).height,
                         width: window.getComputedStyle(featureView).width,
                         offsetHeight: featureView.offsetHeight,
                         offsetWidth: featureView.offsetWidth,
                         scrollHeight: featureView.scrollHeight,
                         scrollWidth: featureView.scrollWidth
                     });
                     
                     // 检查子元素
                     const children = featureView.children;
                     console.log(`🧸 子元素数量: ${children.length}`);
                     for (let i = 0; i < Math.min(children.length, 3); i++) {
                         const child = children[i];
                         console.log(`📦 子元素 ${i}:`, {
                             tagName: child.tagName,
                             className: child.className,
                             display: window.getComputedStyle(child).display,
                             height: window.getComputedStyle(child).height,
                             offsetHeight: child.offsetHeight
                         });
                     }
                 }, 100);
                 
             } else {
                 console.error('❌ 找不到综合特征提取视图元素 (comprehensiveFeatureModule)');
                 
                 // 尝试查找所有可能的元素
                 console.log('🔍 查找所有包含 feature 的元素:');
                 const allElements = document.querySelectorAll('[id*="feature"], [class*="feature"]');
                 allElements.forEach((el, index) => {
                     console.log(`  ${index}: id="${el.id}", class="${el.className}"`);
                 });
             }
             
             // 更新导航状态
             document.querySelectorAll('.sidebar-nav-item').forEach(item => {
                 item.classList.remove('active');
             });
             const navItem = document.querySelector('[data-view="featureExtraction"]');
             if (navItem) {
                 navItem.classList.add('active');
                 console.log('✅ 更新导航状态成功');
             } else {
                 console.error('❌ 找不到导航项 [data-view="featureExtraction"]');
             }
             
             currentView = 'featureExtraction';
             console.log('✅ 设置 currentView = featureExtraction');
             
             // 初始化特征提取界面
             console.log('🚀 开始初始化特征提取界面');
             initFeatureExtraction();
         }

        // 切换到第七模块视图
        function switchToSeventhModule() {
            if (currentView === 'seventhModule') return;
            
            console.log('🎯 开始切换到第七模块视图');
            
            // 隐藏所有其他视图
            ['visualizationView', 'newFeatureView', 'rqaAnalysisView', 'eventAnalysisView', 'rqaPipelineView', 'comprehensiveFeatureModule', 'eighthModuleView', 'ninthModuleView', 'tenthModuleView'].forEach(viewId => {
                const element = document.getElementById(viewId);
                if (element) {
                    element.style.display = 'none';
                    console.log(`✅ 隐藏视图: ${viewId}`);
                } else {
                    console.warn(`⚠️ 未找到视图元素: ${viewId}`);
                }
            });
            
            // 显示第七模块视图
            const seventhView = document.getElementById('seventhModuleView');
            if (seventhView) {
                seventhView.style.display = 'block';
                console.log('✅ 显示第七模块视图');
            } else {
                console.error('❌ 找不到第七模块视图元素');
            }
            
            // 更新导航状态
            document.querySelectorAll('.sidebar-nav-item').forEach(item => {
                item.classList.remove('active');
            });
            const navItem = document.querySelector('[data-view="seventhModule"]');
            if (navItem) {
                navItem.classList.add('active');
                console.log('✅ 更新导航状态成功');
            } else {
                console.error('❌ 找不到导航项 [data-view="seventhModule"]');
            }
            
            currentView = 'seventhModule';
            console.log('✅ 设置 currentView = seventhModule');
            
            // 初始化第七模块界面
            console.log('🚀 开始初始化第七模块界面');
            initSeventhModule();
        }

        // 初始化第七模块界面
        function initSeventhModule() {
            console.log('🚀 初始化第七模块界面');
            // 调用数据整理模块的初始化函数
            if (typeof initDataOrganization === 'function') {
                initDataOrganization();
            } else {
                console.warn('⚠️ initDataOrganization 函数未找到，请检查模块7的JavaScript代码是否正确加载');
            }
         }

        // 切换到第八模块视图
        function switchToEighthModule() {
            if (currentView === 'eighthModule') return;
            
            console.log('🎯 开始切换到第八模块视图');
            
            // 隐藏所有其他视图
            ['visualizationView', 'newFeatureView', 'rqaAnalysisView', 'eventAnalysisView', 'rqaPipelineView', 'comprehensiveFeatureModule', 'seventhModuleView', 'ninthModuleView', 'tenthModuleView'].forEach(viewId => {
                const element = document.getElementById(viewId);
                if (element) {
                    element.style.display = 'none';
                    console.log(`✅ 隐藏视图: ${viewId}`);
                } else {
                    console.warn(`⚠️ 未找到视图元素: ${viewId}`);
                }
            });
            
            // 显示第八模块视图
            const eighthView = document.getElementById('eighthModuleView');
            if (eighthView) {
                eighthView.style.display = 'block';
                console.log('✅ 显示第八模块视图');
            } else {
                console.error('❌ 找不到第八模块视图元素');
            }
            
            // 更新导航状态
            document.querySelectorAll('.sidebar-nav-item').forEach(item => {
                item.classList.remove('active');
            });
            const navItem = document.querySelector('[data-view="eighthModule"]');
            if (navItem) {
                navItem.classList.add('active');
                console.log('✅ 更新导航状态成功');
            } else {
                console.error('❌ 找不到导航项 [data-view="eighthModule"]');
            }
            
            currentView = 'eighthModule';
            console.log('✅ 设置 currentView = eighthModule');
            
            // 初始化第八模块界面
            console.log('🚀 开始初始化第八模块界面');
            initEighthModule();
        }

        // 初始化第八模块界面
        function initEighthModule() {
            console.log('🚀 初始化第八模块界面 - 眼动系数与MMSE对比分析');
            
            // 调用眼动系数与MMSE对比分析的初始化函数
            if (typeof initIntelligentAnalysis === 'function') {
                initIntelligentAnalysis();
            } else {
                console.log('📝 眼动系数与MMSE对比分析模块的JavaScript代码将在后续开发');
                // 临时的初始化代码 - 更新状态文本
                const statusText = document.getElementById('aiStatusText');
                if (statusText) {
                    const isZh = currentLanguage === 'zh';
                    statusText.textContent = isZh ? '眼动系数分析引擎已就绪，等待加载数据...' : 'Eye movement coefficient analysis engine ready, waiting for data...';
                }
                
                // 设置置信度滑块事件
                const confidenceSlider = document.getElementById('confidenceThreshold');
                const confidenceValue = document.getElementById('confidenceValue');
                if (confidenceSlider && confidenceValue) {
                    confidenceSlider.addEventListener('input', function() {
                        confidenceValue.textContent = this.value;
                    });
                }
                
                console.log('✅ 第八模块基础初始化完成');
            }
         }

                 // 恢复原始特征提取界面
        function restoreOriginalFeatureView() {
            console.log('🔄 恢复原始特征提取界面');
            
            const featureView = document.getElementById('comprehensiveFeatureModule') || document.getElementById('featureExtractionView');
             if (featureView && window.originalFeatureContent) {
                 featureView.innerHTML = window.originalFeatureContent;
                 console.log('✅ 原始界面已恢复');
                 
                 // 重新应用强制样式
                 setTimeout(() => {
                     featureView.style.minHeight = '100vh';
                     featureView.style.height = 'auto';
                     featureView.style.overflow = 'visible';
                     
                     const containerFluid = featureView.querySelector('.container-fluid');
                     if (containerFluid) {
                         containerFluid.style.minHeight = '100vh';
                         containerFluid.style.height = 'auto';
                         containerFluid.style.display = 'block';
                     }
                     
                     // 强制激活原始面板
                     const allPanels = featureView.querySelectorAll('.feature-control-panel, .feature-results-panel');
                     allPanels.forEach((panel, index) => {
                         panel.style.display = 'block';
                         panel.style.visibility = 'visible';
                         panel.style.opacity = '1';
                         panel.style.minHeight = '300px';
                         panel.style.backgroundColor = '#ffffff';
                         panel.style.border = '2px solid #007bff';
                         console.log('✅ 重新激活原始面板 ' + (index + 1));
                     });
                     
                     console.log('✅ 原始界面样式已重新应用');
                 }, 100);
             } else {
                 console.error('❌ 无法恢复：原始内容未保存或元素不存在');
             }
         }

         // 初始化特征提取界面
         function initFeatureExtraction() {
             console.log('🚀 初始化综合特征提取界面');
             
                         // 验证关键元素是否存在
            const keyElements = [
                'comprehensiveFeatureModule',
                'eventsDataStatus', 
                'roiDataStatus',
                'rqaDataStatus',
                'mmseDataStatus',
                'extractButton',
                'extractionProgress'
            ];
             
             console.log('🔍 检查关键元素:');
             keyElements.forEach(elementId => {
                 const element = document.getElementById(elementId);
                 if (element) {
                     console.log(`✅ ${elementId}: 找到`);
                 } else {
                     console.error(`❌ ${elementId}: 未找到`);
                 }
             });
             
                         // 检查CSS样式是否加载
            const featureView = document.getElementById('comprehensiveFeatureModule') || document.getElementById('featureExtractionView');
             if (featureView) {
                 const styles = window.getComputedStyle(featureView);
                 console.log('🎨 CSS样式检查:', {
                     display: styles.display,
                     visibility: styles.visibility,
                     opacity: styles.opacity,
                     height: styles.height,
                     minHeight: styles.minHeight,
                     backgroundColor: styles.backgroundColor,
                     position: styles.position
                 });
             }
             
             try {
                 console.log('📊 开始检查数据源...');
                 checkDataSources();
             } catch (error) {
                 console.error('❌ 数据源检查失败:', error);
             }
             
             try {
                 console.log('📚 开始加载提取历史...');
                 loadExtractionHistory();
             } catch (error) {
                 console.error('❌ 加载历史失败:', error);
             }
             
             console.log('✅ 初始化完成');
             
                         // 深度诊断 - 详细检查每个层级
            setTimeout(() => {
                const featureView = document.getElementById('comprehensiveFeatureModule') || document.getElementById('featureExtractionView');
                 if (featureView) {
                     console.log('🔎 开始深度诊断...');
                     
                     // 1. 主容器详细信息
                     const computed = window.getComputedStyle(featureView);
                     console.log('📋 主容器详细信息:');
                     console.log(`  - offsetHeight: ${featureView.offsetHeight}px`);
                     console.log(`  - offsetWidth: ${featureView.offsetWidth}px`);
                     console.log(`  - scrollHeight: ${featureView.scrollHeight}px`);
                     console.log(`  - scrollWidth: ${featureView.scrollWidth}px`);
                     console.log(`  - clientHeight: ${featureView.clientHeight}px`);
                     console.log(`  - clientWidth: ${featureView.clientWidth}px`);
                     console.log(`  - display: ${computed.display}`);
                     console.log(`  - position: ${computed.position}`);
                     console.log(`  - visibility: ${computed.visibility}`);
                     console.log(`  - opacity: ${computed.opacity}`);
                     console.log(`  - overflow: ${computed.overflow}`);
                     console.log(`  - zIndex: ${computed.zIndex}`);
                     console.log(`  - transform: ${computed.transform}`);
                     
                     // 2. 递归检查所有子元素
                     function analyzeElement(element, depth = 0) {
                         const indent = '  '.repeat(depth);
                         const tagName = element.tagName || 'TEXT';
                         const className = element.className || '';
                         const id = element.id || '';
                         const computedStyle = element.nodeType === 1 ? window.getComputedStyle(element) : null;
                         
                         if (element.nodeType === 1) { // Element node
                             console.log(`${indent}🏷️  ${tagName}${id ? `#${id}` : ''}${className ? `.${className.split(' ').join('.')}` : ''}`);
                             console.log(`${indent}    📐 尺寸: ${element.offsetWidth}×${element.offsetHeight} (offset), ${element.clientWidth}×${element.clientHeight} (client)`);
                             console.log(`${indent}    🎨 样式: display=${computedStyle.display}, position=${computedStyle.position}, float=${computedStyle.float}`);
                             console.log(`${indent}    📦 边距: margin=${computedStyle.margin}, padding=${computedStyle.padding}`);
                             console.log(`${indent}    🔒 限制: minHeight=${computedStyle.minHeight}, maxHeight=${computedStyle.maxHeight}, height=${computedStyle.height}`);
                             
                             // 特别关注Bootstrap相关类
                             if (className.includes('container') || className.includes('row') || className.includes('col') || className.includes('card')) {
                                 console.log(`${indent}    ⚠️  Bootstrap组件检测!`);
                             }
                             
                             // 检查是否有内容
                             const textContent = element.textContent ? element.textContent.trim().substring(0, 50) : '';
                             if (textContent) {
                                 console.log(`${indent}    📝 内容: "${textContent}${textContent.length > 50 ? '...' : ''}"`);
                             }
                         }
                         
                         // 递归检查子元素（只检查前3层避免输出过多）
                         if (depth < 3 && element.children) {
                             for (let child of element.children) {
                                 analyzeElement(child, depth + 1);
                             }
                         }
                     }
                     
                     console.log('🌳 DOM结构分析:');
                     analyzeElement(featureView);
                     
                     // 3. 检查CSS冲突
                     console.log('⚔️  CSS冲突检查:');
                     const allSheets = Array.from(document.styleSheets);
                     let relevantRules = [];
                     
                     try {
                         allSheets.forEach(sheet => {
                             try {
                                 Array.from(sheet.cssRules || []).forEach(rule => {
                                     if (rule.selectorText && (
                                         rule.selectorText.includes('feature-extraction') ||
                                         rule.selectorText.includes('container-fluid') ||
                                         rule.selectorText.includes('card')
                                     )) {
                                         relevantRules.push({
                                             selector: rule.selectorText,
                                             declarations: rule.style.cssText
                                         });
                                     }
                                 });
                             } catch (e) {
                                 console.log(`    ⚠️  无法访问样式表: ${sheet.href || '内联样式'}`);
                             }
                         });
                         
                         if (relevantRules.length > 0) {
                             console.log('    找到相关CSS规则:');
                             relevantRules.forEach(rule => {
                                 console.log(`      ${rule.selector}: ${rule.declarations}`);
                             });
                         } else {
                             console.log('    未找到相关CSS规则');
                         }
                     } catch (e) {
                         console.log(`    CSS检查出错: ${e.message}`);
                     }
                     
                     // 4. 检查视口和位置
                     const rect = featureView.getBoundingClientRect();
                     console.log('📍 位置信息:');
                     console.log(`  - getBoundingClientRect: ${rect.width}×${rect.height} at (${rect.left}, ${rect.top})`);
                     console.log(`  - 是否在视口内: ${rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth && rect.right > 0}`);
                     
                     // 5. 检查父元素链
                     console.log('🔗 父元素链:');
                     let parent = featureView.parentElement;
                     let level = 0;
                     while (parent && level < 5) {
                         const parentComputed = window.getComputedStyle(parent);
                         console.log(`  ${level}: ${parent.tagName}${parent.id ? `#${parent.id}` : ''}${parent.className ? `.${parent.className.split(' ').join('.')}` : ''}`);
                         console.log(`      display=${parentComputed.display}, position=${parentComputed.position}, overflow=${parentComputed.overflow}`);
                         console.log(`      尺寸=${parent.offsetWidth}×${parent.offsetHeight}`);
                         parent = parent.parentElement;
                         level++;
                     }
                     
                     console.log('🔎 深度诊断完成');
                 }
             }, 200);
         }

         // 检查数据源状态
         async function checkDataSources() {
             console.log('📊 开始检查数据源状态');
             
             const sources = [
                 {id: 'eventsDataStatus', name: '眼动事件数据'},
                 {id: 'roiDataStatus', name: 'ROI汇总数据'}, 
                 {id: 'rqaDataStatus', name: 'RQA分析数据'},
                 {id: 'mmseDataStatus', name: 'MMSE评分数据'}
             ];
             
             let foundElements = 0;
             
             for (const source of sources) {
                 const element = document.getElementById(source.id);
                 if (element) {
                     foundElements++;
                     console.log(`✅ 找到元素: ${source.id}`);
                     
                     // 设置初始状态
                     element.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i><span>${source.name}</span>`;
                     element.classList.remove('success', 'error');
                     
                     // 模拟检查过程
                     setTimeout(() => {
                         try {
                             element.innerHTML = `<i class="fas fa-check-circle"></i><span>${source.name}</span>`;
                             element.classList.add('success');
                             console.log(`✅ ${source.name} 状态更新成功`);
                         } catch (error) {
                             console.error(`❌ 更新 ${source.name} 状态失败:`, error);
                         }
                     }, Math.random() * 1000 + 500);
                 } else {
                     console.error(`❌ 未找到元素: ${source.id}`);
                 }
             }
             
             console.log(`📊 数据源检查完成，找到 ${foundElements}/${sources.length} 个元素`);
             
             if (foundElements === 0) {
                 console.error('❌ 未找到任何数据源状态元素，可能HTML结构有问题');
             }
         }

         // 开始特征提取
         async function startFeatureExtraction() {
             const button = document.getElementById('extractButton');
             const progress = document.getElementById('extractionProgress');
             const progressBar = document.getElementById('extractionProgressBar');
             const progressText = document.getElementById('extractionProgressText');
             const statusCard = document.getElementById('extractionStatusCard');
             
                         try {
                // 禁用按钮和显示进度
                button.disabled = true;
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 提取中...';
                progress.style.display = 'block';
                
                // 显示状态卡片
                if (statusCard) {
                    statusCard.style.display = 'block';
                }
                
                // 隐藏之前的结果
                const resultsSummary = document.getElementById('resultsSummary');
                const resultsFiles = document.getElementById('resultsFiles');
                const dataPreview = document.getElementById('dataPreview');
                
                if (resultsSummary) resultsSummary.style.display = 'none';
                if (resultsFiles) resultsFiles.style.display = 'none';
                if (dataPreview) dataPreview.style.display = 'none';
                
                // 更新状态
                const statusTitle = document.getElementById('statusTitle');
                const statusMessage = document.getElementById('statusMessage');
                const statusIcon = document.querySelector('.status-icon');
                
                if (statusTitle) statusTitle.textContent = '正在提取特征';
                if (statusMessage) statusMessage.textContent = '正在分析眼动数据和提取多维度特征...';
                if (statusIcon) statusIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                 
                 // 模拟进度更新
                 for (let i = 0; i <= 100; i += 10) {
                     progressBar.style.width = i + '%';
                     progressText.textContent = `处理中... ${i}%`;
                     await new Promise(resolve => setTimeout(resolve, 200));
                 }
                 
                 // 调用后端API
                 const response = await fetch('/api/feature-extraction/extract', {
                     method: 'POST',
                     headers: {
                         'Content-Type': 'application/json'
                     }
                 });
                 
                 const result = await response.json();
                 
                 if (result.success) {
                     // 提取成功
                     showExtractionResults(result);
                 } else {
                     throw new Error(result.message || '特征提取失败');
                 }
                 
                         } catch (error) {
                console.error('特征提取错误:', error);
                alert('特征提取失败: ' + error.message);
                
                // 更新状态显示错误
                const statusTitle = document.getElementById('statusTitle');
                const statusMessage = document.getElementById('statusMessage');
                const statusIcon = document.querySelector('.status-icon');
                
                if (statusTitle) statusTitle.textContent = '提取失败';
                if (statusMessage) statusMessage.textContent = error.message;
                if (statusIcon) statusIcon.innerHTML = '<i class="fas fa-exclamation-triangle text-danger"></i>';
                 
             } finally {
                 // 恢复按钮状态
                 button.disabled = false;
                 button.innerHTML = '<i class="fas fa-play"></i> 开始特征提取';
                 progress.style.display = 'none';
             }
         }

         // 显示提取结果
         function showExtractionResults(result) {
             // 隐藏状态卡片
             document.getElementById('extractionStatusCard').style.display = 'none';
             
             // 显示结果摘要
             const summary = document.getElementById('resultsSummary');
             summary.style.display = 'block';
             
             // 更新统计数据
             document.getElementById('totalSubjects').textContent = result.statistics.total_subjects;
             document.getElementById('totalTasks').textContent = result.statistics.total_tasks;
             document.getElementById('featureCount').textContent = result.statistics.feature_count;
             document.getElementById('extractionTime').textContent = result.timestamp;
             
             // 显示结果文件
             const filesDiv = document.getElementById('resultsFiles');
             filesDiv.style.display = 'block';
             
             // 保存时间戳用于下载和预览
             window.currentExtractionTimestamp = result.timestamp;
             
             // 重新加载历史记录
             loadExtractionHistory();
         }

         // 加载提取历史
         async function loadExtractionHistory() {
             console.log('📚 开始加载提取历史记录');
             
             try {
                 const historyList = document.getElementById('extractionHistoryList');
                 if (!historyList) {
                     console.error('❌ 未找到历史记录列表元素 (extractionHistoryList)');
                     return;
                 }
                 
                 console.log('✅ 找到历史记录列表元素');
                 historyList.innerHTML = '<p class="text-muted"><i class="fas fa-spinner fa-spin"></i> 加载中...</p>';
                 
                 console.log('🌐 发送API请求: /api/feature-extraction/history');
                 const response = await fetch('/api/feature-extraction/history');
                 console.log('📡 API响应状态:', response.status);
                 
                 const result = await response.json();
                 console.log('📋 API返回结果:', result);
                 
                 if (result.success && result.history && result.history.length > 0) {
                     console.log(`✅ 找到 ${result.history.length} 条历史记录`);
                     historyList.innerHTML = result.history.map(item => `
                         <div class="history-item" onclick="loadHistoryResult('${item.timestamp}')">
                             <div class="history-timestamp">${item.timestamp}</div>
                             <div class="history-stats">
                                 ${item.master_features_shape[0]} 任务 | ${item.feature_columns.length} 特征
                             </div>
                         </div>
                     `).join('');
                     console.log('✅ 历史记录显示完成');
                 } else {
                     console.log('ℹ️ 无历史记录或数据为空');
                     historyList.innerHTML = '<p class="text-muted">暂无历史记录</p>';
                 }
                 
             } catch (error) {
                 console.error('❌ 加载历史记录失败:', error);
                 const historyList = document.getElementById('extractionHistoryList');
                 if (historyList) {
                     historyList.innerHTML = '<p class="text-danger">加载失败: ' + error.message + '</p>';
                 }
             }
         }

         // 加载历史结果
         function loadHistoryResult(timestamp) {
             window.currentExtractionTimestamp = timestamp;
             
             // 显示结果文件区域
             document.getElementById('resultsFiles').style.display = 'block';
             document.getElementById('extractionStatusCard').style.display = 'none';
             document.getElementById('dataPreview').style.display = 'none';
         }

         // 预览结果
         async function previewResults(type) {
             if (!window.currentExtractionTimestamp) {
                 alert('请先选择一个提取结果');
                 return;
             }
             
             try {
                 const response = await fetch(`/api/feature-extraction/preview/${window.currentExtractionTimestamp}?type=${type}&limit=20`);
                 const result = await response.json();
                 
                 if (result.success) {
                     showDataPreview(result);
                 } else {
                     alert('预览失败: ' + result.message);
                 }
                 
             } catch (error) {
                 console.error('预览错误:', error);
                 alert('预览失败: ' + error.message);
             }
         }

         // 显示数据预览
         function showDataPreview(result) {
             const previewDiv = document.getElementById('dataPreview');
             const tableHead = document.getElementById('previewTableHead');
             const tableBody = document.getElementById('previewTableBody');
             
             // 构建表头
             if (result.preview.length > 0) {
                 const columns = Object.keys(result.preview[0]);
                 tableHead.innerHTML = '<tr>' + columns.map(col => `<th>${col}</th>`).join('') + '</tr>';
                 
                 // 构建表体
                 tableBody.innerHTML = result.preview.map(row => {
                     return '<tr>' + columns.map(col => `<td>${row[col] || '-'}</td>`).join('') + '</tr>';
                 }).join('');
             }
             
             previewDiv.style.display = 'block';
             previewDiv.scrollIntoView({ behavior: 'smooth' });
         }

         // 下载结果
         function downloadResults(type) {
             if (!window.currentExtractionTimestamp) {
                 alert('请先选择一个提取结果');
                 return;
             }
             
             const url = `/api/feature-extraction/download/${window.currentExtractionTimestamp}?type=${type}`;
             const link = document.createElement('a');
             link.href = url;
             link.download = '';
             document.body.appendChild(link);
             link.click();
             document.body.removeChild(link);
         }

         // 重置流程状态
         function resetPipelineStatus() {
             for (let i = 1; i <= 5; i++) {
                 const stepCard = document.getElementById(`step${i}Card`);
                 const stepStatus = document.getElementById(`step${i}Status`);
                 
                 if (stepCard) {
                     stepCard.className = 'pipeline-step-card';
                 }
                 
                 if (stepStatus) {
                     stepStatus.innerHTML = '<i class="fas fa-clock text-warning"></i> 待执行';
                     stepStatus.className = 'step-status';
                 }
             }
             
             // 重置进度条
             const progressBar = document.getElementById('overallProgress');
             if (progressBar) {
                 progressBar.style.width = '0%';
                 progressBar.textContent = '0%';
             }
         }
         // 更新步骤状态
         function updateStepStatus(stepNumber, status, message) {
             const stepCard = document.getElementById(`step${stepNumber}Card`);
             const stepStatus = document.getElementById(`step${stepNumber}Status`);
             
             if (stepCard) {
                 stepCard.className = `pipeline-step-card ${status}`;
             }
             
             if (stepStatus) {
                 let icon, color;
                 switch (status) {
                     case 'running':
                         icon = 'fas fa-spinner fa-spin';
                         color = 'text-warning';
                         break;
                     case 'completed':
                         icon = 'fas fa-check-circle';
                         color = 'text-success';
                         break;
                     case 'failed':
                         icon = 'fas fa-times-circle';
                         color = 'text-danger';
                         break;
                     default:
                         icon = 'fas fa-clock';
                         color = 'text-warning';
                 }
                 
                 stepStatus.innerHTML = `<i class="${icon} ${color}"></i> ${message}`;
                 stepStatus.className = `step-status ${status}`;
             }
         }

         // 更新总体进度
         function updateOverallProgress(progress) {
             const progressBar = document.getElementById('overallProgress');
             if (progressBar) {
                 progressBar.style.width = `${progress}%`;
                 progressBar.textContent = `${progress}%`;
             }
         }

         // 获取当前RQA参数
         function getCurrentRQAParams() {
             return {
                 m: parseInt(document.getElementById('rqa-embedding-dim').value),
                 tau: parseInt(document.getElementById('rqa-time-delay').value),
                 eps: parseFloat(document.getElementById('rqa-threshold').value),
                 lmin: parseInt(document.getElementById('rqa-min-line').value)
             };
         }

         // 生成参数签名
         function generateParamSignature(params) {
             return `m${params.m}_tau${params.tau}_eps${params.eps}_lmin${params.lmin}`;
         }

         // 更新参数签名显示
         function updateParamSignature() {
             const params = getCurrentRQAParams();
             const signature = generateParamSignature(params);
             const signatureElement = document.getElementById('current-param-signature');
             if (signatureElement) {
                 signatureElement.textContent = signature;
             }
         }

         // 折叠功能
         function toggleCollapse(sectionId) {
             const content = document.getElementById(sectionId + 'Content');
             const toggle = document.getElementById(sectionId + 'Toggle');
             
             if (content.classList.contains('collapsed')) {
                 // 展开
                 content.classList.remove('collapsed');
                 toggle.textContent = '−';
             } else {
                 // 折叠
                 content.classList.add('collapsed');
                 toggle.textContent = '+';
             }
         }

         // 加载参数历史
         async function loadParamHistory() {
             try {
                 const response = await fetch('/api/rqa-pipeline/param-history');
                 const result = await response.json();
                 
                 if (result.success) {
                     showParamHistoryModal(result.history);
                 } else {
                     alert('加载参数历史失败: ' + result.message);
                 }
             } catch (error) {
                 console.error('加载参数历史错误:', error);
                 alert('加载参数历史失败: ' + error.message);
             }
         }

         // 显示参数历史模态框
         function showParamHistoryModal(historyData) {
             let modalHTML = `
                 <div class="param-history-modal" id="paramHistoryModal">
                     <div class="param-history-content">
                         <div class="d-flex justify-content-between align-items-center mb-4">
                             <h4><i class="fas fa-history"></i> 参数历史记录</h4>
                             <button class="btn btn-outline-secondary btn-sm" onclick="closeParamHistoryModal()">
                                 <i class="fas fa-times"></i>
                             </button>
                         </div>
                         <div class="table-responsive">
                             <table class="table table-hover">
                                 <thead>
                                     <tr>
                                         <th>参数组合</th>
                                         <th>嵌入维度</th>
                                         <th>时间延迟</th>
                                         <th>递归阈值</th>
                                         <th>最小线长</th>
                                         <th>完成步骤</th>
                                         <th>操作</th>
                                     </tr>
                                 </thead>
                                 <tbody>`;
             
             if (historyData.length === 0) {
                 modalHTML += `
                     <tr>
                         <td colspan="7" class="text-center text-muted">暂无历史记录</td>
                     </tr>`;
             } else {
                 historyData.forEach(item => {
                     modalHTML += `
                         <tr>
                             <td><span class="param-signature">${item.signature}</span></td>
                             <td>${item.params.m}</td>
                             <td>${item.params.tau}</td>
                             <td>${item.params.eps}</td>
                             <td>${item.params.lmin}</td>
                             <td>
                                 <div class="progress" style="height: 20px;">
                                     <div class="progress-bar" style="width: ${item.progress}%">${item.completed_steps}/5</div>
                                 </div>
                             </td>
                             <td>
                                 <button class="btn btn-sm btn-primary" onclick="loadParams('${item.signature}', ${JSON.stringify(item.params).replace(/"/g, '&quot;')})">
                                     <i class="fas fa-download"></i> 加载
                                 </button>
                                 <button class="btn btn-sm btn-info" onclick="viewResults('${item.signature}')">
                                     <i class="fas fa-eye"></i> 查看
                                 </button>
                                 <button class="btn btn-sm btn-danger" onclick="deleteResults('${item.signature}')">
                                     <i class="fas fa-trash"></i> 删除
                                 </button>
                             </td>
                         </tr>`;
                 });
             }
             
             modalHTML += `
                                 </tbody>
                             </table>
                         </div>
                     </div>
                 </div>`;
             
             // 添加到页面
             document.body.insertAdjacentHTML('beforeend', modalHTML);
             document.getElementById('paramHistoryModal').style.display = 'block';
         }

         // 关闭参数历史模态框
         function closeParamHistoryModal() {
             const modal = document.getElementById('paramHistoryModal');
             if (modal) {
                 modal.remove();
             }
         }

         // 加载指定参数
         function loadParams(signature, params) {
             document.getElementById('rqa-embedding-dim').value = params.m;
             document.getElementById('rqa-time-delay').value = params.tau;
             document.getElementById('rqa-threshold').value = params.eps;
             document.getElementById('rqa-min-line').value = params.lmin;
             updateParamSignature();
             closeParamHistoryModal();
         }

         // 查看指定参数的结果
         async function viewResults(signature) {
             try {
                 const response = await fetch(`/api/rqa-pipeline/results/${signature}`);
                 const result = await response.json();
                 
                 if (result.status === 'success') {
                     if (result.data.results && (result.data.results.charts || result.data.results.group_stats)) {
                         displayResults(result.data.results);
                         closeParamHistoryModal();
                     } else {
                         alert('该参数组合的可视化结果尚未生成，请先完成完整流程');
                     }
                 } else {
                     alert('该参数组合暂无结果或结果不完整');
                 }
             } catch (error) {
                 console.error('查看结果错误:', error);
                 alert('查看结果失败');
             }
         }

         // 删除指定参数的结果
         async function deleteResults(signature) {
             if (!confirm(`确定要删除参数组合 "${signature}" 的所有结果吗？此操作不可恢复。`)) {
                 return;
             }
             
             try {
                 const response = await fetch(`/api/rqa-pipeline/delete/${signature}`, {
                     method: 'DELETE'
                 });
                 const result = await response.json();
                 
                 if (result.status === 'success') {
                     alert('删除成功');
                     // 重新加载历史记录
                     loadParamHistory();
                 } else {
                     alert('删除失败: ' + result.message);
                 }
             } catch (error) {
                 console.error('删除结果错误:', error);
                 alert('删除失败');
             }
         }

         // 运行完整流程时获取当前参数
         async function runFullPipeline() {
             console.log('开始运行完整流程...');
             resetPipelineStatus();
             
             const params = getCurrentRQAParams();
             const signature = generateParamSignature(params);
             console.log('使用参数组合:', signature);
             
             try {
                 // 按顺序执行所有步骤
                 await startRQACalculation();
                 await new Promise(resolve => setTimeout(resolve, 1000)); // 短暂延迟
                 
                 await startDataMerging();
                 await new Promise(resolve => setTimeout(resolve, 1000));
                 
                 await startFeatureEnrichment();
                 await new Promise(resolve => setTimeout(resolve, 1000));
                 
                 await startStatisticalAnalysis();
                 await new Promise(resolve => setTimeout(resolve, 1000));
                 
                 await startVisualization();
                 
                 updateOverallProgress(100);
                 console.log('完整流程执行完成！');
                 
             } catch (error) {
                 console.error('流程执行错误:', error);
                 alert('流程执行失败，请检查错误信息');
             }
         }

         // 页面加载时初始化参数签名
         document.addEventListener('DOMContentLoaded', function() {
             updateParamSignature();
         });

         // 步骤1: 开始RQA计算
         async function startRQACalculation() {
             console.log('开始RQA计算...');
             updateStepStatus(1, 'running', '正在计算RQA指标...');
             updateOverallProgress(20);
             
             const params = getCurrentRQAParams();
             
             try {
                 const response = await fetch('/api/rqa-pipeline/calculate', {
                     method: 'POST',
                     headers: {
                         'Content-Type': 'application/json'
                     },
                     body: JSON.stringify({
                         step: 'rqa_calculation',
                         parameters: {
                             m: params.m,
                             delay: params.tau,
                             eps: params.eps,
                             lmin: params.lmin
                         }
                     })
                 });
                 
                 const result = await response.json();
                 
                 if (result.status === 'success') {
                     updateStepStatus(1, 'completed', '✅ RQA计算完成');
                     updateOverallProgress(20);
                 } else {
                     updateStepStatus(1, 'failed', '❌ RQA计算失败');
                 }
             } catch (error) {
                 console.error('RQA计算错误:', error);
                 updateStepStatus(1, 'failed', '❌ 网络错误');
             }
         }

         // 步骤2: 开始数据合并
         async function startDataMerging() {
             console.log('开始数据合并...');
             updateStepStatus(2, 'running', '正在合并三组数据...');
             updateOverallProgress(40);
             
             const params = getCurrentRQAParams();
             
             try {
                 const response = await fetch('/api/rqa-pipeline/merge', {
                     method: 'POST',
                     headers: {
                         'Content-Type': 'application/json'
                     },
                     body: JSON.stringify({
                         step: 'data_merging',
                         parameters: params
                     })
                 });
                 
                 const result = await response.json();
                 
                 if (result.status === 'success') {
                     updateStepStatus(2, 'completed', '✅ 数据合并完成');
                     updateOverallProgress(40);
                 } else {
                     updateStepStatus(2, 'failed', '❌ 数据合并失败');
                 }
             } catch (error) {
                 console.error('数据合并错误:', error);
                 updateStepStatus(2, 'failed', '❌ 网络错误');
             }
         }

         // 步骤3: 开始特征补充
         async function startFeatureEnrichment() {
             console.log('开始特征补充...');
             updateStepStatus(3, 'running', '正在补充事件特征...');
             updateOverallProgress(60);
             
             const params = getCurrentRQAParams();
             
             try {
                 const response = await fetch('/api/rqa-pipeline/enrich', {
                     method: 'POST',
                     headers: {
                         'Content-Type': 'application/json'
                     },
                     body: JSON.stringify({
                         step: 'feature_enrichment',
                         parameters: params
                     })
                 });
                 
                 const result = await response.json();
                 
                 if (result.status === 'success') {
                     updateStepStatus(3, 'completed', '✅ 特征补充完成');
                     updateOverallProgress(60);
                 } else {
                     updateStepStatus(3, 'failed', '❌ 特征补充失败');
                 }
             } catch (error) {
                 console.error('特征补充错误:', error);
                 updateStepStatus(3, 'failed', '❌ 网络错误');
             }
         }

         // 步骤4: 开始统计分析
         async function startStatisticalAnalysis() {
             console.log('开始统计分析...');
             updateStepStatus(4, 'running', '正在进行统计分析...');
             updateOverallProgress(80);
             
             const params = getCurrentRQAParams();
             
             try {
                 const response = await fetch('/api/rqa-pipeline/analyze', {
                     method: 'POST',
                     headers: {
                         'Content-Type': 'application/json'
                     },
                     body: JSON.stringify({
                         step: 'statistical_analysis',
                         parameters: params
                     })
                 });
                 
                 const result = await response.json();
                 
                 if (result.status === 'success') {
                     updateStepStatus(4, 'completed', '✅ 统计分析完成');
                     updateOverallProgress(80);
                 } else {
                     updateStepStatus(4, 'failed', '❌ 统计分析失败');
                 }
             } catch (error) {
                 console.error('统计分析错误:', error);
                 updateStepStatus(4, 'failed', '❌ 网络错误');
             }
         }

         // 步骤5: 开始可视化
         async function startVisualization() {
             console.log('开始生成可视化...');
             updateStepStatus(5, 'running', '正在生成图表...');
             updateOverallProgress(100);
             
             const params = getCurrentRQAParams();
             
             try {
                 const response = await fetch('/api/rqa-pipeline/visualize', {
                     method: 'POST',
                     headers: {
                         'Content-Type': 'application/json'
                     },
                     body: JSON.stringify({
                         step: 'visualization',
                         parameters: params
                     })
                 });
                 
                 const result = await response.json();
                 
                 if (result.status === 'success') {
                     updateStepStatus(5, 'completed', '✅ 可视化完成');
                     updateOverallProgress(100);
                     displayResults(result.data);
                 } else {
                     updateStepStatus(5, 'failed', '❌ 可视化失败');
                 }
             } catch (error) {
                 console.error('可视化错误:', error);
                 updateStepStatus(5, 'failed', '❌ 网络错误');
             }
         }



         // 重置流程
         function resetPipeline() {
             resetPipelineStatus();
             
             // 清空结果显示区域
             const resultsContainer = document.getElementById('pipelineResults');
             if (resultsContainer) {
                 resultsContainer.innerHTML = `
                     <div class="placeholder-content text-center py-5">
                         <i class="fas fa-chart-line fa-3x text-muted mb-3"></i>
                         <h5 class="text-muted">尚未生成分析结果</h5>
                         <p class="text-muted">请运行分析流程以查看结果</p>
                     </div>
                 `;
             }
         }

         // 显示分析结果
         function displayResults(data) {
             const resultsContainer = document.getElementById('pipelineResults');
             if (!resultsContainer || !data) return;
             
             let resultsHTML = '';
             
             // 显示统计表格
             if (data.group_stats) {
                 resultsHTML += `
                     <div class="result-section">
                         <h5><i class="fas fa-table"></i> 组别统计结果</h5>
                         <div class="table-responsive">
                             <table class="table table-striped">
                                 <thead>
                                     <tr>
                                         <th>组别</th>
                                         <th>RR-2D-xy (均值±标准差)</th>
                                         <th>DET-2D-xy (均值±标准差)</th>
                                         <th>ENT-2D-xy (均值±标准差)</th>
                                     </tr>
                                 </thead>
                                 <tbody>
                                     ${data.group_stats.map(row => `
                                         <tr>
                                             <td>${row.Group}</td>
                                             <td>${row.RR_mean.toFixed(4)} ± ${row.RR_std.toFixed(4)}</td>
                                             <td>${row.DET_mean.toFixed(4)} ± ${row.DET_std.toFixed(4)}</td>
                                             <td>${row.ENT_mean.toFixed(4)} ± ${row.ENT_std.toFixed(4)}</td>
                                         </tr>
                                     `).join('')}
                                 </tbody>
                             </table>
                         </div>
                     </div>
                 `;
             }
             
             // 显示图表
             if (data.charts) {
                 resultsHTML += `
                     <div class="result-section mt-4">
                         <h5><i class="fas fa-chart-bar"></i> 可视化图表</h5>
                         <div class="row">
                             ${data.charts.map(chart => `
                                 <div class="col-lg-6 mb-4">
                                     <div class="chart-container">
                                         <h6>${chart.title}</h6>
                                         <img src="data:image/png;base64,${chart.image}" class="img-fluid" alt="${chart.title}">
                                     </div>
                                 </div>
                             `).join('')}
                         </div>
                     </div>
                 `;
             }
             
             resultsContainer.innerHTML = resultsHTML;
         }

         // 数据导入功能变量
         let selectedFiles = [];
         let selectedGroup = null;
         let processingStatus = null;
         let processingResult = null;

         // 初始化数据导入功能
         function initDataImport() {
             setupFileUpload();
             resetImportState();
         }

         // 设置文件上传
         function setupFileUpload() {
             const uploadZone = document.getElementById('uploadZone');
             const fileInput = document.getElementById('fileInput');

             // 拖拽事件
             uploadZone.addEventListener('dragover', (e) => {
                 e.preventDefault();
                 uploadZone.classList.add('dragover');
             });

             uploadZone.addEventListener('dragleave', (e) => {
                 e.preventDefault();
                 uploadZone.classList.remove('dragover');
             });

             uploadZone.addEventListener('drop', (e) => {
                 e.preventDefault();
                 uploadZone.classList.remove('dragover');
                 handleFiles(e.dataTransfer.files);
             });

             // 文件选择事件
             fileInput.addEventListener('change', (e) => {
                 handleFiles(e.target.files);
             });
         }

         // 处理选择的文件
         function handleFiles(files) {
             const standardFileNames = ['1.txt', '2.txt', '3.txt', '4.txt', '5.txt'];
             const levelFileNames = ['level_1.txt', 'level_2.txt', 'level_3.txt', 'level_4.txt', 'level_5.txt'];
             const validFileNames = [...standardFileNames, ...levelFileNames];
             const newFiles = [];
             const errors = [];
             
             Array.from(files).forEach(file => {
                 // 检查文件名是否有效
                 if (!validFileNames.includes(file.name)) {
                     errors.push(`无效文件名: ${file.name}`);
                     return;
                 }
                 
                 // 检查是否已存在同名文件
                 if (selectedFiles.some(f => f.name === file.name)) {
                     errors.push(`文件已存在: ${file.name}`);
                     return;
                 }
                 
                 newFiles.push(file);
             });
             
             // 显示错误信息
             if (errors.length > 0) {
                 alert('文件选择错误:\n' + errors.join('\n'));
             }
             
             // 添加有效文件
             selectedFiles.push(...newFiles);
             updateFileList();
             validateFileSet();
         }

         // 更新文件列表显示
         function updateFileList() {
             const fileList = document.getElementById('fileList');
             const fileItems = document.getElementById('fileItems');

             if (selectedFiles.length === 0) {
                 fileList.style.display = 'none';
                 return;
             }

             fileList.style.display = 'block';
             fileItems.innerHTML = '';

             selectedFiles.forEach((file, index) => {
                 const fileItem = document.createElement('div');
                 fileItem.className = 'file-item';
                 fileItem.innerHTML = `
                     <div class="file-info">
                         <div class="file-icon">
                             <i class="fas fa-file-alt"></i>
                         </div>
                         <div class="file-details">
                             <h5>${file.name}</h5>
                             <p>${formatFileSize(file.size)} • ${file.type || 'text/plain'}</p>
                         </div>
                     </div>
                     <button class="file-remove" onclick="removeFile(${index})">
                         <i class="fas fa-times"></i>
                     </button>
                 `;
                 fileItems.appendChild(fileItem);
             });
         }

         // 格式化文件大小
         function formatFileSize(bytes) {
             if (bytes === 0) return '0 B';
             const k = 1024;
             const sizes = ['B', 'KB', 'MB', 'GB'];
             const i = Math.floor(Math.log(bytes) / Math.log(k));
             return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
         }

         // 移除文件
         function removeFile(index) {
             selectedFiles.splice(index, 1);
             updateFileList();
             validateFileSet();
         }

         // 清空文件
         function clearFiles() {
             selectedFiles = [];
             updateFileList();
             validateFileSet();
             document.getElementById('fileInput').value = '';
         }

         // 验证文件集合
         function validateFileSet() {
             const standardFiles = ['1.txt', '2.txt', '3.txt', '4.txt', '5.txt'];
             const levelFiles = ['level_1.txt', 'level_2.txt', 'level_3.txt', 'level_4.txt', 'level_5.txt'];
             const validationList = document.getElementById('validationList');
             const validationStatus = document.getElementById('validationStatus');
             
             // 显示验证状态面板
             validationStatus.style.display = 'block';
             
             // 检查用户使用的是哪种格式
             const uploadedNames = selectedFiles.map(f => f.name);
             const hasStandardFiles = standardFiles.some(name => uploadedNames.includes(name));
             const hasLevelFiles = levelFiles.some(name => uploadedNames.includes(name));
             
             let requiredFiles = [];
             let allValid = true;
             
             // 决定期望的文件格式
             if (hasStandardFiles && !hasLevelFiles) {
                 requiredFiles = standardFiles;
             } else if (hasLevelFiles && !hasStandardFiles) {
                 requiredFiles = levelFiles;
             } else if (hasStandardFiles && hasLevelFiles) {
                 // 混合格式，显示错误
                 allValid = false;
             } else {
                 // 没有上传任何文件，默认显示标准格式
                 requiredFiles = standardFiles;
             }
             
             let html = '';
             
             // 检查每个必需文件
             requiredFiles.forEach(fileName => {
                 const hasFile = selectedFiles.some(f => f.name === fileName);
                 const statusClass = hasFile ? 'valid' : 'missing';
                 const statusIcon = hasFile ? 'fas fa-check-circle' : 'fas fa-clock';
                 const statusText = hasFile ? '已上传' : '未上传';
                 
                 if (!hasFile) allValid = false;
                 
                 html += `
                     <div class="validation-item ${statusClass}">
                         <span>${fileName}</span>
                         <span class="validation-status-icon ${statusClass}">
                             <i class="${statusIcon}"></i> ${statusText}
                         </span>
                     </div>
                 `;
             });
             
             // 检查是否有无效文件或混合格式
             selectedFiles.forEach(file => {
                 const isStandard = standardFiles.includes(file.name);
                 const isLevel = levelFiles.includes(file.name);
                 
                 if (!isStandard && !isLevel) {
                     // 完全无效的文件名
                     html += `
                         <div class="validation-item invalid">
                             <span>${file.name}</span>
                             <span class="validation-status-icon invalid">
                                 <i class="fas fa-times-circle"></i> 无效文件
                             </span>
                         </div>
                     `;
                     allValid = false;
                 } else if (hasStandardFiles && hasLevelFiles) {
                     // 混合格式
                     html += `
                         <div class="validation-item invalid">
                             <span>${file.name}</span>
                             <span class="validation-status-icon invalid">
                                 <i class="fas fa-times-circle"></i> 格式混合
                             </span>
                         </div>
                     `;
                     allValid = false;
                 }
             });
             
             validationList.innerHTML = html;
             
             // 更新下一步按钮状态
             const nextBtn = document.querySelector('#fileList .btn-success');
             if (nextBtn) {
                 nextBtn.disabled = !allValid || selectedFiles.length !== 5;
                 if (allValid && selectedFiles.length === 5) {
                     nextBtn.innerHTML = '<i class="fas fa-check"></i> <span data-lang-key="nextStep">下一步</span>';
                 } else {
                     nextBtn.innerHTML = '<i class="fas fa-times"></i> <span data-lang-key="nextStep">下一步</span>';
                 }
             }
             
             return allValid && selectedFiles.length === 5;
         }

         // 进入分组选择步骤
         function proceedToGroupSelection() {
             // 验证文件集合
             if (!validateFileSet()) {
                 const texts = languageTexts[currentLanguage];
                 alert(texts.fileValidation + '\n' + texts.missingFiles);
                 return;
             }

             document.getElementById('uploadSection').style.display = 'none';
             document.getElementById('groupSelection').style.display = 'block';

             // 更新步骤指示器
             updateStepIndicator('group');
         }

         // 返回上传步骤
         function backToUpload() {
             document.getElementById('groupSelection').style.display = 'none';
             document.getElementById('uploadSection').style.display = 'block';

             // 更新步骤指示器
             updateStepIndicator('upload');
         }
         // 更新步骤指示器
         function updateStepIndicator(currentStep) {
             const steps = ['upload', 'group', 'process', 'complete'];
             const stepElements = document.querySelectorAll('.step');

             stepElements.forEach((step, index) => {
                 const stepName = steps[index];
                 step.classList.remove('active', 'completed');

                 if (stepName === currentStep) {
                     step.classList.add('active');
                 } else if (steps.indexOf(stepName) < steps.indexOf(currentStep)) {
                     step.classList.add('completed');
                 }
             });
         }

         // 设置分组选择事件
         document.addEventListener('DOMContentLoaded', function() {
             // 分组卡片点击事件
             setTimeout(() => {
                 const groupCards = document.querySelectorAll('.group-card');
                 groupCards.forEach(card => {
                     card.addEventListener('click', function() {
                         // 移除其他选中状态
                         groupCards.forEach(c => c.classList.remove('selected'));
                         // 添加选中状态
                         this.classList.add('selected');
                         selectedGroup = this.dataset.group;

                         // 启用开始处理按钮
                         document.getElementById('startProcessBtn').disabled = false;
                     });
                 });
             }, 100);
         });

         // 开始处理
         async function startProcessing() {
             if (!selectedGroup || selectedFiles.length === 0) return;

             // 隐藏分组选择，显示处理界面
             document.getElementById('groupSelection').style.display = 'none';
             document.getElementById('processingSection').style.display = 'block';

             // 更新步骤指示器
             updateStepIndicator('process');

             // 开始上传和处理文件
             await uploadAndProcessFiles();
         }

         // 上传并处理文件
         async function uploadAndProcessFiles() {
             const totalSteps = 3; // 上传、处理、校准
             let currentStep = 0;
             
             try {
                 // 第1步：批量上传文件
                 updateCurrentTask(`正在上传文件组 (共${selectedFiles.length}个文件)`);
                 addLogEntry(`开始上传文件组: ${selectedFiles.map(f => f.name).join(', ')}`, 'info');
                 
                 const uploadResult = await uploadFileGroup(selectedFiles, selectedGroup);
                 
                 if (!uploadResult.success) {
                     addLogEntry(`文件组上传失败: ${uploadResult.error}`, 'error');
                     return;
                 }
                 
                 addLogEntry(`文件组上传成功，组ID: ${uploadResult.groupId}`, 'success');
                 currentStep++;
                 updateProgress((currentStep / totalSteps) * 100);
                 
                 // 第2步：处理文件组
                 updateCurrentTask(`正在处理文件组数据`);
                 addLogEntry(`开始处理文件组数据...`, 'info');
                 
                 const processResult = await processFileGroup(uploadResult.groupId);
                 
                 if (processResult.success) {
                     addLogEntry(`文件组处理完成，生成组: ${processResult.target_group_name}`, 'success');
                     currentStep++;
                     updateProgress((currentStep / totalSteps) * 100);
                 } else {
                     addLogEntry(`文件组处理失败: ${processResult.error}`, 'error');
                     return;
                 }
                 
                 // 第3步：完成
                 updateCurrentTask(`处理完成`);
                 currentStep++;
                 updateProgress(100);
                 
                 // 保存结果信息
                 processingResult = processResult;
                 
                 // 延迟显示完成界面
                 setTimeout(() => {
                     showCompletion();
                 }, 1000);

             } catch (error) {
                 addLogEntry(`处理过程中出错: ${error.message}`, 'error');
             }
         }

         // 批量上传文件组
         async function uploadFileGroup(files, group) {
             const formData = new FormData();
             
             // 添加所有文件
             files.forEach(file => {
                 formData.append('files', file);
             });
             formData.append('group', group);

             try {
                 const response = await fetch('/api/upload-group', {
                     method: 'POST',
                     body: formData
                 });
                 return await response.json();
             } catch (error) {
                 return { success: false, error: error.message };
             }
         }

         // 处理文件组
         async function processFileGroup(groupId) {
             try {
                 const response = await fetch(`/api/process-group/${groupId}`, {
                     method: 'POST'
                 });
                 return await response.json();
             } catch (error) {
                 return { success: false, error: error.message };
             }
         }

         // 更新当前任务
         function updateCurrentTask(task) {
             document.getElementById('currentTaskText').textContent = task;
         }

         // 更新进度
         function updateProgress(percentage) {
             document.getElementById('overallProgressBar').style.width = `${percentage}%`;
             document.getElementById('overallProgressText').textContent = `${Math.round(percentage)}%`;
         }

         // 添加日志条目
         function addLogEntry(message, type = 'info') {
             const logContainer = document.getElementById('logContainer');
             const timestamp = new Date().toLocaleTimeString();
             
             const logItem = document.createElement('div');
             logItem.className = `log-item log-${type}`;
             logItem.innerHTML = `
                 <span class="log-time">[${timestamp}]</span>
                 <span class="log-text">${message}</span>
             `;
             
             logContainer.appendChild(logItem);
             logContainer.scrollTop = logContainer.scrollHeight;
         }

         // 显示完成界面
         function showCompletion() {
             document.getElementById('processingSection').style.display = 'none';
             document.getElementById('completionSection').style.display = 'block';

             // 更新步骤指示器
             updateStepIndicator('complete');

             // 显示统计信息
             const stats = document.getElementById('completionStats');
             const groupName = processingResult ? processingResult.target_group_name : '未知';
             const fileCount = selectedFiles.length;
             
             stats.innerHTML = `
                 <h4>处理统计</h4>
                 <div class="row">
                     <div class="col-md-6">
                         <p><strong>处理文件数:</strong> ${fileCount}个</p>
                         <p><strong>目标分组:</strong> ${getGroupName(selectedGroup)}</p>
                         <p><strong>生成组名:</strong> ${groupName}</p>
                     </div>
                     <div class="col-md-6">
                         <p><strong>处理状态:</strong> 完成</p>
                         <p><strong>原始数据:</strong> ✓ 已保存</p>
                         <p><strong>预处理:</strong> ✓ 已完成</p>
                         <p><strong>校准:</strong> ✓ 已完成</p>
                     </div>
                 </div>
             `;
         }

         // 获取分组名称
         function getGroupName(group) {
             const texts = languageTexts[currentLanguage];
             switch(group) {
                 case 'control': return texts.controlGroup;
                 case 'mci': return texts.mciGroup;
                 case 'ad': return texts.adGroup;
                 default: return group;
             }
         }

         // 重置导入状态
         function resetImportState() {
             selectedFiles = [];
             selectedGroup = null;
             
             // 显示上传界面
             document.getElementById('uploadSection').style.display = 'block';
             document.getElementById('groupSelection').style.display = 'none';
             document.getElementById('processingSection').style.display = 'none';
             document.getElementById('completionSection').style.display = 'none';

             // 隐藏验证状态面板
             document.getElementById('validationStatus').style.display = 'none';
             document.getElementById('processPreview').style.display = 'none';

             // 重置步骤指示器
             updateStepIndicator('upload');

             // 清空文件列表
             updateFileList();
         }

         // 查看数据（返回可视化界面）
         function goToVisualization() {
             switchToVisualization();
             // 刷新数据
             loadGroups();
         }

         // 开始新的导入
         function startNewImport() {
             resetImportState();
         }

         let processingStartTime = 0;

         // ======== 校准编辑功能 ========

         let isEditMode = false;
         let currentCalibrationData = null;
         let currentTimeRange = { start: 0, end: 100 }; // 百分比
         let dataTimeInfo = { totalDuration: 0, totalPoints: 0, minTime: 0, maxTime: 0 };

         // 更新数据项选中状态
         function updateDataItemSelection(selectedDataId) {
             // 移除所有选中状态
             document.querySelectorAll('.data-item').forEach(item => {
                 item.classList.remove('selected');
             });
             
             // 添加选中状态到当前项
             const selectedItem = document.querySelector(`[data-id="${selectedDataId}"]`);
             if (selectedItem) {
                 selectedItem.classList.add('selected');
             }
         }

         // 进入编辑模式
         function enterEditMode() {
             if (!currentVisualization) {
                 alert('请先选择要编辑的数据');
                 return;
             }

             isEditMode = true;
             
             // 添加编辑模式CSS类到body
             document.body.classList.add('editing-mode');
             
             // 显示校准面板
             document.getElementById('calibrationPanel').classList.add('active');
             
             // 更新当前数据信息
             const dataInfo = `${currentVisualization.groupType.toUpperCase()} - ${currentVisualization.dataId}`;
             document.getElementById('currentDataInfo').textContent = dataInfo;
             
             // 重置偏移量
             document.getElementById('xOffset').value = 0;
             document.getElementById('yOffset').value = 0;
             updateOffsetValues();
             
             // 重置时间范围
             currentTimeRange = { start: 0, end: 100 };
             document.getElementById('startTime').value = 0;
             document.getElementById('endTime').value = 100;
             
             // 获取时间信息并初始化时间控件
             initializeTimeCalibration();
             
             // 隐藏edit按钮，显示正在编辑状态
             document.getElementById('editCalibrationBtn').style.display = 'none';
             
             // 添加平滑动画效果
             setTimeout(() => {
                 const calibrationPanel = document.getElementById('calibrationPanel');
                 if (calibrationPanel) {
                     calibrationPanel.style.opacity = '1';
                     calibrationPanel.style.transform = 'translateX(0)';
                 }
             }, 100);
         }

         // 退出编辑模式
         function exitEditMode() {
             isEditMode = false;
             
             // 移除编辑模式CSS类
             document.body.classList.remove('editing-mode');
             
             // 隐藏校准面板
             document.getElementById('calibrationPanel').classList.remove('active');
             
             // 显示edit按钮
             if (currentVisualization) {
                 document.getElementById('editCalibrationBtn').style.display = 'inline-block';
             }
             
             currentCalibrationData = null;
             
             // 重置校准面板的样式
             const calibrationPanel = document.getElementById('calibrationPanel');
             if (calibrationPanel) {
                 calibrationPanel.style.opacity = '';
                 calibrationPanel.style.transform = '';
             }
         }

         // 更新偏移量显示值
         function updateOffsetValues() {
             const xOffset = document.getElementById('xOffset').value;
             const yOffset = document.getElementById('yOffset').value;
             
             document.getElementById('xOffsetValue').textContent = parseFloat(xOffset).toFixed(2);
             document.getElementById('yOffsetValue').textContent = parseFloat(yOffset).toFixed(2);
         }

         // 应用预设偏移量
         function applyPresetOffset(x, y) {
             // 参数验证
             if (isNaN(x) || isNaN(y)) {
                 console.error('预设偏移量参数无效:', x, y);
                 return;
             }
             
             if (Math.abs(x) > 0.5 || Math.abs(y) > 0.5) {
                 const texts = languageTexts[currentLanguage];
                 if (!confirm('预设偏移量较大，确定要应用吗？')) {
                     return;
                 }
             }
             
             document.getElementById('xOffset').value = x;
             document.getElementById('yOffset').value = y;
             updateOffsetValues();
             updateCalibrationPreview();
         }

         // 更新校准预览
         function updateCalibrationPreview() {
             updateOffsetValues();
             
             // 如果有当前可视化数据，自动预览
             if (currentVisualization) {
                 previewCalibration();
             }
         }

         // 预览校准效果
         async function previewCalibration() {
             if (!currentVisualization) {
                 alert('请先选择要预览的数据');
                 return;
             }

             const xOffset = parseFloat(document.getElementById('xOffset').value);
             const yOffset = parseFloat(document.getElementById('yOffset').value);

             try {
                 // 获取可视化参数
                 const params = getVisualizationParams();
                 
                 // 添加校准偏移量参数
                 params.xOffset = xOffset;
                 params.yOffset = yOffset;
                 params.preview = true; // 标记为预览模式
                 
                 // 添加时间范围参数
                 if (isEditMode) {
                     params.timeStart = currentTimeRange.start;
                     params.timeEnd = currentTimeRange.end;
                 }

                 const queryString = new URLSearchParams(params).toString();
                 const response = await fetch(`/api/visualize/${currentVisualization.groupType}/${currentVisualization.dataId}?${queryString}`);
                 const result = await response.json();

                 if (result.error) {
                     console.error('预览失败:', result.error);
                     return;
                 }

                 // 更新图像显示
                 const imageContainer = document.getElementById('imageContainer');
                 if (result.image) {
                     let previewInfo = `当前偏移量: X=${xOffset.toFixed(2)}, Y=${yOffset.toFixed(2)}`;
                     
                     // 如果使用了时间范围，显示时间信息
                     if (isEditMode && (currentTimeRange.start > 0 || currentTimeRange.end < 100)) {
                         const selectedDuration = ((dataTimeInfo.totalDuration * (currentTimeRange.end - currentTimeRange.start) / 100) / 1000).toFixed(1);
                         previewInfo += `, 时间范围: ${currentTimeRange.start}%-${currentTimeRange.end}% (${selectedDuration}s)`;
                     }
                     
                     imageContainer.innerHTML = `
                         <h5><i class="fas fa-eye"></i> 校准预览 - ${currentVisualization.dataId}</h5>
                         <div class="alert alert-warning mb-3">
                             <i class="fas fa-info-circle"></i> 
                             ${previewInfo}
                             <small>(这是预览效果，未保存)</small>
                         </div>
                         <img src="data:image/png;base64,${result.image}" alt="校准预览" />
                     `;
                 }

                 // 更新统计信息
                 displayStatistics(result);

             } catch (error) {
                 console.error('预览校准失败:', error);
                 alert('预览失败: ' + error.message);
             }
         }

         // 保存校准
         async function saveCalibration() {
             if (!currentVisualization) {
                 alert('请先选择要保存的数据');
                 return;
             }

             const xOffset = parseFloat(document.getElementById('xOffset').value);
             const yOffset = parseFloat(document.getElementById('yOffset').value);
             const timeStart = parseFloat(document.getElementById('startTime').value);
             const timeEnd = parseFloat(document.getElementById('endTime').value);

             // 参数验证
             if (isNaN(xOffset) || isNaN(yOffset) || isNaN(timeStart) || isNaN(timeEnd)) {
                 alert('校准参数无效');
                 return;
             }

             if (Math.abs(xOffset) > 0.5 || Math.abs(yOffset) > 0.5) {
                 if (!confirm('坐标偏移量较大，可能导致数据超出有效范围。确定要保存吗？')) {
                     return;
                 }
             }

             // 检查是否有任何修改（坐标偏移或时间范围修改）
             const hasCoordinateChange = xOffset !== 0 || yOffset !== 0;
             const hasTimeChange = timeStart > 0 || timeEnd < 100;
             
             if (!hasCoordinateChange && !hasTimeChange) {
                 alert('没有检测到校准修改，无需保存');
                 return;
             }

             try {
                 const response = await fetch('/api/save-calibration', {
                     method: 'POST',
                     headers: {
                         'Content-Type': 'application/json',
                     },
                     body: JSON.stringify({
                         groupType: currentVisualization.groupType,
                         dataId: currentVisualization.dataId,
                         xOffset: xOffset,
                         yOffset: yOffset,
                         timeStart: timeStart,
                         timeEnd: timeEnd
                     })
                 });

                 const result = await response.json();

                 if (result.success) {
                     const texts = languageTexts[currentLanguage];
                     alert(texts.calibrationSaved || '校准已保存');
                     
                     // 退出编辑模式
                     exitEditMode();
                     
                     // 重新生成可视化（使用保存的校准）
                     updateVisualization();
                 } else {
                     const texts = languageTexts[currentLanguage];
                     alert(texts.calibrationError || '校准保存失败: ' + (result.error || '未知错误'));
                 }

             } catch (error) {
                 console.error('保存校准失败:', error);
                 const texts = languageTexts[currentLanguage];
                 alert(texts.calibrationError || '校准保存失败: ' + error.message);
             }
         }

         // 初始化校准控制监听器
         function setupCalibrationListeners() {
             // 偏移量滑块监听
            const xOffset = document.getElementById('xOffset');
            const yOffset = document.getElementById('yOffset');
            
            if (xOffset && yOffset) {
                xOffset.addEventListener('input', updateOffsetValues);
                yOffset.addEventListener('input', updateOffsetValues);
                console.log('✅ 校准监听器设置完成');
            } else {
                console.warn('⚠️ 校准控制元素不存在，跳过设置');
            }
        }

                 // 校准监听器将在模块加载完成后由moduleLoaded事件处理器调用

         // ======== 时间校准功能 ========

         // 初始化时间校准
         async function initializeTimeCalibration() {
             try {
                 // 获取当前数据的时间信息
                 const response = await fetch(`/api/time-info/${currentVisualization.groupType}/${currentVisualization.dataId}`);
                 const timeInfo = await response.json();
                 
                 if (timeInfo.success) {
                     dataTimeInfo = timeInfo.data;
                     updateTimeDisplay();
                     console.log('时间信息已加载:', dataTimeInfo);
                 } else {
                     console.error('获取时间信息失败:', timeInfo.error);
                     // 使用默认值
                     dataTimeInfo = { totalDuration: 10000, totalPoints: 100, minTime: 0, maxTime: 10000 };
                     updateTimeDisplay();
                 }
             } catch (error) {
                 console.error('获取时间信息出错:', error);
                 // 使用默认值
                 dataTimeInfo = { totalDuration: 10000, totalPoints: 100, minTime: 0, maxTime: 10000 };
                 updateTimeDisplay();
             }
         }

         // 更新时间显示
         function updateTimeDisplay() {
             const totalDurationSec = (dataTimeInfo.totalDuration / 1000).toFixed(1);
             document.getElementById('totalDuration').textContent = `${totalDurationSec}s`;
             document.getElementById('totalDataPoints').textContent = dataTimeInfo.totalPoints;
             
             updateTimeRangeDisplay();
         }

         // 更新时间范围显示
         function updateTimeRangeDisplay() {
             const startPercent = currentTimeRange.start;
             const endPercent = currentTimeRange.end;
             
             const startMs = dataTimeInfo.minTime + (dataTimeInfo.totalDuration * startPercent / 100);
             const endMs = dataTimeInfo.minTime + (dataTimeInfo.totalDuration * endPercent / 100);
             const selectedDuration = endMs - startMs;
             
             const startSec = (startMs / 1000).toFixed(1);
             const endSec = (endMs / 1000).toFixed(1);
             const selectedSec = (selectedDuration / 1000).toFixed(1);
             
             document.getElementById('startTimeValue').textContent = `${startSec}s`;
             document.getElementById('endTimeValue').textContent = `${endSec}s`;
             document.getElementById('selectedRange').textContent = `${selectedSec}s (${endPercent - startPercent}%)`;
         }

         // 更新时间范围
         function updateTimeRange() {
             const startSlider = document.getElementById('startTime');
             const endSlider = document.getElementById('endTime');
             
             let startValue = parseInt(startSlider.value);
             let endValue = parseInt(endSlider.value);
             
             // 确保起始时间不超过结束时间
             if (startValue >= endValue) {
                 if (startSlider === document.activeElement) {
                     // 如果用户正在调整起始时间，调整结束时间
                     endValue = Math.min(startValue + 5, 100);
                     endSlider.value = endValue;
                 } else {
                     // 如果用户正在调整结束时间，调整起始时间
                     startValue = Math.max(endValue - 5, 0);
                     startSlider.value = startValue;
                 }
             }
             
             currentTimeRange.start = startValue;
             currentTimeRange.end = endValue;
             
             updateTimeRangeDisplay();
             
             // 如果有当前可视化数据，自动预览
             if (currentVisualization && isEditMode) {
                 previewCalibration();
             }
         }

         // 应用时间预设
         function applyTimePreset(startPercent, endPercent) {
             // 参数验证
             if (startPercent < 0 || endPercent > 100 || startPercent >= endPercent) {
                 console.error('时间预设参数无效:', startPercent, endPercent);
                 return;
             }
             
             currentTimeRange.start = startPercent;
             currentTimeRange.end = endPercent;
             
             document.getElementById('startTime').value = startPercent;
             document.getElementById('endTime').value = endPercent;
             
             updateTimeRangeDisplay();
             
             // 自动预览
             if (currentVisualization && isEditMode) {
                 previewCalibration();
             }
         }

         // 修改原有的更新校准预览函数，包含时间参数
         function updateCalibrationPreview() {
             updateOffsetValues();
             
             // 如果有当前可视化数据，自动预览
             if (currentVisualization) {
                 previewCalibration();
             }
         }

        // 全局变量
        let currentSelectedItem = null;
        let currentGroupData = {};
        let currentEditingDataId = null;
        let currentGroupMMSE = {}; // 添加MMSE分数缓存

        // 页面加载完成后初始化
        $(document).ready(function() {
            updateLanguage();
            loadGroups();
        });

        // 语言切换相关的更新函数
        function updateLanguage() {
            const lang = localStorage.getItem('language') || 'zh';
            
            // 更新页面所有文本
            $('.nav-link[data-key]').each(function() {
                const key = $(this).data('key');
                $(this).text(languageTexts[lang][key]);
            });
            
            // 更新其他有data-key属性的元素
            $('[data-key]').each(function() {
                const key = $(this).data('key');
                if (languageTexts[lang][key]) {
                    $(this).text(languageTexts[lang][key]);
                }
            });
            
            // 更新页面标题
            document.title = languageTexts[lang]['pageTitle'];
            
            // 更新当前语言标识
            $('.language-toggle .btn').removeClass('active');
            $(`.language-toggle .btn[onclick="setLanguage('${lang}')"]`).addClass('active');
        }



        // 加载组MMSE分数
        async function loadGroupMMSEScores(groupType) {
            try {
                const response = await fetch(`/api/mmse-scores/${groupType}`);
                const data = await response.json();
                
                if (data.success) {
                    currentGroupMMSE[groupType] = data.data;
                    console.log(`✅ 加载了${groupType}组的MMSE分数:`, data.data);
                    // 重新渲染数据列表以显示MMSE信息
                    if (currentGroupData[groupType]) {
                        displayGroupData(groupType, currentGroupData[groupType]);
                    }
                } else {
                    console.warn(`⚠️  ${groupType}组MMSE分数加载失败:`, data.error);
                    currentGroupMMSE[groupType] = {};
                }
            } catch (error) {
                console.warn(`❌ ${groupType}组MMSE分数请求失败:`, error);
                currentGroupMMSE[groupType] = {};
            }
        }

        // 获取VR-MMSE评估等级的CSS类
        function getMMSEAssessmentClass(score) {
            if (score >= 20) return 'badge-success';
            if (score >= 19) return 'badge-info';
            if (score >= 16) return 'badge-warning';
            if (score >= 11) return 'badge-danger';
            return 'badge-dark';
        }

        // 获取VR-MMSE评估等级文本
        function getMMSEAssessmentText(score) {
            const lang = localStorage.getItem('language') || 'zh';
            if (lang === 'zh') {
                if (score >= 20) return '正常';
                if (score >= 19) return '正常范围';
                if (score >= 16) return '轻度认知障碍';
                if (score >= 11) return '阿尔兹海默症';
                return '重度认知障碍';
            } else {
                if (score >= 20) return 'Normal';
                if (score >= 19) return 'Normal Range';
                if (score >= 16) return 'Mild Cognitive Impairment';
                if (score >= 11) return 'Alzheimer\'s Disease';
                return 'Severe Cognitive Impairment';
            }
        }
        // 显示VR-MMSE详细信息
        function displayMMSEDetails(mmseData) {
            const score = mmseData.total_score;
            const assessment = mmseData.assessment;
            const texts = languageTexts[currentLanguage];
            const details = mmseData.details;
            
            // 计算各项分数
            const q1Score = details.q1_orientation_time ? Object.values(details.q1_orientation_time).reduce((a, b) => a + b, 0) : 0;
            const q2Score = details.q2_orientation_place ? Object.values(details.q2_orientation_place).reduce((a, b) => a + b, 0) : 0;
            const q3Score = details.q3_immediate_memory || 0;
            const q4Score = details.q4_calculation ? Object.values(details.q4_calculation).reduce((a, b) => a + b, 0) : 0;
            const q5Score = details.q5_delayed_recall ? Object.values(details.q5_delayed_recall).reduce((a, b) => a + b, 0) : 0;
            
            const mmseHtml = `
                <div class="mmse-panel mt-3">
                    <h6 class="text-primary mb-3">
                        <i class="fas fa-brain"></i> ${texts.cognitiveAssessment} (VR-MMSE)
                    </h6>
                    <div class="mmse-score-display mb-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="font-weight-bold">${texts.totalScore}:</span>
                            <span class="badge ${getMMSEAssessmentClass(score)} badge-lg">${score}/21</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mt-2">
                            <span>${texts.assessmentLevel}:</span>
                            <span class="text-white">${getMMSEAssessmentText(score)}</span>
                        </div>
                    </div>
                    <div class="mmse-task-details">
                        <h6 class="text-white mb-2">${currentLanguage === 'zh' ? '当前任务分数：' : 'Current Task Scores:'}</h6>
                        <div class="mmse-task-scores">
                            <!-- Q1: 时间定向 -->
                            <div class="mb-2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <strong class="text-info">Q1. ${texts.q1OrientationTime} (${q1Score}/5)</strong>
                                </div>
                                                                 <small class="text-white ml-3">
                                     ${texts.year}: ${details.q1_orientation_time?.年份 || 0}/1, 
                                     ${texts.season}: ${details.q1_orientation_time?.季节 || 0}/1, 
                                     ${texts.month}: ${details.q1_orientation_time?.月份 || 0}/1, 
                                     ${texts.weekday}: ${details.q1_orientation_time?.星期 || 0}/2
                                 </small>
                            </div>
                            
                            <!-- Q2: 地点定向 -->
                            <div class="mb-2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <strong class="text-info">Q2. ${texts.q2OrientationPlace} (${q2Score}/5)</strong>
                                </div>
                                                                 <small class="text-white ml-3">
                                     ${texts.province}: ${details.q2_orientation_place?.省市区 || 0}/2, 
                                     ${texts.street}: ${details.q2_orientation_place?.街道 || 0}/1, 
                                     ${texts.building}: ${details.q2_orientation_place?.建筑 || 0}/1, 
                                     ${texts.floor}: ${details.q2_orientation_place?.楼层 || 0}/1
                                 </small>
                            </div>
                            
                            <!-- Q3: 即刻记忆 -->
                            <div class="mb-2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <strong class="text-info">Q3. ${texts.q3ImmediateMemory} (${q3Score}/3)</strong>
                                </div>
                            </div>
                            
                            <!-- Q4: 计算能力 -->
                            <div class="mb-2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <strong class="text-info">Q4. ${texts.q4Calculation} (${q4Score}/5)</strong>
                                </div>
                                                                 <small class="text-white ml-3">
                                     100-7: ${details.q4_calculation?.['100-7'] || 0}/1, 
                                     93-7: ${details.q4_calculation?.['93-7'] || 0}/1, 
                                     86-7: ${details.q4_calculation?.['86-7'] || 0}/1, 
                                     79-7: ${details.q4_calculation?.['79-7'] || 0}/1, 
                                     72-7: ${details.q4_calculation?.['72-7'] || 0}/1
                                 </small>
                            </div>
                            
                            <!-- Q5: 延迟回忆 -->
                            <div class="mb-2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <strong class="text-info">Q5. ${texts.q5DelayedRecall} (${q5Score}/3)</strong>
                                </div>
                                                                 <small class="text-white ml-3">
                                     ${texts.word1}: ${details.q5_delayed_recall?.词1 || 0}/1, 
                                     ${texts.word2}: ${details.q5_delayed_recall?.词2 || 0}/1, 
                                     ${texts.word3}: ${details.q5_delayed_recall?.词3 || 0}/1
                                 </small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            return mmseHtml;
        }
        
        // ============ 事件分析相关函数 ============
        
        // 事件分析相关变量
        let currentEventPage = 1;
        let currentEventDataType = 'events';
        let eventAnalysisData = [];

        // 调试页面布局结构
        function debugPageLayout() {
            console.log('=== 页面布局结构全面调试 ===');
            
            // 主要容器
            const mainContent = document.querySelector('.main-content');
            const contentWrapper = document.querySelector('.content-wrapper');
            
            console.log('main-content:', mainContent ? {
                offsetTop: mainContent.offsetTop,
                offsetHeight: mainContent.offsetHeight,
                className: mainContent.className
            } : 'NOT FOUND');
            
            console.log('content-wrapper:', contentWrapper ? {
                offsetTop: contentWrapper.offsetTop,
                offsetHeight: contentWrapper.offsetHeight,
                className: contentWrapper.className
            } : 'NOT FOUND');
            
            // 所有视图
            const allViews = ['visualizationView', 'newFeatureView', 'rqaAnalysisView', 'eventAnalysisView'];
            allViews.forEach(viewId => {
                const element = document.getElementById(viewId);
                if (element) {
                    console.log(`${viewId}:`, {
                        offsetTop: element.offsetTop,
                        offsetHeight: element.offsetHeight,
                        display: window.getComputedStyle(element).display,
                        position: window.getComputedStyle(element).position,
                        parentClassName: element.parentElement ? element.parentElement.className : 'NO PARENT',
                        innerHTML_length: element.innerHTML.length
                    });
                    
                    // 如果是数据导入视图，额外检查内容
                    if (viewId === 'newFeatureView') {
                        console.log('数据导入视图内容预览:', element.innerHTML.substring(0, 300));
                    }
                } else {
                    console.log(`${viewId}: NOT FOUND`);
                }
            });
            
            console.log('=== 布局结构调试结束 ===');
        }
        
        // 初始化事件分析界面
        function initEventAnalysis() {
            console.log('初始化事件分析界面');
            loadEventAnalysisSummary();
            updateEventAnalysisData();
        }

        // 加载事件分析摘要
        async function loadEventAnalysisSummary() {
            try {
                // 调试：检查容器元素是否存在
                const containerEl = document.getElementById('eventStatsContainer');
                console.log('eventStatsContainer元素:', containerEl);
                
                if (!containerEl) {
                    console.error('eventStatsContainer元素不存在');
                    return;
                }
                
                const response = await fetch('/api/event-analysis/summary');
                const result = await response.json();
                
                if (result.success) {
                    const summary = result.summary;
                    let summaryHtml = '<div class="summary-grid">';
                    
                    if (summary.stats.total_events) {
                        summaryHtml += `
                            <div class="summary-item">
                                <span class="summary-label">总事件数:</span>
                                <span class="summary-value">${summary.stats.total_events}</span>
                            </div>
                            <div class="summary-item">
                                <span class="summary-label">Fixation:</span>
                                <span class="summary-value">${summary.stats.total_fixations}</span>
                            </div>
                            <div class="summary-item">
                                <span class="summary-label">Saccade:</span>
                                <span class="summary-value">${summary.stats.total_saccades}</span>
                            </div>
                        `;
                    }
                    
                    if (summary.stats.total_roi_records) {
                        summaryHtml += `
                            <div class="summary-item">
                                <span class="summary-label">ROI统计记录:</span>
                                <span class="summary-value">${summary.stats.total_roi_records}</span>
                            </div>
                            <div class="summary-item">
                                <span class="summary-label">唯一ROI:</span>
                                <span class="summary-value">${summary.stats.unique_rois}</span>
                            </div>
                            <div class="summary-item">
                                <span class="summary-label">总注视时间:</span>
                                <span class="summary-value">${summary.stats.total_fixation_time.toFixed(2)}s</span>
                            </div>
                        `;
                    }
                    
                    summaryHtml += '</div>';
                    
                    // 各组分布
                    if (summary.stats.group_distribution) {
                        summaryHtml += '<h6>组别分布:</h6><div class="group-distribution">';
                        for (const [group, count] of Object.entries(summary.stats.group_distribution)) {
                            summaryHtml += `<span class="group-stat">${group}: ${count}</span>`;
                        }
                        summaryHtml += '</div>';
                    }
                    
                    containerEl.innerHTML = summaryHtml;
                } else {
                    containerEl.innerHTML = 
                        `<span class="text-danger">加载摘要失败: ${result.error}</span>`;
                }
            } catch (error) {
                console.error('加载事件分析摘要失败:', error);
                const containerEl2 = document.getElementById('eventStatsContainer');
                if (containerEl2) {
                    containerEl2.innerHTML = 
                        `<span class="text-danger">网络错误: ${error.message}</span>`;
                }
            }
        }

        // 更新事件分析数据
        async function updateEventAnalysisData() {
            // 调试：检查DOM元素是否存在
            const dataTypeEl = document.getElementById('eventDataTypeSelect');
            const groupEl = document.getElementById('eventGroupSelect');
            const eventTypeEl = document.getElementById('eventTypeSelect');
            const pageSizeEl = document.getElementById('eventPageSizeSelect');
            
            console.log('DOM元素检查:', {
                dataTypeEl: dataTypeEl,
                groupEl: groupEl,
                eventTypeEl: eventTypeEl,
                pageSizeEl: pageSizeEl
            });
            
            if (!dataTypeEl || !groupEl || !eventTypeEl || !pageSizeEl) {
                console.error('某些DOM元素不存在，停止执行');
                return;
            }
            
            const dataType = dataTypeEl.value;
            const group = groupEl.value;
            const eventType = eventTypeEl.value;
            const pageSize = pageSizeEl.value;
            
            currentEventDataType = dataType;
            
            // 隐藏/显示事件类型筛选
            const eventTypeContainer = document.getElementById('eventTypeGroup');
            if (dataType === 'events') {
                eventTypeContainer.style.display = 'block';
            } else {
                eventTypeContainer.style.display = 'none';
            }
            
            try {
                const params = new URLSearchParams({
                    type: dataType,
                    group: group,
                    page: currentEventPage,
                    page_size: pageSize
                });
                
                if (dataType === 'events' && eventType !== 'all') {
                    params.append('event_type', eventType);
                }
                
                const response = await fetch(`/api/event-analysis/data?${params}`);
                const result = await response.json();
                
                if (result.success) {
                    eventAnalysisData = result.data;
                    displayEventAnalysisData(result);
                    updateEventPagination(result.pagination);
                    displayEventStats(result.stats);
                } else {
                    alert('加载数据失败: ' + result.error);
                }
            } catch (error) {
                console.error('加载事件分析数据失败:', error);
                alert('网络错误: ' + error.message);
            }
        }

        // 显示事件分析数据
        function displayEventAnalysisData(result) {
            const tableHeader = document.getElementById('eventTableHeader');
            const tableBody = document.getElementById('eventTableBody');
            
            if (result.data.length === 0) {
                tableHeader.innerHTML = '<th colspan="100%">暂无数据</th>';
                tableBody.innerHTML = '<tr><td colspan="100%" class="text-center">暂无数据</td></tr>';
                return;
            }
            
            // 生成表头
            const columns = Object.keys(result.data[0]);
            tableHeader.innerHTML = columns.map(col => `<th>${col}</th>`).join('');
            
            // 生成表格数据
            tableBody.innerHTML = result.data.map(row => {
                return '<tr>' + columns.map(col => {
                    let value = row[col];
                    if (value === null || value === undefined) {
                        value = '-';
                    } else if (typeof value === 'number' && value % 1 !== 0) {
                        value = value.toFixed(3);
                    }
                    return `<td>${value}</td>`;
                }).join('') + '</tr>';
            }).join('');
        }

        // 更新事件分页
        function updateEventPagination(pagination) {
            const paginationEl = document.getElementById('eventPagination');
            let paginationHtml = '';
            
            // 上一页
            if (pagination.page > 1) {
                paginationHtml += `<li class="page-item">
                    <a class="page-link" href="#" onclick="goToEventPage(${pagination.page - 1})">上一页</a>
                </li>`;
            }
            
            // 页码
            const startPage = Math.max(1, pagination.page - 2);
            const endPage = Math.min(pagination.total_pages, pagination.page + 2);
            
            for (let i = startPage; i <= endPage; i++) {
                const active = i === pagination.page ? 'active' : '';
                paginationHtml += `<li class="page-item ${active}">
                    <a class="page-link" href="#" onclick="goToEventPage(${i})">${i}</a>
                </li>`;
            }
            
            // 下一页
            if (pagination.page < pagination.total_pages) {
                paginationHtml += `<li class="page-item">
                    <a class="page-link" href="#" onclick="goToEventPage(${pagination.page + 1})">下一页</a>
                </li>`;
            }
            
            paginationEl.innerHTML = paginationHtml;
        }

        // 显示事件统计
        function displayEventStats(stats) {
            const statsEl = document.getElementById('eventStatsContainer');
            let statsHtml = '';
            
            if (currentEventDataType === 'events') {
                if (stats.event_counts) {
                    statsHtml += '<strong>事件统计:</strong> ';
                    for (const [type, count] of Object.entries(stats.event_counts)) {
                        statsHtml += `${type}: ${count} `;
                    }
                    statsHtml += '<br>';
                }
                
                if (stats.top_rois) {
                    statsHtml += '<strong>热门ROI:</strong> ';
                    const topRois = Object.entries(stats.top_rois).slice(0, 5);
                    statsHtml += topRois.map(([roi, count]) => `${roi}(${count})`).join(', ');
                }
            } else {
                if (stats.unique_rois) {
                    statsHtml += `<strong>唯一ROI数:</strong> ${stats.unique_rois} `;
                }
                if (stats.total_fix_time) {
                    statsHtml += `<strong>总注视时间:</strong> ${stats.total_fix_time.toFixed(2)}s `;
                }
                if (stats.avg_fix_time) {
                    statsHtml += `<strong>平均注视时间:</strong> ${stats.avg_fix_time.toFixed(3)}s`;
                }
            }
            
            if (statsHtml) {
                statsEl.innerHTML = statsHtml;
                statsEl.style.display = 'block';
            } else {
                statsEl.style.display = 'none';
            }
        }

        // 跳转到指定页面
        function goToEventPage(page) {
            currentEventPage = page;
            updateEventAnalysisData();
        }

        // 重新生成事件数据
        async function regenerateEventData() {
            if (!confirm('确定要重新生成事件分析数据吗？这可能需要几分钟时间。')) {
                return;
            }
            
            try {
                const response = await fetch('/api/event-analysis/regenerate', {
                    method: 'POST'
                });
                const result = await response.json();
                
                if (result.success) {
                    alert('数据重新生成完成！');
                    loadEventAnalysisSummary();
                    updateEventAnalysisData();
                } else {
                    alert('数据生成失败: ' + result.error);
                }
            } catch (error) {
                console.error('重新生成数据失败:', error);
                alert('网络错误: ' + error.message);
            }
        }

        // 导出事件数据
        function exportEventData() {
            // 创建CSV下载链接
            if (eventAnalysisData.length === 0) {
                alert('没有数据可导出');
                return;
            }
            
            const csvContent = convertToCSV(eventAnalysisData);
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `event_analysis_${currentEventDataType}_${Date.now()}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        // 转换为CSV格式
        function convertToCSV(data) {
            if (data.length === 0) return '';
            
            const headers = Object.keys(data[0]);
            const csvRows = [headers.join(',')];
            
            for (const row of data) {
                const values = headers.map(header => {
                    const value = row[header];
                    return value === null || value === undefined ? '' : `"${value}"`;
                });
                csvRows.push(values.join(','));
            }
            
            return csvRows.join('\n');
        }

        // ============ RQA分析相关函数 ============
        
        // 初始化RQA分析界面
        function initializeRQAInterface() {
            console.log('初始化RQA分析界面');
            
            // 初始化参数滑块事件
            initializeRQAParameters();
            
            // 加载数据选项
            loadRQADataOptions();
            
            // 设置事件监听器
            setupRQAEventListeners();
        }
        
        // 初始化RQA参数控制
        function initializeRQAParameters() {
            // 嵌入维度
            const embeddingDim = document.getElementById('embeddingDim');
            const embeddingDimValue = document.getElementById('embeddingDimValue');
            if (embeddingDim && embeddingDimValue) {
                embeddingDim.addEventListener('input', function() {
                    embeddingDimValue.textContent = this.value;
                });
            }
            
            // 时间延迟
            const timeDelay = document.getElementById('timeDelay');
            const timeDelayValue = document.getElementById('timeDelayValue');
            if (timeDelay && timeDelayValue) {
                timeDelay.addEventListener('input', function() {
                    timeDelayValue.textContent = this.value;
                });
            }
            
            // 递归阈值
            const recurrenceThreshold = document.getElementById('recurrenceThreshold');
            const recurrenceThresholdValue = document.getElementById('recurrenceThresholdValue');
            if (recurrenceThreshold && recurrenceThresholdValue) {
                recurrenceThreshold.addEventListener('input', function() {
                    recurrenceThresholdValue.textContent = parseFloat(this.value).toFixed(2);
                });
            }
            
            // 最小线长
            const minLineLength = document.getElementById('minLineLength');
            const minLineLengthValue = document.getElementById('minLineLengthValue');
            if (minLineLength && minLineLengthValue) {
                minLineLength.addEventListener('input', function() {
                    minLineLengthValue.textContent = this.value;
                });
            }
        }
        
        // 加载RQA数据选项
        async function loadRQADataOptions() {
            try {
                // 如果allData为空，先加载数据
                if (Object.keys(allData).length === 0) {
                    await loadGroups();
                }
                
                // 设置组别和任务变化的监听器
                const groupSelect = document.getElementById('rqaGroupSelect');
                const taskSelect = document.getElementById('rqaTaskSelect');
                
                if (groupSelect && taskSelect) {
                    groupSelect.addEventListener('change', updateRQADataList);
                    taskSelect.addEventListener('change', updateRQADataList);
                }
                
                // 初始加载数据列表
                updateRQADataList();
                
            } catch (error) {
                console.error('加载RQA数据选项失败:', error);
            }
        }
        
        // 更新RQA数据列表
        function updateRQADataList() {
            const groupSelect = document.getElementById('rqaGroupSelect');
            const taskSelect = document.getElementById('rqaTaskSelect');
            const dataList = document.getElementById('rqaDataList');
            
            if (!groupSelect || !taskSelect || !dataList) return;
            
            const selectedGroup = groupSelect.value;
            const selectedTask = taskSelect.value;
            
            // 清空数据列表
            dataList.innerHTML = '<div class="text-muted">请选择具体数据</div>';
            
            // 根据选择的组别和任务筛选数据
            const filteredData = [];
            
            for (const [groupType, groupData] of Object.entries(allData)) {
                // 组别筛选
                if (selectedGroup !== 'all' && groupType !== selectedGroup) continue;
                
                for (const item of groupData) {
                    // 任务筛选
                    if (selectedTask !== 'all' && item.question_num.toString() !== selectedTask) continue;
                    
                    filteredData.push({
                        value: `${groupType}_${item.data_id}`,
                        text: `${getGroupName(groupType)} - ${item.display_name} (Q${item.question_num})`,
                        groupType: groupType,
                        dataId: item.data_id
                    });
                }
            }
            
            // 如果有数据，创建复选框列表
            if (filteredData.length > 0) {
                dataList.innerHTML = '';
                
                filteredData.forEach((item, index) => {
                    const checkDiv = document.createElement('div');
                    checkDiv.className = 'form-check';
                    
                    const checkbox = document.createElement('input');
                    checkbox.className = 'form-check-input rqa-data-checkbox';
                    checkbox.type = 'checkbox';
                    checkbox.id = `rqaData_${index}`;
                    checkbox.value = item.value;
                    checkbox.addEventListener('change', updateRunButtonState);
                    
                    const label = document.createElement('label');
                    label.className = 'form-check-label';
                    label.htmlFor = `rqaData_${index}`;
                    label.textContent = item.text;
                    
                    checkDiv.appendChild(checkbox);
                    checkDiv.appendChild(label);
                    dataList.appendChild(checkDiv);
                });
                
                // 设置全选按钮事件
                setupSelectAllHandler();
            }
            
            // 更新运行按钮状态
            updateRunButtonState();
        }
        
        // 设置全选按钮处理器
        function setupSelectAllHandler() {
            const selectAllCheckbox = document.getElementById('rqaSelectAll');
            const dataCheckboxes = document.querySelectorAll('.rqa-data-checkbox');
            
            if (selectAllCheckbox && dataCheckboxes.length > 0) {
                // 移除之前的事件监听器
                selectAllCheckbox.removeEventListener('change', handleSelectAll);
                
                // 添加新的事件监听器
                selectAllCheckbox.addEventListener('change', handleSelectAll);
                
                // 初始化全选状态
                updateSelectAllState();
            }
        }
        
        // 处理全选/取消全选
        function handleSelectAll() {
            const selectAllCheckbox = document.getElementById('rqaSelectAll');
            const dataCheckboxes = document.querySelectorAll('.rqa-data-checkbox');
            
            dataCheckboxes.forEach(checkbox => {
                checkbox.checked = selectAllCheckbox.checked;
            });
            
            updateRunButtonState();
        }
        
        // 更新全选状态
        function updateSelectAllState() {
            const selectAllCheckbox = document.getElementById('rqaSelectAll');
            const dataCheckboxes = document.querySelectorAll('.rqa-data-checkbox');
            const checkedBoxes = document.querySelectorAll('.rqa-data-checkbox:checked');
            
            if (dataCheckboxes.length === 0) {
                selectAllCheckbox.checked = false;
                selectAllCheckbox.indeterminate = false;
            } else if (checkedBoxes.length === dataCheckboxes.length) {
                selectAllCheckbox.checked = true;
                selectAllCheckbox.indeterminate = false;
            } else if (checkedBoxes.length > 0) {
                selectAllCheckbox.checked = false;
                selectAllCheckbox.indeterminate = true;
            } else {
                selectAllCheckbox.checked = false;
                selectAllCheckbox.indeterminate = false;
            }
        }
        
        // 设置RQA事件监听器
        function setupRQAEventListeners() {
            // 数据选择变化时，也要更新全选状态
            document.addEventListener('change', function(e) {
                if (e.target.classList.contains('rqa-data-checkbox')) {
                    updateSelectAllState();
                    updateRunButtonState();
                }
            });
        }
        
        // 更新运行按钮状态
        function updateRunButtonState() {
            const checkedBoxes = document.querySelectorAll('.rqa-data-checkbox:checked');
            const runBtn = document.getElementById('runRQABtn');
            
            if (runBtn) {
                runBtn.disabled = checkedBoxes.length === 0;
            }
        }
        
        // ======================== 新的RQA批量渲染功能 ========================
        
        // 初始化RQA滑动条事件监听器
        function initRQASliders() {
            // 嵌入维度滑动条
            const embeddingDimSlider = document.getElementById('rqaEmbeddingDim');
            const embeddingDimValue = document.getElementById('rqaEmbeddingDimValue');
            if (embeddingDimSlider && embeddingDimValue) {
                embeddingDimSlider.addEventListener('input', function() {
                    embeddingDimValue.textContent = this.value;
                });
            }
            
            // 时间延迟滑动条
            const timeDelaySlider = document.getElementById('rqaTimeDelay');
            const timeDelayValue = document.getElementById('rqaTimeDelayValue');
            if (timeDelaySlider && timeDelayValue) {
                timeDelaySlider.addEventListener('input', function() {
                    timeDelayValue.textContent = this.value;
                });
            }
            
            // 递归阈值滑动条
            const thresholdSlider = document.getElementById('rqaThreshold');
            const thresholdValue = document.getElementById('rqaThresholdValue');
            if (thresholdSlider && thresholdValue) {
                thresholdSlider.addEventListener('input', function() {
                    thresholdValue.textContent = this.value;
                });
            }
            
            // 最小线长滑动条
            const minLineLengthSlider = document.getElementById('rqaMinLineLength');
            const minLineLengthValue = document.getElementById('rqaMinLineLengthValue');
            if (minLineLengthSlider && minLineLengthValue) {
                minLineLengthSlider.addEventListener('input', function() {
                    minLineLengthValue.textContent = this.value;
                });
            }
        }
        // 开始RQA渲染
        async function startRQARender() {
            const texts = languageTexts[currentLanguage];
            const startBtn = document.getElementById('startRQARender');
            const checkBtn = document.getElementById('checkRenderStatus');
            const progressDiv = document.getElementById('renderProgress');
            const progressBar = progressDiv.querySelector('.progress-bar');
            const statusText = document.getElementById('renderStatusText');
            
            try {
                // 禁用按钮
                startBtn.disabled = true;
                checkBtn.disabled = true;
                startBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 渲染中...';
                
                // 显示进度
                progressDiv.style.display = 'block';
                progressBar.style.width = '0%';
                statusText.textContent = '准备开始渲染...';
                
                // 获取渲染参数
                const params = {
                    analysis_mode: document.getElementById('rqaAnalysisMode').value,
                    distance_metric: document.getElementById('rqaDistanceMetric').value,
                    embedding_dimension: parseInt(document.getElementById('rqaEmbeddingDim').value),
                    time_delay: parseInt(document.getElementById('rqaTimeDelay').value),
                    recurrence_threshold: parseFloat(document.getElementById('rqaThreshold').value),
                    min_line_length: parseInt(document.getElementById('rqaMinLineLength').value),
                    color_theme: document.getElementById('rqaColorTheme').value
                };
                
                // 发送渲染请求
                const response = await fetch('/api/rqa-batch-render', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(params)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // 更新进度为完成
                    progressBar.style.width = '100%';
                    statusText.textContent = `渲染完成！处理了 ${result.data.processed_files}/${result.data.total_files} 个文件`;
                    
                    // 显示成功消息
                    showAlert(result.message, 'success');
                    
                    // 自动更新显示
                    setTimeout(() => {
                        updateRQADisplay();
                    }, 1000);
                    
                } else {
                    throw new Error(result.message || '渲染失败');
                }
                
            } catch (error) {
                console.error('RQA渲染失败:', error);
                showAlert(`渲染失败: ${error.message}`, 'danger');
                statusText.textContent = '渲染失败';
                
            } finally {
                // 恢复按钮状态
                startBtn.disabled = false;
                checkBtn.disabled = false;
                startBtn.innerHTML = '<i class="fas fa-magic"></i> <span data-lang-key="startRender">开始渲染</span>';
                
                // 隐藏进度条（延迟3秒）
                setTimeout(() => {
                    progressDiv.style.display = 'none';
                }, 3000);
            }
        }
        
        // 检查渲染状态
        async function checkRenderStatus() {
            try {
                const response = await fetch('/api/rqa-render-status');
                const result = await response.json();
                
                if (result.success) {
                    const data = result.data;
                    
                    if (data.rendered) {
                        const message = `已渲染 ${data.total_rendered} 个文件\n` +
                                      `渲染时间: ${new Date(data.render_time).toLocaleString()}\n` +
                                      `参数: ${JSON.stringify(data.params, null, 2)}`;
                        
                        showAlert(message, 'info');
                        
                        // 更新显示
                        updateRQADisplay();
                    } else {
                        showAlert(data.message, 'warning');
                    }
                } else {
                    throw new Error(result.message);
                }
                
            } catch (error) {
                console.error('检查渲染状态失败:', error);
                showAlert(`检查状态失败: ${error.message}`, 'danger');
            }
        }
        
        // 更新RQA显示
        async function updateRQADisplay() {
            const container = document.getElementById('rqaImagesContainer');
            
            try {
                // 获取筛选参数
                const imageType = document.getElementById('rqaFilterImageType').value;
                const selectedGroup = document.getElementById('rqaFilterGroup').value;
                const selectedQuestion = document.getElementById('rqaFilterQuestion').value;
                const paramSet = document.getElementById('rqaFilterParamSet').value;
                const analysisMode = document.getElementById('rqaFilterAnalysisMode').value;
                const distanceMetric = document.getElementById('rqaFilterDistanceMetric').value;
                const colorTheme = document.getElementById('rqaFilterColorTheme').value;
                
                console.log('筛选参数:', {
                    imageType, selectedGroup, selectedQuestion, paramSet,
                    analysisMode, distanceMetric, colorTheme
                });
                
                // 构建API查询参数
                const params = new URLSearchParams();
                if (selectedGroup !== 'all') params.append('group', selectedGroup);
                if (selectedQuestion !== 'all') params.append('question', selectedQuestion);
                if (paramSet !== 'all') params.append('param_signature', paramSet);
                
                // 获取渲染结果
                const response = await fetch(`/api/rqa-rendered-results?${params}`);
                const result = await response.json();
                
                console.log('API返回的数据:', result);
                
                if (result.success) {
                    let filteredResults = result.data.results || [];
                    
                    // 填充参数组合下拉框
                    updateParamSetOptions(result.data.param_combinations || []);
                    
                    // 应用前端筛选（针对细粒度参数）
                    filteredResults = filteredResults.filter(item => {
                        const renderParams = item.render_params || {};
                        
                        // 分析模式筛选
                        if (analysisMode !== 'all' && renderParams.analysis_mode !== analysisMode) {
                            return false;
                        }
                        
                        // 距离度量筛选
                        if (distanceMetric !== 'all' && renderParams.distance_metric !== distanceMetric) {
                            return false;
                        }
                        
                        // 颜色主题筛选
                        if (colorTheme !== 'all' && item.color_theme !== colorTheme) {
                            return false;
                        }
                        
                        return true;
                    });
                    
                    console.log('最终筛选后的结果:', filteredResults);
                    
                    // 更新显示信息
                    const infoElement = document.getElementById('rqaDisplayInfo');
                    if (infoElement) {
                        infoElement.textContent = `找到 ${filteredResults.length} 张图片`;
                    }
                    
                    if (filteredResults.length === 0) {
                        // 显示空状态
                        container.innerHTML = `
                            <div class="placeholder-content text-center py-5">
                                <i class="fas fa-images fa-3x text-muted mb-3"></i>
                                <h5 class="text-muted">暂无匹配的RQA图片</h5>
                                <p class="text-muted">请调整筛选条件或先运行批量渲染</p>
                            </div>
                        `;
                    } else {
                        // 按组别和问题组织数据，然后显示
                        const organizedData = organizeRQAResults(filteredResults);
                        displayRQAImages(organizedData, imageType);
                    }
                } else {
                    throw new Error(result.message || '获取数据失败');
                }
                
            } catch (error) {
                console.error('更新RQA显示失败:', error);
                container.innerHTML = `
                    <div class="placeholder-content text-center py-5">
                        <i class="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
                        <h5 class="text-warning">加载失败</h5>
                        <p class="text-muted">获取RQA图片失败: ${error.message}</p>
                    </div>
                `;
            }
        }
        
        // 更新参数组合选项
        function updateParamSetOptions(paramCombinations) {
            const select = document.getElementById('rqaFilterParamSet');
            
            // 保留"全部参数"选项
            const currentValue = select.value;
            select.innerHTML = '<option value="all">全部参数</option>';
            
            // 添加所有可用的参数组合
            paramCombinations.forEach(paramSig => {
                if (paramSig) {
                    // 解析参数签名生成友好的显示名称
                    const displayName = formatParamSignature(paramSig);
                    const option = document.createElement('option');
                    option.value = paramSig;
                    option.textContent = displayName;
                    select.appendChild(option);
                }
            });
            
            // 尝试保持之前的选择
            if (currentValue && Array.from(select.options).some(opt => opt.value === currentValue)) {
                select.value = currentValue;
            }
        }
        
        // 格式化参数签名为友好显示
        function formatParamSignature(paramSig) {
            // 从类似 "mode_1d_x_dist_1d_abs_m2_tau1_eps0.050_lmin2_color_green_gradient" 
            // 解析为友好格式
            try {
                const parts = paramSig.split('_');
                let formatted = '';
                
                for (let i = 0; i < parts.length; i += 2) {
                    const key = parts[i];
                    const value = parts[i + 1];
                    
                    switch (key) {
                        case 'mode':
                            const modeMap = {
                                '1d': '1D-X', 'amplitude': '1D-幅度', '2d': '2D-XY'
                            };
                            formatted += `${modeMap[value] || value} `;
                            break;
                        case 'dist':
                            formatted += `${value === '1d' ? '绝对差' : '欧几里得'} `;
                            break;
                        case 'color':
                            formatted += `${value === 'grayscale' ? '灰度' : '墨绿色'} `;
                            break;
                        case 'm':
                            formatted += `m=${value} `;
                            break;
                        default:
                            if (value) formatted += `${value} `;
                    }
                }
                
                return formatted.trim() || paramSig;
            } catch (e) {
                return paramSig;
            }
        }
        
        // 组织RQA结果为5列布局
        function organizeRQAResults(results) {
            const organized = {};
            
            // 按组别分组
            results.forEach(item => {
                const group = item.group;
                if (!organized[group]) {
                    organized[group] = {};
                }
                
                const question = item.question;
                if (!organized[group][question]) {
                    organized[group][question] = [];
                }
                
                organized[group][question].push(item);
            });
            
            return organized;
        }
        
        // 显示RQA图像 - 支持新的组织结构
        function displayRQAImages(organizedData, imageType = 'amplitude') {
            console.log('显示RQA图片:', organizedData, '图片类型:', imageType);
            const container = document.getElementById('rqaImagesContainer');
            
            if (!organizedData || Object.keys(organizedData).length === 0) {
                container.innerHTML = `
                    <div class="placeholder-content text-center py-5">
                        <i class="fas fa-images fa-3x text-muted mb-3"></i>
                        <h5 class="text-muted">暂无RQA图片</h5>
                        <p class="text-muted">请先运行批量渲染生成图片</p>
                    </div>
                `;
                return;
            }
            
            let html = '';
            
            // 按组别和问题显示，使用5列布局
            const groups = ['control', 'mci', 'ad'];
            
            groups.forEach(group => {
                if (!organizedData[group]) return;
                
                const groupName = group === 'control' ? '控制组' : 
                                group === 'mci' ? 'MCI组' : 'AD组';
                
                // 为每个组添加分组标题
                html += `
                    <div class="group-section">
                        <div class="group-title">${groupName}</div>
                `;
                
                // 为该组的所有问题创建行
                for (let q = 1; q <= 5; q++) {
                    if (!organizedData[group][q]) continue;
                    
                    const items = organizedData[group][q];
                    
                    html += `
                        <div class="rqa-row">
                            <div class="row-header">
                                <h6>Q${q}</h6>
                                <span class="item-count">${items.length}张图片</span>
                            </div>
                            <div class="images-grid">
                    `;
                    
                    // 显示该问题的所有图片（按行排列，每行5张）
                    for (let i = 0; i < items.length; i++) {
                        const item = items[i];
                        
                        // 根据图片类型选择路径
                        let imagePath, imageAlt;
                        if (imageType === 'trajectory') {
                            imagePath = item.trajectory_path;
                            imageAlt = `${item.data_id} 轨迹图`;
                        } else if (imageType === 'recurrence') {
                            imagePath = item.recurrence_path;
                            imageAlt = `${item.data_id} 递归图`;
                        } else {
                            imagePath = item.amplitude_path;
                            imageAlt = `${item.data_id} 幅度图`;
                        }
                        
                        html += `
                            <div class="image-item">
                                <div class="image-container" onclick="openImageModal('/api/rqa-image/${imagePath}', '${imageAlt}')">
                                    <img src="/api/rqa-image/${imagePath}" 
                                         alt="${imageAlt}" 
                                         class="rqa-image" 
                                         loading="lazy"
                                         onerror="this.parentElement.innerHTML='<div class=&quot;error-placeholder&quot;><i class=&quot;fas fa-exclamation-triangle&quot;></i><br>加载失败</div>'">
                                </div>
                                <div class="image-label">${item.data_id}</div>
                            </div>
                        `;
                    }
                    
                    html += `
                            </div>
                        </div>
                    `;
                }
                
                html += `
                    </div>
                `;
            });
            
            container.innerHTML = html;
        }
        
        function switchImageType(dataId, type) {
            // 更新选项卡状态
            const container = document.getElementById('imageContent_' + dataId).parentElement;
            const tabs = container.querySelectorAll('.tab-btn');
            tabs.forEach(tab => tab.classList.remove('active'));
            
            // 激活当前选项卡
            const activeTab = Array.from(tabs).find(tab => tab.textContent.includes(
                type === 'amplitude' ? '幅度图' : 
                type === 'trajectory' ? '轨迹图' : '递归图'
            ));
            if (activeTab) activeTab.classList.add('active');
            
            // 更新图片
            const imageContent = document.getElementById('imageContent_' + dataId);
            const currentImg = imageContent.querySelector('img');
            
            if (currentImg) {
                // 构建新的图片路径
                let newSrc = currentImg.src;
                newSrc = newSrc.replace('_amplitude.png', `_${type}.png`);
                newSrc = newSrc.replace('_trajectory.png', `_${type}.png`);
                newSrc = newSrc.replace('_recurrence.png', `_${type}.png`);
                
                currentImg.src = newSrc;
                currentImg.alt = `${dataId} ${type}`;
            }
        }

        // 运行RQA分析（保持向后兼容）
        async function runRQAAnalysis() {
            const texts = languageTexts[currentLanguage];
            showAlert('请使用新的批量渲染功能', 'info');
            return;
        }

        // 获取RQA参数
        function getRQAParameters() {
            return {
                analysis_mode: document.getElementById('analysisMode').value,
                distance_metric: document.getElementById('distanceMetric').value,
                embedding_dimension: parseInt(document.getElementById('embeddingDim').value),
                time_delay: parseInt(document.getElementById('timeDelay').value),
                recurrence_threshold: parseFloat(document.getElementById('recurrenceThreshold').value),
                min_line_length: parseInt(document.getElementById('minLineLength').value)
            };
        }

        // 重置RQA参数
        function resetRQAParameters() {
            document.getElementById('analysisMode').value = '1d_x';
            document.getElementById('distanceMetric').value = '1d_abs';
            
            document.getElementById('embeddingDim').value = 2;
            document.getElementById('embeddingDimValue').textContent = '2';
            
            document.getElementById('timeDelay').value = 1;
            document.getElementById('timeDelayValue').textContent = '1';
            
            document.getElementById('recurrenceThreshold').value = 0.05;
            document.getElementById('recurrenceThresholdValue').textContent = '0.05';
            
            document.getElementById('minLineLength').value = 2;
            document.getElementById('minLineLengthValue').textContent = '2';
        }

        // 显示RQA加载状态
        function showRQALoading() {
            const containers = ['recurrencePlotContainer', 'rqaMetricsContainer', 'compareContainer'];
            containers.forEach(containerId => {
                const container = document.getElementById(containerId);
                if (container) {
                    container.innerHTML = `
                        <div class="placeholder-content">
                            <i class="fas fa-spinner fa-spin fa-3x"></i>
                            <h3>正在分析...</h3>
                            <p>请稍候，RQA分析需要一些时间</p>
                        </div>
                    `;
                }
            });
        }

        // 隐藏RQA加载状态
        function hideRQALoading() {
            // 加载状态会被结果替换，不需要单独隐藏
        }

        // 显示RQA错误
        function showRQAError(errorMessage) {
            const containers = ['recurrencePlotContainer', 'rqaMetricsContainer'];
            containers.forEach(containerId => {
                const container = document.getElementById(containerId);
                if (container) {
                    container.innerHTML = `
                        <div class="placeholder-content">
                            <i class="fas fa-exclamation-triangle fa-3x" style="color: #dc3545;"></i>
                            <h3 style="color: #dc3545;">分析失败</h3>
                            <p>${errorMessage}</p>
                        </div>
                    `;
                }
            });
        }

        // 显示RQA结果
        function displayRQAResults(result) {
            console.log('显示RQA结果:', result);
            
            // 显示递归图
            if (result.recurrence_plot) {
                displayRecurrencePlot(result.recurrence_plot);
            }
            
            // 显示时间序列图（新增）
            if (result.time_series_plot) {
                displayTimeSeriesPlot(result.time_series_plot);
            }
            
            // 显示RQA指标
            if (result.metrics) {
                displayRQAMetrics(result.metrics, result.data_info);
            }
            
            // 如果有对比数据，显示对比结果
            if (result.comparison) {
                displayComparisonResults(result.comparison);
            }
        }

        // 显示递归图
        function displayRecurrencePlot(plotData) {
            const container = document.getElementById('recurrencePlotContainer');
            if (container) {
                container.innerHTML = `
                    <div class="plot-image-container">
                        <img src="data:image/png;base64,${plotData}" alt="递归图" class="rqa-plot-image">
                        <p class="plot-description">递归图显示眼动轨迹的周期性模式和重复结构，黑点表示递归点，彩色方块表示不同ROI区域</p>
                    </div>
                `;
            }
        }

        // 显示时间序列图
        function displayTimeSeriesPlot(plotData) {
            // 在递归图容器下方添加时间序列图
            const plotContainer = document.getElementById('recurrencePlotContainer');
            if (plotContainer) {
                const timeSeriesDiv = document.createElement('div');
                timeSeriesDiv.className = 'plot-image-container mt-3';
                timeSeriesDiv.innerHTML = `
                    <img src="data:image/png;base64,${plotData}" alt="时间序列图" class="rqa-plot-image">
                    <p class="plot-description">时间序列图显示原始信号随时间的变化，彩色填充区域表示不同ROI的注视时段</p>
                `;
                plotContainer.appendChild(timeSeriesDiv);
            }
        }

        // 显示RQA指标
        function displayRQAMetrics(metrics, dataInfo = null) {
            const container = document.getElementById('rqaMetricsContainer');
            if (container) {
                let metricsHtml = '';
                
                // 如果有数据信息，先显示分析信息
                if (dataInfo) {
                    metricsHtml += `
                        <div class="analysis-info mb-3">
                            <h5>分析信息</h5>
                            <div class="info-grid">
                                <div class="info-item">
                                    <span class="info-label">分析模式:</span>
                                    <span class="info-value">${dataInfo.analysis_mode || 'Unknown'}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">数据点数:</span>
                                    <span class="info-value">${dataInfo.total_points || 0}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">嵌入点数:</span>
                                    <span class="info-value">${dataInfo.embedding_points || 0}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">ROI区域数:</span>
                                    <span class="info-value">${dataInfo.roi_count || 0}</span>
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                metricsHtml += '<div class="metrics-grid">';
                
                const metricLabels = {
                    'RR': '递归率 (Recurrence Rate)',
                    'DET': '确定性 (Determinism)',
                    'LAM': '层流性 (Laminarity)',
                    'L': '平均对角线长度',
                    'Lmax': '最大对角线长度',
                    'DIV': '发散性 (Divergence)',
                    'TT': '平均垂直线长度',
                    'Vmax': '最大垂直线长度',
                    'ENTR': '熵 (Entropy)'
                };
                
                const metricDescriptions = {
                    'RR': '表示递归点在总矩阵中的比例',
                    'DET': '表示形成对角线结构的递归点比例',
                    'LAM': '表示形成垂直线结构的递归点比例',
                    'L': '对角线段的平均长度，反映可预测性',
                    'Lmax': '最长对角线段的长度',
                    'DIV': 'Lmax的倒数，表示系统的发散程度',
                    'TT': '垂直线段的平均长度，反映状态持续时间',
                    'Vmax': '最长垂直线段的长度',
                    'ENTR': '对角线长度分布的Shannon熵'
                };
                
                for (const [key, value] of Object.entries(metrics)) {
                    const label = metricLabels[key] || key;
                    const description = metricDescriptions[key] || '';
                    const formattedValue = typeof value === 'number' ? 
                        (key.includes('max') || key === 'Lmax' || key === 'Vmax' ? value : value.toFixed(4)) : value;
                    
                    metricsHtml += `
                        <div class="metric-item" title="${description}">
                            <div class="metric-label">${label}</div>
                            <div class="metric-value">${formattedValue}</div>
                            <div class="metric-desc">${description}</div>
                        </div>
                    `;
                }
                
                metricsHtml += '</div>';
                container.innerHTML = metricsHtml;
            }
        }

        // 显示对比结果
        function displayComparisonResults(comparison) {
            const container = document.getElementById('compareContainer');
            if (container) {
                container.innerHTML = `
                    <div class="comparison-content">
                        <h5>组间对比分析</h5>
                        <p>对比功能开发中...</p>
                    </div>
                `;
            }
