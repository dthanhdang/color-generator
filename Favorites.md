[Q] can we have private user palettes which aren't favorite ?

- Public favorites :

* can be listed (sorted by likes), can be liked (increase likes counter and add to userFavoritePublicPalette)
* user can edit it
* when it's unliked (either from palettes browser or editor), likes are decreased (=> we need the public_palette.id) and it's deleted from user_favorite_public_palette (ie we also need public_palette [actually not : we may delete using palette_id / user_id])

- Private palettes :

TODO :

- admin : automatically generate public palettes
- have a /current-user/palette/status to check if a palette is favorite, use it to toggle icon
- switch off favorite status on onChangeEnd

PB avec la notion d'unicité (si on a une palette privée on peut avoir un doublon avec une palette existante)
