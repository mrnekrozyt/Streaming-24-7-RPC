const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

function formatTime() { //Credits to himika#0001 and never#0001
  const date = new Date();
  const options = {
    timeZone: 'America/New_York', //https://www.zeitverschiebung.net/en/ and find your city and enter here
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence(client)
    .setApplicationId('1140502397928620184')
    .setType('STREAMING')
    .setURL('https://www.youtube.com/watch?v=BsaaQK94OPs') //Must be a youtube video link 
    .setState('Playing Minecraft')
    .setName('Dragon Slayer')
    .setDetails(`DragonSlayer0SMP.aternos.me`)
    .setStartTimestamp(Date.now())
 .setAssetsLargeImage('https://media.discordapp.net/attachments/1057148615405076491/1144509258868736071/lofi-girl-lofi.gif?width=451&height=402') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('Jenna_YT') //Text when you hover the Large image
    .setAssetsSmallImage('https://media.discordapp.net/attachments/1126786252780339304/1140503094791254056/check.gif') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('Building a Bunker') //Text when you hover the Small image
    .addButton('Join the SMP', 'https://discord.gg/RKhZpD9P2r')
    .addButton('Subscribe to Owner', 'https://www.youtube.com/@Renzwtbenefits');

  client.user.setActivity(r);
  client.user.setPresence({ status: "idle" }); //dnd, online, idle, offline
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);