use sakila;

select title, description from `film` order by rand() limit 3;