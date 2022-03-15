#!/bin/bash

val=`expr 2 + 2`
echo "两数之和为 : $val"

a=0
b=10
val2=`expr $a + $b`
echo "a+b ${val2}"

if [ $a == $b ]
then
   echo "a 等于 b"
fi

if [ $a != $b ]
then
   echo "a 不等于 b"
fi
#  大于
if [ $a -gt $b ]
then
   echo "a 大于 b"
else 
   echo "否： a 大于 b"
fi
#  小于
if [ $a -lt $b ]
then
   echo "a 大于 b"
fi
# 大于等于 -ge
# 小于等于 -le
# 相等 -eq
# 不相等 -ne

# !非
# -o 或  ||
# -a 与 &&