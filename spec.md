* Create an endpoint in node that accepts minimum two cities and then calls an open weather API (ie. /endpoint/cities/toronto|chicago )
* Get the temperature for the two different cities and store them in mongo
* Return a JSON response with http status 200 if everything was OK
* Don't forget the city and temperature info in the response
* Assuming this application was running on port 9000, show us an NGINX configuration that would handle proxying this request
* The endpoint will read mongoDB to see if a request for the cities has been made recently (within the hour or the day), and return the stored DB values instead of doing the open weather calls