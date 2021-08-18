Docker 提供了一个开发，打包，运行 app 的平台

应用程序的运行被隔离在一个独立的运行环境之中，这个独立的运行环境好似一个容器，包裹住了应用程序

把 app 和底层 infrastructure（基础设施） 隔离开来

把底层物理设备（虚拟设备）和应用隔离开

- Application

- Docker Engine

- infrastructure（physical/virtual）

Docker Engine 提供了

1. 后台进程（dockerd）
2. Restful API Server
3. CLI

底层技术支持

namesapces 做隔离 pid，net,ipc,mnt,uts
control groups 做资源限制
union file systems： Container 和 image 的分层

## Docker Image 镜像

1. 文件和 meta data 的集合 （root fs）
2. 分层的，并且每一层都可以添加改变删除文件，成为新的 image
3. 不同的 image 可以共享相同的 layer
4. Image 本身是 read-only 的

### 查看本地已经有的镜像

docker image ls

通过 dockerfile 构建 docker image

docker run -d -p 9411:9411 openzipkin/zipkin

### 制作一个镜像

docker pull hello-world

docker run hello-world

docker build -t flydean/koa-web-app .
docker run -p 54321:8080 -d flydean/koa-web-app
https://www.cnblogs.com/flydean/p/14347023.html

## 容器 Container

Container 通过 Image 创建
docker container image 正在运行的容器

docker run -it 交互式的

### 删掉进程

docker container rm id

### 删除镜像

docker rmi

### 查看所有容器

docker ps -a  
等于
docker container ls -a

-q(只列出来 id)
docker container ls -aq

### 查看正在运行的容器

docker container ls

删除所有容器
docker rm $(docker container ls -aq)

## 构建自己的镜像

docker container commit （docker commit）

docker build （通过 dockerfile 构建 image）

举例
docker run -p 54321:8080 -d flydean/koa-web-app -it
先 运行一个 image

docker commit container(已经存在的 container) id/new_image_name

查看正在跑的端口
netstat -tunlp
