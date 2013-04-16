$(document).ready(function() {
    $.ajax({
      url : "http://api.wunderground.com/api/2b0bc452f77b4610/geolookup/conditions/q/OR/Portland.json",
      dataType : "jsonp",
      success : function(parsed_json) {
        var location = parsed_json['location']['city'];
        var temp_f = parsed_json['current_observation']['temp_f'];
        // alert("Current temperature in " + location + " is: " + temp_f);
        $(".hero-unit").append("<div>Hi, " + location + "! It's currently " + temp_f + " outside.</div>");
        if (temp_f<50)
        {
          $(".hero-unit").append("<div>Wow! It's cold!</div>");
        }
        else
        {
          $(".hero-unit").append("<div>What are you complaining about?</div>");
        }
      }
    });
    $.ajax({
      url: "http://api.wunderground.com/api/2b0bc452f77b4610/forecast10day/q/OR/Portland.json",
      dataType: "jsonp",
      success : function(parsed_json) {
        // for each weather class do?
        for (var i = 0; i <= 9; i++) {
          //var conditions = parsed_json['forecast']['simpleforecast']['forecastday'][i]['conditions'];
          var conditions = parsed_json.forecast.simpleforecast.forecastday[i].conditions;
          var day = parsed_json.forecast.simpleforecast.forecastday[i].date.weekday;
          var wind = parsed_json.forecast.simpleforecast.forecastday[i].avewind.mph;
          var low = parsed_json.forecast.simpleforecast.forecastday[i].low.fahrenheit;
          var high = parsed_json.forecast.simpleforecast.forecastday[i].high.fahrenheit;
          var rain = parsed_json.forecast.simpleforecast.forecastday[i].qpf_day.in;
          $(".day" + i).append("<h2>" + day + ": " + conditions + " and a high of " + high + " degrees</h2>");
          if (wind>5) {
            $(".day" + i).append("<h2>It's too windy to ride today! " + wind + " mph!</h2>");
          };
          if (low<37) {
            $(".day" + i).append("<h2>It's too cold to ride today! The low is " + low + " degrees!</h2>");
          };
          if (rain>.006) {
            $(".day" + i).append("<h2>It's wet out there. Wear some waterproof!</h2>");
          };
        console.log(parsed_json);
        };
      }
    })
  });