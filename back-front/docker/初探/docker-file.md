### 通过 dockerfile 构建 docker image

```dockerfile
# 空
From scratch
# 使用centos为自己的base image，在这之上构建自己的image
From centos

# metadata 相当于注释
LABEL maintainer="jinjian"
LABEL version = "1.0"

# 运行命令 （避免分层，合成多层命令为一层）
RUN

# 执行命令的目录 尽量使用绝对目录
WORKDIR /root
WORKDIR /demo

# 通过把本地的文件添加到镜像里 ADD COPY
# 将hello 放到 镜像的根目录
ADD hello /
# 不仅可以将文件添加到指定目录，还可以解压缩
ADD test.tar.gz /

# workdir 和 add 联合使用
WORKDIR /ROOT
ADD HELLO TEST/
#  root/test/hello

# 添加远程文件/目录使用curl 或者 wget

# 设置常量
ENV MYSQL_VERSION 5.6

RUN apt-get install -y mysql-server = ${MYSQL_VERSION}

# 尽量使用env，增加可维护性


# 存储和网络
VOLUME

EXPOSE

CMD

ENTRYPOINT



```
