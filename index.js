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
    .setURL("https://youtu.be/rtaONidfhG4?si=msMXaAJFR1IO5lEX") //Must be a youtube video link
    .setState("Captivates Me")
    .setName("Is this really love?")
    .setDetails(`Captivates Me [${formatTime()}]`)
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage(
      "https://media.discordapp.net/attachments/1258387249041772646/1426967813058330836/image0.png?ex=68ed26d6&is=68ebd556&hm=a961061e6b7da3bee55347bffdfa6e1e6aac3eda2c1291408be46ae7cb6d4faf&=&format=webp&quality=lossless&width=365&height=639",
    ) //You can put links in tenor or discord and etc.
    .setAssetsLargeText("I have fallen for you") //Text when you hover the Large image
    .setAssetsSmallImage(
      "https://cdn.discordapp.com/attachments/1258387249041772646/1426968065068761220/heart-beating-heart.gif?ex=68ed2712&is=68ebd592&hm=f567bcfd638e8e2c697629ca966a3c363b0ca59e48f94cefbeeab26be957f62c&",
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
