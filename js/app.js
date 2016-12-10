$(document).ready(function(){

  var WUNDERGROUND_BASE_URL = 'http://api.wunderground.com/api';
  var KEY = '4a4eeb5dfc6ecdba';

  function getDataFromApi(city, state, callback) {
    var url = WUNDERGROUND_BASE_URL+'/'+ KEY +'/geolookup/conditions/q/'+state+'/'+city+'.json';
    $.getJSON(url, function(data){
      callback(data);
    });
  }

  $('#current-conditions').hide();

  $('#search-form').submit(function(e) {
    e.preventDefault();
    var city = $('#search-city').val();
    var state = $('#search-state').val();
    console.log(city, state);
    getDataFromApi(city, state, showResults);
    getForecast(city, state, showForecast);
  });
  
  function getRadarImage(city, state, callback) {
    var radar = WUNDERGROUND_BASE_URL+'/'+ KEY +'/animatedradar/q/'+state+'/'+city+'.gif?'+'+width=280&height=280&newmaps=1';
    $.getJSON(url, function(data){
      callback(data);
    });
  }

 function getForecast(city, state, callback) {
    var url = WUNDERGROUND_BASE_URL+'/'+ KEY +'/forecast/q/'+state+'/'+city+'.json';
    $.getJSON(url, function(data){
      callback(data);
    });
  }

  function showResults(data){
    $('#current-conditions').show();
    $('#search').hide();
    $('#location').text(data.current_observation.display_location.full);
    $('#temperature').text(data.current_observation.temp_f);
    $('#conditions').text(data.current_observation.weather);
    $('#humidity').text(data.current_observation.relative_humidity);
    $('#wind').text(data.current_observation.wind_string);
    $('#feelslike').text(data.current_observation.feelslike_f);

    console.log(data);
  }

  function showForecast(data){
    console.log(data);
    $('#forecast').empty();
    for (var i=0; i < data.forecast.simpleforecast.forecastday.length; i++) {
      
      $('#forecast').append("<li>"+data.forecast.simpleforecast.forecastday[i].date.weekday_short+"</li>");
      $('#forecast').append("<li><img src='"+data.forecast.simpleforecast.forecastday[i].icon_url+"'></li>");
      $('#forecast').append("<li>"+data.forecast.simpleforecast.forecastday[i].high.fahrenheit+"/</li>");
      $('#forecast').append("<li>"+data.forecast.simpleforecast.forecastday[i].low.fahrenheit+"</li>");
      
    }

  }

  function showMap(data){
    var radar = "WUNDERGROUND_BASE_URL+'/'+ KEY +'/animatedradar/q/'+state+'/'+city+'.gif?'+'+width=280&height=280&newmaps=1'";
    document.getElementById("radar").src = map;
  }

  $('#search-again').mousedown(function() {
    $('#current-conditions').hide();
    $('#search').show();
  });

  
});