let youtubeBlocked = true;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ youtubeBlocked });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url && youtubeBlocked) {
    if (changeInfo.url.includes("youtube.com")) {
      chrome.tabs.update(tabId, { url: "about:blank" });
    }
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.youtube === "block") {
    youtubeBlocked = true;
    chrome.storage.local.set({ youtubeBlocked: true });
  } else if (request.youtube === "unblock") {
    youtubeBlocked = false;
    chrome.storage.local.set({ youtubeBlocked: false });
  }
});
