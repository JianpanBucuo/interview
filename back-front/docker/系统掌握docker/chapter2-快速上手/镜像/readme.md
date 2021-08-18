# 镜像

## 镜像的获取

- pull from registry（可以从远程仓库拉取）
- build from Dokerfile（可以通过 dockerfile 构建）
- load from files （可以通过导入导出获取）
- container commit （可以通过容器 commit 生成镜像）

### 镜像的导入导出 offline

docker image save nginx:1.20.0 -o nginx.image
docker image save nginx:[tag] -o [name]
将镜像导出，名称为 nginx.image

docker image load -i nginx.image
docker image load -i [name]
导入镜像

`-i 导入 -o 导出`

## Docker Image 常用命令

docker image pull nginx

docker image pull nginx:1.20.0
拉取指定版本的 nginx

docker image pull quay.io/bitnami/nginx
拉取非官方的 nginx

docker image ls
查看本地镜像

docker image inspect [id]
查看镜像的详细信息

docker image rm [id]
删除镜像

docker system prune -f
清理已经停止的容器

## 通过 commit 创建镜像

docker container run -d -p 80:80 nginx
启动容器

docker container exec -it 62a74 sh
进入容器

cd usr/share/nginx/html

more index.html

echo "<h2>hello docker</h2>" > index.html
修改 index.html

`关闭容器后再次启动还是会是修改后的内容`

docker container commit [containerId] [imageName:tag]
通过一个 container 创建新的 image

## scratch 镜像（描摹镜像）

scratch 是一个空的镜像
基础镜像一般用 scratch
