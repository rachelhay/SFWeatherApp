var neighborhoods = { "Bayview" : 94124,
                     "Bernal Heights" : 94112,
                     "Castro" : 94114,
                     "Haight" : 94117,
                     "Marina" : 94123,
                     "Mission" : 94110,
                     "Nob Hill" : 94109,
                     "Noe Valley" : 94114,
                     "NOPA" : 94115,
                     "North Beach" : 94133,
                     "Pacific Heights" : 94115,
                     "Potrero Hill" : 94107,
                     "Presidio" : 94129,
                     "Richmond(inner)" : 94118,
                     "Richmond(outer)" : 94121,
                     "SOMA" : 94103, 
                     "Sunset(inner)" : 94122,  
                     "Sunset(outer)" : 94116,
                     "Tenderloin" : 94102,
                   };

$(document).ready(function() {
  $('#get-weather').click(function() {
    var base = 'http://api.wunderground.com/api/';
    var zipcodeInput = $("#zipcode").val();
    var neighborhood = $("#neighborhood").val();
    
    //get zipcode of neighborhood if neighborhood chosen
    var zipcode = neighborhood ? neighborhoods[neighborhood] : zipcodeInput
    
    //do not continue if user did not input anything
    if (zipcode === undefined) {
      return;
    }
  
    //get neighborhood or zipcode to return with results
    var resultsHeader;
    if (zipcodeInput) {
      resultsHeader = zipcodeInput;
    }
    else {
      resultsHeader = neighborhood;
    }
    
    var url = base + wg + "/conditions/q/" + zipcode + ".json"

    var parseWeatherResp = function(weatherData) {
      var feelsLike = weatherData.feelslike_f
      var temp = weatherData.temp_f
      var description = weatherData.weather
      var humidity = weatherData.relative_humidity
      var windMPH = weatherData.wind_mph
      
      var results = "<p>Temp: " + temp + "</p><p>Feels like: " + feelsLike
      + "</p><p>Description: " + description + "</p><p>Humidity: " + humidity + 
      "<p></p>Wind: " + windMPH + "mph</p>";
      
      $("#search").addClass("hidden");
      $("#results").removeClass("hidden");
      $('#back-link').removeClass("hidden");
      $("#results").prepend(results);
      $("#results").prepend("<h3>Search results: " + resultsHeader + "</h3>");      
    } 
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        var resp = JSON.parse(xhr.responseText);
        parseWeatherResp(resp.current_observation)
      }
    }
    xhr.send();   
  });
  
  $('#back-link').click(function() {
    $("#search").removeClass("hidden");
    $("#results").empty();
    $("#results").addClass("hidden");
    $('#back-link').addClass("hidden");
  });
});
