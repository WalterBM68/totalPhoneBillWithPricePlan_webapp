
create table theUser (
    id serial not null primary key, 
    name text not null
);
create table price_plan (
    id serial not null primary key, 
    plan_name VARCHAR(10) not null, 
    sms_price int not null, 
    call_price int not null,
    reg_id int, 
    foreign key (reg_id) references theUser(id)
);
