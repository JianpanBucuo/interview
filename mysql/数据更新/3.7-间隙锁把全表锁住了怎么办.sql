use sakila;


-- create table `t3` (
-- `id` int(11) not null,
-- `c` int(11) DEFAULT null,
-- `d` int(11) default null,
-- PRIMARY KEY(`id`)
-- )ENGINE = INNODB;

-- INSERT into `t3` VALUES(0,0,0),(10,10,10),(20,20,20),(30,30,30),(40,40,40),(50,50,50);
SELECT * FROM t3 WHERE id = 10 FOR UPDATE;