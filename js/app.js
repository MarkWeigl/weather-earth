$(document).ready(function(){

  var WUNDERGROUND_BASE_URL = 'http://api.wunderground.com/api';
  var KEY = '4a4eeb5dfc6ecdba';

  function getDataFromApi(city, state, callback) {
    var url = WUNDERGROUND_BASE_URL+'/'+ KEY +'/geolookup/conditions/q/'+state+'/'+city+'.json';
    $.getJSON(url, function(data){
      callback(data);
    });
  }

  $('#forecast').hide();

  $('#search-form').submit(function(e) {
    e.preventDefault();
    var city = $('#search-city').val();
    var state = $('#search-state').val();
    console.log(city, state);
    getDataFromApi(city, state, showResults);
  });
  
  function getRadarImage(city, state, callback) {
    var url = WUNDERGROUND_BASE_URL+'/'+ KEY +'/animatedradar/q/'+state+'/'+city+'.gif?'+'+width=280&height=280&newmaps=1';
    $.getJSON(url, function(data){
      callback(data);
    });
  }

  function showResults(data){
    $('#forecast').show();
    $('#search').hide();
    $('#location').text(data.current_observation.display_location.full);
    $('#temperature').text(data.current_observation.temp_f);
    $('#conditions').text(data.current_observation.weather);
    $('#humidity').text(data.current_observation.relative_humidity);
    $('#wind').text(data.current_observation.wind_string);
    $('#feelslike').text(data.current_observation.feelslike_f);

    console.log(data);
  }

  $('#search-again').mousedown(function() {
    $('#forecast').hide();
    $('#search').show();
  });

  
});