const Discord = require("discord.js-selfbot-v13");
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false,
});

const keepAlive = require("./server.js");
keepAlive();

function getTimeData() {
  const date = new Date();
  
  const timeString = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  }).format(date);

  const currentHour = parseInt(new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    hour12: true,
    hour: "numeric"
  }).format(date));

  return { timeString, currentHour };
}

function getEmoji(h) {
    if (h >= 6 && h < 9) return '🌄';      
    if (h >= 9 && h < 16) return '🌞';    
    if (h >= 16 && h < 18) return '🌇';     
    return '🌛';                            
}

client.on("ready", async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const { timeString, currentHour } = getTimeData();
  const emoji = getEmoji(currentHour);

  const r = new Discord.RichPresence(client)
    .setApplicationId("1426964594215227456")
    .setType("STREAMING")
    .setURL("https://www.youtube.com/watch?v=oHg5SJYRHA0") //Must be a youtube video link
    .setState("​🇲🇾 🇩🇪🇦🇷")
    .setName("𝕴𝖘 𝖙𝖍𝖎𝖘 𝖗𝖊𝖆𝖑𝖑𝖞 𝖑𝖔𝖛𝖊?")
    .setDetails(`${emoji} [${timeString}]`)
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage("https://cdn.discordapp.com/emojis/1523219969276641381.gif") //You can put links in tenor or discord and etc.
    .setAssetsLargeText("	🇮 🇭🇦🇻🇪 🇫🇦🇱🇱🇪🇳 🇫🇴🇷 🇾🇴🇺") //Text when you hover the Large image
    .setAssetsSmallImage("https://cdn.discordapp.com/emojis/1523219997051195432.png") //You can put links in tenor or discord and etc.
    .setAssetsSmallText("	ι'м σвѕєѕѕє∂ ωιтн уσυ") //Text when you hover the Small image
    .addButton("‧₊˚.	𝕻𝖗𝖔𝖋𝖎𝖑𝖊 ࿐壮", "https://e-z.bio/developer")
    .addButton("‧₊˚.⊹x𝖄𝖔𝖚𝖙𝖚𝖇𝖊✧.*", "https://www.youtube.com/@jennabutub");

  client.user.setActivity(r);
  client.user.setPresence({ status: "idle" }); //dnd, online, idle, offline

  let prevTime = null;

  setInterval(() => {
    const { timeString, currentHour } = getTimeData();
    
    if (timeString !== prevTime) {
      const emoji = getEmoji(currentHour);
      const newDetails = `${emoji} [${timeString}]`;
      
      r.setDetails(newDetails);
      client.user.setActivity(r);
      
      prevTime = timeString;
    }
  }, 1000); 
});

const mySecret = process.env["TOKEN"];
client.login(mySecret);
