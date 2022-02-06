use sakila;


## 偏移量大，效率低
SELECT film_id, title, description from `film` ORDER BY title LIMIT 900, 10;

-- select f.film_id, f.title, f.description from `film`f
-- inner join (select film_id from `film` order by title limit 900, 10) m
-- on f.film_id = m.film_id