# 定义变量
your_name="tom"
# 将变量变成只读
 readonly your_name

#  删除变量
# unset your_name
#  输出名字
echo $your_name

str='my name is $your_name'
echo $str

str2="my name is $your_name"
echo $str2

# 获取字符串长度
echo ${#str2}

# 传递参数实例 ./test.sh abc as as
echo "执行文件带参数 $0 $1 $2" # 会将命令后参数赋值给 $0 $1 $2