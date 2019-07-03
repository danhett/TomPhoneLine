const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();

/**
 * Answer phone calls
 */
app.post('/voice', (request, response) => {
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

  twiml.message("Thanks for the text! Call me!");

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.listen(process.env.PORT || 3000)