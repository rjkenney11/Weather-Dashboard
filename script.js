$(document).ready(function () {
    const searchBTN = document.getElementById("get-weather")

    var APIKey = "32c18c9fd14134a691efad95029ba563";
    //var cityName = $(this).attr("data-name");
    //var cityName = ""
    // var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&Appid=" + APIKey;
    var queryURL5day = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&Appid=" + APIKey;

    for (var i = 0; i < localStorage.length; i++) {

        var city = localStorage.getItem(i);
        // console.log(localStorage.getItem("City"));
        var cityName = $(".list-group").addClass("list-group-item");

        cityName.append("<li>" + city + "</li>");
    }
    // Key count for local storage 
    var keyCount = 0;

    $("#get-weather").on("click", function () {
        // Capture the User input from the form
        cityName = $("#citySearch").val()
        console.log("search button was clicked");
        console.log(cityName);
        APIcall(cityName);
        forecastAPI(cityName);
        // FORECAST API CALL
    })

    function APIcall(cityName) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&Appid=" + APIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // RESPONSE from our FIRST API call
            console.log('response', response);

            // Capturing LAT and LON data from our FIRST API call
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<li>" + response.name + "</li>");
            // Local storage
            var local = localStorage.setItem(keyCount, response.name);
            keyCount = keyCount + 1;

            // OPTION #!
            // Create new element to load content
            //           let temp = $("<h1>").text("City: " + response.main.temp);
            // Append (or add) the new element to the DOM
            //           $(".test").append(temp);

            // OPTION #2
            $('.city').html('<h3> City: ' + response.name + '</h3>');
            var tempF = ((response.main.temp - 273.15) * 1.80) + 32;
            $(".temp").text("Temperature (K): " + response.main.temp);
            $(".tempF").text("Temperature (F): " + tempF.toFixed(2) + '°');

            $(".wind").text('Wind Speed: ' + response.wind.speed + ' MPH');
            $(".humidity").text("Humidity: " + response.main.humidity + '%');
            var weatherImg = "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png";
            console.log(weatherImg)
            $(".weatherImg").attr('src', weatherImg);
            document.querySelector(".weatherImg").classList.add("visible");

            // Make a SECOND API call
            var queryUVurl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&Appid=" + APIKey;
            $.ajax({
                url: queryUVurl,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                $(".uvIndex").text("UV Index: " + response.value);
                var uvIndex = (response.value);
                $(".uvIndex").removeClass(
                    ["low", "moderate", "high", "veryHigh", "extreme"].join(" ")
                );
                if (uvIndex < 3) {
                    $(".uvIndex").addClass("low");
                } else if (uvIndex < 6) {
                    $(".uvIndex").addClass("moderate");
                } else if (uvIndex < 8) {
                    $(".uvIndex").addClass("high");
                } else if (uvIndex < 11) {
                    $(".uvIndex").addClass("veryHigh");
                } else {
                    $(".uvIndex").addClass("extreme");
                }
            });


        });
        /*
        function uvIndexAPI(lat, lon) {
    
            return NEEDED DATA
        } 
        */
    }

    function forecastAPI(cityName) {
        var queryURL5day = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&Appid=" + APIKey;
        $.ajax({
            url: queryURL5day,
            method: "GET"
        }).then(function (response) {
            console.log("Forecast...");
            console.log(response.list);
            let forecastArr = [];
            let tempData = response.list;  // Holds 40 objects
            for (let i = 0; i < tempData.length; i++) {
                let dateRes = tempData[i].dt_txt.split(' ');
                // console.log(dateRes);
                if (dateRes[1] === "15:00:00") {
                    forecastArr.push(tempData[i]);
                }
            }
            console.log(forecastArr);

            // Now that we parsed the data we want --> We need to show it!
            //$(".list").text("list: " + response.list);
            for (let i = 0; i < forecastArr.length; i++) {
                var d = new Date(forecastArr[i].dt_txt);
                $(`#day${i + 1}`).append('<h3>' + d.toDateString() + '</h3>');
                $(`#day${i + 1}`).append('<p> Temp: ' + (((forecastArr[i].main.temp - 273.15) * 1.80) + 32).toFixed(2) + '°' + '</p>');
                $(`#day${i + 1}`).append('<p> Humidity: ' + forecastArr[i].main.humidity + '%' + '</p>');
                var $newImg = $("<img></img>");
                //set image source correctly
                var weatherImg = "http://openweathermap.org/img/wn/" + forecastArr[i].weather[0].icon + ".png";
                $newImg.attr('src', weatherImg);
                $(`#day${i + 1}`).append($newImg);
            }
        });
    }
    // FORCAST FUNCTION DEFINITION
    function displaySaved() {
        let citiesSaved = JSON.parse(localStorage.getItem("cities"));
        if (citiesSaved) {
            cities = citiesSaved;
        } else {
            cities = [];
        }
        cities.forEach((city) => createButtons(city));
    }

    function savedCities(citiesToSave) {
        localStorage.setItem("cities", JSON.stringify(citiesToSave));
    }

    //clearBtn.addEventListener("click", function () {
        //window.localStorage.clear();
        //citiesDiv.innerHTML = "";
    //});

    function searchCity(searchInput, addToHistory = true) {
        if (!searchInput) {
            alert("please enter a city");
            return false;
        }
    }
});
