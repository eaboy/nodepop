# Nodepop

Project to learn and practice NodeJS, Express and MongoDB. It simulates an API for a ads app.

## Build & development

Use `npm install` to install all dependencies.

It require a mongodb server running on localhost listening on default port `27017`, this settings can be modified in `connectMoongoose.js`.

Run `npm run initdb` to initialize mongo database.

## Test

Use `npm run e2e` to run end2end tests.

## API

The API accepts two routes, one for ads `/api/ads` and other for the tags `/api/tags`.
Accepted methods:

**ADS:**

**GET**

The default path returns a json with a list of all ads with the format `{"success": true, "rows": [{...}, {...}]}`. It accepts filters by name (starting by given string), by onSale (true for on sale products and false for searched products), by price (range like `priceFrom-priceTo`, `priceFrom-` or `-priceTo`) and by tags (accepts multiple tags separated b comma). It also accepts limit parameter to limit results.

Example: `/api/ads?name=car&onSale=true&price=1500-3000&tags=motor,lifestyle&limit=15`

The path followed by id returns a json with the single ad of that id with format `{"success": true, "row": {...}}`.

Example: `/api/ads/59c7e7237435215cb86bbad9`

**POST**

It saves a new ad in the database, data must be provided in x-www-form-urlencoded format. Params accepted are `name` (string format, is required), `onSale` (boolean format, true for products on sale and false for products on demand, is requred), `price` (number format, is required), `image` (string format) and `tags` (string format, multiples tags are accepted separated by comma). It returns an json with the result and the saved ad `{"success": true, "result": {...}}`.

Example: `/api/ads?name=car&onSale=true&price=1500&tags=motor,lifestyle`

**PUT**

It updates an existin ad, the ad id must be provided and the param or params to update. As the POST method, data must be provided in x-www-form-urlencoded format. It returns an json with the result and the updated ad `{"success": true, "result": {...}}`.

Example: `/api/ads/59c7e7237435215cb86bbad9?price=1500`

**DELETE**

It deletes an existin ad from the database, the ad id must be provided. It returns an json with the result `{"success": true}`.

Example: `/api/ads/59c7e7237435215cb86bbad9`


**TAGS:**

**GET**

The default path returns a json with a list of all tags with the format `{"success": true, "rows": [{...}, {...}]}`.

Example: `/api/tags`


**ERRORS**

All calls that produce an error will return a json with the result and the error message like `{"success": false, "error": "Error message ..."}`.