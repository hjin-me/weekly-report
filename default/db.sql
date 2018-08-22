--
-- PostgreSQL database dump
--

-- Dumped from database version 10.4
-- Dumped by pg_dump version 10.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: c; Type: SCHEMA; Schema: -; Owner: work
--

CREATE SCHEMA c;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;

--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: project; Type: TABLE; Schema: c; Owner: work
--

CREATE TABLE c.project (
    id character varying(30) NOT NULL,
    name character varying(50),
    "order" int DEFAULT 0,
    tasks json
);

--
-- Name: user; Type: TABLE; Schema: c; Owner: work
--

CREATE TABLE c."user" (
    id character varying(50) NOT NULL,
    name character varying(50),
    team character varying(50),
    admin boolean DEFAULT false
);

--
-- Name: weekly; Type: TABLE; Schema: c; Owner: work
--

CREATE TABLE c.weekly (
    year integer NOT NULL,
    week integer NOT NULL,
    name character varying(30) NOT NULL,
    data json
);

--
-- Data for Name: project; Type: TABLE DATA; Schema: c; Owner: work
--

COPY c.project (id, name, tasks) FROM stdin;
1031601	Insight1.0	["产品设计","研发","测试","运营"]
1031701	Insight2.0+killbox	["产品设计","研发","测试","运营"]
1031801	WiFi一体化	["产品设计","研发","测试","运营"]
1031802	Agg2.0	["产品设计","研发","测试","运营"]
1221701	S9	["产品设计","研发","测试","运营"]
B030001	大数据服务基础运维和优化	["基础运维","基础研发","安全能力"]
B030002	引擎日志回收服务	["基础运维","基础研发","安全能力"]
B030003	特征分发服务	["基础运维","基础研发","安全能力"]
B030004	基础数据获取能力运维	["基础运维","基础研发","安全能力"]
B030005	大数据分析计算平台解决方案基础研发	["基础运维","基础研发","安全能力"]
B030006	流式处理平台	["基础运维","基础研发","安全能力"]
B030007	数据仓库和部分基础数据集市研发\t	["基础运维","基础研发","安全能力"]
B220001	情报分析能力提升研究	["基础运维","基础研发","安全能力"]
X031801	产品/项目 调研分析	["技术研究","商业研究"]
X031802	流量大数据架构和算法预研	["技术研究","商业研究"]
X031803	算法预研和部署	["技术研究","商业研究"]
X031804	Darwin标签体系研发	["技术研究","商业研究"]
X031805	大数据业务基础解决方案预研	["技术研究","商业研究"]
X221801	新产品预研	["技术研究","商业研究"]
个人学习	个人学习	["学习"]
1020002	云安全通用版	["产品设计","研发","测试"]
1020003	url产品/url检测工作平台	["产品设计","研发","测试"]
1020101	应用市场不规范检测，不规范检测平台，不规范检测SDK	["产品设计","研发","测试"]
1020400	客户运营CO平台	["产品设计","研发","测试"]
B020200	服务方向内系统运维	["系统运维","安全运维","安全能力","公共服务"]
B020201	方向内设备采购_系统运维	["系统运维","安全运维","安全能力","公共服务"]
B020202	系统运维监控体系建设	["系统运维","安全运维","安全能力","公共服务"]
B020204	系统优化_系统运维	["系统运维","安全运维","安全能力","公共服务"]
B020205	系统扩容_系统运维	["系统运维","安全运维","安全能力","公共服务"]
B020206	系统运维体系建设	["系统运维","安全运维","安全能力","公共服务"]
B020207	故障处理_系统运维	["系统运维","安全运维","安全能力","公共服务"]
B020208	其他需求处理_系统运维	["系统运维","安全运维","安全能力","公共服务"]
1020000	AV产品通用	["产品设计","研发","测试"]
605UC1703	同源	["项目需求管理","研发","测试","部署实施","安服","售后"]
819NS33	“活动轨迹挖掘系统”软著申请	["安服"]
819OM01	湖南态势感知	["安服"]
819GAZY	掌游科技	["售前"]
B020110	基础能力运维	["研发"]
819PS26	四川公安	["需求"]
8020202	石溪科技	["客户需求"]
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: c; Owner: work
--

