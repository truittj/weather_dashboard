
// displayMovieInfo function re-renders the HTML to display the appropriate content
var inputCities = [];

function displayCityInfo() {
  //var cityName = inputCities;
  var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + $cityInput + "&appid=6f878781f6244ccdbc4b04689e3394dd";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    
    console.log(response);

    // Constructing HTML containing the artist information
    var artistName = $("<h1>").text(response.name);
    var artistURL = $("<a>").attr("href", response.url).append(artistName);
    var artistImage = $("<img>").attr("src", response.thumb_url);
    var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
    var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
    var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

    // Empty the contents of the artist-div, append the new artist content
    $("#artist-div").empty();
    $("#artist-div").append(artistURL, artistImage, trackerCount, upcomingEvents, goToArtist);




  });
}

function renderCityInfo() {
    $("#city-list").empty();

    for (var i = 0; i < inputCities.length; i++) {
        var aside = $("<aside>");
        aside.addClass("col text-dark bg-white border border-secondary rounded-sm city");
        aside.attr("data-name", inputCities[i]);
        aside.text(inputCities[i]);
        $("#city-list").append(aside);
    }
displayCityInfo();  

}

// This function handles events where the add movie button is clicked
$("#city-submit").on("click", function (event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var $cityInput = $("#cityInput").val().trim();
  //console.log($("#cityInput.value"));
  inputCities.push($cityInput);
  console.log($cityInput);

  renderCityInfo();
  

  // Calling renderButtons which handles the processing of our movie array
  //renderButtons();
});
//$(document).on("click", ".city", displayCityInfo);

renderCityInfo();

//renderButtons();
