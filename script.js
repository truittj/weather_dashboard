
var inputCitiesArray = [];



function sanitizeCityInput(cityInput) {
  var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=6f878781f6244ccdbc4b04689e3394dd";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response.city.coord.lat);
    console.log(response.city.coord.lon);

    var lat = response.city.coord.lat.val();
    var lon = response.city.coord.lon.val();

    displayCityInfo();

function displayCityInfo() {
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&appid=6f878781f6244ccdbc4b04689e3394dd";
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response + "latLon");
      
    //   $("#display").empty();
    //   var lat = $("<h2>").text(response.city.coord.lat);      
    //   $("#display").append(cityName, cityName1);
      
    
    renderCityInfo();

    });
  }});


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
        sanitizeCityInput(cityInput);  
    //calling the function that wil create the aside elements
        renderCityInfo(cityInput);
    
      // Calling renderButtons which handles the processing of our movie array
      //renderButtons();
    });
    //This should turn the displayed array of city's into buttons that can be re-called with the ajax function 
    $(document).on("click", ".city", sanitizeCityInput);
    
    //renderButtons();
