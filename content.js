let iframe = null;

function createIframe() {
  iframe = document.createElement('iframe');
  iframe.id = 'notube-popup-iframe'; // Add an ID for easier identification
  iframe.style.position = 'fixed';
  iframe.style.top = '20px';
  iframe.style.right = '20px';
  iframe.style.width = '420px';
  iframe.style.height = '600px';
  iframe.style.zIndex = '9999';
  iframe.style.backgroundColor = 'white'; // Explicitly set background to white
  iframe.style.borderRadius = '15px'; // Rounded corners
  iframe.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)'; // 3D shadow
  iframe.src = chrome.runtime.getURL('app/dist/index.html') + '?t=' + Date.now();

  document.body.appendChild(iframe);

  // Add event listener to close the iframe when clicking outside of it
  document.addEventListener('click', (event) => {
    if (iframe && !iframe.contains(event.target)) {
      iframe.remove();
      iframe = null;
    }
  });
}

function toggleIframe() {
  if (iframe) {
    iframe.remove();
    iframe = null;
  } else {
    createIframe();
  }
}

// Automatic display on page load
setTimeout(() => {
  createIframe();
}, 1000);

// Listen for messages from the background script to toggle the iframe
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'togglePopup') {
    toggleIframe();
  }
});

// Listen for messages from the iframe to close itself
window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLOSE_NOTUBE_POPUP') {
    if (iframe) {
      iframe.remove();
      iframe = null;
    }
  }
});