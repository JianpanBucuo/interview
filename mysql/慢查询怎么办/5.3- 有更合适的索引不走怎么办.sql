
-- create table sakila.city_1 (city VARCHAR(50) not null);

-- 在新表中插入数据
-- INSERT into sakila.city_1 SELECT city FROM sakila.city;
-- INSERT into sakila.city_1 SELECT city FROM sakila.city;
-- INSERT into sakila.city_1 SELECT city FROM sakila.city;
-- INSERT into sakila.city_1 SELECT city FROM sakila.city;

--  把表中的数据打乱
-- update sakila.city_1 set city = ( SELECT city from sakila.city ORDER BY rand() LIMIT 1 );
 
 
--  增加以下前缀索引
-- alter table sakila.city_1 add key (city(1));
-- alter table sakila.city_1 add key (city(2));
-- alter table sakila.city_1 add key (city(3));
-- alter table sakila.city_1 add key (city(4));
-- alter table sakila.city_1 add key (city(5));
-- alter table sakila.city_1 add key (city(6));
-- alter table sakila.city_1 add key (city(7));
-- alter table sakila.city_1 add key (city(8));

-- 查看索引情况

show index from city_1;