COPY c."user" (id, name, team) FROM stdin;
lili	李丽	Web研发组
wangchao	王超	产品项目组
huangjin	黄进	Web研发组
xiaodi	肖迪	产品项目组
tangmingyang	汤明阳	Web研发组
liuchuanshi	刘穿时	Web研发组
luliwei	鲁丽薇	Web研发组
guochen	郭辰	数据挖掘组
lengxuchang	冷煦昌	产品项目组
zhengyue	郑悦	数据架构组
zhangyaodong	张耀东	数据架构组
yangyixin	杨贻鑫	数据架构组
geyubo	葛育波	数据架构组
liushichang	刘世昌	数据架构组
zhoujunlong	周俊龙	数据架构组
xiaopeng	肖鹏	Web研发组
liujia	刘佳	Web研发组
chengcong	程聪	Web研发组
xusheng	许盛	Web研发组
zhoukang	周康	Web研发组
dongchengzhi	董承智	数据挖掘组
zhoujie	周劼	Web研发组
xienian	谢念	Web研发组
yeji	叶吉	Web研发组
liujiaxin	刘家鑫	数据架构组
jinchen	靳晨	数据架构组
xuxiang	徐祥	Web研发组
sunyan	孙岩	数据挖掘组
zouyanmei	邹艳梅	数据挖掘组
lihua	李华	数据挖掘组
huangxuwen	黄绪文	Web研发组
taomengyao	陶梦瑶	产品项目组
chenjingjing	陈晶晶	数据挖掘组
zhangwei	张微	Web研发组
\.


--
-- Data for Name: weekly; Type: TABLE DATA; Schema: c; Owner: work
--

