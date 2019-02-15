let util = require("./api.util");

test("Expect cities to be normalize when mixed case", () => {
  var req = {
    params: { cities: "new YorK|BOSTON|ToRoNTO" }
  };
  let cities = util.getCities(req);

  expect(cities[0]).toBe("New York");
  expect(cities[1]).toBe("Boston");
  expect(cities[2]).toBe("Toronto");
});

test("Expect an array when only one value passed", () => {
  var req = {
    params: { cities: "new YorK" }
  };
  let cities = util.getCities(req);
  expect(Array.isArray(cities)).toBe(true);
});

test("Expect validation to fail if we only pass one city", () => {
  var req = {
    params: { cities: "new YorK" }
  };
  let cities = util.getCities(req);
  expect(util.isValidRequest(cities)).toBe(false);
});
