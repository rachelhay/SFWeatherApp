$(document).ready(function() {

  $('#get-weather').click(function() {
    var base = 'http://api.wunderground.com/api/';
    var url = base + wg + "/conditions/q/94107.json"
    
    
    var parseWeatherResp = function(resp) {
      console.log("in parse")
    } 
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        var resp = JSON.parse(xhr.responseText);
        console.log(resp)
        parseWeatherResp(resp)
      }
    }
    // xhr.send();

  });
});
