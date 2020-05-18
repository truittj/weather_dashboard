
// var inputCitiesArray = [];

var inputCitiesArray = JSON.parse(localStorage.getItem("cityArray"));
if (!Array.isArray(inputCitiesArray)) {
     inputCitiesArray = [];
}

function sanitizeCityInput(cityInput) {
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=6f878781f6244ccdbc4b04689e3394dd";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

      var date=response.dt_txt;
      console.log(moment(date).format('MMMM Do YYYY, h:mm:ss a'));
    
    
    console.log(response.coord.lat);
    console.log(response.coord.lon);

    var lat = response.coord.lat;
    var lon = response.coord.lon;

            $("#display").empty();
            var pngTag = response.weather[0].icon;

            var currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + pngTag + ".png");
            currentIcon.attr("alt" , "Visual representation of daily forcast");
            currentIcon.attr("id", "visRep");

            var cityName = $("<h3>").html(response.name + " " + "(" + moment(date).format('MMMM Do YYYY') + ")");
            var windSpeed = $("<p>").text("Wind Spped: " + response.wind.speed+ " MPH");
            tempConvert = Math.round(((response.main.temp) - 273.15) * 1.80 + 32);      
            var temp = $("<p>").text("Temperarue: " + tempConvert + " F");      
            var humidity = $("<p>").text("Humidity: " + response.main.humidity +"%");      

            $("#display").append(cityName, currentIcon, windSpeed, temp, humidity );
            
            var uvURL= "http://api.openweathermap.org/data/2.5/uvi?appid=6f878781f6244ccdbc4b04689e3394dd&lat=" + lat + "&lon=" + lon;
            console.log(uvURL);
            displayUVInfo(uvURL);

            var fiveDayURL= "http://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=6f878781f6244ccdbc4b04689e3394dd";
            console.log(fiveDayURL);
            displayFiveDay(fiveDayURL);
});
}
function displayFiveDay (fiveDayURL) {
    $.ajax({
        url: fiveDayURL,
        method: "GET",
      }).then(function (fiveDayResponse) {
        console.log(fiveDayResponse);
        $("#fiveDay").empty();
            for (var i = 0; i < 5; i++) {
                var divCard = $("<div>").attr("class", "col-2 card bgcolor rounded");
                
                var cardDate = fiveDayResponse.list[i].dt_txt
                cardPTagDate= $("<h4>").attr("class", "text-center").text(moment(cardDate).format('MMMM Do YYYY'));

                var cardPngTag = fiveDayResponse.list[i].weather[i].icon;
                console.log(cardPngTag);
                var cardIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + cardPngTag + ".png");
                cardIcon.attr("alt" , "Visual representation of daily forcast");
                
                cardTempConvert = Math.round(((fiveDayResponse.list[i].main.temp) - 273.15) * 1.80 + 32);      
                var cardTemp = $("<p>").text("Temp: " + cardTempConvert + " F");


                cardPTagHumidity= $("<p>").text("Humidity: " + fiveDayResponse.list[i].main.humidity + "%" );

                divCard.append(cardPTagDate, cardIcon, cardTemp, cardPTagHumidity);  
                $("#fiveDay").append(divCard[i]);
                
  };
});
}


function displayUVInfo(uvURL) {
    $.ajax({
     url: uvURL,
    method: "GET",
     }).then(function (uvResponse) {
        console.log(uvResponse.value);

        var uvIndexNum = uvResponse.value;
            if(uvIndexNum  > 10){
                //red=badge badge-danger
                uvIndexSpan=$("<span>").attr("class", "badge badge-danger");
                uvIndexSpan.text(uvIndexNum);
                uvIndexPTag=$("<p>").text("UV Index: ");
                uvIndexPTag.append(uvIndexSpan);
                $("#display").append(uvIndexPTag);

            }
            //orange=badge badge-warning
            else if(uvIndexNum > 4){
                uvIndexSpan=$("<span>").attr("class", "badge badge-warning");
                uvIndexSpan.text(uvIndexNum);
                uvIndexPTag=$("<p>").text("UV Index: ");
                uvIndexPTag.append(uvIndexSpan);
                $("#display").append(uvIndexPTag);            }
            //green=badge badge-success
            else{
                uvIndexSpan=$("<span>").attr("class", "badge badge-success");
                uvIndexSpan.text(uvIndexNum);
                uvIndexPTag=$("<p>").text("UV Index: ");
                uvIndexPTag.append(uvIndexSpan);
                $("#display").append(uvIndexPTag);            };

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
        //alert($(this).attr("data-name"));
        //fivefx
        console.log($(this).attr("data-name"));
        sanitizeCityInput($(this).attr("data-name"));

        displayFiveDay($(this).attr("data-name"));
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
