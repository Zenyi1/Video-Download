const ytdl = require('ytdl-core-discord');

module.exports = async (req, res) => {
  try {
    const { URL } = req.query;

    const videoInfo = await ytdl.getInfo(URL);
    const format = ytdl.chooseFormat(videoInfo.formats, { quality: 'highest' });
    const stream = ytdl(URL, { format });

    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', `attachment; filename="video.mp4"`);

    await stream.pipe(res);

    stream.on('end', () => {
      res.end();
    });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
};
