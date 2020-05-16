
var inputCitiesArray = [];

function displayCityInfo(cityInput) {
  var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=6f878781f6244ccdbc4b04689e3394dd";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    $("#display").empty();
    var cityName = $("<h2>").text(response.city.name + " DATE");
    //var tempF = ((response.main.temp - 273.15) * 1.80 + 32);
    //var cityTemp = $("<div").text("Temperature: " + tempF+ "F");
    var windSpeed = $("<p>").text("Wind Speed: " + response.list[0],wind.speed);
    //var cityTemp = $("<a>").attr("href", response.url).append(artistName);
    //$("#display").append(cityTemp);
    
    //$("#display").append(windSpeed);
    
    $("#display").append(cityName, windSpeed);




    //var artistImage = $("<img>").attr("src", response.thumb_url);
    //var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
    //var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
    //var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");


    renderCityInfo();

  });
}

function renderCityInfo() {
    $("#city-list").empty();

    for (var i = 0; i < inputCitiesArray.length; i++) {
        var aside = $("<aside>");
        aside.addClass("col text-dark bg-white border border-secondary rounded-sm city");
        aside.attr("data-name", inputCitiesArray[i]);
        aside.text(inputCitiesArray[i]);
        $("#city-list").append(aside);
    }
}

// This function handles the on click event when the search icon is clicked
$("#city-submit").on("click", function (event) {
//prevents the page from refreshikng when a button is clicked  
event.preventDefault();

// This line of code will grab the input from the textbox
    var cityInput = $("#cityInput").val().trim();
//This takes the input from the form and addes it to an array that will be displayed
    inputCitiesArray.push(cityInput);
//after the data from the form is transfered into a usable object, the data is passed to the ajax call. 
    displayCityInfo(cityInput);  
//calling the function that wil create the aside elements
    renderCityInfo(cityInput);

  // Calling renderButtons which handles the processing of our movie array
  //renderButtons();
});
//This should turn the displayed array of city's into buttons that can be re-called with the ajax function 
$(document).on("click", ".city", displayCityInfo);

//renderButtons();
