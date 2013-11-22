chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('sfweather.html', {
    id: 'sfweather',
    'bounds': {
      'width': 300,
      'height': 400
    },
    minHeight: 400,
    minWidth: 300,
    maxHeight: 400,
    maxWidth: 300
  });
});
