const ytdl = require('ytdl-core');

module.exports = async (req, res) => {
  const videoId = req.query.videoId;
  if (videoId) {
    const videoUrl = 'https://www.youtube.com/watch?v=' + videoId;
    const options = {
      filter: 'audioonly',
      requestOptions: {
        maxRetries: 5,
        timeout: 90000, // Increase the timeout value to 30 seconds (or as needed)
      },
    };

    ytdl(videoUrl, options).pipe(res);
  } else {
    res.status(400).send('Invalid request');
  }
};