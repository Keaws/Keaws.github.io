// Define some variables used to remember state.
var playlistId, channelId, songs, currentVideoId;

// After the API loads, call a function to enable the playlist creation form.
function handleAPILoaded() {
  enableForm();
}

// Enable the form for creating a playlist.
function enableForm() {
  $('#playlist-button').attr('disabled', false);
}

function IsJsonString(str) {
    var jsonResult;
  
    try {
        jsonResult = JSON.parse(str);
    } catch (e) {
        return false;
    }
    return jsonResult;
}

function importMusic() {
  let songIndex = 0;

  createPlaylist()
    .then(playlistResponse => {
      console.log('pl created');
      return playlistResponse;
    })
    .then(playlistResponse => {
        addSongs(songIndex);
    });
}

function addSongs(index) {
  search(`${songs[index].artist} - ${songs[index].song}`)
    .then(searchResponse => {
      console.log('search done');
      console.log(searchResponse);
      return searchResponse;
    })
    .then(searchResponse => {
      return addToPlaylist();
    })
    .then(addtoPlayListResponse => {
      console.log(addtoPlayListResponse);
      console.log('added to playlist');
      index++;
      if (index < songs.length) {
        addSongs(index);
      } else {
        console.log('\nfinished');
        return;
      }
    });
}

// Create a private playlist.
function createPlaylist() {
  songs = IsJsonString(document.getElementById('songs').value)
  
  if (!songs) {
    $('#status').html('Invalid data format');
    return;
  }
  
  var request = gapi.client.youtube.playlists.insert({
    part: 'snippet,status',
    resource: {
      snippet: {
        title: 'VK Music',
        description: 'A private playlist created with the YouTube API'
      },
      status: {
        privacyStatus: 'private'
      }
    }
  });

  return new Promise((resolve, reject) => {
      request.execute(function(response) {
        var result = response.result;
        if (result) {
          playlistId = result.id;

          resolve(result);
        } else {
          $('#status').html('Could not create playlist');
          reject(result);
        }
    });
  });

}

function addToPlaylist() {
  var details = {
    videoId: currentVideoId,
    kind: 'youtube#video'
  }

  var request = gapi.client.youtube.playlistItems.insert({
    part: 'snippet',
    resource: {
      snippet: {
        playlistId: playlistId,
        resourceId: details
      }
    }
  });

  return new Promise((resolve, reject) => {
      request.execute(function(response) {
        if (response.result) {
            resolve(response.result);
            $('#status').html('<pre>' + JSON.stringify(response.result) + '</pre>');
        } else {
            reject(response);
            console.log('fail');
        }
      });
  });


}

// Search for a specified string.
function search(query) {  
  var request = gapi.client.youtube.search.list({
    q: query,
    part: 'snippet',
    type: 'video'
  });

  return new Promise((resolve, reject) => {
      request.execute(function(response) {
        var result = response.result;
               
        if (result) {
          currentVideoId = result.items[0].id.videoId;
          resolve(result);

          //addToPlaylist(videoId);
        } else {
          $('#status').html('Could not search');
          reject(result);
        }
    });
  });
}