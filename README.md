# WEATHERAPI

## The Spec

* Create an endpoint in node that accepts minimum two cities and then calls an open weather API (ie. /endpoint/cities/toronto|chicago )
* Get the temperature for the two different cities and store them in mongo
* Return a JSON response with http status 200 if everything was OK
* Don't forget the city and temperature info in the response
* Assuming this application was running on port 9000, show us an NGINX configuration that would handle proxying this request
* The endpoint will read mongoDB to see if a request for the cities has been made recently (within the hour or the day), and return the stored DB values instead of doing the open weather calls

## Configuration

All setup is done in the .env. Typically we wouldn't commit this to the repository but for demo purposes we will.

OPEN_WEATHER_URL=http://api.openweathermap.org/data/2.5/weather
OPEN_WEATHER_API_KEY=bf89e941da14d9a5e0a60764ed99bf4a
OPEN_WEATHER_UNITS=metric
DB_URL=mongodb://127.0.0.1:27017/theweather
API_VERSION=v1
REFRESH_INTERVAL=1
REFRESH_UNIT=hours

## Testing and Docs

Simple tests and docs are done using Postman[https://www.getpostman.com/]

The test collection is saved in tests or you get get the collection here.
https://www.getpostman.com/collections/2b49b09120fc7e048795

The published docs are here.

https://documenter.getpostman.com/view/2071/RztspRw6



## TODO

* readme
* nginx config
* linter or prettier