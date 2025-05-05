-- Migration number: 0004 	 2025-05-04T14:15:38.124Z

PRAGMA defer_foreign_keys = true;

update user_favorite_palette set user_id=-user_id;

create table user_new(
  id integer not null primary key autoincrement,
  email text not null,
  first_name text not null,
  last_name text not null,
  last_sign_in_date text not null,
  role text not null check(role = 'administrator' or role = 'registered_user'),
  sign_up_date text not null,
  unique(email, role)
);

insert into user_new(
  id, 
  email, 
  first_name,
  last_name,
  last_sign_in_date,
  role, 
  sign_up_date
) select id, 
  email, 
  first_name,
  last_name,  
  '2025-05-04',
  role,
  '2025-05-04'
from user;

drop table user;

alter table user_new rename to user;

update user_favorite_palette set user_id=-user_id;

PRAGMA defer_foreign_keys = false;
