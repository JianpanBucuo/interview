### 日志搜索

查看滚动日志
tail -f /app/applogs/wappay30/wappay30

根据手机号、订单号查
grep 21121775031552f0c7c200b5a352 /app/applogs/wappay30/wappay30
grep commPayment.do /app/applogs/wappay30/wappay30
根据接口 后 50 行
grep getMerImage.do /app/applogs/wappay30/wappay30

grep -A50 getMerImage.do /app/applogs/wappay30/wappay30|grep http-bio-8080-exec-15

grep -A50 /userNoPwdLoginPay.do /app/applogs/wappay30/wappay30 | grep 13260087246
