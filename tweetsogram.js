$(document).ready(function(){
	$.ajax({
		url: 'tweets_json.php',
		data: { count: 500 },
		dataType: 'JSON',
		success: function(data){
			try {
				// validate the tweets
				if(data.length > 0){
					drawChart(data);
				}else{
					$('#tweet_chart').html('No Tweets found.');
				}
			} catch(err){
				$('#tweet_chart').html(data);
			}
		} 
	});

	function drawChart(data){
		// let's create a 24 hour format array
		var dataSeries = {};
		var hours = [];
		for(var h = 0; h < 24; h++){
			// we set 0 for default value of count per hour
			dataSeries[h] = 0;
			hours.push(( h < 10 ? '0'+h : h )+':00');
		}

		// format time to get hours
		for(var i = 0; i < data.length; i++){
			// date object instance
			var createdAt = new Date(data[i].created_at);
			// get hour of the tweet was created
			var time = createdAt.getHours();
			// increment count of tweets according to time
			if(dataSeries.hasOwnProperty(time)){
				dataSeries[time]++;
			}
		}
		// let's convert the dataSeries to an array to cater for the highchart data series
		var tweetCountPerHour = $.map(dataSeries, function(value, index) {
		    return [value];
		});
		
		// plot the chart...
		$('#tweet_chart').highcharts({
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: 1,//null,
	            plotShadow: false
	        },
	        title: {
	            text: 'Hours I am Most Active on Twitter' 
	        },
	        xAxis: {
	            categories: hours,
                labels: {
                    rotation: -45
	            }
	        },
	            tooltip: {
	                formatter: function() {
	                    return '<strong>' + this.x + '</strong><br /><strong>' + this.series.name + '</strong>:' + this.y;
	            }
	        },
	        plotOptions: {
	            column: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    format: '',
	                    style: {
	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                    }
	                }
	            }
	        },
	        series: [{
	            type: 'column',
	            name: 'Tweets by Hour',
	            data: tweetCountPerHour
	        }]
	    });
	}
});