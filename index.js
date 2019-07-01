const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();

/**
 * Answer phone calls
 */
app.post('/voice', (request, response) => {
  /* // ROBOT VOICE TEST
  const twiml = new VoiceResponse();
  
  if(SHOW_SOON) {
    twiml.say({ voice: 'alice' }, "Hello. The rave is not happening for a while. Try again later.");
  }
  else {
    twiml.say({ voice: 'alice' }, "Hello. It's rave time, the location is now shared.");
  }
  */

  const twiml = new VoiceResponse();
  twiml.play({
      loop: 1
  }, 'http://rave.danhett.com/yes.mp3');

  response.type('text/xml');
  response.send(twiml.toString());
});


/**
 * Text the user back
 */
app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message("HEY! The party is on, but we're not saying where yet. Check back on the day, ravers!");

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.listen(process.env.PORT || 3000)