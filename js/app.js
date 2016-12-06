$(document).ready(function(){

  var WUNDERGROUND_BASE_URL = 'http://api.wunderground.com/api';
  var KEY = '4a4eeb5dfc6ecdba';

  function getDataFromApi(city, state, callback) {
    var url = WUNDERGROUND_BASE_URL+'/'+ KEY +'/geolookup/conditions/q/'+state+'/'+city+'.json';
    $.getJSON(url, function(data){
      console.log(data);
    });
  }

  $('forecast').hide();

  $('#search-form').submit(function(e) {
    e.preventDefault();
    var city = $('#search-city').val();
    var state = $('#search-state').val();
    console.log(city, state);
    getDataFromApi(city, state, showResults);
  });
  

  function showResults(){
    console.log(showResults);
  }
});