# Nodepop

Project to learn and practice NodeJS, Express and MongoDB. It simulates an API for a ads app.

## Build & development

Use `npm install` to install all dependencies.

It require a mongodb server running on localhost listening on default port `27017`, this settings can be modified in `connectMoongoose.js`.

Run `npm run initdb` to initialize mongo database.

## API

The API accepts two routes, one for ads `/api/ads` and other for the tags `/api/tags`.
The ads accepts following methods:

    **ADS:**

    **GET**
    The default path returns a json with a list of all ads with the format `{"success": true, "rows": [{...}, {...}]}`. It accepts filters by name (starting by given string), by onSale (true for on sale products and false for searched products), by price (range like `priceFrom-priceTo`, `priceFrom-` or `-priceTo`) and by tags (accepts multiple tags separated b comma). It also accepts limit parameter to limit results.

    Example: `/api/ads?name=car&onSale=true&price=1500-3000&tags=motor,lifestyle&limit=15`

    The path followed by id returns a json with the single ad of that id with format `{"success": true, "row": {...}}`.

    **POST**