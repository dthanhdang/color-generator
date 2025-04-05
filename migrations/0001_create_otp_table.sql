-- Migration number: 0001 	 2025-03-12T12:22:37.086Z

create table otp (
  email text primary key not null,
  code text not null,
  validity text not null
);
