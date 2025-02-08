let playbackMode = 'normal';
let playbackTimers = [];

function enhanceSortButton() {
  const sortButton = document.querySelector('tp-yt-paper-button#label');
  const menuContainer = document.querySelector('tp-yt-paper-listbox');

  if (!sortButton || !menuContainer || document.querySelector('#extensionControls')) return;

  
  const controls = document.createElement('div');
  controls.id = 'extensionControls';
  controls.style.display = 'flex';
  controls.style.flexDirection = 'column';
  controls.style.marginTop = '10px';

  
  const shuffleButton = document.createElement('button');
  shuffleButton.textContent = 'Shuffle Videos';
  shuffleButton.style.margin = '5px';
  shuffleButton.addEventListener('click', () => {
    if (playbackMode !== 'shuffle') {
      playbackMode = 'shuffle';
      clearPlaybackTimers();
      shuffleVideos();
      alert('Shuffle mode activated.');
    }
  });

  
  const programButton = document.createElement('button');
  programButton.textContent = 'Program Videos';
  programButton.style.margin = '5px';
  programButton.addEventListener('click', () => {
    if (playbackMode !== 'program') {
      playbackMode = 'program';
      clearPlaybackTimers();
      programVideos();
      alert('Program mode activated.');
    }
  });

  
  const normalButton = document.createElement('button');
  normalButton.textContent = 'Normal Play Mode';
  normalButton.style.margin = '5px';
  normalButton.addEventListener('click', () => {
    if (playbackMode !== 'normal') {
      playbackMode = 'normal';
      clearPlaybackTimers();
      window.location.reload(); 
      alert('Normal play mode activated.');
    }
  });

  controls.appendChild(shuffleButton);
  controls.appendChild(programButton);
  controls.appendChild(normalButton);

  menuContainer.appendChild(controls);
}


function shuffleVideos() {
  const videos = Array.from(document.querySelectorAll('ytd-grid-video-renderer, ytd-rich-item-renderer'));
  if (videos.length) {
    videos.sort(() => Math.random() - 0.5); 
    const container = videos[0].parentNode;
    container.innerHTML = '';
    videos.forEach(video => container.appendChild(video));
  } else {
    alert('No videos found to shuffle.');
  }
}


function programVideos() {
  const videos = Array.from(document.querySelectorAll('ytd-grid-video-renderer, ytd-rich-item-renderer'));
  const selectedVideos = videos.slice(0, 5); 
  selectedVideos.forEach((video, index) => {
    const timer = setTimeout(() => {
      window.open(video.querySelector('a').href, '_blank');
    }, index * 5000); 
    playbackTimers.push(timer);
  });
}


function clearPlaybackTimers() {
  playbackTimers.forEach(timer => clearTimeout(timer));
  playbackTimers = [];
}


document.addEventListener('yt-page-data-updated', enhanceSortButton);
enhanceSortButton();
