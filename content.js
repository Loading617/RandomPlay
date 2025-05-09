const videoId = window.location.href.split("v=")[1].split("&")[0];

chrome.storage.local.get([videoId], function(result) {
  let viewCount = result[videoId] || 0;

  const videoElement = document.querySelector('video');
  if (videoElement && !videoElement.paused) {
    viewCount++;
    
    chrome.storage.local.set({ [videoId]: viewCount });
  }
});
