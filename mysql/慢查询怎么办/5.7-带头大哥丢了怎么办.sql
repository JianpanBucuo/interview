use sakila;

-- create table `inventory_3` (
--   `inventory_id` mediumint unsigned not null auto_increment,
--   `film_id` smallint unsigned not null,
--   `store_id` tinyint unsigned not null,
--   `last_update` timestamp not null default current_timestamp on update current_timestamp,
--   primary key(`inventory_id`),
--   key `idx_store_id_film_id`(`store_id`, `film_id`)
-- )engine=innodb auto_increment=101 default charset=utf8;

-- insert `inventory_3` SELECT * from inventory;


EXPLAIN select film_id from `inventory_3` where film_id =3