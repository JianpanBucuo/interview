### 创建容器

启动容器
docker container run nginx

列出当前正在运行的 container
docker container ls(ps)

列出所有的 container
docker container ls(ps) -a

列出所有的 container (只展示 id)
docker container ls(ps) -aq

停止一个正在运行的容器
docker container stop [name]/[id]

删除一个容器
docker container remove [name]/[id]

批量操作
docker container stop [name]/[id] [name]/[id]

删除没有用到的镜像
docker image prune -a

停止所有的容器
docker container stop $(docker container ls -aq)
docker container rm $(docker container ls -aq)

### 容器的两种模式（推荐使用 dettach）

docker container run -p 80:80 nginx

查看 127.0.0.1

attach 模式 前台执行 (将容器内部的输入输出在前端打印出来)

dettach 模式 后台执行(不会在前端打印容器内部日志)

docker container run -d -p 80:80 nginx

将正在运行的容器 dettach 改成 attach 模式
docker attach [id]

### 容器的交互！！！！

dettach 模式下查看容器内部的日志

docker container logs [name]/[id]
docker container logs [name]/[id] -f 动态式查看

docker container run -p 80:80 -it nginx sh 启动容器并可交互
docker container run -p 80:80 -d nginx sh 启动容器并可交互

sh 代表 command 命令

`交互式的进入到正在运行的 container`
docker exec -it [name]/[id] sh

exit 退出容器环境
