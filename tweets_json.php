<?php
require 'tmhOAuth.php'; // Get it from: https://github.com/themattharris/tmhOAuth

// Use the data from http://dev.twitter.com/apps to fill out this info
// notice the slight name difference in the last two items)

$connection = new tmhOAuth(array(
  	'consumer_key' => '24WdqYz3I4J9SPU64vlZClvlY',
	'consumer_secret' => 'yeqNgQpS0I8bxUOLUX3aHLycIx09OEvx546udvbxyFTomuAwmw',
	'user_token' => '55814667-Ctjb86SjlCoZkdrNXuf0KAOROpJHrinropsx7WUI3', //access token
	'user_secret' => 'rAuhqk644KsMs5seISp4W49EkNMs5JgyXTGFsrXuzP4fA' //access token secret
));

// set up parameters to pass
$parameters = array();

if ($_GET['count']) {
	$parameters['count'] = strip_tags($_GET['count']);
}

if ($_GET['screen_name']) {
	$parameters['screen_name'] = strip_tags($_GET['screen_name']);
}

$twitter_path = '1.1/statuses/user_timeline.json';
if ($_GET['twitter_path']) { 
	$twitter_path = $_GET['twitter_path'];
}

$http_code = $connection->request('GET', $connection->url($twitter_path), $parameters );

if ($http_code === 200) { // if everything's good
	$response = strip_tags($connection->response['response']);

	if ($_GET['callback']) { // if we ask for a jsonp callback function
		echo $_GET['callback'],'(', $response,');';
	} else {
		echo $response;
	}
} else {
	echo "Error ID: ",$http_code, "<br>\n";
	echo "Error: ",$connection->response['error'], "<br>\n";
}