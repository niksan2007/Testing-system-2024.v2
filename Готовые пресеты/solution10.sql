select city, LENGTH(city) from (select * from STATION order by LENGTH(city), city)
where rownum = 1
union all
select city, LENGTH(city) from (select * from STATION order by LENGTH(city) desc, city)
where rownum = 1