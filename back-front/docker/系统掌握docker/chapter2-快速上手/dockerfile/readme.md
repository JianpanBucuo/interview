# Dockerfile

Dockerfile 是用于构建 docker 镜像的文件
Dockerfile 里包含了构建镜像所需的指令

## 使用 Dockerfile 的注意事项

1. 基础镜像的选择 尽量使用官方的
2. 指定版本
3. 选择体积小的
4. Run 尽量写一层，避免分层过多

### 如何上传到 dockerhub

docker image tag pyhello:1.0 jianpanbucuo/pyhello:1.0
根据已有镜像 创建新的镜像

docker login

docker image push jianpanbucuo/pyhello:1.0

## 命令

docker image build -t pyhello:1.0 .
通过 dockerfile 构建镜像
`-t 标签，名字`
`-f 指定dockerfile文件`
`. 会去寻找当前文件夹的dockerfile文件`
docker image build -t pyhello:1.0 -f dockerfile.bad .

之后就可以运行镜像 docker container run -it pyhello:1.0

### FROM 获取基础镜像

### RUN 执行命令

### COPY ADD

两个命令都可以把本地的文件复制到镜像里

```dockerfile
COPY hello.py /app/hello.py

```

`如果 app 这层目录不存在，则会自动创建`

ADD 相比于 COPY 高级一点的地方就是会自动解压缩

```dockerfile
ADD hello.tar.gz /app/
ADD ./dist /app/dist
```

### WORKDIR

进行目录的切换

```dockerfile
WORKDIR /app
```

如目录不存在，会自动创建目录

### 构建参数和环境变量 （ARG ENV）

### CMD

- 指定容器启动时默认执行的命令
- 如果 docker container run 启动容器时指定了其它命令，则 CMD 命令会被忽略
- 如果定义了多个 CMD,只有最后一个会执行

### ENTRYPOINT

entrypoint 也可以设置启动容器时执行的命令，但是和 cmd 是有区别的

- cmd 设置的命令，可以被 docker container run 的时候传入的命令覆盖掉，entrypoint 里的不会
- entrypoint 和 cmd 可以联合使用， entrypoint 设置执行的命令，cmd 传递参数
