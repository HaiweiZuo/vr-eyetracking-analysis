        // 图片放大功能
        function openImageModal(imageSrc, imageTitle) {
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('imageModalImg');
            const modalTitle = document.getElementById('imageModalTitle');
            
            modalImg.src = imageSrc;
            modalTitle.textContent = imageTitle || '图片预览';
            modal.classList.add('active');
            
            // 防止页面滚动
            document.body.style.overflow = 'hidden';
        }
        
        function closeImageModal() {
            const modal = document.getElementById('imageModal');
            modal.classList.remove('active');
            
            // 恢复页面滚动
            document.body.style.overflow = 'auto';
        }
        
        // 点击模态框背景关闭
        document.getElementById('imageModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeImageModal();
            }
        });
        
        // ESC键关闭模态框
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeImageModal();
            }
        });
        // ================= 模块7：数据整理模块 JavaScript 代码 =================
        // 数据整理模块的JavaScript代码
        let normalizedData = [];
        let currentChart = null;

        // 加载可用的RQA配置
        async function loadAvailableRqaConfigs() {
            console.log('🔍 加载可用的RQA配置...');
            
            try {
                const response = await fetch('/api/available-rqa-configs');
                const result = await response.json();
                
                if (result.success && result.configs) {
                    const rqaConfigSelect = document.getElementById('rqaConfigSelect');
                    if (rqaConfigSelect) {
                        // 清空现有选项
                        rqaConfigSelect.innerHTML = '';
                        
                        // 添加新选项 - 适配实际API返回格式
                        result.configs.forEach(config => {
                            const option = document.createElement('option');
                            option.value = config.id; // 使用id而不是signature
                            // 使用API已经生成的display_name，或者构建显示名称
                            const displayName = config.display_name || `m=${config.m}, τ=${config.tau}, ε=${config.eps}, l_min=${config.lmin}`;
                            option.textContent = `${displayName} (${config.file_count} 文件)`;
                            rqaConfigSelect.appendChild(option);
                        });
                        
                        console.log(`✅ 加载了 ${result.configs.length} 个RQA配置:`, result.configs.map(c => c.id));
                        
                        // 绑定配置变更事件
                        rqaConfigSelect.addEventListener('change', function() {
                            console.log(`🔄 RQA配置已变更为: ${this.value}`);
                            // 配置变更时重新加载数据
                            loadNormalizedData();
                        });
                    }
                } else {
                    console.log('⚠️ 没有找到可用的RQA配置');
                    // 如果没有配置，设置默认值
                    const rqaConfigSelect = document.getElementById('rqaConfigSelect');
                    if (rqaConfigSelect) {
                        rqaConfigSelect.innerHTML = '<option value="m2_tau1_eps0.055_lmin2">m=2, τ=1, ε=0.055, l_min=2 (默认)</option>';
                    }
                }
            } catch (error) {
                console.error('❌ 加载RQA配置失败:', error);
                // 错误时设置默认值
                const rqaConfigSelect = document.getElementById('rqaConfigSelect');
                if (rqaConfigSelect) {
                    rqaConfigSelect.innerHTML = '<option value="m2_tau1_eps0.055_lmin2">m=2, τ=1, ε=0.055, l_min=2 (默认)</option>';
                    console.log('⚠️ 使用默认RQA配置');
                }
            }
        }
        
        // 加载数据统计信息
        async function loadDataStatistics() {
            console.log('📊 加载数据统计信息...');
            
            try {
                const response = await fetch('/api/data-statistics');
                const result = await response.json();
                
                if (result.success && result.statistics) {
                    const stats = result.statistics;
                    
                    // 更新统计数字
                    const totalSubjects = document.getElementById('totalSubjects');
                    const totalSessions = document.getElementById('totalSessions');
                    const totalTasks = document.getElementById('totalTasks');
                    const totalFeatures = document.getElementById('totalFeatures');
                    
                    if (totalSubjects) totalSubjects.textContent = stats.total_subjects;
                    if (totalSessions) totalSessions.textContent = stats.total_sessions;
                    if (totalTasks) totalTasks.textContent = stats.total_tasks;
                    if (totalFeatures) totalFeatures.textContent = stats.normalized_features;
                    
                    console.log(`✅ 统计信息已更新: ${stats.total_subjects}名受试者, ${stats.total_sessions}个会话, ${stats.normalized_features}个特征`);
                } else {
                    console.log('⚠️ 无法获取统计信息');
                }
            } catch (error) {
                console.error('❌ 加载统计信息失败:', error);
            }
        }

        // 初始化函数（增强调试版本）
        function initDataOrganization() {
            console.log('🚀 === 初始化数据整理模块 ===');
            console.log('🕐 初始化时间:', new Date().toLocaleTimeString());
            
            try {
                // 检查关键DOM元素
                console.log('🔍 检查关键DOM元素...');
                const requiredElements = ['generateChart', 'refreshData', 'exportData', 'statusText', 'statusAlert'];
                
                const elementStatus = {};
                requiredElements.forEach(id => {
                    const element = document.getElementById(id);
                    elementStatus[id] = element ? '✅ 存在' : '❌ 缺失';
                    if (element) {
                        console.log(`✅ 找到元素: #${id}`);
                    } else {
                        console.warn(`❌ 缺失元素: #${id}`);
                    }
                });
                
                console.log('📊 DOM元素状态:', elementStatus);
                
                console.log('🔧 绑定事件监听器...');
                // 绑定事件监听器
                setupDataOrganizationEventListeners();
                console.log('✅ 事件监听器绑定完成');
                
                console.log('📊 开始加载初始配置和数据...');
                // 先加载配置和统计信息，然后加载数据
                Promise.all([
                    loadAvailableRqaConfigs()
                    // TODO: 等服务器重启后启用 loadDataStatistics()
                ]).then(() => {
                    console.log('✅ 配置和统计信息加载完成，开始加载数据...');
                    // 配置加载完成后，加载数据
                    loadNormalizedData();
                }).catch(error => {
                    console.error('❌ 配置加载失败，使用默认配置加载数据:', error);
                    // 即使配置加载失败，也尝试加载数据
                    loadNormalizedData();
                });
                
                console.log('✅ === 数据整理模块初始化完成 ===');
                
            } catch (error) {
                console.error('❌ === 初始化失败 ===');
                console.error('❌ 错误:', error);
                console.error('❌ 堆栈:', error.stack);
            }
        }

        // 设置事件监听器（增强调试版本）
        function setupDataOrganizationEventListeners() {
            console.log('🔧 === 设置事件监听器 ===');
            
            try {
                // 刷新数据按钮
                console.log('🔧 设置刷新数据按钮...');
                const refreshBtn = document.getElementById('refreshData');
                if (refreshBtn) {
                    refreshBtn.addEventListener('click', loadNormalizedData);
                    console.log('✅ 刷新数据按钮事件监听器已设置');
                } else {
                    console.warn('❌ 找不到刷新数据按钮 (#refreshData)');
                }
                
                // 生成图表按钮
                console.log('🔧 设置生成图表按钮...');
                const generateBtn = document.getElementById('generateChart');
                if (generateBtn) {
                    generateBtn.addEventListener('click', generateVisualization);
                    console.log('✅ 生成图表按钮事件监听器已设置');
                } else {
                    console.warn('❌ 找不到生成图表按钮 (#generateChart)');
                }
                
                // 导出数据按钮
                console.log('🔧 设置导出数据按钮...');
                const exportBtn = document.getElementById('exportData');
                if (exportBtn) {
                    exportBtn.addEventListener('click', exportFilteredData);
                    console.log('✅ 导出数据按钮事件监听器已设置');
                } else {
                    console.warn('❌ 找不到导出数据按钮 (#exportData)');
                }
                
                console.log('✅ === 事件监听器设置完成 ===');
                
            } catch (error) {
                console.error('❌ === 事件监听器设置失败 ===');
                console.error('❌ 错误:', error);
                console.error('❌ 堆栈:', error.stack);
            }
            
            // 筛选条件变化
            document.querySelectorAll('input[name="taskFilter"]').forEach(radio => {
                radio.addEventListener('change', updateDataTable);
            });
            
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', updateDataTable);
            });
            
            console.log('✅ 事件监听器设置完成');
        }

        // 加载真实整合数据
        async function loadNormalizedData() {
            const statusText = document.getElementById('statusText');
            const statusAlert = document.getElementById('statusAlert');
            const rqaConfigSelect = document.getElementById('rqaConfigSelect');
            const selectedConfig = rqaConfigSelect ? rqaConfigSelect.value : 'm2_tau1_eps0.055_lmin2';
            
            try {
                console.log('🚀 === 开始加载真实整合数据流程 ===');
                console.log('📊 选择的RQA配置:', selectedConfig);
                
                statusText.textContent = `正在加载真实数据 (${selectedConfig})...`;
                statusAlert.className = 'alert alert-info';
                
                console.log('🔄 第1步: 检查缓存数据...');
                const startTime = Date.now();
                
                // 首先尝试获取缓存的整合数据
                let response = await fetch(`/api/integrated-features/${selectedConfig}`, {
                    cache: 'no-cache',
                    headers: {'Accept': 'application/json'}
                });
                
                if (!response.ok) {
                    console.log('⚠️ 缓存不存在，开始真实数据整合...');
                    statusText.textContent = '缓存不存在，正在整合真实数据...';
                    
                    // 触发数据整合
                    response = await fetch('/api/integrate-real-features', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({rqa_config: selectedConfig})
                    });
                }
                
                const fetchTime = Date.now() - startTime;
                
                console.log(`📡 第2步: 收到响应 (${fetchTime}ms)`);
                console.log('📡 响应状态:', response.status, response.statusText);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                console.log('📄 第3步: 解析JSON响应...');
                const parseStartTime = Date.now();
                normalizedData = await response.json();
                const parseTime = Date.now() - parseStartTime;
                
                console.log(`📄 第4步: JSON解析完成 (${parseTime}ms)`);
                console.log('📊 解析后的数据行数:', normalizedData.length);
                
                if (normalizedData.length === 0) {
                    throw new Error('API返回的数据为空');
                }
                
                console.log('📊 数据样本 (前3行):', normalizedData.slice(0, 3));
                
                console.log('🎨 第5步: 更新数据表格...');
                const tableStartTime = Date.now();
                updateDataTable();
                const tableTime = Date.now() - tableStartTime;
                
                console.log(`🎨 第6步: 表格更新完成 (${tableTime}ms)`);
                
                statusText.textContent = `✅ 真实数据整合完成: ${normalizedData.length} 条记录 (${selectedConfig})`;
                statusAlert.className = 'alert alert-success';
                
                const totalTime = Date.now() - startTime;
                console.log(`✅ === 真实数据整合流程完成，总用时: ${totalTime}ms ===`);
                
            } catch (error) {
                console.error('❌ === 数据加载流程失败 ===');
                console.error('❌ 错误类型:', error.constructor.name);
                console.error('❌ 错误消息:', error.message);
                console.error('❌ 错误堆栈:', error.stack);
                
                if (error.name === 'AbortError') {
                    statusText.textContent = '❌ 请求超时，服务器响应过慢，使用模拟数据演示功能';
                } else {
                    statusText.textContent = `❌ 数据加载失败: ${error.message}，使用模拟数据演示功能`;
                }
                statusAlert.className = 'alert alert-warning';
                
                // 尝试使用真实数据整合
                console.log('❌ API加载失败，尝试真实数据整合');
                try {
                    normalizedData = await loadRealIntegratedData();
                    updateDataTable();
                    statusText.textContent = `✅ 使用真实数据整合: ${normalizedData.length} 条记录`;
                    statusAlert.className = 'alert alert-success';
                } catch (integrateError) {
                    console.error('❌ 真实数据整合也失败:', integrateError);
                    statusText.textContent = '❌ 所有数据源加载失败，请检查服务器状态';
                    normalizedData = [];
                    updateDataTable();
                }
            }
        }

        // 解析CSV数据
        function parseCSV(csvText) {
            console.log('🔄 开始解析CSV数据...');
            
            try {
                const lines = csvText.trim().split('\n');
                console.log('📄 CSV总行数:', lines.length);
                
                if (lines.length < 2) {
                    throw new Error('CSV文件格式不正确，至少需要标题行和数据行');
                }
                
                const headers = lines[0].split(',');
                console.log('📋 CSV标题:', headers);
                
                const data = [];
                
                for (let i = 1; i < lines.length; i++) {
                    const line = lines[i].trim();
                    if (!line) continue; // 跳过空行
                    
                    const values = line.split(',');
                    if (values.length !== headers.length) {
                        console.warn(`⚠️ 第${i+1}行字段数量不匹配: 期望${headers.length}个，实际${values.length}个`);
                        continue;
                    }
                    
                    const row = {};
                    headers.forEach((header, index) => {
                        const value = values[index] ? values[index].trim() : '';
                        // 尝试转换为数字
                        if (!isNaN(value) && value !== '' && value !== 'null' && value !== 'undefined') {
                            row[header] = parseFloat(value);
                        } else {
                            row[header] = value;
                        }
                    });
                    data.push(row);
                }
                
                console.log('✅ CSV解析完成，有效数据行数:', data.length);
                return data;
                
            } catch (error) {
                console.error('❌ CSV解析失败:', error);
                throw error;
            }
        }

        // 从真实数据源加载并整合10个属性
        async function loadRealIntegratedData(rqaConfig = 'm2_tau1_eps0.055_lmin2') {
            console.log('🔄 开始从真实数据源整合特征...');
            updateStatusText('正在从真实数据源提取特征...');
            
            try {
                // 检查是否有缓存的整合结果
                const cacheResponse = await fetch(`/api/integrated-features/${rqaConfig}`);
                if (cacheResponse.ok) {
                    const cachedData = await cacheResponse.json();
                    console.log('✅ 使用缓存的整合数据:', cachedData.length, '条记录');
                    return cachedData;
                }
                
                // 如果没有缓存，触发数据整合
                console.log('⚠️ 缓存不存在，开始数据整合过程...');
                const integrationResponse = await fetch('/api/integrate-real-features', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({rqa_config: rqaConfig})
                });
                
                if (!integrationResponse.ok) {
                    throw new Error('数据整合失败');
                }
                
                const integratedData = await integrationResponse.json();
                console.log('✅ 真实数据整合完成:', integratedData.length, '条记录');
                return integratedData;
                
            } catch (error) {
                console.error('❌ 真实数据整合失败:', error);
                throw error;
            }
        }

        // 更新数据表格
        function updateDataTable() {
            const filteredData = getFilteredData();
            const tbody = document.querySelector('#dataTable tbody');
            
            if (filteredData.length === 0) {
                const noDataMsg = currentLanguage === 'zh' ? '没有符合条件的数据' : 'No data matches the criteria';
                tbody.innerHTML = `<tr><td colspan="14" class="text-center text-muted">${noDataMsg}</td></tr>`;
                const noDataText = currentLanguage === 'zh' ? '0 行' : '0 rows';
                document.getElementById('tableRowCount').textContent = noDataText;
                return;
            }
            
            // 按照组别顺序排序：control -> mci -> ad
            const groupOrder = { 'control': 1, 'mci': 2, 'ad': 3 };
            const sortedData = filteredData.sort((a, b) => {
                const orderA = groupOrder[a.group_type] || 999;
                const orderB = groupOrder[b.group_type] || 999;
                if (orderA !== orderB) {
                    return orderA - orderB;
                }
                // 如果组别相同，按受试者ID排序
                return a.subject_id.localeCompare(b.subject_id);
            });
            
            tbody.innerHTML = sortedData.map(row => `
                <tr>
                    <td>${row.session_id}</td>
                    <td>${row.subject_id}</td>
                    <td><span class="badge bg-primary">${row.task_id}</span></td>
                    <td><span class="badge bg-${getGroupColor(row.group_type)}">${row.group_type.toUpperCase()}</span></td>
                    <td>${(row.game_duration_norm * 100).toFixed(1)}%</td>
                    <td>${(row.roi_kw_time_norm * 100).toFixed(1)}%</td>
                    <td>${(row.roi_inst_time_norm * 100).toFixed(1)}%</td>
                    <td>${(row.roi_bg_time_norm * 100).toFixed(1)}%</td>
                    <td>${row.rr_1d_norm ? row.rr_1d_norm.toFixed(3) : 'N/A'}</td>
                    <td>${row.det_1d_norm ? row.det_1d_norm.toFixed(3) : 'N/A'}</td>
                    <td>${row.ent_1d_norm ? row.ent_1d_norm.toFixed(3) : 'N/A'}</td>
                    <td>${row.rr_2d_norm.toFixed(3)}</td>
                    <td>${row.det_2d_norm.toFixed(3)}</td>
                    <td>${row.ent_2d_norm.toFixed(3)}</td>
                </tr>
            `).join('');
            
            // 更新表格行数（支持多语言）
            const rowCountText = currentLanguage === 'zh' ? `${filteredData.length} 行` : `${filteredData.length} rows`;
            document.getElementById('tableRowCount').textContent = rowCountText;
        }

        // 获取组别颜色
        function getGroupColor(group) {
            switch(group) {
                case 'ad': return 'danger';
                case 'mci': return 'warning';
                case 'control': return 'success';
                default: return 'secondary';
            }
        }

        // 获取筛选后的数据
        function getFilteredData() {
            const taskFilter = document.querySelector('input[name="taskFilter"]:checked').value;
            const selectedGroups = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
                .map(cb => cb.value).filter(v => ['ad', 'mci', 'control'].includes(v));
            
            return normalizedData.filter(row => {
                const taskMatch = taskFilter === 'all' || row.task_id === taskFilter;
                const groupMatch = selectedGroups.includes(row.group_type);
                return taskMatch && groupMatch;
            });
        }

        // 生成可视化图表
        function generateVisualization() {
            const filteredData = getFilteredData();
            const featureType = document.getElementById('featureType').value;
            const chartType = document.getElementById('chartType').value;
            
            if (filteredData.length === 0) {
                const noDataAlert = currentLanguage === 'zh' ? '没有符合条件的数据，请调整筛选条件' : 'No data matches the criteria, please adjust the filter conditions';
                alert(noDataAlert);
                return;
            }
            
            // 销毁之前的图表
            if (currentChart) {
                currentChart.destroy();
            }
            
            // 创建新图表
            const canvas = createChartCanvas();
            const ctx = canvas.getContext('2d');
            
            try {
                currentChart = createChart(ctx, filteredData, featureType, chartType);
            } catch (error) {
                console.error('生成图表失败:', error);
                alert('生成图表失败: ' + error.message);
            }
        }

        // 创建图表画布
        function createChartCanvas() {
            const container = document.getElementById('chartContainer');
            container.innerHTML = '<canvas id="mainChart"></canvas>';
            return document.getElementById('mainChart');
        }

        // 创建图表
        function createChart(ctx, data, featureType, chartType) {
            const features = getFeaturesByType(featureType);
            const groupedData = {};
            
            // 按实验组分组数据
            data.forEach(row => {
                if (!groupedData[row.group_type]) {
                    groupedData[row.group_type] = {};
                }
                features.forEach(feature => {
                    if (!groupedData[row.group_type][feature]) {
                        groupedData[row.group_type][feature] = [];
                    }
                    groupedData[row.group_type][feature].push(row[feature]);
                });
            });
            
            // 按照固定顺序生成数据集：control -> mci -> ad
            const groupOrder = ['control', 'mci', 'ad'];
            const datasets = groupOrder.filter(group => groupedData[group]).map(group => {
                const values = features.map(feature => {
                    const arr = groupedData[group][feature] || [];
                    return arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
                });
                
                return {
                    label: group.toUpperCase(),
                    data: values,
                    backgroundColor: getGroupColorRGBA(group, 0.6),
                    borderColor: getGroupColorRGBA(group, 1),
                    borderWidth: 2,
                    fill: chartType === 'line' ? false : true
                };
            });
            
            return new Chart(ctx, {
                type: chartType === 'line' ? 'line' : 'bar',
                data: {
                    labels: features.map(f => getFeatureDisplayName(f)),
                    datasets: datasets
                },
                                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: `${getFeatureTypeDisplayName(featureType)} - 分组对比 (${features.length}项特征)`
                            },
                            legend: {
                                position: 'top'
                            }
                        },
                        scales: {
                            x: {
                                ticks: {
                                    maxRotation: 45,
                                    minRotation: 0
                                }
                            },
                            y: {
                                beginAtZero: true,
                                max: 1,
                                title: {
                                    display: true,
                                    text: '归一化值 (0-1)'
                                }
                            }
                        },
                        interaction: {
                            intersect: false,
                            mode: 'index'
                        },
                        elements: {
                            bar: {
                                borderWidth: 2
                            }
                        }
                    }
            });
        }

        // 获取特征类型对应的字段
        function getFeaturesByType(featureType) {
            switch(featureType) {
                case 'game_duration':
                    return ['game_duration_norm'];
                case 'roi_features':
                    return ['roi_kw_time_norm', 'roi_inst_time_norm', 'roi_bg_time_norm'];
                case 'rqa_1d_features':
                    return ['rr_1d_norm', 'det_1d_norm', 'ent_1d_norm'];
                case 'rqa_2d_features':
                    return ['rr_2d_norm', 'det_2d_norm', 'ent_2d_norm'];
                case 'rqa_features':
                    return ['rr_1d_norm', 'det_1d_norm', 'ent_1d_norm', 'rr_2d_norm', 'det_2d_norm', 'ent_2d_norm'];
                case 'comprehensive':
                    return ['game_duration_norm', 'roi_kw_time_norm', 'roi_inst_time_norm', 'roi_bg_time_norm', 'rr_1d_norm', 'det_1d_norm', 'ent_1d_norm', 'rr_2d_norm', 'det_2d_norm', 'ent_2d_norm'];
                case 'all_features':
                    return ['game_duration_norm', 'roi_kw_time_norm', 'roi_inst_time_norm', 'roi_bg_time_norm', 'rr_1d_norm', 'det_1d_norm', 'ent_1d_norm', 'rr_2d_norm', 'det_2d_norm', 'ent_2d_norm'];
                default:
                    return ['game_duration_norm'];
            }
        }

        // 获取特征显示名称
        function getFeatureDisplayName(feature) {
            const names = {
                'game_duration_norm': '游戏时长',
                'roi_kw_time_norm': 'KW-ROI时间',
                'roi_inst_time_norm': 'INST-ROI时间',
                'roi_bg_time_norm': 'BG-ROI时间',
                'rr_1d_norm': 'RR-1D',
                'det_1d_norm': 'DET-1D',
                'ent_1d_norm': 'ENT-1D',
                'rr_2d_norm': 'RR-2D',
                'det_2d_norm': 'DET-2D',
                'ent_2d_norm': 'ENT-2D'
            };
            return names[feature] || feature;
        }

        // 获取特征类型显示名称
        function getFeatureTypeDisplayName(featureType) {
            const names = {
                'game_duration': '游戏时长特征',
                'roi_features': 'ROI注视特征',
                'rqa_1d_features': 'RQA-1D递归特征',
                'rqa_2d_features': 'RQA-2D递归特征',
                'rqa_features': 'RQA全部递归特征',
                'comprehensive': '综合特征对比',
                'all_features': '全部特征对比'
            };
            return names[featureType] || featureType;
        }

        // 获取组别颜色RGBA
        function getGroupColorRGBA(group, alpha = 1) {
            switch(group) {
                case 'ad': return `rgba(220, 53, 69, ${alpha})`;
                case 'mci': return `rgba(255, 193, 7, ${alpha})`;
                case 'control': return `rgba(25, 135, 84, ${alpha})`;
                default: return `rgba(108, 117, 125, ${alpha})`;
            }
        }

        // 导出筛选后的数据
        function exportFilteredData() {
            const filteredData = getFilteredData();
            if (filteredData.length === 0) {
                const noExportDataMsg = currentLanguage === 'zh' ? '没有数据可导出' : 'No data to export';
                alert(noExportDataMsg);
                return;
            }
            
            // 转换为CSV格式
            const headers = Object.keys(filteredData[0]);
            const csvContent = [
                headers.join(','),
                ...filteredData.map(row => headers.map(h => row[h]).join(','))
            ].join('\\n');
            
            // 下载CSV文件
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `normalized_features_filtered_${new Date().getTime()}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        console.log('📊 模块7数据整理模块脚本加载完成');
        // ================= 模块7：数据整理模块 JavaScript 代码结束 =================
        
        // ================= 模块8：眼动系数与MMSE对比分析 JavaScript 代码 =================
        
        // 全局变量
        let eyeMovementData = null;
        let mmseData = null;
        let comparisonResults = null;
        let currentViewMode = 'individual'; // 'individual' or 'group'
        let currentDetailMode = 'main'; // 'main' or 'subQuestion'
        let comparisonChart = null;

        // 初始化模块8的数据对比分析功能
        function initEyeMovementMMSEAnalysis() {
            console.log('🚀 === 初始化眼动系数与MMSE对比分析模块 ===');
            
            // 初始化数据计数器显示
            const eyeMovementCountElement = document.getElementById('eyeMovementCount');
            const mmseScoreCountElement = document.getElementById('mmseScoreCount');
            if (eyeMovementCountElement) eyeMovementCountElement.textContent = '0';
            if (mmseScoreCountElement) mmseScoreCountElement.textContent = '0';
            
            // 设置按钮事件监听
            setupComparisonEventListeners();
            
            // 加载可用的模块7数据源
            loadAvailableModule7DataSources();
            
            console.log('✅ === 眼动系数与MMSE对比分析模块初始化完成 ===');
        }
        
        // 加载可用的模块7数据源
        async function loadAvailableModule7DataSources() {
            console.log('🔍 加载可用的模块7数据源...');
            
            try {
                // 从RQA配置API获取可用配置
                const response = await fetch('/api/available-rqa-configs');
                const result = await response.json();
                
                if (result.success && result.configs) {
                    const dataSourceSelect = document.getElementById('module7DataSourceSelect');
                    if (dataSourceSelect) {
                        // 清空现有选项
                        dataSourceSelect.innerHTML = `<option value="">${getLanguageText('selectRqaConfig')}</option>`;
                        
                        // 添加可用的模块7数据源
                        result.configs.forEach(config => {
                            const option = document.createElement('option');
                            option.value = config.id; // 使用RQA配置ID
                            // 直接从config对象获取参数，而不是config.parameters
                            const displayName = config.display_name || `m=${config.m}, τ=${config.tau}, ε=${config.eps}, l_min=${config.lmin}`;
                            option.textContent = displayName;
                            dataSourceSelect.appendChild(option);
                        });
                        
                        console.log(`✅ 加载了 ${result.configs.length} 个模块7数据源`);
                        
                        // 绑定数据源变更事件
                        dataSourceSelect.addEventListener('change', function() {
                            const selectedConfig = this.value;
                            if (selectedConfig) {
                                console.log(`🔄 选择了数据源: ${selectedConfig}`);
                                // 启用加载按钮
                                enableAnalysisButtons();
                            } else {
                                // 禁用按钮
                                disableAnalysisButtons();
                            }
                        });
                    }
                } else {
                    console.log('⚠️ 没有找到可用的模块7数据源');
                }
            } catch (error) {
                console.error('❌ 加载模块7数据源失败:', error);
            }
        }
        
        // 启用分析按钮
        function enableAnalysisButtons() {
            const buttons = ['loadEyeMovementData', 'calculateCoefficients', 'compareWithMMSE', 'exportComparisonReport'];
            buttons.forEach(buttonId => {
                const button = document.getElementById(buttonId);
                if (button) {
                    button.disabled = false;
                }
            });
        }
        
        // 禁用分析按钮
        function disableAnalysisButtons() {
            const buttons = ['loadEyeMovementData', 'calculateCoefficients', 'compareWithMMSE', 'exportComparisonReport'];
            buttons.forEach(buttonId => {
                const button = document.getElementById(buttonId);
                if (button) {
                    button.disabled = true;
                }
            });
        }

        // 设置对比分析事件监听器
        function setupComparisonEventListeners() {
            console.log('🔧 设置对比分析事件监听器');
            
            // 加载眼动数据按钮
            const loadDataBtn = document.getElementById('loadEyeMovementData');
            if (loadDataBtn) {
                loadDataBtn.addEventListener('click', loadEyeMovementData);
                console.log('✅ 加载眼动数据按钮监听器已设置');
            }
            
            // 计算眼动系数按钮
            const calculateBtn = document.getElementById('calculateCoefficients');
            if (calculateBtn) {
                calculateBtn.addEventListener('click', calculateEyeMovementCoefficients);
                console.log('✅ 计算眼动系数按钮监听器已设置');
            }
            
            // MMSE对比分析按钮
            const compareBtn = document.getElementById('compareWithMMSE');
            if (compareBtn) {
                compareBtn.addEventListener('click', performMMSEComparison);
                console.log('✅ MMSE对比分析按钮监听器已设置');
            }
            
            // 导出报告按钮
            const exportBtn = document.getElementById('exportComparisonReport');
            if (exportBtn) {
                exportBtn.addEventListener('click', exportComparisonReport);
                console.log('✅ 导出报告按钮监听器已设置');
            }
            
            // 视图切换按钮
            const toggleViewBtn = document.getElementById('toggleViewMode');
            if (toggleViewBtn) {
                toggleViewBtn.addEventListener('click', toggleViewMode);
                console.log('✅ 视图切换按钮监听器已设置');
            }
        }

        // 1. 加载眼动数据
        async function loadEyeMovementData() {
            console.log('📊 开始加载眼动数据');
            updateStatusText('正在加载眼动数据...');
            
            try {
                // 获取选择的模块7数据源
                const dataSourceSelect = document.getElementById('module7DataSourceSelect');
                const selectedRqaConfig = dataSourceSelect ? dataSourceSelect.value : '';
                
                if (!selectedRqaConfig) {
                    alert(getLanguageText('pleaseSelectModule7DataSource'));
                    return;
                }
                
                console.log(`📊 从模块7加载数据，RQA配置: ${selectedRqaConfig}`);
                
                // 从模块7的整合特征数据中加载
                const response = await fetch(`/api/integrated-features/${selectedRqaConfig}`);
                
                if (!response.ok) {
                    throw new Error(`无法获取模块7数据: HTTP ${response.status}`);
                }
                
                eyeMovementData = await response.json();
                console.log('✅ 成功加载模块7眼动数据:', eyeMovementData.length, '条记录');
                console.log('📊 数据来源:', `模块7整合特征 (${selectedRqaConfig})`);
                
                // 更新状态卡片
                const eyeMovementCount = document.getElementById('eyeMovementCount');
                if (eyeMovementCount) {
                    eyeMovementCount.textContent = eyeMovementData.length;
                }
                
                updateStatusText(`眼动数据加载完成 (${selectedRqaConfig})`);
                
                // 启用计算按钮
                const calculateBtn = document.getElementById('calculateCoefficients');
                if (calculateBtn) {
                    calculateBtn.disabled = false;
                }
                
            } catch (error) {
                console.error('❌ 加载眼动数据失败:', error);
                updateStatusText('眼动数据加载失败');
                
                alert(getLanguageText('eyeMovementDataLoadFailed').replace('{error}', error.message));
                
                // 重置状态卡片
                const eyeMovementCount = document.getElementById('eyeMovementCount');
                if (eyeMovementCount) {
                    eyeMovementCount.textContent = '0';
                }
            }
        }

        // 2. 计算眼动系数
        function calculateEyeMovementCoefficients() {
            console.log('🧮 开始计算眼动系数');
            
            if (!eyeMovementData || eyeMovementData.length === 0) {
                alert(getLanguageText('pleaseLoadEyeMovementDataFirst'));
                return;
            }
            
            updateStatusText('正在计算眼动系数...');
            
            // 为每条记录计算眼动系数
            const processedData = eyeMovementData.map(record => {
                // 处理"越低越好"的指标（需要反向）
                const lowerIsBetterFeatures = [
                    1 - (record.game_duration_norm || 0),      // 游戏时长：越短越好
                    1 - (record.roi_kw_time_norm || 0),        // 关键词ROI时间：越短越好
                    1 - (record.roi_inst_time_norm || 0),      // 指令ROI时间：越短越好
                    1 - (record.roi_bg_time_norm || 0)         // 背景ROI时间：越短越好
                ];
                
                // 处理"越高越好"的指标（直接使用）
                const higherIsBetterFeatures = [
                    record.rr_1d_norm || 0,                    // RQA-1D RR：越高越好
                    record.det_1d_norm || 0,                   // RQA-1D DET：越高越好
                    record.ent_1d_norm || 0,                   // RQA-1D ENT：越高越好
                    record.rr_2d_norm || 0,                    // RQA-2D RR：越高越好
                    record.det_2d_norm || 0,                   // RQA-2D DET：越高越好
                    record.ent_2d_norm || 0                    // RQA-2D ENT：越高越好
                ];
                
                // 合并所有特征
                const allFeatures = [...lowerIsBetterFeatures, ...higherIsBetterFeatures];
                
                // 计算眼动系数（所有特征的平均值，现在方向一致了）
                const eyeMovementCoefficient = allFeatures.reduce((sum, val) => sum + val, 0) / allFeatures.length;
                
                return {
                    ...record,
                    eye_movement_coefficient: eyeMovementCoefficient,
                    valid_features_count: allFeatures.filter(f => f > 0).length
                };
            });
            
            eyeMovementData = processedData;
            console.log('✅ 眼动系数计算完成');
            
            // 更新状态
            updateStatusText('眼动系数计算完成');
            document.getElementById('insightCount').textContent = eyeMovementData.length;
            
            // 启用MMSE对比按钮
            const compareBtn = document.getElementById('compareWithMMSE');
            if (compareBtn) {
                compareBtn.disabled = false;
            }
        }

        // 3. 加载MMSE数据
        async function loadMMSEData() {
            console.log('📋 开始加载MMSE数据');
            
            try {
                const [controlResponse, mciResponse, adResponse] = await Promise.all([
                    fetch('/api/mmse-scores/control'),
                    fetch('/api/mmse-scores/mci'),
                    fetch('/api/mmse-scores/ad')
                ]);
                
                if (!controlResponse.ok || !mciResponse.ok || !adResponse.ok) {
                    throw new Error('无法加载MMSE数据');
                }
                
                const [controlData, mciData, adData] = await Promise.all([
                    controlResponse.json(),
                    mciResponse.json(),
                    adResponse.json()
                ]);
                
                // 合并所有MMSE数据
                mmseData = [
                    ...controlData.map(item => ({...item, group_type: 'control'})),
                    ...mciData.map(item => ({...item, group_type: 'mci'})),
                    ...adData.map(item => ({...item, group_type: 'ad'}))
                ];
                
                console.log('✅ MMSE数据加载成功:', mmseData.length, '条记录');
                
                // 更新UI中的MMSE数据计数
                const mmseScoreCountElement = document.getElementById('mmseScoreCount');
                if (mmseScoreCountElement) {
                    mmseScoreCountElement.textContent = mmseData.length;
                }
                
                return mmseData;
                
            } catch (error) {
                console.error('❌ 加载MMSE数据失败:', error);
                // 重置UI中的MMSE数据计数
                const mmseScoreCountElement = document.getElementById('mmseScoreCount');
                if (mmseScoreCountElement) {
                    mmseScoreCountElement.textContent = '0';
                }
                // API不可用，返回空数据并提示
                alert(getLanguageText('mmseDataLoadFailed'));
                return [];
            }
        }

        // MMSE数据现在从真实数据API加载，移除了模拟生成

        // 生成任务MMSE分数
        function generateTaskMMSEScores(group, taskNum) {
            const basePerformance = {
                'control': 0.85,
                'mci': 0.65,
                'ad': 0.45
            };
            
            const maxScores = {
                1: 5, // Q1: 时间定向（年份1分+季节1分+月份1分+星期2分）
                2: 5, // Q2: 地点定向（省市区2分+街道1分+建筑1分+楼层1分）
                3: 3, // Q3: 即刻记忆
                4: 5, // Q4: 注意力计算
                5: 3  // Q5: 延迟回忆
            };
            
            const maxScore = maxScores[taskNum];
            const performance = basePerformance[group] + (Math.random() - 0.5) * 0.3;
            const score = Math.max(0, Math.min(maxScore, Math.round(maxScore * performance)));
            
            return {
                mmse_score: score,
                mmse_max_score: maxScore,
                performance_ratio: score / maxScore
            };
        }

        // 4. 执行MMSE对比分析
        async function performMMSEComparison() {
            console.log('🔍 开始MMSE对比分析');
            
            if (!eyeMovementData || eyeMovementData.length === 0) {
                alert(getLanguageText('pleaseCalculateCoefficientsFirst'));
                return;
            }
            
            updateStatusText('正在进行MMSE对比分析...');
            
            try {
                // 加载MMSE数据
                if (!mmseData || mmseData.length === 0) {
                    await loadMMSEData();
                } else {
                    // 如果MMSE数据已经存在，更新计数器显示
                    const mmseScoreCountElement = document.getElementById('mmseScoreCount');
                    if (mmseScoreCountElement) {
                        mmseScoreCountElement.textContent = mmseData.length;
                    }
                }
                
                // 执行数据对比分析
                comparisonResults = performDataComparison();
                
                // 更新表格显示
                updateComparisonTable();
                
                // 生成图表
                generateComparisonChart();
                
                // 更新状态
                updateStatusText('MMSE对比分析完成');
                document.getElementById('anomaliesDetected').textContent = comparisonResults.individual.length;
                
                // 自动保存CSV文件
            await autoSaveComparisonCSV();
            
            console.log('✅ MMSE对比分析完成');
                
            } catch (error) {
                console.error('❌ MMSE对比分析失败:', error);
                updateStatusText('MMSE对比分析失败');
                alert(getLanguageText('mmseComparisonFailed'));
            }
        }

        // ID格式转换函数
        function convertEyeMovementIdToMMSEId(eyeMovementSubjectId, groupType) {
            // 从眼动数据的subject_id（如 n1q, m5q, ad3q）提取基础ID
            let baseId = eyeMovementSubjectId;
            
            // 去掉可能的 'q' 后缀
            if (baseId.endsWith('q')) {
                baseId = baseId.slice(0, -1);
            }
            
            // 根据组类型转换格式
            if (groupType === 'control') {
                // n1 -> n01, n10 -> n10
                const match = baseId.match(/^n(\d+)$/);
                if (match) {
                    const num = parseInt(match[1]);
                    return `n${num.toString().padStart(2, '0')}`;
                }
            } else if (groupType === 'mci') {
                // m1 -> M01, m10 -> M10
                const match = baseId.match(/^m(\d+)$/);
                if (match) {
                    const num = parseInt(match[1]);
                    return `M${num.toString().padStart(2, '0')}`;
                }
            } else if (groupType === 'ad') {
                // AD组特殊处理: ad3->ad01, ad4->ad02, ..., ad22->ad20
                // 眼动数据从ad3开始，MMSE数据从ad01开始，需要偏移-2
                const match = baseId.match(/^ad(\d+)$/);
                if (match) {
                    const num = parseInt(match[1]);
                    const mmseNum = num - 2; // 眼动数据ad3对应MMSE数据ad01
                    if (mmseNum >= 1 && mmseNum <= 20) {
                        return `ad${mmseNum.toString().padStart(2, '0')}`;
                    }
                }
            }
            
            return baseId; // 如果转换失败，返回原值
        }

        // 执行数据对比分析
        function performDataComparison() {
            console.log('🔬 执行数据对比分析');
            
            const individualResults = [];
            const groupResults = [];
            const subQuestionResults = [];
            
            // 1. 个人层面对比 - 处理ID格式不一致问题
            eyeMovementData.forEach(eyeRecord => {
                // 转换眼动数据的subject_id为MMSE格式
                const mmseSubjectId = convertEyeMovementIdToMMSEId(eyeRecord.subject_id, eyeRecord.group_type);
                
                // 查找对应的MMSE数据（需要匹配subject_id和task_id）
                let mmseRecord = mmseData.find(mmse => 
                    mmse.subject_id === mmseSubjectId && mmse.task_id === eyeRecord.task_id
                );
                
                if (mmseRecord) {
                    // 主问题级别的对比
                    individualResults.push({
                        subject_id: eyeRecord.subject_id,
                        task_id: eyeRecord.task_id,
                        group_type: eyeRecord.group_type,
                        eye_movement_coefficient: eyeRecord.eye_movement_coefficient,
                        mmse_score: mmseRecord.mmse_score,
                        mmse_max_score: mmseRecord.mmse_max_score,
                        performance_ratio: mmseRecord.performance_ratio
                    });
                    
                    // 子问题级别的对比
                    if (mmseRecord.subQuestions) {
                        mmseRecord.subQuestions.forEach(subQ => {
                            subQuestionResults.push({
                                subject_id: eyeRecord.subject_id,
                                task_id: eyeRecord.task_id,
                                sub_question_id: subQ.sub_question_id,
                                sub_question_name: subQ.sub_question_name,
                                group_type: eyeRecord.group_type,
                                eye_movement_coefficient: eyeRecord.eye_movement_coefficient, // 使用相同的眼动系数
                                sub_question_score: subQ.sub_question_score,
                                sub_question_max_score: subQ.sub_question_max_score,
                                sub_question_performance_ratio: subQ.sub_question_performance_ratio
                            });
                        });
                    }
                } else {
                    console.warn(`⚠️ 未找到匹配的MMSE数据: ${eyeRecord.subject_id} (转换为: ${mmseSubjectId})`);
                }
            });
            
            // 2. 群体层面对比
            const groups = ['control', 'mci', 'ad'];
            const tasks = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'];
            
            groups.forEach(group => {
                tasks.forEach(task => {
                    const groupTaskData = individualResults.filter(item => 
                        item.group_type === group && item.task_id === task
                    );
                    
                    if (groupTaskData.length > 0) {
                        const avgEyeCoeff = groupTaskData.reduce((sum, item) => sum + item.eye_movement_coefficient, 0) / groupTaskData.length;
                        const avgMMSE = groupTaskData.reduce((sum, item) => sum + item.mmse_score, 0) / groupTaskData.length;
                        const correlationCoeff = calculateCorrelation(
                            groupTaskData.map(item => item.eye_movement_coefficient),
                            groupTaskData.map(item => item.mmse_score)
                        );
                        
                        groupResults.push({
                            group_type: group,
                            task_id: task,
                            avg_eye_movement_coefficient: avgEyeCoeff,
                            avg_mmse_score: avgMMSE,
                            subject_count: groupTaskData.length,
                            correlation_coefficient: correlationCoeff,
                            standard_deviation: calculateStandardDeviation(groupTaskData.map(item => item.eye_movement_coefficient))
                        });
                    }
                });
            });
            
            // 3. 子问题群体层面对比
            const subQuestionGroupResults = [];
            const allSubQuestions = [...new Set(subQuestionResults.map(r => r.sub_question_id))];
            
            groups.forEach(group => {
                allSubQuestions.forEach(subQuestionId => {
                    const groupSubData = subQuestionResults.filter(r => 
                        r.group_type === group && r.sub_question_id === subQuestionId
                    );
                    
                    if (groupSubData.length > 0) {
                        const eyeCoeffs = groupSubData.map(r => r.eye_movement_coefficient);
                        const subScores = groupSubData.map(r => r.sub_question_score);
                        
                        const avgEyeCoeff = eyeCoeffs.reduce((sum, val) => sum + val, 0) / eyeCoeffs.length;
                        const avgSubScore = subScores.reduce((sum, val) => sum + val, 0) / subScores.length;
                        const correlation = calculateCorrelation(eyeCoeffs, subScores);
                        const stdDev = calculateStandardDeviation(eyeCoeffs);
                        
                        subQuestionGroupResults.push({
                            sub_question_id: subQuestionId,
                            sub_question_name: groupSubData[0].sub_question_name,
                            group_type: group,
                            subject_count: groupSubData.length,
                            avg_eye_movement_coefficient: avgEyeCoeff,
                            avg_sub_question_score: avgSubScore,
                            avg_sub_question_max_score: groupSubData[0].sub_question_max_score,
                            correlation_coefficient: correlation,
                            standard_deviation: stdDev
                        });
                    }
                });
            });
            
            return {
                individual: individualResults,
                group: groupResults,
                subQuestions: subQuestionResults,
                subQuestionGroups: subQuestionGroupResults
            };
        }

        // 计算相关系数
        function calculateCorrelation(x, y) {
            if (x.length !== y.length || x.length === 0) return 0;
            
            const n = x.length;
            const meanX = x.reduce((sum, val) => sum + val, 0) / n;
            const meanY = y.reduce((sum, val) => sum + val, 0) / n;
            
            let numerator = 0;
            let denomX = 0;
            let denomY = 0;
            
            for (let i = 0; i < n; i++) {
                const diffX = x[i] - meanX;
                const diffY = y[i] - meanY;
                numerator += diffX * diffY;
                denomX += diffX * diffX;
                denomY += diffY * diffY;
            }
            
            if (denomX === 0 || denomY === 0) return 0;
            return numerator / Math.sqrt(denomX * denomY);
        }

        // 计算标准差
        function calculateStandardDeviation(values) {
            if (values.length === 0) return 0;
            
            const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
            const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
            return Math.sqrt(variance);
        }

        // 更新对比表格
        function updateComparisonTable() {
            console.log('📋 更新对比表格');
            
            const tableBody = document.getElementById('comparisonTableBody');
            if (!tableBody || !comparisonResults) return;
            
            let html = '';
            
            if (currentDetailMode === 'subQuestion') {
                // 子问题详细视图
                const subQuestionData = comparisonResults.subQuestions || [];
                subQuestionData.forEach(item => {
                    html += `
                        <tr>
                            <td>${item.subject_id}</td>
                            <td>${item.task_id}</td>
                            <td>${item.sub_question_name}</td>
                            <td><span class="badge bg-${getGroupColor(item.group_type)}">${item.group_type.toUpperCase()}</span></td>
                            <td>${item.eye_movement_coefficient.toFixed(3)}</td>
                            <td>${item.sub_question_score}</td>
                            <td>${item.sub_question_max_score}</td>
                            <td>${(item.sub_question_performance_ratio * 100).toFixed(1)}%</td>
                        </tr>
                    `;
                });
            } else {
                // 主问题视图（原有逻辑）
                const data = currentViewMode === 'individual' ? comparisonResults.individual : comparisonResults.group;
                
                if (currentViewMode === 'individual') {
                    // 个人视图
                    data.forEach(item => {
                        html += `
                            <tr>
                                <td>${item.subject_id}</td>
                                <td>${item.task_id}</td>
                                <td><span class="badge bg-${getGroupColor(item.group_type)}">${item.group_type.toUpperCase()}</span></td>
                                <td>${item.eye_movement_coefficient.toFixed(3)}</td>
                                <td>${item.mmse_score}</td>
                                <td>${item.mmse_max_score}</td>
                                <td>${(item.performance_ratio * 100).toFixed(1)}%</td>
                            </tr>
                        `;
                    });
                } else {
                    // 群体视图
                    data.forEach(item => {
                        html += `
                            <tr>
                                <td><span class="badge bg-${getGroupColor(item.group_type)}">${item.group_type.toUpperCase()}</span></td>
                                <td>${item.task_id}</td>
                                <td>${item.avg_eye_movement_coefficient.toFixed(3)}</td>
                                <td>${item.avg_mmse_score.toFixed(1)}</td>
                                <td>${item.subject_count}</td>
                                <td>${item.correlation_coefficient.toFixed(3)}</td>
                                <td>${item.standard_deviation.toFixed(3)}</td>
                            </tr>
                        `;
                    });
                }
            }
            
            if (html === '') {
                const colCount = currentDetailMode === 'subQuestion' ? 8 : (currentViewMode === 'individual' ? 7 : 7);
                html = `<tr><td colspan="${colCount}" class="text-center text-muted">暂无数据</td></tr>`;
            }
            
            tableBody.innerHTML = html;
        }

        // 获取组别颜色
        function getGroupColor(group) {
            switch (group) {
                case 'control': return 'success';
                case 'mci': return 'warning';
                case 'ad': return 'danger';
                default: return 'secondary';
            }
        }

        // 生成对比图表
        function generateComparisonChart() {
            console.log('📊 生成对比图表');
            
            const chartContainer = document.getElementById('comparisonChartContainer');
            if (!chartContainer || !comparisonResults) return;
            
            // 销毁旧图表
            if (comparisonChart) {
                if (typeof comparisonChart.destroy === 'function') {
                    // 单个图表实例
                    comparisonChart.destroy();
                } else if (typeof comparisonChart === 'object') {
                    // 多个图表实例
                    Object.values(comparisonChart).forEach(chart => {
                        if (chart && typeof chart.destroy === 'function') {
                            chart.destroy();
                        }
                    });
                }
            }
            
            // 创建5个子图的布局：上面3张，下面2张
            chartContainer.innerHTML = `
                <div class="row">
                    <div class="col-md-4 mb-3">
                        <div class="card">
                            <div class="card-header text-center bg-primary text-white">
                                <small><strong>Q1 - 时间定向</strong></small>
                            </div>
                            <div class="card-body p-2">
                                <canvas id="chartQ1" width="400" height="300"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <div class="card">
                            <div class="card-header text-center bg-success text-white">
                                <small><strong>Q2 - 地点定向</strong></small>
                            </div>
                            <div class="card-body p-2">
                                <canvas id="chartQ2" width="400" height="300"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <div class="card">
                            <div class="card-header text-center bg-info text-white">
                                <small><strong>Q3 - 即刻记忆</strong></small>
                            </div>
                            <div class="card-body p-2">
                                <canvas id="chartQ3" width="400" height="300"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <div class="card">
                            <div class="card-header text-center bg-warning text-white">
                                <small><strong>Q4 - 注意力和计算</strong></small>
                            </div>
                            <div class="card-body p-2">
                                <canvas id="chartQ4" width="400" height="300"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="card">
                            <div class="card-header text-center bg-danger text-white">
                                <small><strong>Q5 - 延迟回忆</strong></small>
                            </div>
                            <div class="card-body p-2">
                                <canvas id="chartQ5" width="400" height="300"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // 为每个任务创建图表
            const tasks = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'];
            const groups = ['control', 'mci', 'ad'];
            const colors = {
                'control': 'rgba(40, 167, 69, 0.8)',
                'mci': 'rgba(255, 193, 7, 0.8)',
                'ad': 'rgba(220, 53, 69, 0.8)'
            };
            
            comparisonChart = {}; // 存储多个图表实例
            
            tasks.forEach(taskId => {
                const canvas = document.getElementById(`chart${taskId}`);
                if (!canvas) return;
                
                const ctx = canvas.getContext('2d');
                
                // 准备该任务的数据
                const datasets = [];
                
                if (currentDetailMode === 'subQuestion') {
                    // 子问题详细视图：显示该任务的所有子问题
                    groups.forEach(group => {
                        const groupData = (comparisonResults.subQuestions || [])
                            .filter(item => item.group_type === group && item.task_id === taskId);
                        
                        const chartData = groupData.map(item => ({
                            x: item.eye_movement_coefficient,
                            y: item.sub_question_performance_ratio, // 使用完成率 (0-1)
                            subQuestion: item.sub_question_name,
                            subject: item.subject_id,
                            task: item.task_id,
                            score: item.sub_question_score,
                            maxScore: item.sub_question_max_score
                        }));
                        
                        datasets.push({
                            label: group.toUpperCase(),
                            data: chartData,
                            backgroundColor: colors[group],
                            borderColor: colors[group],
                            borderWidth: 1,
                            pointRadius: 4
                        });
                    });
                } else {
                    // 主问题视图：显示该任务的主问题数据
                    groups.forEach(group => {
                        const groupData = comparisonResults.individual
                            .filter(item => item.group_type === group && item.task_id === taskId);
                        
                        const chartData = groupData.map(item => ({
                            x: item.eye_movement_coefficient,
                            y: item.performance_ratio, // 使用完成率 (0-1)
                            subject: item.subject_id,
                            task: item.task_id,
                            score: item.mmse_score,
                            maxScore: item.mmse_max_score
                        }));
                        
                        datasets.push({
                            label: group.toUpperCase(),
                            data: chartData,
                            backgroundColor: colors[group],
                            borderColor: colors[group],
                            borderWidth: 1,
                            pointRadius: 4
                        });
                    });
                }
                
                // 创建图表
                comparisonChart[taskId] = new Chart(ctx, {
                    type: 'scatter',
                    data: { datasets },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                            legend: {
                                display: taskId === 'Q1', // 只在第一个图表显示图例
                                position: 'top',
                                labels: {
                                    boxWidth: 12,
                                    font: {
                                        size: 10
                                    }
                                }
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        const raw = context.raw;
                                        const ratio = (raw.y * 100).toFixed(1);
                                        let label = `${context.dataset.label}: 眼动系数=${raw.x.toFixed(3)}, 完成率=${ratio}%`;
                                        if (raw.subject) {
                                            label += ` (${raw.subject})`;
                                        }
                                        if (raw.subQuestion) {
                                            label += ` - ${raw.subQuestion}`;
                                        }
                                        if (raw.score !== undefined) {
                                            label += ` [${raw.score}/${raw.maxScore}]`;
                                        }
                                        return label;
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: '眼动系数',
                                    font: {
                                        size: 10
                                    }
                                },
                                min: 0,
                                max: 1,
                                ticks: {
                                    font: {
                                        size: 9
                                    }
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'MMSE完成率',
                                    font: {
                                        size: 10
                                    }
                                },
                                min: 0,
                                max: 1,
                                ticks: {
                                    callback: function(value) {
                                        return (value * 100).toFixed(0) + '%';
                                    },
                                    font: {
                                        size: 9
                                    }
                                }
                            }
                        }
                    }
                });
            });
        }

        // 切换视图模式
        function toggleViewMode() {
            console.log('🔄 切换视图模式');
            
            currentViewMode = currentViewMode === 'individual' ? 'group' : 'individual';
            
            // 更新按钮文本
            const toggleBtn = document.getElementById('toggleViewMode');
            const switchText = currentViewMode === 'individual' ? 
                (currentLanguage === 'zh' ? '切换到群体视图' : 'Switch to Group View') :
                (currentLanguage === 'zh' ? '切换到个人视图' : 'Switch to Individual View');
            
            if (toggleBtn) {
                toggleBtn.querySelector('span').textContent = switchText;
            }
            
            // 切换表头
            const individualHeaders = document.getElementById('individualViewHeaders');
            const groupHeaders = document.getElementById('groupViewHeaders');
            
            if (currentViewMode === 'individual') {
                individualHeaders.style.display = '';
                groupHeaders.style.display = 'none';
            } else {
                individualHeaders.style.display = 'none';
                groupHeaders.style.display = '';
            }
            
            // 更新表格内容
            if (comparisonResults) {
                updateComparisonTable();
            }
        }

        // 切换详细模式（主问题 vs 子问题）
        function toggleDetailMode() {
            currentDetailMode = currentDetailMode === 'main' ? 'subQuestion' : 'main';
            
            const buttonText = document.querySelector('#toggleDetailMode span');
            if (currentDetailMode === 'main') {
                buttonText.setAttribute('data-lang-key', 'switchToSubQuestionView');
                buttonText.textContent = currentLanguage === 'zh' ? '切换到子问题详细视图' : 'Switch to Sub-Question Detail View';
            } else {
                buttonText.setAttribute('data-lang-key', 'switchToMainQuestionView');
                buttonText.textContent = currentLanguage === 'zh' ? '切换到主问题视图' : 'Switch to Main Question View';
            }
            
            // 切换表头显示
            const individualHeaders = document.getElementById('individualViewHeaders');
            const groupHeaders = document.getElementById('groupViewHeaders');
            const subQuestionHeaders = document.getElementById('subQuestionViewHeaders');
            
            if (currentDetailMode === 'main') {
                // 主问题视图：根据当前视图模式显示对应表头
                if (currentViewMode === 'individual') {
                    individualHeaders.style.display = '';
                    groupHeaders.style.display = 'none';
                } else {
                    individualHeaders.style.display = 'none';
                    groupHeaders.style.display = '';
                }
                subQuestionHeaders.style.display = 'none';
            } else {
                // 子问题详细视图：只显示子问题表头
                individualHeaders.style.display = 'none';
                groupHeaders.style.display = 'none';
                subQuestionHeaders.style.display = '';
            }
            
                            updateComparisonTable();
                generateComparisonChart();
                
                // 自动保存CSV文件
                autoSaveComparisonCSV();
        }

        // 导出对比报告 - 修改为保存到模块8目录并根据RQA参数分类
        function exportComparisonReport() {
            console.log('📤 导出对比报告');
            
            if (!comparisonResults) {
                alert(getLanguageText('pleasePerformMmseComparisonFirst'));
                return;
            }
            
            try {
                // 获取当前选择的RQA配置
                const dataSourceSelect = document.getElementById('module7DataSourceSelect');
                const selectedRqaConfig = dataSourceSelect ? dataSourceSelect.value : 'unknown';
                
                // 准备导出数据
                const exportData = {
                    timestamp: new Date().toISOString(),
                    analysis_type: 'eye_movement_mmse_comparison',
                    rqa_config: selectedRqaConfig,
                    data_source: `module7_integrated_features_${selectedRqaConfig}`,
                    individual_results: comparisonResults.individual,
                    group_results: comparisonResults.group,
                    summary: generateReportSummary()
                };
                
                // 创建文件名，包含RQA配置信息
                const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
                const fileName = `Module8_EyeMovement_MMSE_Analysis_${selectedRqaConfig}_${timestamp}.json`;
                
                // 同时保存到服务器（通过API）和本地下载
                saveToModule8Directory(exportData, selectedRqaConfig, fileName);
                
                // 创建本地下载文件
                const dataStr = JSON.stringify(exportData, null, 2);
                const dataBlob = new Blob([dataStr], { type: 'application/json' });
                
                // 下载文件
                const link = document.createElement('a');
                link.href = URL.createObjectURL(dataBlob);
                link.download = fileName;
                link.click();
                
                console.log(`✅ 对比报告导出完成: ${fileName}`);
                
            } catch (error) {
                console.error('❌ 导出报告失败:', error);
                alert(getLanguageText('exportReportFailed'));
            }
        }
        
        // 生成CSV内容的函数
        function generateCSVContent(data, type) {
            if (!data || data.length === 0) return '';
            
            let headers = [];
            let rows = [];
            
            // 根据类型设置不同的表头（英文）
            if (type === 'individual') {
                headers = [
                    'Subject_ID',
                    'Task_ID', 
                    'Group_Type',
                    'Eye_Movement_Coefficient',
                    'MMSE_Score',
                    'MMSE_Max_Score',
                    'Performance_Ratio'
                ];
                
                rows = data.map(item => [
                    item.subject_id || '',
                    item.task_id || '',
                    item.group_type || '',
                    item.eye_movement_coefficient || '',
                    item.mmse_score || '',
                    item.mmse_max_score || '',
                    item.performance_ratio || ''
                ]);
                
            } else if (type === 'group') {
                headers = [
                    'Task_ID',
                    'Group_Type',
                    'Subject_Count',
                    'Avg_Eye_Movement_Coefficient',
                    'Avg_MMSE_Score',
                    'Correlation_Coefficient',
                    'Standard_Deviation'
                ];
                
                rows = data.map(item => [
                    item.task_id || '',
                    item.group_type || '',
                    item.subject_count || '',
                    item.avg_eye_movement_coefficient || '',
                    item.avg_mmse_score || '',
                    item.correlation_coefficient || '',
                    item.standard_deviation || ''
                ]);
                
            } else if (type === 'subQuestion') {
                headers = [
                    'Subject_ID',
                    'Task_ID',
                    'Sub_Question_ID',
                    'Sub_Question_Name',
                    'Group_Type',
                    'Eye_Movement_Coefficient',
                    'Sub_Question_Score',
                    'Sub_Question_Max_Score',
                    'Sub_Question_Performance_Ratio'
                ];
                
                rows = data.map(item => [
                    item.subject_id || '',
                    item.task_id || '',
                    item.sub_question_id || '',
                    item.sub_question_name || '',
                    item.group_type || '',
                    item.eye_movement_coefficient || '',
                    item.sub_question_score || '',
                    item.sub_question_max_score || '',
                    item.sub_question_performance_ratio || ''
                ]);
            }
            
            // 生成CSV内容
            const csvContent = [
                headers.join(','),
                ...rows.map(row => row.map(cell => {
                    // 处理包含逗号或引号的单元格
                    const cellStr = String(cell);
                    if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
                        return `"${cellStr.replace(/"/g, '""')}"`;
                    }
                    return cellStr;
                }).join(','))
            ].join('\n');
            
            return csvContent;
        }
        
        // 保存CSV文件到模块8目录
        async function saveCSVToModule8(csvContent, rqaConfig, fileName) {
            try {
                const response = await fetch('/api/save-module8-results', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data: csvContent,
                        rqa_config: rqaConfig,
                        filename: fileName,
                        content_type: 'text/csv'
                    })
                });
                
                if (response.ok) {
                    console.log(`✅ CSV文件已保存: ${fileName}`);
                    return true;
                } else {
                    console.error('❌ CSV保存失败:', response.statusText);
                    return false;
                }
            } catch (error) {
                console.error('❌ CSV保存异常:', error);
                return false;
            }
        }
        
        // 自动生成并保存三种类型的CSV文件
        async function autoSaveComparisonCSV() {
            if (!comparisonResults) {
                console.log('⚠️ 没有对比结果数据，跳过CSV保存');
                return;
            }
            
            // 获取当前选择的RQA配置
            const dataSourceSelect = document.getElementById('module7DataSourceSelect');
            const selectedRqaConfig = dataSourceSelect ? dataSourceSelect.value : '';
            
            if (!selectedRqaConfig) {
                console.log('⚠️ 未选择RQA配置，跳过CSV保存');
                return;
            }
            
            console.log('📊 开始自动保存对比表格CSV文件...');
            
            // 生成时间戳
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
            
            const savePromises = [];
            
            // 1. 保存个人视图数据
            if (comparisonResults.individual && comparisonResults.individual.length > 0) {
                const individualCSV = generateCSVContent(comparisonResults.individual, 'individual');
                const individualFileName = `individual_comparison_${selectedRqaConfig}_${timestamp}.csv`;
                savePromises.push(saveCSVToModule8(individualCSV, selectedRqaConfig, individualFileName));
                console.log(`📝 生成个人视图CSV: ${individualFileName}`);
            }
            
            // 2. 保存群体视图数据
            if (comparisonResults.group && comparisonResults.group.length > 0) {
                const groupCSV = generateCSVContent(comparisonResults.group, 'group');
                const groupFileName = `group_comparison_${selectedRqaConfig}_${timestamp}.csv`;
                savePromises.push(saveCSVToModule8(groupCSV, selectedRqaConfig, groupFileName));
                console.log(`📝 生成群体视图CSV: ${groupFileName}`);
            }
            
            // 3. 保存子问题详细视图数据
            if (comparisonResults.subQuestions && comparisonResults.subQuestions.length > 0) {
                const subQuestionCSV = generateCSVContent(comparisonResults.subQuestions, 'subQuestion');
                const subQuestionFileName = `subquestion_comparison_${selectedRqaConfig}_${timestamp}.csv`;
                savePromises.push(saveCSVToModule8(subQuestionCSV, selectedRqaConfig, subQuestionFileName));
                console.log(`📝 生成子问题视图CSV: ${subQuestionFileName}`);
            }
            
            // 等待所有保存操作完成
            try {
                const results = await Promise.all(savePromises);
                const successCount = results.filter(r => r).length;
                console.log(`✅ CSV文件保存完成: ${successCount}/${results.length} 个文件成功保存`);
            } catch (error) {
                console.error('❌ CSV文件批量保存失败:', error);
            }
        }

        // 保存到模块8目录
        async function saveToModule8Directory(exportData, rqaConfig, fileName) {
            try {
                console.log(`💾 保存分析结果到模块8目录: ${rqaConfig}/${fileName}`);
                
                const response = await fetch('/api/save-module8-results', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        rqa_config: rqaConfig,
                        file_name: fileName,
                        data: exportData
                    })
                });
                
                if (response.ok) {
                    console.log('✅ 分析结果已保存到模块8目录');
                } else {
                    console.log('⚠️ 无法保存到服务器，仅提供本地下载');
                }
            } catch (error) {
                console.log('⚠️ 服务器保存失败，仅提供本地下载:', error);
            }
        }

        // 生成报告摘要
        function generateReportSummary() {
            if (!comparisonResults) return {};
            
            const summary = {
                total_subjects: new Set(comparisonResults.individual.map(item => item.subject_id)).size,
                total_sessions: comparisonResults.individual.length,
                group_summary: {}
            };
            
            ['control', 'mci', 'ad'].forEach(group => {
                const groupData = comparisonResults.individual.filter(item => item.group_type === group);
                if (groupData.length > 0) {
                    summary.group_summary[group] = {
                        subject_count: new Set(groupData.map(item => item.subject_id)).size,
                        avg_eye_coefficient: groupData.reduce((sum, item) => sum + item.eye_movement_coefficient, 0) / groupData.length,
                        avg_mmse_score: groupData.reduce((sum, item) => sum + item.mmse_score, 0) / groupData.length,
                        correlation: calculateCorrelation(
                            groupData.map(item => item.eye_movement_coefficient),
                            groupData.map(item => item.mmse_score)
                        )
                    };
                }
            });
            
            return summary;
        }

        // 更新状态文本
        function updateStatusText(text) {
            const statusElement = document.getElementById('aiStatusText');
            if (statusElement) {
                statusElement.textContent = text;
            }
        }

        // 调用模块8的智能分析初始化函数
        function initIntelligentAnalysis() {
            console.log('🚀 初始化智能分析模块');
            initEyeMovementMMSEAnalysis();
        }



        console.log('🧠 模块8眼动系数与MMSE对比分析模块脚本加载完成');
        // ================= 模块8：眼动系数与MMSE对比分析 JavaScript 代码结束 =================

        // ================= 模块9：机器学习预测分析 JavaScript 代码开始 =================
        
        // 全局变量
        let mlCurrentConfig = null;
        let mlPreprocessedData = null;

        // 模块9导航切换函数
        // 显示特征方向验证状态
        function showDirectionValidationStatus(isValid, message) {
            const statusElement = document.getElementById('directionValidationStatus');
            const messageElement = document.getElementById('validationMessage');
            
            if (statusElement && messageElement) {
                statusElement.style.display = 'block';
                messageElement.textContent = message;
                
                const alertDiv = statusElement.querySelector('.alert');
                if (isValid) {
                    alertDiv.className = 'alert alert-success alert-sm mb-0';
                    messageElement.innerHTML = `<i class="fas fa-check-circle text-success"></i> ${message}`;
                } else {
                    alertDiv.className = 'alert alert-warning alert-sm mb-0';
                    messageElement.innerHTML = `<i class="fas fa-exclamation-triangle text-warning"></i> ${message}`;
                }
            }
        }
        
        function switchToNinthModule() {
            // 隐藏所有其他视图
            document.querySelectorAll('.enhanced-visualization-container, .new-feature-view, .rqa-analysis-view, .event-analysis-view, .rqa-pipeline-view, .feature-extraction-view, .seventh-module-view, .eighth-module-view, .ninth-module-view, .tenth-module-view').forEach(view => {
                view.style.display = 'none';
            });
            
            // 显示模块9视图
            const ninthView = document.getElementById('ninthModuleView');
            if (ninthView) {
                ninthView.style.display = 'block';
                
                // 更新导航菜单激活状态
                document.querySelectorAll('.sidebar-nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                document.querySelector('[data-view="ninthModule"]').classList.add('active');
                
                // 初始化模块9
                initNinthModule();
                
                console.log('✅ 切换到模块9 - 机器学习预测分析');
            }
        }

        // 初始化模块9
        function initNinthModule() {
    // 初始化训练方法选择
    onTrainingMethodChange();
    
    // 隐藏结果区域
    document.getElementById('cvResultsSection').style.display = 'none';
    document.getElementById('testEvaluationSection').style.display = 'none';
    
    // 重置CV进度
    document.getElementById('cvTrainingProgress').style.display = 'none';
            console.log('🚀 初始化模块9 - 机器学习预测分析');
            
            // 加载可用的RQA配置
            loadMLAvailableConfigs();
            
            // 初始化UI状态
            resetMLUI();
        }

        // 加载可用的RQA配置
        async function loadMLAvailableConfigs() {
            try {
                console.log('📂 加载可用的RQA配置...');
                
                const response = await fetch('/api/ml/available-configs');
                const data = await response.json();
                
                const selectElement = document.getElementById('mlRqaConfigSelect');
                
                if (data.success && data.configs.length > 0) {
                    selectElement.innerHTML = '<option value="">请选择RQA配置...</option>';
                    
                    data.configs.forEach(config => {
                        const option = document.createElement('option');
                        option.value = config.id;
                        option.textContent = `${config.display_name} (${config.file_count}个文件)`;
                        selectElement.appendChild(option);
                    });
                    
                    // 添加选择事件监听器
                    selectElement.addEventListener('change', onMLConfigChange);
                    
                    console.log(`✅ 加载了 ${data.configs.length} 个RQA配置`);
                } else {
                    selectElement.innerHTML = '<option value="">暂无可用配置</option>';
                    console.log('⚠️ 未找到可用的RQA配置');
                }
                
            } catch (error) {
                console.error('❌ 加载RQA配置失败:', error);
                document.getElementById('mlRqaConfigSelect').innerHTML = '<option value="">加载失败</option>';
            }
        }

        // RQA配置选择变化事件
        function onMLConfigChange(event) {
            const selectedConfig = event.target.value;
            
            if (selectedConfig) {
                mlCurrentConfig = selectedConfig;
                
                // 启用按钮
                document.getElementById('preprocessDataBtn').disabled = false;
                document.getElementById('refreshDataBtn').disabled = false;
                
                // 更新状态
                updateMLStatus('ready', `已选择配置: ${selectedConfig}`);
                
                console.log(`📋 选择了RQA配置: ${selectedConfig}`);
            } else {
                mlCurrentConfig = null;
                
                // 禁用按钮
                document.getElementById('preprocessDataBtn').disabled = true;
                document.getElementById('refreshDataBtn').disabled = true;
                
                // 重置状态
                resetMLUI();
            }
        }

        // 开始数据预处理
        async function startDataPreprocessing() {
            if (!mlCurrentConfig) {
                alert('请先选择RQA配置');
                return;
            }
            
            try {
                console.log('🚀 开始数据预处理...');
                
                // 更新UI状态
                updateMLStatus('processing', '正在处理数据...');
                document.getElementById('preprocessDataBtn').disabled = true;
                
                // 清空日志
                const logElement = document.getElementById('mlProcessingLog');
                logElement.innerHTML = '';
                
                addLog('🚀 开始执行模块9.1数据预处理');
                addLog(`📋 使用RQA配置: ${mlCurrentConfig}`);
                
                // 获取特征方向校正配置
                const enableDirectionCorrection = document.getElementById('enableFeatureCorrection').checked;
                addLog(`🔄 特征方向校正: ${enableDirectionCorrection ? '启用' : '禁用'}`);
                
                // 调用后端API
                const response = await fetch('/api/ml/preprocess-data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        rqa_config: mlCurrentConfig,
                        enable_direction_correction: enableDirectionCorrection
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // 处理成功
                    mlPreprocessedData = result;
                    
                    addLog('✅ 数据预处理完成！');
                    addLog(`📊 数据统计: ${result.stats.total_samples}个样本, ${result.stats.feature_count}个特征`);
                    
                    // 显示特征方向验证结果
                    if (enableDirectionCorrection && result.stats.direction_validation) {
                        const validation = result.stats.direction_validation;
                        if (validation.all_positive) {
                            addLog('✅ 特征方向验证: 所有特征与MMSE总分正相关');
                            showDirectionValidationStatus(true, '所有特征已统一为正相关方向');
                        } else {
                            addLog(`⚠️ 特征方向验证: 发现负相关特征 ${validation.negative_features.join(', ')}`);
                            showDirectionValidationStatus(false, `发现负相关特征: ${validation.negative_features.join(', ')}`);
                        }
                        
                        // 显示变换信息
                        if (result.stats.feature_transforms && result.stats.feature_transforms.length > 0) {
                            addLog(`🔄 应用了 ${result.stats.feature_transforms.length} 个特征变换`);
                        }
                    }
                    
                    // 更新统计信息
                    updateMLStatistics(result.stats);
                    
                    // 更新状态
                    updateMLStatus('completed', '数据预处理完成');
                    
                    // 显示后续模块
                    showNextModules();
                    
                    console.log('✅ 数据预处理完成:', result);
                } else {
                    // 处理失败
                    addLog(`❌ 处理失败: ${result.error}`);
                    updateMLStatus('error', `处理失败: ${result.error}`);
                    console.error('❌ 数据预处理失败:', result.error);
                }
                
            } catch (error) {
                console.error('❌ 数据预处理异常:', error);
                updateMLStatus('error', `处理异常: ${error.message}`);
                
                const logElement = document.getElementById('mlProcessingLog');
                logElement.innerHTML += `❌ 处理异常: ${error.message}\n`;
            } finally {
                // 恢复按钮状态
                document.getElementById('preprocessDataBtn').disabled = false;
            }
        }

        // 更新机器学习状态
        function updateMLStatus(status, detail) {
            const statusElement = document.getElementById('mlDataStatus');
            const detailElement = document.getElementById('mlDataStatusDetail');
            
            switch (status) {
                case 'ready':
                    statusElement.className = 'badge bg-primary';
                    statusElement.innerHTML = '<span data-lang-key="ready">就绪</span>';
                    break;
                case 'processing':
                    statusElement.className = 'badge bg-warning';
                    statusElement.innerHTML = '<span data-lang-key="processing">处理中</span>';
                    break;
                case 'completed':
                    statusElement.className = 'badge bg-success';
                    statusElement.innerHTML = '<span data-lang-key="completed">完成</span>';
                    break;
                case 'error':
                    statusElement.className = 'badge bg-danger';
                    statusElement.innerHTML = '<span data-lang-key="error">错误</span>';
                    break;
                default:
                    statusElement.className = 'badge bg-secondary';
                    statusElement.innerHTML = '<span data-lang-key="notProcessed">未处理</span>';
            }
            
            if (detail) {
                detailElement.textContent = detail;
            }
        }

        // 更新统计信息
        function updateMLStatistics(stats) {
            document.getElementById('mlTotalSamples').textContent = stats.total_samples || '-';
            document.getElementById('mlTrainSamples').textContent = stats.train_samples || '-';
            document.getElementById('mlTestSamples').textContent = stats.test_samples || '-';
            document.getElementById('mlFeatureCount').textContent = stats.feature_count || '-';
        }

        // 显示后续模块
        function showNextModules() {
            document.getElementById('modelTrainingSection').style.display = 'block';
            document.getElementById('predictionVisualizationSection').style.display = 'block';
        }

        // 刷新机器学习数据
        function refreshMLData() {
            console.log('🔄 刷新机器学习数据');
            
            // 重新加载配置
            loadMLAvailableConfigs();
            
            // 重置UI
            resetMLUI();
        }

        // 更新测试集评估结果表格
        function updateTestEvaluationTable(detailedEval, stats) {
            if (!detailedEval) return;
            
            console.log('🎯 开始更新测试集评估表格', detailedEval);
            
            // 显示测试集评估结果区域
            document.getElementById('testEvaluationSection').style.display = 'block';
            
            // 更新整体性能指标
            const overall = detailedEval.overall;
            if (overall) {
                document.getElementById('overallMSE').textContent = overall.mse.toFixed(4);
                document.getElementById('overallRMSE').textContent = overall.rmse.toFixed(4);
                document.getElementById('overallMAE').textContent = overall.mae.toFixed(4);
                document.getElementById('overallR2').textContent = overall.r2.toFixed(4);
                
                // R²值的颜色处理
                const r2Element = document.getElementById('overallR2');
                if (overall.r2 < 0) {
                    r2Element.className = 'text-danger';
                } else if (overall.r2 < 0.5) {
                    r2Element.className = 'text-warning';
                } else {
                    r2Element.className = 'text-success';
                }
            }
            
            // 更新各子分数详细表格
            const subscoreTableBody = document.getElementById('subscoreTableBody');
            subscoreTableBody.innerHTML = '';
            
            if (detailedEval.subscore_results) {
                detailedEval.subscore_results.forEach(sub => {
                    const row = document.createElement('tr');
                    
                    // 性能评级判断
                    let performanceClass = '';
                    let performanceText = '';
                    if (sub.relative_error < 15 && sub.r2 > 0.7) {
                        performanceClass = 'badge-success';
                        performanceText = '优秀';
                    } else if (sub.relative_error < 25 && sub.r2 > 0.5) {
                        performanceClass = 'badge-primary';
                        performanceText = '良好';
                    } else if (sub.relative_error < 35 && sub.r2 > 0.3) {
                        performanceClass = 'badge-warning';
                        performanceText = '中等';
                    } else {
                        performanceClass = 'badge-danger';
                        performanceText = '需改进';
                    }
                    
                    // R²值的颜色处理
                    let r2Color = sub.r2 < 0 ? 'text-danger' : (sub.r2 < 0.5 ? 'text-warning' : 'text-success');
                    
                    row.innerHTML = `
                        <td><strong>${sub.name}</strong></td>
                        <td class="text-center">${sub.max_score}</td>
                        <td class="text-center">${sub.mae.toFixed(3)}</td>
                        <td class="text-center">
                            <span class="${sub.relative_error > 50 ? 'text-danger' : (sub.relative_error > 30 ? 'text-warning' : 'text-success')}">
                                ${sub.relative_error.toFixed(1)}%
                            </span>
                        </td>
                        <td class="text-center">${sub.rmse.toFixed(3)}</td>
                        <td class="text-center">
                            <span class="${r2Color}">${sub.r2.toFixed(3)}</span>
                        </td>
                        <td class="text-center">
                            <span class="badge ${performanceClass}">${performanceText}</span>
                        </td>
                    `;
                    
                    subscoreTableBody.appendChild(row);
                });
            }
            
            // 更新性能分级评估
            if (detailedEval.performance_grade) {
                const gradeEmojis = {
                    '优秀': '🏆',
                    '良好': '🥈', 
                    '中等': '🥉',
                    '需改进': '⚠️'
                };
                const gradeColors = {
                    '优秀': 'text-success',
                    '良好': 'text-primary', 
                    '中等': 'text-warning',
                    '需改进': 'text-danger'
                };
                
                const emoji = gradeEmojis[detailedEval.performance_grade] || '📊';
                const colorClass = gradeColors[detailedEval.performance_grade] || 'text-secondary';
                
                const gradeDisplay = document.getElementById('performanceGradeDisplay');
                gradeDisplay.innerHTML = `<span class="${colorClass}">${emoji} ${detailedEval.performance_grade}</span>`;
                
                document.getElementById('avgRelativeErrorDisplay').textContent = `${detailedEval.avg_relative_error.toFixed(1)}%`;
                document.getElementById('avgR2Display').textContent = detailedEval.avg_r2.toFixed(3);
            }
            
            // 更新泛化分析
            if (detailedEval.overfitting_ratio && stats) {
                document.getElementById('overfittingRatioDisplay').textContent = detailedEval.overfitting_ratio.toFixed(2);
                document.getElementById('generalizationGapDisplay').textContent = detailedEval.generalization_gap.toFixed(4);
                
                // 计算训练-测试差距
                if (overall) {
                    const trainTestGap = Math.abs(overall.mse - stats.final_train_loss);
                    document.getElementById('trainTestGapDisplay').textContent = trainTestGap.toFixed(4);
                }
            }
            
            console.log('✅ 测试集评估表格更新完成');
        }

        // 重置机器学习UI
        function resetMLUI() {
            // 重置状态
            updateMLStatus('default', '选择RQA配置开始处理');
            
            // 重置统计信息
            updateMLStatistics({});
            
            // 清空日志
            document.getElementById('mlProcessingLog').innerHTML = '<span data-lang-key="noLogYet">暂无日志...</span>';
            
            // 隐藏后续模块
            document.getElementById('modelTrainingSection').style.display = 'none';
            document.getElementById('predictionVisualizationSection').style.display = 'none';
            document.getElementById('testEvaluationSection').style.display = 'none';
            
            // 重置全局变量
            mlPreprocessedData = null;
            
            // 重置训练UI
            resetTrainingUI();
        }

        // =================== 通用日志函数 ===================
        
        // 全局日志函数
        function addLog(message) {
            const logElement = document.getElementById('mlProcessingLog');
            if (logElement) {
                const timestamp = new Date().toLocaleTimeString();
                logElement.innerHTML += `[${timestamp}] ${message}\n`;
                logElement.scrollTop = logElement.scrollHeight;
            } else {
                console.log(`[ML Log] ${message}`);
            }
        }
        
        // =================== 子模块9.2: MLP模型训练相关函数 ===================
        
        // 模型预设变化处理
        function onModelPresetChange() {
            const preset = document.getElementById('modelPresetSelect').value;
            const customGroup = document.getElementById('customLayersGroup');
            const hiddenLayersInput = document.getElementById('hiddenLayersConfig');
            
            if (preset === 'custom') {
                customGroup.style.display = 'block';
            } else {
                customGroup.style.display = 'none';
                
                // 设置预设配置
                const presets = {
                    'simple': '32',
                    'moderate': '64,32', 
                    'complex': '64,32,16'
                };
                hiddenLayersInput.value = presets[preset] || '32';
            }
        }
        
        // 开始MLP训练
        // 训练方法切换
function onTrainingMethodChange() {
    const method = document.getElementById('trainingMethodSelect').value;
    const cvParamsGroup = document.getElementById('cvParamsGroup');
    const regularizationGroup = document.getElementById('regularizationGroup');
    
    if (method === 'cv') {
        cvParamsGroup.style.display = 'block';
        regularizationGroup.style.display = 'none';  // CV有自己的正则化参数
    } else {
        cvParamsGroup.style.display = 'none';
        regularizationGroup.style.display = 'block';
    }
}

// 统一训练入口
async function startTraining() {
    const method = document.getElementById('trainingMethodSelect').value;
    
    if (method === 'cv') {
        await startCVTraining();
    } else {
        await startMLPTraining();
    }
}

// 5-fold交叉验证训练
async function startCVTraining() {
    try {
        // 检查是否有预处理数据
        if (!mlCurrentConfig) {
            alert('请先完成数据预处理步骤');
            return;
        }
        
        addLog('🚀 开始5-fold交叉验证训练');
        
        // 获取CV参数
        const cvParams = {
            n_splits: parseInt(document.getElementById('cvFoldsConfig').value),
            patience: parseInt(document.getElementById('cvPatienceConfig').value),
            epochs: parseInt(document.getElementById('cvEpochsConfig').value),
            dropout: parseFloat(document.getElementById('cvDropoutConfig').value),
            l2_reg: parseFloat(document.getElementById('cvL2Config').value),
            batch_size: 8  // 专家建议固定为8
        };
        
        addLog(`🔧 CV参数配置: ${JSON.stringify(cvParams, null, 2)}`);
        
        // 禁用训练按钮
        const startBtn = document.getElementById('startTrainingBtn');
        startBtn.disabled = true;
        startBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> CV训练中...';
        
        // 显示CV进度区域
        document.getElementById('cvTrainingProgress').style.display = 'block';
        updateCVProgress(0, 5, '正在初始化CV训练...');
        
        // 发送CV训练请求
        const response = await fetch('/api/ml/cv-train', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                config_name: mlCurrentConfig,
                cv_params: cvParams
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            addLog('✅ 5-fold交叉验证训练完成!');
            
            // 显示CV结果
            displayCVResults(result);
            
            // 隐藏进度，显示结果
            document.getElementById('cvTrainingProgress').style.display = 'none';
            document.getElementById('cvResultsSection').style.display = 'block';
            
        } else {
            addLog(`❌ CV训练失败: ${result.error}`);
            alert(`CV训练失败: ${result.error}`);
        }
        
    } catch (error) {
        addLog(`❌ CV训练请求失败: ${error.message}`);
        console.error('CV训练错误:', error);
        alert(`CV训练请求失败: ${error.message}`);
    } finally {
        // 恢复训练按钮
        const startBtn = document.getElementById('startTrainingBtn');
        startBtn.disabled = false;
        startBtn.innerHTML = '<i class="fas fa-play"></i> 开始训练';
        
        // 隐藏进度
        document.getElementById('cvTrainingProgress').style.display = 'none';
    }
}

// 更新CV训练进度
function updateCVProgress(current, total, status) {
    const progress = (current / total) * 100;
    const progressBar = document.getElementById('cvProgressBar');
    const progressText = document.getElementById('cvProgressText');
    const statusText = document.getElementById('cvCurrentStatus');
    
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
    if (progressText) {
        progressText.textContent = `${current}/${total} 折叠完成`;
    }
    if (statusText) {
        statusText.textContent = status;
    }
}

// 显示CV结果
function displayCVResults(result) {
    // 集成性能指标
    const ensembleMetrics = result.ensemble_metrics;
    document.getElementById('cvEnsembleRMSE').textContent = ensembleMetrics.rmse.toFixed(4);
    document.getElementById('cvEnsembleMAE').textContent = ensembleMetrics.mae.toFixed(4);
    document.getElementById('cvEnsembleR2').textContent = ensembleMetrics.r2.toFixed(4);
    
    // CV统计
    const cvStats = result.cv_stats;
    document.getElementById('cvMeanRMSE').textContent = 
        `${cvStats.cv_rmse_mean.toFixed(4)} ± ${cvStats.cv_rmse_std.toFixed(4)}`;
    
    // 折叠详细结果
    const foldResults = document.getElementById('cvFoldResults');
    foldResults.innerHTML = '';
    
    result.fold_metrics.forEach((fold, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>Fold ${index + 1}</td>
            <td>${fold.val_rmse.toFixed(4)}</td>
            <td>${fold.val_mae.toFixed(4)}</td>
            <td>${fold.val_r2.toFixed(4)}</td>
            <td>${fold.best_epoch}</td>
            <td>${fold.final_train_loss.toFixed(4)}</td>
            <td>${fold.final_val_loss.toFixed(4)}</td>
        `;
        foldResults.appendChild(row);
    });
    
    // 详细子分数性能
    const detailedResults = document.getElementById('cvDetailedResults');
    detailedResults.innerHTML = '';
    
    const targetNames = ['Q1_subscore', 'Q2_subscore', 'Q3_subscore', 'Q4_subscore', 'Q5_subscore'];
    const targetLabels = ['时间定向', '空间定向', '即时记忆', '注意/计算', '延迟回忆'];
    const maxScores = [5, 5, 3, 5, 3];
    
    targetNames.forEach((target, index) => {
        const metrics = result.detailed_metrics[target];
        const relativeError = (metrics.mae / maxScores[index]) * 100;
        
        // 性能等级
        let grade = '需改进';
        let gradeClass = 'bg-danger';
        if (metrics.r2 > 0.5) {
            grade = '优秀';
            gradeClass = 'bg-success';
        } else if (metrics.r2 > 0.2) {
            grade = '良好';
            gradeClass = 'bg-warning';
        } else if (metrics.r2 > 0) {
            grade = '一般';
            gradeClass = 'bg-info';
        }
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${targetLabels[index]} (Q${index + 1})</td>
            <td>${metrics.rmse.toFixed(4)}</td>
            <td>${metrics.mae.toFixed(4)}</td>
            <td>${metrics.r2.toFixed(4)}</td>
            <td>${relativeError.toFixed(1)}%</td>
            <td><span class="badge ${gradeClass}">${grade}</span></td>
        `;
        detailedResults.appendChild(row);
    });
    
    // 记录详细日志
    addLog('📊 CV结果详情:');
    addLog(`  🎯 集成RMSE: ${ensembleMetrics.rmse.toFixed(4)}`);
    addLog(`  📏 集成MAE: ${ensembleMetrics.mae.toFixed(4)}`);
    addLog(`  📈 集成R²: ${ensembleMetrics.r2.toFixed(4)}`);
    addLog(`  📊 CV RMSE: ${cvStats.cv_rmse_mean.toFixed(4)} ± ${cvStats.cv_rmse_std.toFixed(4)}`);
    addLog(`  🏆 最佳折叠: Fold ${cvStats.best_fold + 1}`);
}

async function startMLPTraining() {
            if (!mlCurrentConfig) {
                alert('请先选择RQA配置并完成数据预处理');
                return;
            }
            
            try {
                console.log('🚀 开始优化的MLP模型训练...');
                
                // 收集训练参数
                let hiddenLayersText;
                const preset = document.getElementById('modelPresetSelect').value;
                
                if (preset === 'custom') {
                    hiddenLayersText = document.getElementById('hiddenLayersConfig').value;
                } else {
                    const presets = {
                        'simple': '32',
                        'moderate': '64,32',
                        'complex': '64,32,16'
                    };
                    hiddenLayersText = presets[preset];
                }
                
                const hiddenLayers = hiddenLayersText.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x));
                
                if (hiddenLayers.length === 0) {
                    alert('请输入有效的隐藏层配置，例如: 32 或 64,32');
                    return;
                }
                
                const modelParams = {
                    model_type: preset,
                    hidden_layers: hiddenLayers,
                    epochs: parseInt(document.getElementById('epochsConfig').value),
                    batch_size: parseInt(document.getElementById('batchSizeConfig').value),
                    learning_rate: parseFloat(document.getElementById('learningRateConfig').value),
                    validation_split: parseFloat(document.getElementById('validationSplitConfig').value),
                    early_stopping_patience: parseInt(document.getElementById('earlyStoppingConfig').value),
                    // 正则化参数
                    use_dropout: document.getElementById('useDropout').checked,
                    dropout_rate: parseFloat(document.getElementById('dropoutRateConfig').value),
                    use_l2_regularization: document.getElementById('useL2Reg').checked,
                    l2_lambda: parseFloat(document.getElementById('l2LambdaConfig').value)
                };
                
                console.log('⚙️ 优化训练参数:', modelParams);
                
                // 更新UI状态
                updateTrainingStatus('training', '正在训练模型...');
                document.getElementById('startTrainingBtn').disabled = true;
                document.getElementById('startTrainingBtn').innerHTML = '<i class="fas fa-spinner fa-spin"></i> 训练中...';
                
                // 清空训练日志
                const logElement = document.getElementById('mlTrainingLog');
                logElement.innerHTML = '';
                
                // 添加日志函数
                function addTrainingLog(message) {
                    const timestamp = new Date().toLocaleTimeString();
                    logElement.innerHTML += `[${timestamp}] ${message}\n`;
                    logElement.scrollTop = logElement.scrollHeight;
                }
                
                addTrainingLog('🚀 开始MLP模型训练');
                addTrainingLog(`📋 使用配置: ${mlCurrentConfig}`);
                addTrainingLog(`⚙️ 模型参数: ${JSON.stringify(modelParams, null, 2)}`);
                
                // 调用后端API
                const response = await fetch('/api/ml/train-model', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        config_name: mlCurrentConfig,
                        model_params: modelParams
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // 训练成功
                    console.log('✅ MLP模型训练完成');
                    addTrainingLog('✅ MLP模型训练完成!');
                    
                    updateTrainingStatus('completed', '训练完成');
                    
                    // 更新训练统计信息
                    const stats = result.training_stats;
                    const detailedEval = result.detailed_evaluation;
                    
                    console.log('📊 训练结果数据:', {
                        stats: stats,
                        detailedEval: detailedEval,
                        hasDetailedEval: !!detailedEval
                    });
                    
                    if (stats) {
                        document.getElementById('mlCurrentEpoch').textContent = stats.epochs_trained || '-';
                        document.getElementById('mlTrainingLoss').textContent = stats.final_train_loss ? stats.final_train_loss.toFixed(4) : '-';
                        document.getElementById('mlValidationLoss').textContent = stats.final_val_loss ? stats.final_val_loss.toFixed(4) : '-';
                        
                        // 显示详细测试集MAE而不是验证损失
                        if (detailedEval && detailedEval.overall) {
                            document.getElementById('mlTestMAE').textContent = detailedEval.overall.mae.toFixed(4);
                        } else {
                            document.getElementById('mlTestMAE').textContent = stats.best_val_loss ? stats.best_val_loss.toFixed(4) : '-';
                        }
                        
                        addTrainingLog(`📊 训练轮数: ${stats.epochs_trained}`);
                        addTrainingLog(`📈 最终训练损失: ${stats.final_train_loss?.toFixed(4)}`);
                        addTrainingLog(`📉 最终验证损失: ${stats.final_val_loss?.toFixed(4)}`);
                        addTrainingLog(`🎯 最佳验证损失: ${stats.best_val_loss?.toFixed(4)}`);
                    }
                    
                    // 显示详细测试集评估结果
                    if (detailedEval) {
                        addTrainingLog(`🎯 详细测试集性能分析:`);
                        
                        const overall = detailedEval.overall;
                        if (overall) {
                            addTrainingLog(`  TEST MSE: ${overall.mse.toFixed(4)}`);
                            addTrainingLog(`  TEST RMSE: ${overall.rmse.toFixed(4)}`);
                            addTrainingLog(`  TEST MAE: ${overall.mae.toFixed(4)}`);
                            addTrainingLog(`  TEST R²: ${overall.r2.toFixed(4)}`);
                        }
                        
                        // 各子分数详细性能
                        if (detailedEval.subscore_results) {
                            addTrainingLog(`📋 各MMSE子分数详细性能:`);
                            detailedEval.subscore_results.forEach(sub => {
                                addTrainingLog(`  ${sub.name}:`);
                                addTrainingLog(`    MAE: ${sub.mae.toFixed(3)} (相对误差: ${sub.relative_error.toFixed(1)}%)`);
                                addTrainingLog(`    RMSE: ${sub.rmse.toFixed(3)}`);
                                addTrainingLog(`    R²: ${sub.r2.toFixed(3)}`);
                                addTrainingLog(`    满分: ${sub.max_score}`);
                            });
                        }
                        
                        // 性能分级评估
                        if (detailedEval.performance_grade) {
                            const gradeEmojis = {
                                '优秀': '🏆',
                                '良好': '🥈', 
                                '中等': '🥉',
                                '需改进': '⚠️'
                            };
                            const emoji = gradeEmojis[detailedEval.performance_grade] || '📊';
                            addTrainingLog(`🏆 性能分级评估:`);
                            addTrainingLog(`  ${emoji} 综合评级: ${detailedEval.performance_grade}`);
                            addTrainingLog(`  平均相对误差: ${detailedEval.avg_relative_error.toFixed(1)}%`);
                            addTrainingLog(`  平均R²: ${detailedEval.avg_r2.toFixed(3)}`);
                        }
                        
                        // 过拟合分析
                        if (detailedEval.overfitting_ratio) {
                            addTrainingLog(`📊 模型泛化分析:`);
                            addTrainingLog(`  过拟合比率: ${detailedEval.overfitting_ratio.toFixed(2)}`);
                            addTrainingLog(`  泛化差距: ${detailedEval.generalization_gap.toFixed(4)}`);
                        }
                        
                        // 填充测试集评估结果表格
                        updateTestEvaluationTable(detailedEval, stats);
                    }
                    
                    // 显示子模块9.3
                    document.getElementById('predictionVisualizationSection').style.display = 'block';
                    
                } else {
                    // 训练失败
                    console.error('❌ MLP训练失败:', result.error);
                    addTrainingLog(`❌ 训练失败: ${result.error}`);
                    updateTrainingStatus('error', `训练失败: ${result.error}`);
                }
                
            } catch (error) {
                console.error('❌ MLP训练请求失败:', error);
                document.getElementById('mlTrainingLog').innerHTML += `❌ 训练请求失败: ${error.message}\n`;
                updateTrainingStatus('error', `请求失败: ${error.message}`);
            } finally {
                // 恢复按钮状态
                document.getElementById('startTrainingBtn').disabled = false;
                document.getElementById('startTrainingBtn').innerHTML = '<i class="fas fa-play"></i> 开始训练';
            }
        }
        
        // 更新训练状态
        function updateTrainingStatus(status, detail) {
            const statusElement = document.getElementById('mlTrainingStatus');
            const detailElement = document.getElementById('mlTrainingDetail');
            
            switch (status) {
                case 'training':
                    statusElement.className = 'badge bg-primary';
                    statusElement.innerHTML = '<span data-lang-key="training">训练中</span>';
                    break;
                case 'completed':
                    statusElement.className = 'badge bg-success';
                    statusElement.innerHTML = '<span data-lang-key="trainingCompleted">训练完成</span>';
                    break;
                case 'error':
                    statusElement.className = 'badge bg-danger';
                    statusElement.innerHTML = '<span data-lang-key="trainingError">训练错误</span>';
                    break;
                default:
                    statusElement.className = 'badge bg-secondary';
                    statusElement.innerHTML = '<span data-lang-key="waitingToTrain">等待训练</span>';
            }
            
            if (detail) {
                detailElement.textContent = detail;
            }
        }
        
        // 重置训练UI
        function resetTrainingUI() {
            // 重置状态
            updateTrainingStatus('default', '-');
            
            // 重置统计信息
            document.getElementById('mlCurrentEpoch').textContent = '-';
            document.getElementById('mlTrainingLoss').textContent = '-';
            document.getElementById('mlValidationLoss').textContent = '-';
            document.getElementById('mlTestMAE').textContent = '-';
            
            // 清空训练日志
            document.getElementById('mlTrainingLog').innerHTML = '<span data-lang-key="noTrainingLogYet">暂无训练日志...</span>';
            
            // 恢复按钮状态
            document.getElementById('startTrainingBtn').disabled = false;
            document.getElementById('startTrainingBtn').innerHTML = '<i class="fas fa-play"></i> 开始训练';
            
            // 隐藏日志区域
            document.getElementById('trainingLogSection').style.display = 'none';
            
            // 隐藏测试集评估表格
            document.getElementById('testEvaluationSection').style.display = 'none';
        }
        
        // 切换训练日志显示
        function toggleTrainingLog() {
            const logSection = document.getElementById('trainingLogSection');
            const btn = document.getElementById('viewTrainingLogBtn');
            
            if (logSection.style.display === 'none') {
                logSection.style.display = 'block';
                btn.innerHTML = '<i class="fas fa-eye-slash"></i> 隐藏日志';
            } else {
                logSection.style.display = 'none';
                btn.innerHTML = '<i class="fas fa-eye"></i> 查看日志';
            }
        }
        
        console.log('🧠 模块9机器学习预测分析模块脚本加载完成');
        // ================= 模块9：机器学习预测分析 JavaScript 代码结束 =================

        // ================= 模块10：Eye-Index 综合评估 JavaScript 代码开始 =================

        // 模块10导航切换函数
        function switchToTenthModule() {
            // 隐藏所有其他视图
            document.querySelectorAll('.enhanced-visualization-container, .new-feature-view, .rqa-analysis-view, .event-analysis-view, .rqa-pipeline-view, .feature-extraction-view, .seventh-module-view, .eighth-module-view, .ninth-module-view, .tenth-module-view').forEach(view => {
                view.style.display = 'none';
            });

            // 显示模块10视图
            const tenthView = document.getElementById('tenthModuleView');
            if (tenthView) {
                tenthView.style.display = 'block';

                // 更新导航菜单激活状态
                document.querySelectorAll('.sidebar-nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                document.querySelector('[data-view="tenthModule"]').classList.add('active');

                // 初始化模块10
                initTenthModule();
            }

            console.log('✅ 切换到模块10 - Eye-Index 综合评估');
        }

        // 初始化模块10 - PyTorch训练与模型服务
        function initTenthModule() {
            console.log('🚀 初始化模块10 - Eye-Index PyTorch训练与服务');
            
            // 延迟初始化，确保DOM加载完成
            setTimeout(function() {
                // 检查模块10的DOM是否已加载
                const module10Container = document.getElementById('tenthModuleView');
                if (!module10Container) {
                    console.error('❌ 模块10容器未找到，初始化失败');
                    return;
                }
                
                // 调用数据查看器初始化
                if (typeof initModule10CDataViewer === 'function') {
                    initModule10CDataViewer();
                }
                
                // 调用EyeIndex模块初始化（如果存在）
                if (typeof window.initEyeIndexModule === 'function') {
                    window.initEyeIndexModule();
                }
                
                // 初始化模块10-A (数据准备)
                if (typeof initModule10A === 'function') {
                    initModule10A();
                }
                
                // 初始化模块10-D (性能评估)
                if (typeof initModule10D === 'function') {
                    initModule10D();
                }
                
                // 动态加载模块10的JavaScript
                loadModule10Scripts();
            }, 500);
        }

        // 动态加载模块10相关脚本
        function loadModule10Scripts() {
            // 检查是否已经加载过
            if (window.eyeIndexModuleLoaded) {
                console.log('🔄 模块10脚本已加载，直接初始化');
                if (typeof initEyeIndexModule === 'function') {
                    initEyeIndexModule();
                }
                return;
            }
            
            const script = document.createElement('script');
            script.src = '/static/js/eye_index.js?v=' + Date.now(); // 添加时间戳避免缓存
            script.onload = function() {
                console.log('✅ 模块10 JavaScript加载完成');
                window.eyeIndexModuleLoaded = true; // 标记已加载
                
                // 初始化各个子模块
                if (typeof initEyeIndexModule === 'function') {
                    initEyeIndexModule();
                }
            };
            script.onerror = function() {
                console.error('❌ 模块10 JavaScript加载失败');
            };
            document.head.appendChild(script);
        }

        
        // ================= 模块10-C：数据查看器 JavaScript 代码开始 =================
        
        // 数据查看器管理类
        class Module10CDataViewer {
            constructor() {
                this.currentData = null;
                this.currentPage = 1;
                this.pageSize = 50;
                this.searchTerm = "";
                this.sortColumn = null;
                this.sortDirection = 'asc';
                this.initialized = false;
            }
            
            init() {
                if (this.initialized) return;
                
                console.log('🚀 初始化数据查看器...');
                
                // 绑定事件
                this.bindEvents();
                
                // 加载可用数据集
                this.loadAvailableDatasets();
                
                this.initialized = true;
                console.log('✅ 数据查看器初始化完成');
            }
            
            bindEvents() {
                // 加载数据表格按钮
                const loadBtn = document.getElementById('load-data-table');
                if (loadBtn) {
                    loadBtn.onclick = () => this.loadDataTable();
                }
                
                // 统计摘要按钮
                const statsBtn = document.getElementById('show-statistics');
                if (statsBtn) {
                    statsBtn.onclick = () => this.toggleStatistics();
                }
                
                // 导出按钮
                const exportCsvBtn = document.getElementById('export-csv');
                if (exportCsvBtn) {
                    exportCsvBtn.onclick = () => this.exportData('csv');
                }
                
                const exportExcelBtn = document.getElementById('export-excel');
                if (exportExcelBtn) {
                    exportExcelBtn.onclick = () => this.exportData('excel');
                }
                
                // 对比数据集按钮
                const compareBtn = document.getElementById('compare-datasets');
                if (compareBtn) {
                    compareBtn.onclick = () => this.showCompareDialog();
                }
                
                // 分页大小选择
                const pageSizeSelect = document.getElementById('table-page-size');
                if (pageSizeSelect) {
                    pageSizeSelect.onchange = () => {
                        this.pageSize = parseInt(pageSizeSelect.value);
                        this.currentPage = 1;
                        this.renderCurrentPage();
                    };
                }
                
                // 搜索框
                const searchInput = document.getElementById('table-search');
                if (searchInput) {
                    let searchTimeout;
                    searchInput.oninput = () => {
                        clearTimeout(searchTimeout);
                        searchTimeout = setTimeout(() => {
                            this.searchTerm = searchInput.value.toLowerCase();
                            this.currentPage = 1;
                            this.renderCurrentPage();
                        }, 300);
                    };
                }
            }
            
            async loadAvailableDatasets() {
                try {
                    const response = await fetch('/api/m10/data/list');
                    const data = await response.json();
                    
                    if (data.success && data.datasets) {
                        this.populateDatasetSelect(data.datasets);
                    }
                } catch (error) {
                    console.error('加载数据集列表失败:', error);
                }
            }
            
            populateDatasetSelect(datasets) {
                const select = document.getElementById('data-viewer-rqa-select');
                if (!select) return;
                
                select.innerHTML = '<option value="">请选择数据集...</option>';
                
                datasets.forEach(dataset => {
                    const option = document.createElement('option');
                    option.value = dataset.rqa_sig;
                    option.textContent = `${dataset.rqa_sig} (${dataset.total_samples}个样本)`;
                    select.appendChild(option);
                });
                
                // 默认选择第一个数据集
                if (datasets.length > 0) {
                    select.value = datasets[0].rqa_sig;
                }
            }
            
            async loadDataTable() {
                const rqaSig = document.getElementById('data-viewer-rqa-select').value;
                const qTag = document.getElementById('data-viewer-task-select').value;
                const includePredictions = document.getElementById('include-predictions').checked;
                
                if (!rqaSig) {
                    alert('请先选择数据集');
                    return;
                }
                
                try {
                    this.showLoading(true);
                    
                    const url = `/api/m10/data/table/${qTag}?rqa_sig=${rqaSig}&include_predictions=${includePredictions}&page=${this.currentPage}&page_size=${this.pageSize}`;
                    const response = await fetch(url);
                    const data = await response.json();
                    
                    if (!data.success) {
                        throw new Error(data.error || '加载数据失败');
                    }
                    
                    this.currentData = data;
                    this.renderTable(data);
                    this.updateStatistics(data.summary_stats);
                    
                    console.log(`✅ 数据表格加载成功: ${data.total_samples}个样本`);
                    
                } catch (error) {
                    console.error('加载数据表格失败:', error);
                    alert('加载数据表格失败: ' + error.message);
                } finally {
                    this.showLoading(false);
                }
            }
            
            showLoading(show) {
                const loading = document.getElementById('table-loading');
                const container = document.getElementById('data-table-container');
                const empty = document.getElementById('table-empty');
                const pagination = document.getElementById('table-pagination-container');
                
                if (show) {
                    loading.style.display = 'block';
                    container.style.display = 'none';
                    empty.style.display = 'none';
                    pagination.style.display = 'none';
                } else {
                    loading.style.display = 'none';
                }
            }
            
            renderTable(data) {
                const table = document.getElementById('training-data-table');
                const container = document.getElementById('data-table-container');
                const empty = document.getElementById('table-empty');
                const pagination = document.getElementById('table-pagination-container');
                
                if (!data.table_data || data.table_data.length === 0) {
                    container.style.display = 'none';
                    pagination.style.display = 'none';
                    empty.style.display = 'block';
                    return;
                }
                
                const thead = table.querySelector('thead');
                const tbody = table.querySelector('tbody');
                
                // 清空现有内容
                thead.innerHTML = '';
                tbody.innerHTML = '';
                
                // 生成表头
                const headerRow = document.createElement('tr');
                const columns = Object.keys(data.table_data[0]);
                
                columns.forEach(key => {
                    const th = document.createElement('th');
                    th.textContent = this.formatColumnName(key, data.feature_display_names);
                    th.style.cursor = 'pointer';
                    th.style.userSelect = 'none';
                    th.onclick = () => this.sortTable(key);
                    
                    // 添加排序指示器
                    if (this.sortColumn === key) {
                        const icon = document.createElement('i');
                        icon.className = this.sortDirection === 'asc' ? 'fas fa-sort-up ms-1' : 'fas fa-sort-down ms-1';
                        th.appendChild(icon);
                    } else {
                        const icon = document.createElement('i');
                        icon.className = 'fas fa-sort ms-1 text-muted';
                        th.appendChild(icon);
                    }
                    
                    headerRow.appendChild(th);
                });
                
                // 添加操作列表头
                const actionTh = document.createElement('th');
                actionTh.textContent = '操作';
                actionTh.style.textAlign = 'center';
                actionTh.style.width = '80px';
                headerRow.appendChild(actionTh);
                
                thead.appendChild(headerRow);
                
                // 生成数据行
                data.table_data.forEach((row, index) => {
                    const tr = document.createElement('tr');
                    
                    // 为不同组别添加背景色
                    const groupColor = this.getGroupBackgroundColor(row, index);
                    if (groupColor) {
                        tr.style.backgroundColor = groupColor;
                    }
                    
                    columns.forEach(key => {
                        const td = document.createElement('td');
                        const value = row[key];
                        
                        if (typeof value === 'number') {
                            td.textContent = value.toFixed(4);
                            td.style.textAlign = 'right';
                            td.className = 'font-monospace';
                        } else {
                            td.textContent = value || '';
                        }
                        
                        // 数据质量标记
                        if (key === 'Data_Quality') {
                            td.className = this.getQualityBadgeClass(value);
                        }
                        
                        // 预测误差标记
                        if (key === 'Prediction_Error' && typeof value === 'number') {
                            if (Math.abs(value) > 0.1) {
                                td.className += ' text-danger';
                            } else if (Math.abs(value) < 0.05) {
                                td.className += ' text-success';
                            }
                        }
                        
                        tr.appendChild(td);
                    });
                    
                    // 添加填充按钮列
                    const actionTd = document.createElement('td');
                    actionTd.style.textAlign = 'center';
                    const fillBtn = document.createElement('button');
                    fillBtn.className = 'btn btn-sm btn-outline-primary';
                    fillBtn.innerHTML = '<i class="fas fa-copy"></i> 复制';
                    fillBtn.title = '复制此行特征值到剪贴板';
                    fillBtn.onclick = () => this.fillFeaturesToPredictor(row);
                    actionTd.appendChild(fillBtn);
                    tr.appendChild(actionTd);
                    
                    tbody.appendChild(tr);
                });
                
                // 显示表格和分页
                container.style.display = 'block';
                empty.style.display = 'none';
                
                this.updatePagination(data);
            }
            
            getQualityBadgeClass(quality) {
                const baseClass = 'badge ';
                switch (quality) {
                    case '良好': return baseClass + 'bg-success';
                    case '一般': return baseClass + 'bg-warning text-dark';
                    case '可疑': return baseClass + 'bg-danger';
                    case '异常': return baseClass + 'bg-dark';
                    default: return baseClass + 'bg-secondary';
                }
            }
            
            getGroupBackgroundColor(row, index) {
                // 方法1: 如果有Subject_ID字段，直接使用
                if (row.Subject_ID) {
                    const subjectStr = row.Subject_ID.toLowerCase();
                    if (subjectStr.startsWith('control') || subjectStr.startsWith('n')) {
                        return 'rgba(144, 238, 144, 0.3)'; // 淡绿色 (Control组)
                    } else if (subjectStr.startsWith('mci') || subjectStr.startsWith('m')) {
                        return 'rgba(255, 255, 224, 0.7)'; // 淡黄色 (MCI组)
                    } else if (subjectStr.startsWith('ad') || subjectStr.startsWith('a')) {
                        return 'rgba(255, 182, 193, 0.5)'; // 淡红色 (AD组)
                    }
                }
                
                // 方法2: 根据Sample_ID或索引推断组别（假设每组20个样本，顺序为Control-MCI-AD）
                const sampleId = row.Sample_ID || (index + 1);
                
                if (sampleId >= 1 && sampleId <= 20) {
                    return 'rgba(144, 238, 144, 0.3)'; // Control组 (样本1-20)
                } else if (sampleId >= 21 && sampleId <= 40) {
                    return 'rgba(255, 255, 224, 0.7)'; // MCI组 (样本21-40)
                } else if (sampleId >= 41 && sampleId <= 60) {
                    return 'rgba(255, 182, 193, 0.5)'; // AD组 (样本41-60)
                }
                
                return null; // 未知组别不着色
            }
            
            formatColumnName(key, displayNames = {}) {
                // 优先使用显示名称映射
                if (displayNames && displayNames[key]) {
                    return displayNames[key];
                }
                
                // 通用映射
                const nameMap = {
                    'Sample_ID': '样本ID',
                    'Task': '任务',
                    'MMSE_Score': 'MMSE分数',
                    'Predicted_Score': '预测分数',
                    'Prediction_Error': '预测误差',
                    'Error_Percentage': '误差百分比(%)',
                    'Data_Quality': '数据质量',
                    'game_duration': '游戏时长',
                    'roi_kw_time': '关键词ROI时间',
                    'roi_inst_time': '指令ROI时间',
                    'roi_bg_time': '背景ROI时间',
                    'rr_1d': '1D递归率',
                    'det_1d': '1D确定性',
                    'ent_1d': '1D熵值',
                    'rr_2d': '2D递归率',
                    'det_2d': '2D确定性',
                    'ent_2d': '2D熵值'
                };
                
                return nameMap[key] || key;
            }
            
            sortTable(column) {
                if (!this.currentData || !this.currentData.table_data) return;
                
                // 切换排序方向
                if (this.sortColumn === column) {
                    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
                } else {
                    this.sortColumn = column;
                    this.sortDirection = 'asc';
                }
                
                // 排序数据
                this.currentData.table_data.sort((a, b) => {
                    let aVal = a[column];
                    let bVal = b[column];
                    
                    // 处理数值比较
                    if (typeof aVal === 'number' && typeof bVal === 'number') {
                        return this.sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
                    }
                    
                    // 字符串比较
                    aVal = String(aVal || '').toLowerCase();
                    bVal = String(bVal || '').toLowerCase();
                    
                    if (this.sortDirection === 'asc') {
                        return aVal.localeCompare(bVal);
                    } else {
                        return bVal.localeCompare(aVal);
                    }
                });
                
                // 重新渲染表格
                this.renderTable(this.currentData);
            }
            
            updatePagination(data) {
                const pagination = data.pagination;
                if (!pagination) return;
                
                const container = document.getElementById('table-pagination-container');
                const info = document.getElementById('table-info');
                const paginationUl = document.getElementById('table-pagination');
                
                // 更新信息
                info.textContent = `显示第 ${pagination.start_index}-${pagination.end_index} 条，共 ${pagination.total_items} 条记录`;
                
                // 清空分页
                paginationUl.innerHTML = '';
                
                // 上一页
                const prevLi = document.createElement('li');
                prevLi.className = `page-item ${!pagination.has_previous ? 'disabled' : ''}`;
                prevLi.innerHTML = '<a class="page-link" href="#">&laquo;</a>';
                if (pagination.has_previous) {
                    prevLi.onclick = () => this.goToPage(pagination.current_page - 1);
                }
                paginationUl.appendChild(prevLi);
                
                // 页码
                const startPage = Math.max(1, pagination.current_page - 2);
                const endPage = Math.min(pagination.total_pages, pagination.current_page + 2);
                
                for (let i = startPage; i <= endPage; i++) {
                    const li = document.createElement('li');
                    li.className = `page-item ${i === pagination.current_page ? 'active' : ''}`;
                    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
                    li.onclick = () => this.goToPage(i);
                    paginationUl.appendChild(li);
                }
                
                // 下一页
                const nextLi = document.createElement('li');
                nextLi.className = `page-item ${!pagination.has_next ? 'disabled' : ''}`;
                nextLi.innerHTML = '<a class="page-link" href="#">&raquo;</a>';
                if (pagination.has_next) {
                    nextLi.onclick = () => this.goToPage(pagination.current_page + 1);
                }
                paginationUl.appendChild(nextLi);
                
                container.style.display = 'flex';
            }
            
            goToPage(page) {
                this.currentPage = page;
                this.loadDataTable();
            }
            
            renderCurrentPage() {
                if (this.currentData) {
                    this.renderTable(this.currentData);
                }
            }
            
            updateStatistics(stats) {
                if (!stats) return;
                
                const content = document.getElementById('data-statistics-content');
                
                let html = `
                    <div class="row">
                        <div class="col-md-3">
                            <h6><i class="fas fa-info-circle"></i> 基本信息</h6>
                            <p class="mb-1">样本总数: <strong>${stats.total_samples}</strong></p>
                            <p class="mb-1">特征维度: <strong>${stats.feature_count}</strong></p>
                            <p class="mb-1">缺失值: <strong>${stats.missing_values}</strong></p>
                        </div>
                        <div class="col-md-3">
                            <h6><i class="fas fa-target"></i> MMSE分数统计</h6>
                            <p class="mb-1">均值: <strong>${stats.mmse_stats.mean.toFixed(4)}</strong></p>
                            <p class="mb-1">标准差: <strong>${stats.mmse_stats.std.toFixed(4)}</strong></p>
                            <p class="mb-1">范围: <strong>${stats.mmse_stats.min.toFixed(4)} ~ ${stats.mmse_stats.max.toFixed(4)}</strong></p>
                        </div>
                `;
                
                if (stats.prediction_accuracy) {
                    html += `
                        <div class="col-md-3">
                            <h6><i class="fas fa-bullseye"></i> 预测准确性</h6>
                            <p class="mb-1">RMSE: <strong>${stats.prediction_accuracy.rmse.toFixed(4)}</strong></p>
                            <p class="mb-1">MAE: <strong>${stats.prediction_accuracy.mae.toFixed(4)}</strong></p>
                            <p class="mb-1">R²: <strong>${stats.prediction_accuracy.r2.toFixed(4)}</strong></p>
                        </div>
                    `;
                }
                
                html += `
                        <div class="col-md-3">
                            <h6><i class="fas fa-shield-alt"></i> 数据质量</h6>
                `;
                
                Object.entries(stats.quality_distribution).forEach(([quality, count]) => {
                    const percentage = ((count / stats.total_samples) * 100).toFixed(1);
                    html += `<p class="mb-1">${quality}: <strong>${count}</strong> (${percentage}%)</p>`;
                });
                
                html += `
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-12">
                            <h6><i class="fas fa-palette"></i> 组别颜色图例</h6>
                            <div class="d-flex gap-4">
                                <div class="d-flex align-items-center">
                                    <div style="width: 20px; height: 20px; background-color: rgba(144, 238, 144, 0.3); border: 1px solid #90ee90; margin-right: 8px;"></div>
                                    <span>Control组 (正常对照)</span>
                                </div>
                                <div class="d-flex align-items-center">
                                    <div style="width: 20px; height: 20px; background-color: rgba(255, 255, 224, 0.7); border: 1px solid #ffff99; margin-right: 8px;"></div>
                                    <span>MCI组 (轻度认知障碍)</span>
                                </div>
                                <div class="d-flex align-items-center">
                                    <div style="width: 20px; height: 20px; background-color: rgba(255, 182, 193, 0.5); border: 1px solid #ffb6c1; margin-right: 8px;"></div>
                                    <span>AD组 (阿尔茨海默症)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                content.innerHTML = html;
            }
            
            fillFeaturesToPredictor(row) {
                console.log('🔧 检查在线预测功能状态...');
                
                // 显示提示信息，因为在线预测界面已被移除
                this.showToast('在线预测界面已移除，数据已复制到剪贴板', 'info');
                
                // 将特征数据复制到剪贴板
                const featureFields = [
                    'game_duration', 'roi_kw_time', 'roi_inst_time', 'roi_bg_time',
                    'rr_1d', 'det_1d', 'ent_1d', 'rr_2d', 'det_2d', 'ent_2d'
                ];
                
                const featureValues = featureFields.map(field => {
                    const value = row[field];
                    return value !== undefined && value !== null ? parseFloat(value).toFixed(4) : '0.0000';
                });
                
                const clipboardText = featureValues.join(', ');
                
                // 尝试复制到剪贴板
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(clipboardText).then(() => {
                        console.log('✅ 特征值已复制到剪贴板:', clipboardText);
                    }).catch(err => {
                        console.error('❌ 复制到剪贴板失败:', err);
                    });
                }
                

            }
            
            createInputBoxesManually() {
                console.log('🚨 使用紧急手动创建方法...');
                const container = document.getElementById('feature-inputs-10c');
                if (!container) {
                    console.error('❌ 容器仍然不存在');
                    return;
                }
                
                const featureNames = [
                    '游戏时长', '关键词ROI', '指令ROI', '背景ROI', 
                    'RR_1D', 'DET_1D', 'ENT_1D', 
                    'RR_2D', 'DET_2D', 'ENT_2D'
                ];
                
                container.innerHTML = '';
                
                // 直接生成HTML字符串
                let html = '';
                for (let i = 0; i < 10; i++) {
                    html += `
                        <div class="col-6 col-md-4 mb-2">
                            <label for="feature-${i}-10c" class="form-label small">${featureNames[i]}</label>
                            <input type="number" 
                                   id="feature-${i}-10c" 
                                   class="form-control form-control-sm" 
                                   placeholder="0.0" 
                                   step="0.0001" 
                                   min="0" 
                                   max="1">
                        </div>
                    `;
                }
                
                container.innerHTML = html;
                console.log('🎯 手动创建完成，HTML长度:', html.length);
            }
            
            showToast(message, type = 'info') {
                // 简单的提示实现
                console.log(`[${type.toUpperCase()}] ${message}`);
                
                // 创建临时提示框
                const toast = document.createElement('div');
                toast.className = `alert alert-${type === 'success' ? 'success' : type === 'warning' ? 'warning' : 'info'} position-fixed`;
                toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 300px;';
                toast.innerHTML = `
                    <i class="fas fa-${type === 'success' ? 'check' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                    ${message}
                `;
                
                document.body.appendChild(toast);
                
                // 3秒后自动消失
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 3000);
            }
            
            toggleStatistics() {
                const panel = document.getElementById('data-stats-panel');
                const btn = document.getElementById('show-statistics');
                
                if (panel.style.display === 'none' || !panel.style.display) {
                    panel.style.display = 'block';
                    btn.innerHTML = '<i class="fas fa-chart-bar"></i> 隐藏统计';
                } else {
                    panel.style.display = 'none';
                    btn.innerHTML = '<i class="fas fa-chart-bar"></i> 统计摘要';
                }
            }
            
            exportData(format) {
                const rqaSig = document.getElementById('data-viewer-rqa-select').value;
                const qTag = document.getElementById('data-viewer-task-select').value;
                const includePredictions = document.getElementById('include-predictions').checked;
                
                if (!rqaSig) {
                    alert('请先选择数据集');
                    return;
                }
                
                const url = `/api/m10/data/table/${qTag}?rqa_sig=${rqaSig}&format=${format}&include_predictions=${includePredictions}`;
                
                // 创建隐藏的下载链接
                const link = document.createElement('a');
                link.href = url;
                link.download = `${qTag}_${rqaSig}_training_data.${format}`;
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                console.log(`📁 开始下载 ${format.toUpperCase()} 文件: ${qTag}_${rqaSig}_training_data.${format}`);
            }
            
            showCompareDialog() {
                // 简单的对比功能，未来可以扩展为模态对话框
                alert('数据集对比功能开发中...\n\n将来支持:\n• 多数据集统计对比\n• 特征分布对比\n• 相关性分析对比');
            }
        }
        
        // 全局数据查看器实例
        let module10CDataViewer = null;
        
        // 初始化数据查看器（在模块10激活时调用）
        function initModule10CDataViewer() {
            if (!module10CDataViewer) {
                module10CDataViewer = new Module10CDataViewer();
            }
            module10CDataViewer.init();
        }
        
        // 在模块10初始化时自动启动数据查看器
        if (typeof window.initEyeIndexModule === 'function') {
            const originalInit = window.initEyeIndexModule;
            window.initEyeIndexModule = function() {
                originalInit();
                initModule10CDataViewer();
            };
        } else {
            window.initEyeIndexModule = function() {
                initModule10CDataViewer();
            };
        }
        
        // ================= 模块10-C：数据查看器 JavaScript 代码结束 =================
        
        // ================= 模块10-D：模型性能评估与差异可视化 JavaScript 代码开始 =================
        
        class Module10DManager {
            constructor() {
                this.currentConfig = null;
                this.performanceData = null;
                this.residualChart = null;
                this.comparisonChart = null;
                this.groupChart = null;
                this.charts = {}; // 存储所有图表实例
            }
            
            init() {
                console.log('🚀 初始化模块10-D管理器');
                this.loadAvailableConfigs();
                this.bindEvents();
                this.initCharts();
            }
            
            async loadAvailableConfigs() {
                try {
                    console.log('📊 加载可用模型配置...');
                    const response = await fetch('/api/m10d/configs');
                    const result = await response.json();
                    
                    if (result.success) {
                        this.populateConfigSelect(result.configs);
                        console.log(`✅ 加载了 ${result.configs.length} 个配置`);
                    } else {
                        console.error('❌ 加载配置失败:', result.error);
                        this.showError('加载模型配置失败', result.error);
                    }
                } catch (error) {
                    console.error('❌ 配置加载异常:', error);
                    this.showError('网络错误', '无法连接到服务器');
                }
            }
            
            populateConfigSelect(configs) {
                const select = document.getElementById('model-config-select-10d');
                select.innerHTML = '<option value="">请选择...</option>';
                
                configs.forEach(config => {
                    const option = document.createElement('option');
                    option.value = config.id;
                    option.textContent = `${config.name} (${config.model_count}/5 模型)`;
                    option.disabled = !config.complete;
                    if (!config.complete) {
                        option.textContent += ' - 不完整';
                    }
                    select.appendChild(option);
                });
            }
            
            bindEvents() {
                // 分析按钮
                document.getElementById('analyze-performance-10d').addEventListener('click', () => {
                    this.analyzePerformance();
                });
                
                // 导出按钮
                document.getElementById('export-data-10d').addEventListener('click', () => {
                    this.exportData();
                });
                
                // 组别筛选按钮
                document.querySelectorAll('.group-filter-10d').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        this.filterByGroup(e.target.dataset.group);
                        
                        // 更新按钮状态
                        document.querySelectorAll('.group-filter-10d').forEach(b => b.classList.remove('active'));
                        e.target.classList.add('active');
                    });
                });
                
                // 下载图表按钮
                document.getElementById('download-residual-chart-10d').addEventListener('click', () => {
                    this.downloadChart('residual', '残差分析图');
                });
                
                document.getElementById('download-comparison-chart-10d').addEventListener('click', () => {
                    this.downloadChart('comparison', '任务对比图');
                });
                
                document.getElementById('download-group-chart-10d').addEventListener('click', () => {
                    this.downloadChart('group', '分组对比图');
                });
            }
            
            initCharts() {
                // 预初始化图表容器
                const chartConfigs = {
                    'residual-chart-10d': this.getResidualChartConfig(),
                    'task-comparison-chart-10d': this.getComparisonChartConfig(),
                    'group-comparison-chart-10d': this.getGroupChartConfig()
                };
                
                Object.entries(chartConfigs).forEach(([canvasId, config]) => {
                    const canvas = document.getElementById(canvasId);
                    if (canvas) {
                        const ctx = canvas.getContext('2d');
                        this.charts[canvasId] = new Chart(ctx, config);
                    }
                });
            }
            
            async analyzePerformance() {
                const config = document.getElementById('model-config-select-10d').value;
                const includeGroups = document.getElementById('include-groups-10d').checked;
                
                if (!config) {
                    this.showError('配置错误', '请先选择模型配置');
                    return;
                }
                
                try {
                    this.showLoading(true);
                    console.log(`🔍 开始性能分析: ${config}, 包含分组: ${includeGroups}`);
                    
                    const response = await fetch(
                        `/api/m10d/performance?config=${encodeURIComponent(config)}&include_groups=${includeGroups}`
                    );
                    
                    const result = await response.json();
                    
                    if (result.success) {
                        this.performanceData = result;
                        this.currentConfig = config;
                        this.displayResults();
                        console.log('✅ 性能分析完成');
                    } else {
                        console.error('❌ 性能分析失败:', result.error);
                        this.showError('分析失败', result.error);
                    }
                    
                } catch (error) {
                    console.error('❌ 分析异常:', error);
                    this.showError('网络错误', '分析过程中发生错误');
                } finally {
                    this.showLoading(false);
                }
            }
            
            displayResults() {
                if (!this.performanceData) return;
                
                // 显示结果区域
                document.getElementById('empty-state-10d').style.display = 'none';
                document.getElementById('performance-results-10d').style.display = 'block';
                
                // 更新指标表格
                this.updateMetricsTable();
                
                // 更新图表
                this.updateResidualChart();
                this.updateComparisonChart();
                
                // 如果包含分组分析，显示分组图表
                if (this.performanceData.group_analysis) {
                    this.updateGroupChart();
                    document.getElementById('group-analysis-section-10d').style.display = 'block';
                }
                
                // 启用导出按钮
                document.getElementById('export-data-10d').disabled = false;
            }
            
            updateMetricsTable() {
                const container = document.getElementById('metrics-table-10d');
                const metrics = this.performanceData.task_metrics;
                
                let html = `
                    <table class="table table-sm table-striped">
                        <thead class="table-dark">
                            <tr>
                                <th>任务</th>
                                <th>R² 决定系数</th>
                                <th>RMSE 均方根误差</th>
                                <th>MAE 平均绝对误差</th>
                                <th>相关系数</th>
                            </tr>
                        </thead>
                        <tbody>
                `;
                
                Object.entries(metrics).forEach(([task, metric]) => {
                    const r2Class = metric.r2 > 0.8 ? 'text-success' : metric.r2 > 0.6 ? 'text-warning' : 'text-danger';
                    html += `
                        <tr>
                            <td><strong>${task}</strong></td>
                            <td class="${r2Class}">${metric.r2.toFixed(4)}</td>
                            <td>${metric.rmse.toFixed(4)}</td>
                            <td>${metric.mae.toFixed(4)}</td>
                            <td>${metric.correlation.toFixed(4)}</td>
                        </tr>
                    `;
                });
                
                html += '</tbody></table>';
                container.innerHTML = html;
            }
            
            updateResidualChart() {
                const chart = this.charts['residual-chart-10d'];
                if (!chart) return;
                
                const data = this.performanceData.residual_data;
                const tasks = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'];
                
                // 清空现有数据
                chart.data.datasets = [];
                
                // 添加个体曲线（默认隐藏）
                data.individual_errors.forEach((errors, index) => {
                    const group = this.getGroupByIndex(index);
                    chart.data.datasets.push({
                        label: `样本${index + 1}`,
                        data: errors,
                        borderColor: this.getGroupColor(group, 0.6),
                        backgroundColor: 'transparent',
                        hidden: true,
                        pointRadius: 1,
                        borderWidth: 1,
                        tension: 0.1
                    });
                });
                
                // 添加平均误差线
                chart.data.datasets.push({
                    label: '平均绝对误差',
                    data: data.avg_errors,
                    borderColor: '#333',
                    backgroundColor: 'rgba(51, 51, 51, 0.1)',
                    borderWidth: 3,
                    pointRadius: 4,
                    fill: false,
                    tension: 0.1
                });
                
                chart.data.labels = tasks;
                chart.update();
            }
            
            updateComparisonChart() {
                const chart = this.charts['task-comparison-chart-10d'];
                if (!chart) return;
                
                const comparison = this.performanceData.task_comparison;
                const tasks = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'];
                
                chart.data.labels = tasks;
                chart.data.datasets = [
                    {
                        label: '平均真实得分',
                        data: comparison.avg_actuals,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        yAxisID: 'y'
                    },
                    {
                        label: '平均绝对误差',
                        data: comparison.avg_abs_errors,
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        yAxisID: 'y1'
                    }
                ];
                
                chart.update();
            }
            
            updateGroupChart() {
                const chart = this.charts['group-comparison-chart-10d'];
                if (!chart || !this.performanceData.group_analysis) return;
                
                const groupData = this.performanceData.group_analysis;
                const tasks = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'];
                
                chart.data.labels = tasks;
                chart.data.datasets = [];
                
                Object.entries(groupData).forEach(([groupName, stats]) => {
                    chart.data.datasets.push({
                        label: `${groupName.toUpperCase()}组`,
                        data: stats.mean_errors,
                        borderColor: this.getGroupColor(groupName),
                        backgroundColor: this.getGroupColor(groupName, 0.2),
                        borderWidth: 2,
                        pointRadius: 4,
                        tension: 0.1
                    });
                });
                
                chart.update();
                
                // 更新组别统计
                this.updateGroupStats(groupData);
            }
            
            updateGroupStats(groupData) {
                Object.entries(groupData).forEach(([groupName, stats]) => {
                    const countElement = document.getElementById(`${groupName}-count-10d`);
                    const errorElement = document.getElementById(`${groupName}-avg-error-10d`);
                    
                    if (countElement) countElement.textContent = stats.sample_count;
                    if (errorElement) {
                        const avgError = stats.mean_errors.reduce((a, b) => a + b, 0) / stats.mean_errors.length;
                        errorElement.textContent = avgError.toFixed(4);
                    }
                });
            }
            
            filterByGroup(group) {
                const chart = this.charts['residual-chart-10d'];
                if (!chart) return;
                
                chart.data.datasets.forEach((dataset, index) => {
                    if (dataset.label.startsWith('样本')) {
                        const sampleIndex = parseInt(dataset.label.replace('样本', '')) - 1;
                        const sampleGroup = this.getGroupByIndex(sampleIndex);
                        
                        if (group === 'all') {
                            dataset.hidden = false;
                        } else {
                            dataset.hidden = sampleGroup !== group;
                        }
                    }
                });
                
                chart.update();
            }
            
            getGroupByIndex(index) {
                // 根据样本索引确定组别
                if (index < 20) return 'control';
                if (index < 40) return 'mci';
                return 'ad';
            }
            
            getGroupColor(group, alpha = 1) {
                const colors = {
                    'control': `rgba(40, 167, 69, ${alpha})`,   // 绿色
                    'mci': `rgba(255, 193, 7, ${alpha})`,       // 黄色
                    'ad': `rgba(220, 53, 69, ${alpha})`         // 红色
                };
                return colors[group] || `rgba(108, 117, 125, ${alpha})`;
            }
            
            async exportData() {
                if (!this.currentConfig) {
                    this.showError('导出错误', '请先进行性能分析');
                    return;
                }
                
                try {
                    const response = await fetch(
                        `/api/m10d/export/data?config=${encodeURIComponent(this.currentConfig)}&format=csv`
                    );
                    
                    if (response.ok) {
                        const blob = await response.blob();
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `performance_analysis_${this.currentConfig}.csv`;
                        link.click();
                        window.URL.revokeObjectURL(url);
                        
                        this.showSuccess('数据导出成功');
                    } else {
                        throw new Error('导出失败');
                    }
                } catch (error) {
                    console.error('❌ 导出失败:', error);
                    this.showError('导出失败', error.message);
                }
            }
            
            downloadChart(chartType, filename) {
                let chart;
                switch (chartType) {
                    case 'residual':
                        chart = this.charts['residual-chart-10d'];
                        break;
                    case 'comparison':
                        chart = this.charts['task-comparison-chart-10d'];
                        break;
                    case 'group':
                        chart = this.charts['group-comparison-chart-10d'];
                        break;
                    default:
                        return;
                }
                
                if (chart) {
                    const url = chart.toBase64Image();
                    const link = document.createElement('a');
                    link.download = `${filename}_${this.currentConfig || 'chart'}.png`;
                    link.href = url;
                    link.click();
                }
            }
            
            showLoading(show) {
                document.getElementById('loading-10d').style.display = show ? 'block' : 'none';
                document.getElementById('empty-state-10d').style.display = show ? 'none' : 'block';
            }
            
            showError(title, message) {
                // 简单的错误提示
                alert(`${title}: ${message}`);
            }
            
            showSuccess(message) {
                // 简单的成功提示
                console.log(`✅ ${message}`);
            }
            
            // 图表配置
            getResidualChartConfig() {
                return {
                    type: 'line',
                    data: {
                        labels: [],
                        datasets: []
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'MMSE子任务'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: '预测残差 (预测值 - 真实值)'
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                callbacks: {
                                    title: function(tooltipItems) {
                                        return `任务: ${tooltipItems[0].label}`;
                                    },
                                    label: function(context) {
                                        return `${context.dataset.label}: ${context.parsed.y.toFixed(4)}`;
                                    }
                                }
                            }
                        }
                    }
                };
            }
            
            getComparisonChartConfig() {
                return {
                    type: 'bar',
                    data: {
                        labels: [],
                        datasets: []
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                type: 'linear',
                                display: true,
                                position: 'left',
                                title: {
                                    display: true,
                                    text: '真实得分'
                                }
                            },
                            y1: {
                                type: 'linear',
                                display: true,
                                position: 'right',
                                title: {
                                    display: true,
                                    text: '绝对误差'
                                },
                                grid: {
                                    drawOnChartArea: false,
                                }
                            }
                        }
                    }
                };
            }
            
            getGroupChartConfig() {
                return {
                    type: 'line',
                    data: {
                        labels: [],
                        datasets: []
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'MMSE子任务'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: '平均绝对误差'
                                }
                            }
                        }
                    }
                };
            }
        }
        
        // 全局管理器实例
        let module10DManager = null;
        
        // 初始化模块10-D管理器
        function initModule10D() {
            if (!module10DManager) {
                module10DManager = new Module10DManager();
            }
            module10DManager.init();
        }
        
        // ================= 模块10-D：模型性能评估与差异可视化 JavaScript 代码结束 =================
        
        console.log('👁️ 模块10 Eye-Index 综合评估模块脚本加载完成');
        // ================= 模块10：Eye-Index 综合评估 JavaScript 代码结束 =================
            

        
