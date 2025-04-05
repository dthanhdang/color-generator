-- Migration number: 0003 	 2025-03-13T17:26:17.562Z

drop table if exists favorite_palette;

create table favorite_palette (
  id integer not null primary key autoincrement,
  json_generated_colors text not null,
  json_generator text not null,
  user_id integer not null,
  constraint fk_user_id foreign key (user_id) references user (id) on delete cascade
);

drop table if exists favorite_color;

create table favorite_color (
  id integer not null primary key autoincrement,
  color_space text not null check(color_space = 'hsl' or color_space = 'oklch' or color_space = 'rgb'),
  json_components text not null,
  user_id integer not null,
  constraint fk_user_id foreign key (user_id) references user (id) on delete cascade
);
