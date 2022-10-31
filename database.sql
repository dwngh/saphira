create table orders (
id			int unsigned not null auto_increment,
patient_id	varchar(15) not null,
doctor_id	varchar(15) not null,
description	text(3000) not null,
price		int unsigned not null,
status		int not null,
shift		int check (shift > 0 and shift < 9) not null,
date		datetime not null,
created_at	datetime default current_timestamp,
primary key (id)
);