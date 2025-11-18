document.addEventListener('DOMContentLoaded', function() {
  var toggleButton = document.getElementById('toggleButton');

  chrome.storage.local.get('youtubeBlocked', function(data) {
    if (data.youtubeBlocked) {
      toggleButton.textContent = 'Unblock YouTube';
    } else {
      toggleButton.textContent = 'Block YouTube';
    }
  });

  toggleButton.addEventListener('click', function() {
    chrome.storage.local.get('youtubeBlocked', function(data) {
      var youtubeBlocked = !data.youtubeBlocked;
      chrome.storage.local.set({youtubeBlocked: youtubeBlocked}, function() {
        if (youtubeBlocked) {
          toggleButton.textContent = 'Unblock YouTube';
          chrome.runtime.sendMessage({youtube: "block"});
        } else {
          toggleButton.textContent = 'Block YouTube';
          chrome.runtime.sendMessage({youtube: "unblock"});
        }
      });
    });
  });
});
