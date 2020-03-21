
drop database if exists loyals ;
create database loyals;

use loyals;




CREATE TABLE records (
                id INT AUTO_INCREMENT NOT NULL,
                type enum('customer','transaction','card') NOT NULL,
                date DATETIME NOT NULL default current_timestamp,
                PRIMARY KEY (id)
);


CREATE TABLE cards (
                card_id INT NOT NULL,
                customer_id INT NOT NULL,
                uuid VARCHAR(20) NOT NULL unique,
                PRIMARY KEY (card_id, customer_id)
);


CREATE INDEX cards_idx
 ON cards
 ( uuid );

CREATE TABLE transactions (
                transaction_id INT NOT NULL,
                card_id INT NOT NULL,
                customer_id INT NOT NULL,
                value INT NOT NULL,
                PRIMARY KEY (transaction_id, card_id, customer_id)
);


ALTER TABLE cards ADD CONSTRAINT records_cards_fk
FOREIGN KEY (card_id)
REFERENCES records (id)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE cards ADD CONSTRAINT records_cards_fk1
FOREIGN KEY (customer_id)
REFERENCES records (id)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE transactions ADD CONSTRAINT records_transactions_fk
FOREIGN KEY (transaction_id)
REFERENCES records (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE transactions ADD CONSTRAINT cards_transactions_fk
FOREIGN KEY (card_id, customer_id)
REFERENCES cards (card_id, customer_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION;



drop procedure if exists create_record;
delimiter //
create procedure create_record (in type enum('transaction', 'customer','card'), out id_ text)
begin
	declare datetime timestamp default(current_timestamp());
    set datetime = current_timestamp();
    insert into records(type, date) value(type, datetime);
    set id_ = (select id from records where date = datetime);
end //
delimiter ;

drop procedure if exists create_customer;
delimiter //
create procedure create_customer (out id int)
begin
	call create_record ('customer', @id);
    set id = @id;
end //
delimiter ;


drop procedure if exists create_card;
delimiter //
create procedure create_card (in uuid text, in customer_id text)
begin
	if is_customer_id(customer_id) then
		call create_record ('card', @id);
		insert into cards values(@id, customer_id, uuid);
	end if;
end //
delimiter ;

drop procedure if exists create_transaction;
delimiter //
create procedure create_transaction (in uuid text, in value text, out id int)
begin
	declare card_id int default(0);
    declare customer_id int default(0);
    
    call create_record ('transaction', @id);
    
    set card_id = get_card_id(uuid);
    set customer_id = get_customer_id(card_id);
    
    insert into transactions values(@id, card_id, customer_id, value);
    set id = @id;
end //
delimiter ;

drop function if exists get_card_id;
delimiter //
create function get_card_id(uuid text) returns int reads sql data
begin
	return (select card_id from cards where uuid = uuid);
end //
delimiter ;

drop function if exists get_customer_id;
delimiter //
create function get_customer_id(card_id text) returns int reads sql data
begin
	return (select customer_id from cards where card_id = card_id);
end //
delimiter ;

drop function if exists get_uuid_balance;
delimiter //
create function get_uuid_balance(uuid text) returns int reads sql data
begin
	return (select sum(value) from transactions where uuid = uuid);
end //
delimiter ;

drop function if exists get_customer_id_balance;
delimiter //
create function get_customer_id_balance(customer_id text) returns int reads sql data
begin
	return (select sum(value) from transactions where customer_id = customer_id);
end //
delimiter ;

drop function if exists is_customer_id;
delimiter //
create function is_customer_id(customer_id text) returns int reads sql data
begin
	declare flag boolean default (false);
    #select type from records where customer_id = customer_id;
    if 'customer' = (select type from records where customer_id = id) then set flag = true;
	end if;
    return flag;
end //
delimiter ;

drop procedure if exists create_customer_with_uuid;
delimiter //
create procedure create_customer_with_uuid (in uuid text, out flag boolean)
begin
	call create_customer(@id);
    call create_card(uuid, @id, @card_id);
    if @id is not null and @card_id is not null then set flag = 'true';
    else set flag = 'false';
    end if;
end //
delimiter ;

drop view if exists view_customers ;
create view view_customers 
	as select id as customer_id, date, (select group_concat(card_id  separator ',') from cards c where c.customer_id = r.id) card_id from records r where r.type = 'customer';
 
drop view if exists view_cards ;
create view view_cards 
	as select c.customer_id, c.card_id, date, uuid from cards c join records r on c.card_id = r.id;
    
drop view if exists view_transactions ;
create view view_transactions
	as select transaction_id, t.card_id, t.customer_id, uuid, date, value from transactions t join records r on r.id = t.transaction_id join cards c on t.card_id = c.card_id;
    

    
