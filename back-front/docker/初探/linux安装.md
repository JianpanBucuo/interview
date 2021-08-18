linux 安装 docker
https://www.runoob.com/docker/centos-docker-install.html

安装 node
node-v16.4.2.tar.gz
下载
wget https://nodejs.org/dist/v10.9.0/node-v16.4.2-linux-x64.tar.xz
解压
tar xf node-v16.4.2-linux

/root/node/node-v16.4.2-linux-x64/bin/
建立软连接
ln -s /root/node/node-v16.4.2-linux-x64/bin/npm /usr/local/bin/npm
ln -s /root/node/node-v16.4.2-linux-x64/bin/node /usr/local/bin/node

具体信息
https://www.runoob.com/nodejs/nodejs-install-setup.html