COPY c.weekly (year, week, name, data) FROM stdin;
2018	33	yeji	{"week":{"year":2018,"week":33},"works":[{"project":"1031802","task":"研发","requester":"","problem":"","time":[8,8,8,8,8],"work":"修复建表和定时任务bug\\nxmatrix的udf功能模块撰写\\n数据源接入配置前端修改"}],"reporter":{"name":"叶吉","team":"Web研发组"}}
2018	33	liuchuanshi	{"week":{"year":2018,"week":33},"works":[{"project":"1020002","task":"研发","requester":"\\u0008田斌","problem":"","time":[8,8,8,8],"work":"泰尔项目编码，测试，联调，输出文档：泰尔实验室项目"},{"project":"1020000","task":"研发","requester":"刘龙飞","problem":"","time":[0,0,0,0,8],"work":"输出payment_plugin case，编码，测试，上线"}],"reporter":{"name":"刘穿时","team":"Web研发组"}}
2018	33	lengxuchang	{"week":{"year":2018,"week":33},"works":[{"project":"1031801","task":"产品设计","requester":"冷煦昌","problem":"硬件在阻断时会存在间歇性无效现象，通过调整扫描和攻击策略已解决","time":[8,8,0,8],"work":"推进项目bug修复，解决硬件功能性问题"}],"reporter":{"name":"冷煦昌","team":"产品项目组"}}
2018	33	tangmingyang	{"week":{"year":2018,"week":33},"works":[{"project":"1031801","task":"研发","requester":"冷煦昌","problem":"","time":[8,8,8,8,8],"work":"1云分析，ip类型，定位信息，历史连接用户接口联调\\n2bug，预警，经纬度都不存在，地图resize\\n3扫描策略重写"}],"reporter":{"name":"汤明阳","team":"Web研发组"}}
2018	33	xienian	{"week":{"year":2018,"week":33},"works":[{"project":"1020002","task":"研发","requester":"田斌","problem":"","time":[8,8,8,8,8],"work":"编码，测试，联调"}],"reporter":{"name":"谢念","team":"Web研发组"}}
2018	33	huangjin	{"week":{"year":2018,"week":33},"works":[{"project":"1031801","task":"研发","requester":"","problem":"","time":[0,0,1,1,1],"work":"CodeReview\\n数据问题处理"},{"project":"个人学习","task":"学习","requester":"","problem":"","time":[0,0,8,8,8],"work":"使用 Material Design + Angular 做周报系统"}],"reporter":{"name":"黄进","team":"Web研发组"}}
2018	33	luliwei	{"week":{"year":2018,"week":33},"works":[{"project":"1031701","task":"研发","requester":"王超","problem":"","time":[4,8,8,4,4],"work":"1.通过hive进行关联查询\\n2.补充详细设计文档"},{"project":"个人学习","task":"学习","requester":"","problem":"","time":[4,0,0,4,4],"work":"1.学习xql语法\\n2.学习nginx架构"}],"reporter":{"name":"鲁丽薇","team":"Web研发组"}}
2018	33	xiaodi	{"week":{"year":2018,"week":33},"works":[{"project":"1031802","task":"产品设计","requester":"","problem":"","time":[6,3,3,2,2],"work":""},{"project":"1031801","task":"产品设计","requester":"","problem":"","time":[0,4,1],"work":""},{"project":"1031701","task":"产品设计","requester":"","problem":"","time":[0,0,1,1],"work":""}],"reporter":{"name":"肖迪","team":"产品项目组"}}
2018	33	zhoujie	{"week":{"year":2018,"week":33},"works":[{"project":"1031701","task":"研发","requester":"王超","problem":"输入控件状态修改无法实时变更，后面发现是数组数据更新问题。","time":[8,8,0,8,4],"work":"快捷搜索条件框修改、修改产品提出的问题"},{"project":"1020000","task":"研发","requester":"刘龙飞","problem":"","time":[0,0,8,0,4],"work":"添加人工检测列表排序字段，添加新case"},{"project":"个人学习","task":"学习","requester":"周劼","problem":"","time":[0,2,0,2],"work":"基于webpack4搭建ts+react+ant 框架项目"}],"reporter":{"name":"周劼","team":"Web研发组"}}
2018	33	xuxiang	{"week":{"year":2018,"week":33},"works":[{"project":"B030005","task":"基础研发","requester":"","problem":"数据架构组对流式接入数据源的开发稍滞后与 agg ，采用直接上传至 hdfs 暂时替代","time":[3,7,7,7,7],"work":"1、数据仓库新增隐藏临时表与正式表的筛选功能\\n2、xql 运行选择资源页面增加 restart（自动重启）checkpoint（断点重试）选项支持\\n3、agg 任务调度模块重构方案评审\\n4、大文件上传方案的设计与实现"}],"reporter":{"name":"徐祥","team":"Web研发组"}}
2018	33	jinchen	{"week":{"year":2018,"week":33},"works":[{"project":"B030005","task":"基础研发","requester":"","problem":"1.对每个partition建立连接，在partition内部使用batch方式查询hbase表\\n2.sql解析表名\\n3.owner用户空间设计\\n4.XQL入门文档","time":[8,8,9,8,8],"work":"1.hbase lookup实现\\n2.sql解析实现临时表分区\\n3.checkpoint目录限制\\n4.XQL相关文档"}],"reporter":{"name":"靳晨","team":"数据架构组"}}
2018	33	zhengyue	{"week":{"year":2018,"week":33},"works":[{"project":"B030004","task":"基础运维","requester":"","problem":"","time":[0,0,3],"work":"修改event集群eds_poi_info的geohash8、geohash6、geohash4三个字段配置,使得这几个字段可以完成聚合功能"},{"project":"B030001","task":"基础运维","requester":"","problem":"","time":[5,5,6,6,5],"work":"1 jenkins配置相应项目权限\\n\\n2 前端v2-intelligence-analysis项目通过Jenkins上线shrek环境\\n\\n3 项目配置改成pipeline形式，将jenkinsfile保存在项目中：\\n\\nrb分支已完成，master分支ci部分的jenkinsfile已完成，cd部分还在测试"}],"reporter":{"name":"郑悦","team":"数据架构组"}}
2018	33	geyubo	{"week":{"year":2018,"week":33},"works":[{"project":"B030001","task":"基础运维","requester":"","problem":"","time":[6,7,7,3,4],"work":"1.clickhouse查询优化\\n\\n2.hbase重启\\n\\n3.es6 sql测试\\n\\n4.hdfs副本数调整"},{"project":"B030004","task":"基础运维","requester":"","problem":"","time":[0,0,0,0,3],"work":"样本及rms队列恢复"}],"reporter":{"name":"葛育波","team":"数据架构组"}}
2018	33	zhangwei	{"week":{"year":2018,"week":33},"works":[{"project":"1031802","task":"研发","requester":"","problem":"","time":[7,7,8,8,8],"work":"1.xql新增流式和批处理类型\\n2. 任务审核新增删除\\n3.修改bug:定时任务弹窗问题\\n4.重构xql查询页面，改成可拖拽大小的窗口布局"}],"reporter":{"name":"张微","team":"Web研发组"}}
2018	33	zhoujunlong	{"week":{"year":2018,"week":33},"works":[{"project":"B030002","task":"","requester":"","problem":"","time":[0,1,1,1,0],"work":""},{"project":"B030003","task":"","requester":"肖雨涵","problem":"","time":[1,0,0],"work":""}],"reporter":{"name":"周俊龙","team":"数据架构组"}}
2018	33	liujia	{"week":{"year":2018,"week":33},"works":[{"project":"1031801","task":"研发","requester":"","problem":"","time":[8,8,8,8,8,0],"work":"硬件稳定性测试"}],"reporter":{"name":"刘佳","team":"Web研发组"}}
2018	33	taomengyao	{"week":{"year":2018,"week":33},"works":[{"project":"1031802","task":"产品设计","requester":"","problem":"人力有限，需协助","time":[8,8,8,8,8,0],"work":"1AGG任务依赖功能设计；\\n2.AGG产品部分页面优化；\\n3.sprint11需求沟通和跟进；\\n4.XQL语法说明手册编辑，待完善初级版本和高级版本。"}],"reporter":{"name":"陶梦瑶","team":"产品项目组"}}
2018	33	lili	{"week":{"year":2018,"week":33},"works":[{"project":"1020002","task":"研发","requester":"田斌","problem":"无","time":[8,8,0,8,8],"work":"泰尔检测接口代码设计、编码、测试、联调"}],"reporter":{"name":"李丽","team":"Web研发组"}}
2018	33	yangyixin	{"week":{"year":2018,"week":33},"works":[{"project":"B030006","task":"基础研发","requester":"杨贻鑫","problem":"1、lookup hbase逐条查询性能为3.5千/KB/S\\n     批查，设置batchSize为100后，性能提升到8.5千/KB/S\\n2、flink自身对sink kafka不支持自定义message key，而目前的流式业务大都基于wormhole处理，必须依赖kafka message key来做处理，所以flink与wormhole配套使用会有一定风险，但flink与xmatrix-ss则没有这类问题\\n3、flink Table api在从DataStream\\u003cPOJO\\u003e转换时，生成的schema会根据POJO的字段名的字典顺序排序，导致与预设的schema顺序对应不上，导致字段错乱问题，要求在connect kafka时的schema设置也必须按照字段的字典顺序进行排序","time":[6,6,6,6,6],"work":"1、xmatrix-ss lookup hbase性能测试\\n2、xmatrix-ss 与agg2.0整合方案制定\\n3、xmatrix-ss 性能监控方案制定\\n4、flink 调研测试\\n5、flink实现topic拆分实现"}],"reporter":{"name":"杨贻鑫","team":"数据架构组"}}
2018	33	liushichang	{"week":{"year":2018,"week":33},"works":[{"project":"B020204","task":"系统运维","requester":"刘龙飞","problem":"","time":[6,7,6,7,6],"work":"生产环境发布更新、配合研发排查定位问题、服务器迁移"}],"reporter":{"name":"刘世昌","team":"数据架构组"}}
2018	33	zhangyaodong	{"week":{"year":2018,"week":33},"works":[{"project":"B030005","task":"基础研发","requester":"","problem":"","time":[3,3,3,3,3],"work":"1.catalyst 原理解析\\n2. xql query pushdown 优化调研"}],"reporter":{"name":"张耀东","team":"数据架构组"}}
2018	33	xiaopeng	{"week":{"year":2018,"week":33},"works":[{"project":"1031802","task":"研发","requester":"","problem":"","time":[6,6,6,7,7],"work":"1. sprint10 收尾上线\\n2. 功能修改：xql 读权限放开；kill 权限限制个人\\n3. 任务依赖模块调研和设计"},{"project":"个人学习","task":"","requester":"","problem":"","time":[2,2,2,1,1],"work":"使用 flask 开发项目的整理"}],"reporter":{"name":"肖鹏","team":"Web研发组"}}
2018	33	zhoukang	{"week":{"year":2018,"week":33},"works":[{"project":"605UC1703","task":"项目需求管理","requester":"杨星","problem":"","time":[0,0,4,2],"work":"同客户沟通数据中心需求，重新设计在客户侧的数据流和工作流"},{"project":"1031802","task":"产品设计","requester":"","problem":"","time":[6,4,0,0,2],"work":""}],"reporter":{"name":"周康","team":"Web研发组"}}
2018	33	sunyan	{"week":{"year":2018,"week":33},"works":[{"project":"819GAZY","task":"售前","requester":"","problem":"","time":[6,8,6,6,6],"work":"数据合作对接"}],"reporter":{"name":"孙岩","team":"数据挖掘组"}}
2018	33	liujiaxin	{"week":{"year":2018,"week":33},"works":[{"project":"1020000","task":"研发","requester":"刘龙飞","problem":"","time":[6,4,2],"work":"阿里云服务器迁移至腾讯云相关事项"}],"reporter":{"name":"刘家鑫","team":"数据架构组"}}
2018	33	dongchengzhi	{"week":{"year":2018,"week":33},"works":[{"project":"1031801","task":"研发","requester":"","problem":"","time":[1,2,1,4,0],"work":"1、wifi恶意检测类型更新\\n\\n2、wifi 出口ip 接口开发"},{"project":"B030001","task":"基础运维","requester":"","problem":"","time":[1,2,1,1,3],"work":"1、hdfs空间存储运维优化（hive表建表orc及减少备份）\\n\\n2、hive计算性能任务优化（语句调优及脚本优化）\\n"},{"project":"B030007","task":"基础研发","requester":"","problem":"","time":[2,2,4,4,4],"work":"1、url相关集市表开发\\n\\n2、app国家验证、wifi设备关系脚本定时\\n\\n3、地理位置以及WiFi属性表入es\\n4、ipip地理位置信息库更新入库"}],"reporter":{"name":"董承智","team":"数据挖掘组"}}
2018	33	wangchao	{"week":{"year":2018,"week":33},"works":[{"project":"1031701","task":"产品设计","requester":"","problem":"","time":[4,4,5,6,1],"work":"1、跟进v2.5优化开发，并测试；"},{"project":"819NS33","task":"安服","requester":"高赛松","problem":"","time":[0,4,1],"work":"1、整理“活动轨迹挖掘系统”软著申请材料"},{"project":"819OM01","task":"安服","requester":"周国辉","problem":"","time":[0,0,0,2,7],"work":"1、设计态势感知原型图"}],"reporter":{"name":"王超","team":"产品项目组"}}
2018	33	chengcong	{"week":{"year":2018,"week":33},"works":[{"project":"1031802","task":"研发","requester":"","problem":"\\n","time":[6,7,6,5,6],"work":"1 数据源代码整理，移除access读写权限。\\n2 hdfs调整，hdfs抽象成数据源，统一配置。\\n\\n"}],"reporter":{"name":"程聪","team":"Web研发组"}}
2018	33	xusheng	{"week":{"year":2018,"week":33},"works":[{"project":"1031701","task":"研发","requester":"","problem":"","time":[8,8,8,6,4],"work":"1. 对接 2.5 迭代需求并拆分任务\\n2. 完成快捷搜索功能\\n3. 完成关联关系简要描述的功能。\\n4. 修复一系列小问题"}],"reporter":{"name":"许盛","team":"Web研发组"}}
2018	33	chenjingjing	{"week":{"year":2018,"week":33},"works":[{"project":"1020400","task":"产品设计","requester":"","problem":"","time":[1,0,1,0,1],"work":"保障相关数据"},{"project":"1031601","task":"","requester":"","problem":"","time":[0,1,0,1,0],"work":"保障相关数据"},{"project":"1031701","task":"","requester":"","problem":"","time":[1,0,1,0,1],"work":"保障相关数据\\n新建需求表"},{"project":"1031802","task":"运营","requester":"","problem":"","time":[1,1,1,0,0],"work":"数据仓库表描述及优化"},{"project":"B030001","task":"","requester":"","problem":"","time":[1,2,1,1,1,0],"work":"数据仓库表监控运维\\n数据仓人工运营表更新\\n数据仓库表问题跟踪处理\\n"},{"project":"B030007","task":"","requester":"","problem":"","time":[3,2],"work":"设备指纹验证分析"},{"project":"819GAZY","task":"","requester":"","problem":"","time":[0,0,0,8,8,4,3],"work":"相关数据收集准备及数据表开发"}],"reporter":{"name":"陈晶晶","team":"数据挖掘组"}}
2018	33	lihua	{"week":{"year":2018,"week":33},"works":[{"project":"1031801","task":"","requester":"","problem":"","time":[8,6,4,0,4],"work":"一体化一期数据表问题沟通与修正\\n\\nip固网基站判断数据补充逻辑完成。数据移交给张路。\\n"},{"project":"1020101","task":"","requester":"刘波","problem":"","time":[0,0,8],"work":"oppo不良行为检测价值点提供---OPPO2018年上半年扫描数据提供"},{"project":"1020000","task":"","requester":"谭肖依","problem":"一个月的数据难以获取，沟通后改先查看一天的数据。","time":[0,0,0,4],"work":"内部数据需求处理--分析云请求的成功率，不同时区范围内云请求的耗时，以对云扫描服务进行优化。\\n"},{"project":"B020110","task":"研发","requester":"肖雨菡","problem":"","time":[0,3],"work":"不规范样本提供"},{"project":"819PS26","task":"","requester":"范毅","problem":"ip_section函数使用异常，耽误了2个工作日。","time":[],"work":"邻水固网ip相关数据提供"},{"project":"8020202","task":"","requester":"","problem":"","time":[0,0,0,0,4],"work":"对外/商务合作数据能力验证\\n银行仿冒hash和钓鱼url相关数据提供"}],"reporter":{"name":"李华","team":"数据挖掘组"}}
2018	34	lihua	{"week":{"year":2018,"week":34},"works":[],"reporter":{"name":"李华","team":"数据挖掘组"}}
\.


--
-- Name: project project_pkey; Type: CONSTRAINT; Schema: c; Owner: work
--

ALTER TABLE ONLY c.project
    ADD CONSTRAINT project_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: c; Owner: work
--

ALTER TABLE ONLY c."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: weekly weekly_pk; Type: CONSTRAINT; Schema: c; Owner: work
--

ALTER TABLE ONLY c.weekly
    ADD CONSTRAINT weekly_pk PRIMARY KEY (year, week, name);


CREATE INDEX project_order_index ON c.project ("order");
--
-- Name: user_team_index; Type: INDEX; Schema: c; Owner: work
--

CREATE INDEX user_team_index ON c."user" USING btree (team);


--
-- Name: weekly_name_index; Type: INDEX; Schema: c; Owner: work
--

CREATE INDEX weekly_name_index ON c.weekly USING btree (name);


--
-- PostgreSQL database dump complete
--

