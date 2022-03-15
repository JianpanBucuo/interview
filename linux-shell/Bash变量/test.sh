# 定义变量
your_name="tom"
# 将变量变成只读
 readonly your_name

his_name="aaaa"
#  删除变量  不能删除只读遍历
unset his_name
#  输出名字
echo $your_name

str='my name is $your_name'
echo $str

str2="my name is $your_name"
echo $str2
echo "截取 ${str2:1:4}"
# 获取字符串长度
echo ${#str2}

# 传递参数实例 ./test.sh abc as as
echo "执行文件带参数  $1 $2 $3" # 会将命令后参数赋值给 $1 $2 $3   下表为1开头

echo "参数个数为：$#"
echo "传递的参数作为一个字符串显示：$*";
# 数组

array_name=(val0 val1 val2)
array_name[3]=val3

echo ${array_name[@]}
# 数组的长度
echo ${#array_name[@]}