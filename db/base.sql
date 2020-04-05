drop database if exists loyals ;
create database loyals;

use loyals;


CREATE TABLE records (
                id INT AUTO_INCREMENT NOT NULL,
                type enum('customer','transaction','card', 'access_token') NOT NULL,
                date DATETIME NOT NULL default current_timestamp,
                PRIMARY KEY (id)
);


CREATE TABLE access_tokens (
                access_token_id INT NOT NULL,
                expiry_date DATETIME NOT NULL default current_timestamp,
                token VARCHAR(50) NOT NULL,
                PRIMARY KEY (access_token_id)
);


CREATE TABLE cards (
                card_id INT NOT NULL,
                customer_id INT NOT NULL,
                uuid VARCHAR(20) NOT NULL,
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
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE access_tokens ADD CONSTRAINT records_access_token_fk
FOREIGN KEY (access_token_id)
REFERENCES records (id)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE transactions ADD CONSTRAINT cards_transactions_fk
FOREIGN KEY (card_id, customer_id)
REFERENCES cards (card_id, customer_id)
ON DELETE CASCADE
ON UPDATE CASCADE;


drop view if exists view_customers ;
create view view_customers 
	as select id as customer_id, date, (select group_concat(card_id  separator ',') from cards c where c.customer_id = r.id) card_id from records r where r.type = 'customer';
 
drop view if exists view_cards ;
create view view_cards 
	as select c.customer_id, c.card_id, date, uuid from cards c join records r on c.card_id = r.id;
    
drop view if exists view_transactions ;
create view view_transactions
	as select transaction_id, t.card_id, t.customer_id, uuid, date, value from transactions t join records r on r.id = t.transaction_id join cards c on t.card_id = c.card_id;
    
drop view if exists view_access_tokens;
create view view_access_tokens 
    as select r.id 'id', r.date 'creation_date', a.token 'token', a.expiry_date 'expiry_date' from access_tokens a join records r on a.access_token_id = r.id;
    


insert into records(type) value("access_token");
insert into access_tokens(access_token_id, token, expiry_date) value(1, 'XNnzXyVCMO0tUzyGp4NNWMOM7zrVcZUnmOeOVaF8Qdl1AlcnpB', date_add(current_timestamp(), interval 1 year));