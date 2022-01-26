use sakila;

-- show index from customer;

--  explain SELECT count(first_name) from customer;
--  没有possible keys 证明走了全局扫描

explain SELECT count(*) from customer;