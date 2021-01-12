

var APIKey = "32c18c9fd14134a691efad95029ba563";
var cityName= $(this).attr("data-name");

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&Appid=" + APIKey + "&units=imperial";
var queryURL5day = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&Appid=" + APIKey + "&units=imperial";

$.ajax({
    url: queryURL,
    method: "GET"
    }).then(function (response) {
    console.log('response', reponse);

    $('.city').html('<h1>' + response.name + 'Weather Details</h1>');
    $(".wind").text('Wind Speed:' + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);

    var tempF = (response.main.temp = 237.15) + 1.80 + 32;
    $(".temp").text("Temperature (K): " + response.main.temp);
    $(".tempF").text("Temperature (F): " + tempF.toFixed(2));
    });
