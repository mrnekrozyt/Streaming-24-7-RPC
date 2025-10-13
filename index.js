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
      "https://media.discordapp.net/attachments/1427270181830524929/1427334085118001304/image0.png?ex=68ee7bf4&is=68ed2a74&hm=957a30b7dc4e508232f3cd482e12bd3190fb634d7ab7a21036a138715f8d8dc0&=&format=webp&quality=lossless&width=305&height=535",
    ) //You can put links in tenor or discord and etc.
    .setAssetsLargeText("I have fallen for you") //Text when you hover the Large image
    .setAssetsSmallImage(
      "https://media.discordapp.net/attachments/1427270181830524929/1427334085428117646/heart-beating-heart.png?ex=68ee7bf4&is=68ed2a74&hm=91adca9eefb0eebacdea0fba6db36677d25718a2e5f1193b31bde1cc511ae672&=&format=webp&quality=lossless",
    ) //You can put links in tenor or discord and etc.
    .setAssetsSmallText("Im obsessed with you") //Text when you hover the Small image
    .addButton("e-z.bio", "https://e-z.bio/developer")
    .addButton(
      "Subscribe to The Goat",
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
