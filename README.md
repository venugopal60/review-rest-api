# review-rest-api

## Technology & Tools
- [node.js](https://nodejs.org/en/download/) - for the REST API developement
- [mongo db](https://www.mongodb.com/) - for no sql Document DB

## Installation
```sh
npm i 
```

## Run app
```sh
npm start 
```

## Run app
```sh
npm test 
```

## REST APIS

- /v1/review 
- /v1/monthly-ratings
- /v1/total-store-ratings

## GET Reviews

```sh
- get review  without filters - /v1/review 
- get review  with all possible filters - /v1/review??rating=3&review_source=iTunes&reviewed_date=2018-02-10&page=1
- get review  with rating, pagination filters /v1/review??rating=3&page=2

```


## ADD Review

``` sh
add review (POST)  - /v1/review 
requ body is 
          {
                review: 'I like it',
                author: 'Venugopal',
                review_source: 'GooglePlayStore',
                rating: 5,
                title: 'Awsome',
                product_name: 'Amazon Alexa',
            }
```
