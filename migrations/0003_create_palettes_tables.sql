-- Migration number: 0003 	 2025-03-13T17:26:17.562Z

drop table if exists private_palette;

create table private_palette (
  id integer not null primary key autoincrement,
  colors text not null,
  user_id integer not null,
  constraint fk_user_id foreign key (user_id) references user (id) on delete cascade,
  unique(colors, user_id)
);

drop table if exists public_palette;

create table public_palette (
  colors text not null,
  id integer not null primary key autoincrement,
  likes integer not null,
  unique(colors)
);

drop table if exists user_favorite_palette;

create table user_favorite_palette (
  id integer not null primary key autoincrement,
  palette_id integer not null,
  user_id integer not null,
  constraint fk_palette_id foreign key (palette_id) references public_palette (id) on delete cascade,
  constraint fk_user_id foreign key (user_id) references user (id) on delete cascade,
  unique(palette_id, user_id)
);
