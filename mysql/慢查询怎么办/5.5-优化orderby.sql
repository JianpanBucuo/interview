use sakila;

select * from `film` where film_id > 80 order by title

-- 如果这个中间结果太大，会将这个中间结果放到硬盘中 排序
select * from `film` where film_id > 80