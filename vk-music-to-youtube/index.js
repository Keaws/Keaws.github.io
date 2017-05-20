/*
open audios page
scroll down to your first song
open dev tools
select Console tab
copy the code below
paste in console
press Enter


const audioRows = document.querySelectorAll('.audio_row');

let songs = [];

for (let row of audioRows) {
  songs.push({
    artist: row.querySelector('.audio_performer').innerText.trim(),
    song: row.querySelector('.audio_title_inner').innerText.trim()
  });
}

copy(songs);

*/