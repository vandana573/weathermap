$('#getWeatherBtn').click(function () {
    $('#chart-container').hide();
    console.log('Button clicked');
    var cityName = $('#cityInput').val();
    $.ajax({
      type: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=5ca0e0173330964e37377b95e57c03ad',
      success: function (data) {
  
        console.log("In success callback");
        console.log(data);
        var currentTemp = Math.round(data.main.temp - 270);
        var currentPressure = data.main.pressure+"Hg";
        var humidity = data.main.humidity+"%";
        $('#currentTemperature').html(currentTemp);
        $('#currentHumdity').html(humidity);
        $('#currentPressure').html(currentPressure);
        
        $('table').removeClass('results-hide');
        $('table').show();
      },
      error: function (err) {
  
        console.log("In error callback");
        console.log(err);
      }
    });
  
  })
  
  $('#getForecastBtn').click(function () {
    $('table').hide();
    var cityName = $('#cityInput').val();
    // $('table').removeClass('results-hide');
    $.ajax({
      type: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=5ca0e0173330964e37377b95e57c03ad',
      success: function (data) {
  
        console.log("In success callback");
        console.log(data);
       listOfDates = data.list.map(function (ele) {
         var tempp= moment(ele.dt * 1000).format('Do,dddd,h:mm a')
           return tempp;
        });
        
        console.log(listOfDates);
        listOfTemp = data.list.map(function (ele) {
          return Math.round(ele.main.temp - 270);
        });
        console.log(listOfTemp);
        plotChart(listOfTemp, listOfDates);
      },
      error: function (err) {
  
        console.log("In error callback");
        console.log(err);
      }
    });
  
    function plotChart(tempArr, datesArr) {
  
      $('#chart-container').removeClass('results-hide');
      $('#chart-container').show();
      Highcharts.chart('chart-container', {
        chart: {
          type: 'spline'
        },
        title: {
          text: 'Forecast for Next 5 Days'
        },
        xAxis: {
          categories: datesArr
  
        },
        yAxis: {
          title: {
            text: 'Temperature'
          },
          labels: {
            formatter: function () {
              return this.value + '°';
            }
          }
        },
        tooltip: {
          crosshairs: true,
          shared: true
        },
        plotOptions: {
          spline: {
            marker: {
              radius: 4,
              lineColor: '#666666',
              lineWidth: 1
            }
          }
        },
        series: [{
          name: cityName,
          marker: {
            symbol: 'square'
          },
          data: tempArr
  
        }]
      });
  
    }
  
  })
  
  
  
  