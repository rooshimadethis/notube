setTimeout(() => {
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.top = '20px';
  iframe.style.right = '20px';
  iframe.style.width = '400px';
  iframe.style.height = '400px';
  iframe.style.zIndex = '9999';
  iframe.style.backgroundColor = 'white'; // Explicitly set background to white
  iframe.style.borderRadius = '15px'; // Rounded corners
  iframe.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)'; // 3D shadow
  iframe.src = chrome.runtime.getURL('app/dist/index.html');

  document.body.appendChild(iframe);

  // Add event listener to close the iframe when clicking outside of it
  document.addEventListener('click', (event) => {
    if (!iframe.contains(event.target)) {
      iframe.remove();
    }
  });
}, 1000);
