## redis

基于键值对的存储服务

多种数据结构

### redis 特性

1. 速度快
   10w OPS(10 万次读写)
2. 持久化
3. 多种数据结构
4. 支持多种编程语言
5. 功能丰富
6. 简单
7. 主从复制
8. 高可用 分布式

- 为什么速度块？
  因为 redis 将数据存在内存当中（内存中读取很快）
  数据存储在什么介质上直接影响读取写入速度

  寄存器 Register -> 一级缓存 L1 Cache-> 二级缓存 L2 Cache -> 内存 Main Memory -> 本地硬盘 Local Disk -> 远程硬盘 Remote Disk
  （Fast small expensive） -> (Slow big Cheap)

- 持久化（断电不丢数据）
  机器断电时 无法对内存进行恢复，
  redis 提供了持久化的功能。
  Redis 将所有数据保存在内存中，对数据的更新将异步的保存在磁盘上

- 多种数据结构

字符串 String/Blobs/Bitmaps

哈希 Hash Tables (objects)

列表 Linked Lists

集合 Sets

有序集合 Sorted Sets

（其他-衍生的数据结构）

位图 BitMaps

HyperLogLog 内存唯一值计数 （2.7）

Geo 地理信息位置（3.2）

- 支持多种客户端语言

- 功能丰富

1. 发布订阅
2. Lua 脚本
3. 事务
4. pipeline

- 简单

  1. 2w 行代码
  2. 不依赖外部的库
  3. 单线程

- 主从复制

  主服务器的数据可以复制到从服务器上

- 高可用，分布式

redis2.8 提供了 Redis-Sentinel(v2.8) 支持高可用

redis 3.0 提供了 Redis-Cluster 支持分布式

- 典型使用场景

1. 缓存系统
   AppServer -> Cache -> Storage (提供访问速度，提高响应效率)
2. 计数器
   incre （视频播放的数进行计数）
3. 消息队列系统
   发布订阅，阻塞队列
4. 排行榜功能
   ？
5. 社交网络
   ？
6. 实时系统
   垃圾邮件处理系统

- 什么语言写的？
  是由 c 语言编写的

- 线程模型
  单线程（？）

### 启动方式

1. 安装
2. 可执行文件说明
3. redis 启动方法
4. 客户端链接

- linux 下安装
  wget http://download.redis.io/releases/redis-3.0.7.tar.gz
  tar -xvf redis-3.0.7.tar.gz （解压缩）

  ln -s redis-3.0.7 redis （建立软连接？）
  cd redis
  make

  && make install 需要权限

启动 redis
redis-server

建立连接
redis-cli -h 127.0.0.1 -p 6379

查看进程
ps -ef | grep redis-server
ps -ef | grep redis-server | grep -v grep

配置文件方式 启动 redis
cd/opt/soft
cd redis

mkdir config

mv redis

- 可执行文件说明

redis-server 启动 redis 服务器
redis-cli redis 命令行客户端
redis-benchmark 性能测试
redis-check-aof 对 aof 进行修复（断电修复）
redis-check-dump 对 RDB 文件检查工具
redis-sentinel Sentinel 服务器（2.8 之后）

- 三种启动方法

1. 最简启动 redis-server

ps -ef | grep redis

netstat -antpl | grep redis

redis-cli -h ip -p port ping

2. 动态参数启动
   6379 为默认端口

   redis-server --port 6380

3. 配置文件启动

- 生产环境建议使用选择配置启动 (一台机器启动多个 redis 服务)
  单机多实例配置文件可以用端口区分

  4. redis 客户端连接服务端

  redis-cli -h 10.10.79.150 -p 6384
  set hello world
  get hello

状态回复
错误回复
整数回复
字符串回复
多行字符串回复 mget hello foo

### 常用配置

daemonize -> 是否时守护进程 （默认 no）
port -> 端口 6379
logfile -> 日志（文件名）
dir -> 工作目录

### 安装
