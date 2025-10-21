const Discord = require("discord.js-selfbot-v13");
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false,
});

const keepAlive = require("./server.js");
keepAlive();

function formatTime() {
  //Credits to himika#0001 and never#0001
  const date = new Date();
  const options = {
    timeZone: "America/New_York", //https://www.zeitverschiebung.net/en/ and find your city and enter here
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

client.on("ready", async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence(client)
    .setApplicationId("1426964594215227456")
    .setType("STREAMING")
    .setURL("https://www.youtube.com/watch?v=oHg5SJYRHA0") //Must be a youtube video link
    .setState("Captivates Me")
    .setName("Is this really love?")
    .setDetails(`Captivates Me [${formatTime()}]`)
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage(
      "https://images-ext-1.discordapp.net/external/x0-ctNMYudvT7JQkevcr8_Vc_pLFbhhumCeHugrFdnQ/https/i.imgur.com/UYtctNC.png?format=webp&quality=lossless",
    ) //You can put links in tenor or discord and etc.
    .setAssetsLargeText("I have fallen for you") //Text when you hover the Large image
    .setAssetsSmallImage(
      "https://media.discordapp.net/attachments/1430232655802138734/1430232703911071824/heart-beating-heart.png?ex=68f90781&is=68f7b601&hm=e0e6f7e840f4d80bcd0569dae8460785b0d2ba5095e4a177772c1531a50c87a9&=&format=webp&quality=lossless",
    ) //You can put links in tenor or discord and etc.
    .setAssetsSmallText("Im obsessed with you") //Text when you hover the Small image
    .addButton("Portfolio", "https://e-z.bio/developer")
    .addButton(
      "Subscribe",
      "https://www.youtube.com/@Jenna_YTthegoat",
    );

  client.user.setActivity(r);
  client.user.setPresence({ status: "idle" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `Those Eyes [${newTime}]`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env["TOKEN"];
client.login(mySecret);
