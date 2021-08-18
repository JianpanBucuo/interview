文档 www.docker.tips
jianpanbucuo

### 容器基本操作

#### docker 命令行

docker -v 版本

docker version 本地 docker 详细信息

docker info

docker container ps
当前正在运行的容器

docker container ps -a
当前机器所有的容器

docker container top [id]
查看容器运行的进程

docker image ls
当前机器所有的镜像

docker image rm [imageName]

#### 镜像 Image 和容器 Container

##### 镜像 Image

- Docker Image 是一个`只读`的文件

- 这个文件包含需要运行 application 所需要的文件系统，源码，库文件，工具，依赖

- 可以理解为一个模板

- 具有分层的概念

- Docker Image 可以自己编写，也可以在 DockerHub 获取

##### 容器 Container

- 可以理解为运行中的 Docker Image

- 实质是复制一个镜像 Image，并在镜像 Image 层上加一层 Read-write 层（称之为 Container-layer，容器层）

- 可以基于一个镜像 Image，创建多个容器 Container
