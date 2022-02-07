use sakila;

--  SELECT * FROM city where city='xiangfan';
-- --  读未提交
--  set session transaction isolation level read uncommitted;
-- --  开始事务
--  begin;
--  update city set city = 'xiangyang' where city_id = 578;
select @@transaction_isolation;