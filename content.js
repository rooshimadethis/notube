setTimeout(() => {
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.top = '20px';
  iframe.style.right = '20px';
  iframe.style.width = '400px';
  iframe.style.height = '400px';
  iframe.style.zIndex = '9999';
  iframe.style.border = 'none';
  iframe.src = chrome.runtime.getURL('app/dist/index.html');

  document.body.appendChild(iframe);
}, 1000);
