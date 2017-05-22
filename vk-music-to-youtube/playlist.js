// Define some variables used to remember state.
let playlistId, channelId, songs, currentVideoId,
currentSongIndex = errorsOccured = 0
errorQueries = [];

const statusEl = document.getElementById('status');
const progressBarContainer = document.querySelector('.progress');
const progressBarEl = document.querySelector('.progress-bar-striped');
const progressText = document.querySelector('.progress-text');
const playlistButton = document.getElementById('playlist-button');
const copyButton = document.querySelector('.fn-copy-to-clipboard');
const codeToCopyArea = document.querySelector('.actions textarea');

copyButton.addEventListener('click', (e) => { copyToClipboard(); });

// After the API loads, call a function to enable the playlist creation form.
function handleAPILoaded() {
  enableForm();
}

// Enable the form for creating a playlist.
function enableForm() {
  playlistButton.disabled = false;
}

function disableForm() {
  playlistButton.disabled = true;
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
  disableForm();
  currentSongIndex = 0;

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
      updateProgressBar();
      if (currentSongIndex < songs.length) {
        addSongs();
      } else {
        console.log('\nfinished');

        toggleProgressBar();
        showFailedSongsIfAny();
        showPlaylistLink();

        return;
      }
    })
    .catch(err => {
      console.error(err);
      errorsOccured++;
      currentSongIndex++;
      if (currentSongIndex < songs.length) {
        addSongs();
      }
    });
}

function showPlaylistLink() {
    let playlistLink = document.createElement('p');
    playlistLink.innerHTML = `<a target="_blank" href="https://www.youtube.com/playlist?list=${playlistId}">Open playlist</a>`;
    statusEl.insertBefore(playlistLink, statusEl.firstChild);
}

// Create a private playlist.
function createPlaylist() {
  songs = IsJsonString(document.getElementById('songs').value)

  if (!songs) {
    $('#status').html('Invalid data format');
    return;
  }

  showProgressBar();  

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
            let videoAddedEl = document.createElement('p');
            videoAddedEl.innerHTML = `<i class="fa fa-music" aria-hidden="true"></i> ${response.result.snippet.title}`;
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

        if (result && result.items && result.items.length > 0) {
          console.log('SEARCH RESULT:');
          console.log(result);
          currentVideoId = result.items[0].id.videoId;
          resolve(result);
        } else {
          let err = document.createElement('p');
          err.style.color = 'red';
          err.innerHTML = `<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Search failed for: ${query}`;
          statusEl.insertBefore(err, statusEl.firstChild);
          errorQueries.push(query);
          reject(result);
        }
    });
  });
}

function showProgressBar() {
  progressBarContainer.style.display = 'block';
}

function toggleProgressBar() {
  progressBarEl.classList.toggle('active');
  progressBarEl.classList.toggle('finished');
}

function updateProgressBar() {
  progressText.innerText = `Songs added ${currentSongIndex - errorsOccured}/${songs.length}`;
}

function showFailedSongsIfAny() {
    if (errorQueries.length > 0) {
      let failDetailsEl = document.createElement('details');
      failDetailsEl.style.outline = 'none';
      let failDetailsSummary = document.createElement('summary');

      failDetailsSummary.style.color = 'orangered';
      failDetailsSummary.innerText = 'Click to see what songs didn\'t make it:';
      failDetailsEl.appendChild(failDetailsSummary);
      for (let fail of errorQueries) {
        let failEl = document.createElement('p');
        failEl.innerHTML = fail;
        failEl.style.color = 'orangered';
        failDetailsEl.appendChild(failEl);
      }

      statusEl.insertBefore(failDetailsEl, statusEl.firstChild);
  }
}

function copyToClipboard() {
  codeToCopyArea.disabled = false;
  codeToCopyArea.select();
  document.execCommand('copy');
  codeToCopyArea.disabled = true;
}