# Парсер для кинопоиска

## Парсер для топ 250 кинопоиск

```JavaScript
node index_kinopoisk.js
```

```JavaScript
//136x204 - можно заменить на более высикое разрешение (600x900)
    item.src.replace("68x102", "136x204") // 35 строка
```

## Примеры получаемых json фалов

```json
{
    "title": "Зеленая миля",
    "imgUrl": "https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/4057c4b8-8208-4a04-b169-26b0661453e3/136x204"
},
```

Примеры получаемых фалов - db-kinopoisk-top250-pic68x102.json, db-kinopoisk-top250-pic600x900 ...
