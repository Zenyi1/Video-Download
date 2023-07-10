const ytdl = require('ytdl-core');
const fs = require('fs');

module.exports = async (req, res) => {
  try {
    const { URL } = req.query;

    // Download the video and save it to a temporary file
    const videoInfo = await ytdl.getInfo(URL);
    const format = ytdl.chooseFormat(videoInfo.formats, { quality: 'highest' });
    const videoReadableStream = ytdl(URL, { format });

    const tempFilePath = '/tmp/video.mp4'; // Temporary file path

    await new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(tempFilePath);
      videoReadableStream.pipe(writeStream);

      videoReadableStream.on('end', resolve);
      writeStream.on('error', reject);
    });

    // Stream the video file to the response
    const videoReadStream = fs.createReadStream(tempFilePath);
    videoReadStream.pipe(res);

    // Clean up the temporary file after streaming is complete
    videoReadStream.on('end', () => {
      fs.unlinkSync(tempFilePath);
    });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
};
