-- Migration number: 0005 	 2025-05-05T08:40:25.007Z

PRAGMA defer_foreign_keys = true;

update user_favorite_palette set palette_id=-palette_id;

create table public_palette_new(
  colors text not null,
  created_at text not null,
  id integer not null primary key autoincrement,
  likes integer not null,
  unique(colors)
);

insert into public_palette_new(
  colors,
  created_at,
  id,
  likes
) select colors,
  '2025-05-05',
  id,
  likes
from public_palette;

drop table public_palette;

alter table public_palette_new rename to public_palette;

update user_favorite_palette set palette_id=-palette_id;

PRAGMA defer_foreign_keys = false;
