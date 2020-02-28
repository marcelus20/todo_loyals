
-- drop database if exists loyals ;
-- create database loyals;

use loyals;

drop table if exists loyal_points;
create table loyal_points(
	id int(11) not null,
    uid varchar(15) not null unique,
    points smallint(2) default(0),
    date_ timestamp default current_timestamp
);

drop table if exists redeemed_promo;
create table redeemed_promo(
	id tinyint(1) default(1) not null,
    amount int(11) default(0)
);

alter table loyal_points add constraint primary key(id, uid);
alter table redeemed_promo add constraint primary key(id);
alter table loyal_points modify id int(11) not null auto_increment;


drop procedure if exists addLoyalPoint;
delimiter //
create procedure addLoyalPoint(uid_ text)
begin
	insert into loyal_points(uid) value (uid_); 
end //
delimiter ;

drop procedure if exists insertPromo;
delimiter //
create procedure insertPromo()
begin
	insert into redeemed_promo (amount) value(0);
end //
delimiter ;



drop procedure if exists incrementPromo;
delimiter //
create procedure incrementPromo()
begin
	declare amount_ int;
    set amount_ = (select amount from redeemed_promo);
	update redeemed_promo set amount = amount_ + 1 where id = 1;
end //
delimiter ;


drop procedure if exists incrementLoyalPoint;
delimiter //
create procedure incrementLoyalPoint(uid_ text, points_ text)
begin
	declare p int default(points_); 
    set p = p + (select points from loyal_points where uid = uid_); 
	update loyal_points set points = p, date_ = current_timestamp where uid = uid_;
end //
delimiter ;

drop procedure if exists deleteLoyalPointRecord;
delimiter //
create procedure deleteLoyalPointRecord(uid_ text)
begin
	delete from loyal_points where uid = uid_;
end //
delimiter ;

CALL insertPromo();

create view selectAllLoyalPoints as select id, uid, points, date_ from loyal_points;

create view getPromosAmount as select amount from redeemed_promo;



