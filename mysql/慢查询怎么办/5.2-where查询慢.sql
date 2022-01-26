-- show DATABASES
use sakila;

-- SELECT * FROM actor;

-- 创建 库存表1
-- CREATE TABLE `inventory_1` (
--   inventory_id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
--   film_id SMALLINT UNSIGNED NOT NULL,
--   store_id TINYINT UNSIGNED NOT NULL,
--   last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   PRIMARY KEY  (inventory_id),
--   KEY idx_fk_film_id (film_id)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 复制数据， 少了联合索引
-- insert into inventory_1  SELECT * from inventory;

--  explain 查看执行计划
-- EXPLAIN select store_id, film_id from sakila.`inventory_1` where inventory_id = 1;

-- EXPLAIN select  film_id,store_id from sakila.`inventory` where store_id = 1;

-- EXPLAIN select inventory_id, sotre_id, film_id from sakila.`inventory` WHERE store_id =1;
EXPLAIN select inventory_id, store_id, film_id, last_update from sakila.`inventory` WHERE store_id =1;