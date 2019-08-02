const xapi = require('xapi');
var selfview;

xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  if (event.WidgetId === 'diag') {
    if (event.Type === 'changed' && event.Value === 'on') {
      xapi.command('Cameras SpeakerTrack Diagnostics Start');
      xapi.command('Video Selfview Set', {
        Mode: 'On',
        FullscreenMode: 'On'
      });
    } else if (event.Type === 'changed' && event.Value === 'off') {
      xapi.command('Cameras SpeakerTrack Diagnostics Stop');
      xapi.command('Video Selfview Set', {
        Mode: 'Off',
        FullscreenMode: 'Off'
      });
    }
  }
  else if (event.WidgetId === 'signage') {
    if (event.Type === 'clicked') {
      xapi.command('Standby Halfwake');
    }
  }
  else if (event.WidgetId === 'url') {
    if (event.Type === 'clicked') {
      xapi.command('UserInterface Message TextInput Display', {
      FeedbackId: 'url',
      Title: 'Digital Signage',
      Text: 'Choose a URL',
      Placeholder: 'https://www.cisco.com'
    });
    }
  }
});


xapi.event.on('UserInterface Message TextInput Response', (event) => {
  if (event.FeedbackId === 'url') {
    xapi.config.set('Standby Signage Url', event.Text);
  }
});