## 概念

### 计算机层次结构

1. 裸机（CPU，内存， 硬盘）
2. 操作系统(windows linux)
3. 应用程序，软件

- 操作系统负责管理`硬件`，`软件`等计算机资源,并合理地`组织调度计算机的工作和资源 的分配`，以提供给用户其他软件方便的`接口和环境`，它是计算机系统中`最基本的系统软件`(最接近硬件的软件)

#### 操作系统作为系统资源的管理者，需要什么样的功能？

\*进程是一个程序的执行过程，执行前需要将程序放到内存中，才能被 CPU 处理\*

1. 文件管理
2. 存储器管理（内存管理，将程序相关数据放入内存）
3. 处理机管理(对应的进程被 CPU 处理)
4. 设备管理

#### 作为用户和计算机硬件之间的接口，需要什么样的功能？

1. 命令接口： 允许命令直接使用

- 联机命令接口（`交互式命令接口`）（用户一句， 操作系统执行一句）
- 脱机命令接口（`批处理命令接口`）（用户一堆， 操作系统执行一堆）

2. 程序接口：允许用户通过程序间接使用
   .dll 文件，程序员可以调用 user.dll 文件，即可实现创建窗口等功能，只能通过用户程序间接使用（`系统调用 === 广义指令`）
3. GUI： 现代操作系统中最流行的图形用户接口

目标： 方便用户使用

#### 作为最接近硬件的层次，需要什么功能？

目标：实现对硬件机器的扩展

没有任何软件支持的计算机称为`裸机`，在裸机上安装的操作系统，可以提供资源管理功能和方便用户的服务功能，将裸机改造成功能更强，使用更方便的机器

通常把覆盖了软件的机器称为扩充机器，又称之为虚拟机
