const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'owner',
  description: 'Display bot owner information',
  usage: '[nashPrefix]owner',
  nashPrefix: true,
  execute: async (api, event, args, prefix) => {
    try {
      const ownerInfo = {
        name: 'Joshua Apostol',
        gender: 'male',
        age: '18',
        height: '5,6',
        facebookLink: 'https://www.facebook.com/profile.php?id=100088690249020',
        status: 'Nothing'
      };

      const videoUrl = 'https://drive.google.com/uc?export=download&id=17opoizrGphsKr7OoIowtkEBTfJOWD3JO'; // Replace with your Google Drive video ID link

      const tmpFolderPath = path.join(__dirname, 'tmp');

      if (!fs.existsSync(tmpFolderPath)) {
        fs.mkdirSync(tmpFolderPath);
      }

      const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
      const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

      fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

      const response = `
❖━━━━━━━━━❖❖━━━━━━━━❖
Owner Information:
Name: ${ownerInfo.name}
Gender: ${ownerInfo.gender}
Age: ${ownerInfo.age}
Height: ${ownerInfo.height}
Facebook: ${ownerInfo.facebookLink}
Status: ${ownerInfo.status}
❖━━━━━━━━━❖━━━━━━━━━❖
`;

      await api.sendMessage({
        body: response,
        attachment: fs.createReadStream(videoPath)
      }, event.threadID, event.messageID);

    } catch (error) {
      console.error('Error in owner command:', error);
      return api.sendMessage('An error occurred while processing the command.', event.threadID);
    }
  }
};