CREATE DATABASE phone_bill;
create role bill login password 'bill234';
grant all privileges on database phone_bill to bill;