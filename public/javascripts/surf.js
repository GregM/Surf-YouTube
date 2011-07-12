/*
 * YouTube Surfing
 * http://y.gregorymazurek.com
 *
 * @@author   Gregory Mazurek
 * @@website  http://www.gregorymazurek.com
 *
 * Thanks, Google.
 *
 */
 
var c = 0;
 
// This function is called when an error is thrown by the player
function onPlayerError(errorCode) {
  alert("An error occured of type:" + errorCode);
}

function playVideo() {
    if (ytplayer) {
        ytplayer.playVideo();
    }
}

// Your HTML pages that display the chromeless player must implement a callback function named 
// onYouTubePlayerReady. The API will call this function when the player is fully loaded and 
// the API is ready to receive calls.
function onYouTubePlayerReady(playerId) {
    ytplayer = document.getElementById("ytPlayer");
    ytplayer.addEventListener("onError", "onPlayerError");
}

// Our cast of characters arrive on stage
function getList() {
	var the_url = 'http://gdata.youtube.com/feeds/api/standardfeeds/most_popular?max-results=50&alt=json&format=5';
	
	$.ajax({
    type: "GET",
    url: the_url,
    dataType: "jsonp",
    success: function(responseData, textStatus, XMLHttpRequest) {
          if (responseData.feed.entry) {
              loadNewVideo(responseData.feed.entry);
        }
     }
    });
}

// The conductor waves his arms
function loadNewVideo(videos) {
  var n = 1;
	id = videos[0].id.$t.split('videos/')[1]

  	// The allowScriptAccess parameter in the code is needed to allow the player SWF 
    // to call functions on the containing HTML page, since the player is hosted on a 
    // different domain from the HTML page. 
    var params = { allowScriptAccess: "always" };
    // The element id of the Flash embed
    // This id is what we'll use to get a reference to the player using getElementById().
    var atts = { id: "ytPlayer" };
    // swfobject.embedSWF will load the player from YouTube and embed it onto your page.
    swfobject.embedSWF("http://www.youtube.com/v/" + id  +
                       "&enablejsapi=1&playerapiid=ytplayer&autoplay=1",
                       "videoDiv", "720", "415", "8", null, null, params, atts);
	  document.getElementById('now_playing').innerHTML = 'Now Playing: <a href="'+videos[0].link[0].href+'">'+videos[0].title.$t+'</a>';
	
	for (n=1;n<51;n=n+1) {
	  setTimeout("document.getElementById('now_playing').innerHTML = '<a href=\"'+videos[n].link[0].href+'\">abc</a>';", n*3000);
	}
}

function playThisVideo(videoId) {
	ytplayer.loadVideoById(videoId);
}

google.setOnLoadCallback(getList);
