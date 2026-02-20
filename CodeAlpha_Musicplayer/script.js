const songs = [
    {title:"Dooron Dooron", artist:"Paresh Pahuja", src:"song1.mp3"},
    {title:"Line without hook", artist:"Ricky Mangtomery", src:"song2.mp3"},
    {title:"Tere Liye", artist:"Atif Aslam,Shreya Ghoshal", src:"song3.mp3"}
];

let currentSong = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const time = document.getElementById("time");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

function loadSong(index){
    audio.src = songs[index].src;
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
}

function togglePlay(){
    if(audio.paused){
        audio.play();
    } else{
        audio.pause();
    }
}

function nextSong(){
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
}

function prevSong(){
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
}

audio.addEventListener("timeupdate", ()=>{
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
    time.textContent = formatTime(audio.currentTime) + " / " + formatTime(audio.duration);
});

progress.addEventListener("input", ()=>{
    audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", ()=>{
    audio.volume = volume.value;
});

audio.addEventListener("ended", nextSong);

function formatTime(t){
    if(isNaN(t)) return "00:00";
    let m = Math.floor(t/60);
    let s = Math.floor(t%60);
    return m + ":" + (s<10?"0"+s:s);
}

function loadPlaylist(){
    songs.forEach((song,index)=>{
        const div = document.createElement("div");
        div.textContent = song.title + " - " + song.artist;
        div.onclick = ()=>{
            currentSong = index;
            loadSong(index);
            audio.play();
        };
        playlist.appendChild(div);
    });
}

loadSong(currentSong);
loadPlaylist();
