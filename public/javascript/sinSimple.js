$(document).ready(function() {
  // initial current conditions pulled from wunderground api conditions
  $.ajax({
    url : "http://api.wunderground.com/api/2b0bc452f77b4610/geolookup/conditions/q/OR/Portland.json",
    dataType : "jsonp",
    success : function(parsed_json) {
      var location = parsed_json['location']['city'];
      var temp_f = parsed_json['current_observation']['temp_f'];
      // alert("Current temperature in " + location + " is: " + temp_f);
      $(".hero-unit").append("<h2>Hi, " + location + "! It's currently " + temp_f + " degrees outside.</h2>");
      if (temp_f<50) {
        $(".hero-unit").append("<h3>Wow! It's cold! Doesn't feel like summer does it?</h3>");
      }
      else {
        $(".hero-unit").append("<h3>What are you complaining about?</h3>");
      }
    }
  });
  // 10 day forecast from wunderground listing only three in columns
  $.ajax({
    url: "http://api.wunderground.com/api/2b0bc452f77b4610/forecast10day/q/OR/Portland.json",
    dataType: "jsonp",
    success : function(parsed_json) {
      // for each weather class do?
      for (var i = 0; i <= 2; i++) {
        //parsing specific objects of forecast
        var conditions = parsed_json.forecast.simpleforecast.forecastday[i].conditions;
        var day = parsed_json.forecast.simpleforecast.forecastday[i].date.weekday;
        var wind = parsed_json.forecast.simpleforecast.forecastday[i].avewind.mph;
        var low = parsed_json.forecast.simpleforecast.forecastday[i].low.fahrenheit;
        var high = parsed_json.forecast.simpleforecast.forecastday[i].high.fahrenheit;
        var rain = parsed_json.forecast.simpleforecast.forecastday[i].qpf_day['in'];
        // appending to index page with customized conditions
        $(".day" + i).append("<p>" + day + ": ");
        $(".day" + i).append("<p>" + conditions + " and a high of " + high + " degrees.</p>");
        if (wind>5) {
          $(".day" + i).append("<p>It's too windy to ride today! " + wind + " mph!</p>");
        }
        if (low<37) {
          $(".day" + i).append("<p>It's too cold to ride today! The low is " + low + " degrees!</p>");
        }
        if (rain>0.006) {
          $(".day" + i).append("<p>It's wet out there. Wear something waterproof!</p>");
        }
        if (((wind<=5) && (low>=37)) && (rain<=0.006)) {
          $(".day" + i).append("<p>Ride On! It's A Great Day To Ride!</p>");
          console.log("Go!");
        }
          console.log(i);
          console.log(low);
          console.log(wind);
          console.log(rain);
        // Why doesn't this work?
        // $("img").click(function () {
        //   $(this).hide("explode", 1000);
        // });
      console.log(parsed_json);
      }
    }
  });
});