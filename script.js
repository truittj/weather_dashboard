
// var inputCitiesArray = [];

var inputCitiesArray = JSON.parse(localStorage.getItem("cityArray"));
if (!Array.isArray(inputCitiesArray)) {
     inputCitiesArray = [];
}

function sanitizeCityInput(cityInput) {
  var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=6f878781f6244ccdbc4b04689e3394dd";
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
      var date=response.list[0].dt_txt;
      console.log(moment(date).format('MMMM Do YYYY, h:mm:ss a'));
    console.log(response.city.coord.lat);
    console.log(response.city.coord.lon);

    var lat = response.city.coord.lat;
    var lon = response.city.coord.lon;

            $("#display").empty();
            var cityName = $("<h2>").text(response.city.name + " " + moment().subtract(10, 'days').calendar());
            var windSpeed = $("<h5>").text("Wind Spped: " + response.list[0].wind.speed+ " MPH");
            tempConvert = Math.round(((response.list[0].main.temp) - 273.15) * 1.80 + 32);      
            var temp = $("<h5>").text("Temperarue: " + tempConvert + " F");      
            var humidity = $("<h5>").text("Humidity: " + response.list[0].main.humidity +"%");      

            $("#display").append(cityName, windSpeed, temp, humidity);

    var uvURL= "http://api.openweathermap.org/data/2.5/uvi?appid=6f878781f6244ccdbc4b04689e3394dd&lat=" + lat + "&lon=" + lon;
    console.log(uvURL);

    displayCityInfo(uvURL);

        
});
}

function displayCityInfo(uvURL) {
    $.ajax({
     url: uvURL,
    method: "GET",
     }).then(function (response) {
        console.log(response.value);

            
            

        renderCityInfo();

});
}

//render btn of city fx
function renderCityInfo() {
    $("#city-list").empty();

    for (var i = 0; i < inputCitiesArray.length; i++) {
        var aside = $("<aside>");
        aside.addClass("col text-dark bg-white border border-secondary rounded-sm city");
        aside.attr("data-name", inputCitiesArray[i]);
        aside.text(inputCitiesArray[i]);
        $("#city-list").append(aside);
    }

    $(".city").click(function(){
        alert($(this).attr("data-name"));
        //fivefx
        //1dayfx 
      });
}

// This function handles the on click event when the search icon is clicked

$("#city-submit").on("click", function (event) {
    //prevents the page from refreshikng when a button is clicked  
    event.preventDefault();
    
    // This line of code will grab the input from the textbox and sanitize it
        var cityInput = $("#cityInput").val().trim();
    //This takes the input from the form and addes it to an array that will be displayed
        inputCitiesArray.push(cityInput);
        localStorage.setItem("cityArray", JSON.stringify (inputCitiesArray));
    //after the data from the form is transfered into a usable object, the data is passed to the ajax call. 
        sanitizeCityInput(cityInput);  
    //calling the function that wil create the aside elements
        renderCityInfo(cityInput);
    
      // Calling renderButtons which handles the processing of our movie array
      //renderButtons();
    });
    //This should turn the displayed array of city's into buttons that can be re-called with the ajax function 
    //$(document).on("click", ".city", sanitizeCityInput("Austin"));
 
    renderCityInfo();
