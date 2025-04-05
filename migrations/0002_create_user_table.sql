-- Migration number: 0002 	 2025-03-12T15:45:50.578Z

create table user (
  id integer not null primary key autoincrement,
  email text not null,
  first_name text not null,
  last_name text not null,
  role text not null check(role = 'administrator' or role = 'registered_user'),
  unique(email, role)
);
