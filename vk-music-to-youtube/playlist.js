// Define some variables used to remember state.
let playlistId, channelId, songs, currentVideoId, currentSongIndex = 0;

const statusEl = document.getElementById('status');

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
  createPlaylist()
    .then(addSongs);
}

function addSongs() {
  let query = `${songs[currentSongIndex].artist} - ${songs[currentSongIndex].song}`;

  search(query)
    .then(addToPlaylist)
    .then(addtoPlayListResponse => {
      console.log(addtoPlayListResponse);
      console.log('added to playlist');
      currentSongIndex++;
      if (currentSongIndex < songs.length) {
        addSongs();
      } else {
        console.log('\nfinished');
        let playlistLink = document.createElement('div');
        playlistLink.innerHTML = `<a target="_blank" href="https://www.youtube.com/playlist?list=${playlistId}">Open playlist</a>`;
        statusEl.insertBefore(playlistLink, statusEl.firstChild);
        currentSongIndex = 0;
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
            let videoAddedEl = document.createElement('div');
            videoAddedEl.innerText = `Added ${response.result.snippet.title}`;
            statusEl.insertBefore(videoAddedEl, statusEl.firstChild);
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
        } else {
          $('#status').html('Could not search');
          reject(result);
        }
    });
  });
}
