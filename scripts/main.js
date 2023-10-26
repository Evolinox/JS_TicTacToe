let isInDarkMode = false;
let isMusicPlaying = false;

window.onload = function() {
    const theme = localStorage.getItem('ui-theme');
    const musicState = localStorage.getItem('music');

    //Set initial UI Appearance
    if (theme=='light') {
      document.documentElement.setAttribute('ui-theme', 'light');
      isInDarkMode = false;
    } else if (theme=='') {
      document.documentElement.setAttribute('ui-theme', 'light');
      isInDarkMode = false;
    } else if (theme=='dark') {
      document.documentElement.setAttribute('ui-theme' , 'dark');
      document.getElementById("nightmode").src = "src/sun.svg";
      isInDarkMode = true;
    }

    //Set initial Music State
    if (musicState) {
        toggleMusic();
        document.getElementById("music").src = "src/pause.svg";
    }
}

function toggleAppearance() {
    if (isInDarkMode) {
        document.documentElement.classList.add('transition');
        document.documentElement.setAttribute('ui-theme', 'light');
        document.getElementById("nightmode").src = "src/moon.svg";
        document.getElementById("nightmode").classList.add('transition');
        localStorage.setItem('ui-theme','light');
        isInDarkMode = false;
    } else {
        document.documentElement.classList.add('transition');
        document.documentElement.setAttribute('ui-theme', 'dark');
        document.getElementById("nightmode").src = "src/sun.svg";
        document.getElementById("nightmode").classList.add('transition');
        localStorage.setItem('ui-theme','dark');
        isInDarkMode = true;
    }
}

function toggleMusic() {
    if (isMusicPlaying) {
        document.getElementById("music").src = "src/play.svg";
        isMusicPlaying = false;
    } else {
        document.getElementById("music").src = "src/pause.svg";
        isMusicPlaying = true;
    }
}

function startLocalMP() {
    window.location.href = "games/multiplayer.html";
}

function startLocalSP() {
    window.location.href = "games/singleplayer.html";
}