$(document).ready(function() {
    $.ajax({
      url : "http://api.wunderground.com/api/"yourKeyHere"/geolookup/conditions/q/OR/Portland.json",
      dataType : "jsonp",
      success : function(parsed_json) {
        var location = parsed_json['location']['city'];
        var temp_f = parsed_json['current_observation']['temp_f'];
        // alert("Current temperature in " + location + " is: " + temp_f);
        $("#container").append("<div>Hi " + location + "! It's currently " + temp_f + " outside.</div>");
        if (temp_f<50)
        {
          $("#container").append("<div>Wow! It's cold!</div>");
        }
        else
        {
          $("#container").append("<div>What are you complaining about?</div>");
        }
      }
    });
    $.ajax({
      url: "http://api.wunderground.com/api/2b0bc452f77b4610/forecast10day/q/OR/Portland.json",
      dataType: "jsonp",
      success : function(parsed_json) {
        for (var i = 0; i <= 9; i++) {
          //var conditions = parsed_json['forecast']['simpleforecast']['forecastday'][i]['conditions'];
          var conditions = parsed_json.forecast.simpleforecast.forecastday[i].conditions;
          var day = parsed_json.forecast.simpleforecast.forecastday[i].date.weekday;
          $("#box").append("<div>" + day + " : " + conditions + "</div>");
        console.log(parsed_json);
        };
      }
    })
  });