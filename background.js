chrome.runtime.onInstalled.addListener(() => {
  console.log("RandomPlay Extension Installed!");
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes('youtube.com')) {
      chrome.scripting.executeScript({
        target: { tabId },
        files: ['content.js']
      });
    }
  });
  
