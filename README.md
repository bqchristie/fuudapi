# WEATHERAPI

Hey guys, thanks for taking the time to review this code.   I hope to have the chance to dicsuss it with you in person sometime in the near future.  Have a great Weekend!

## The Spec

* Create an endpoint in node that accepts minimum two cities and then calls an open weather API (ie. /endpoint/cities/toronto|chicago )
* Get the temperature for the two different cities and store them in mongo
* Return a JSON response with http status 200 if everything was OK
* Don't forget the city and temperature info in the response
* Assuming this application was running on port 9000, show us an NGINX configuration that would handle proxying this request
* The endpoint will read mongoDB to see if a request for the cities has been made recently (within the hour or the day), and return the stored DB values instead of doing the open weather calls

## Configuration

All environment variables are set up in the .env file. Typically I wouldn't commit this to the repository but for demo purposes I will.  The settings are as follows:
```
OPEN_WEATHER_URL=http://api.openweathermap.org/data/2.5/weather
OPEN_WEATHER_API_KEY=bf89e941da14d9a5e0a60764ed99bf4a
OPEN_WEATHER_UNITS=metric
DB_URL=mongodb://127.0.0.1:27017/theweather
API_VERSION=v1
REFRESH_INTERVAL=1
REFRESH_UNIT=hours
```

## Running

Before starting load dependencies:

    `npm install`

Then start the server:

    `npm run api`    

To debug:

    `npm run api-debug` 

This will start in nodemon allowing updates on the fly and uses the --inspect flag so we can debug through Chrome console.

Once up and running you should see some feedback on the console saying that the app in running at http://localhost:9000

Sample call:
```
curl -X GET \
  'http://localhost:9000/api/v1/cities/Berlin|Montreal|Toronto|Chicago' \
  -H 'Content-Type: application/json' \
  -H 'acc: ' \
  -H 'cache-control: no-cache'

```

## Proxying the App in NGINX

As requested, a sample nginx.conf file is available in the root directory and demonstrates how we'd proxy the app so that it would be available on port 80.

## Testing and Docs
Jest Unit test can be run with
```
npm test
```

or
```
npm test:watch
```

End to end tests and docs are done using [Postman](https://www.getpostman.com/).

The test collection is saved in **e2e_tests/THEWEATHER.postman_collection.json** and can be imported into Postman.

The published docs for the api are [here](https://documenter.getpostman.com/view/2071/RztspRw6).


## Pre push hooks




## That's about all

Feel free to reach out if you have any feedback or questions.


