### 日志搜索

查看滚动日志
tail -f /app/applogs/wappay30/wappay30

查看文件内容
cat [file]

根据手机号、订单号查
grep 21121775031552f0c7c200b5a352 /app/applogs/wappay30/wappay30
grep commPayment.do /app/applogs/wappay30/wappay30

grep getMerImage.do /app/applogs/wappay30/wappay30

grep -A50 getMerImage.do /app/applogs/wappay30/wappay30|grep http-bio-8080-exec-15
根据接口 后 50 行
grep -A50 /userNoPwdLoginPay.do /app/applogs/wappay30/wappay30 | grep 13260087246

grep a index.html | grep b
在查找 a 的基础上查找 b

## tail

tail -n 5 test.txt
从文件尾部截取数据 5 行

tail -n -f test.txt
实时从文件尾部截取数据 5 行

## cat

cat -n test.txt
-n 展示行号

## tac

从最后一行开始展示 `tac是cat的倒写形式`

## head

显示文件开头的内容，以行为单位，默认文件开头的前 10 行
