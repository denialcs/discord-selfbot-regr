const Discord = require("discord.js")
const {version, WebhookClient, EmbedBuilder, MessageEmbed } = require("discord.js");
const ConsoleTitle = require("node-bash-title")
const wait = require("@trenskow/wait")
const ms = require("ms")
const config = require("./assets/config.json")
const translate = require('google-translate-api')
const moment = require('moment')
const os = require("os");
require('moment-duration-format')
var axios = require(`axios`)
const hastebin = require('hastebin-gen')
const snekfetch = require('snekfetch');
const chancejs = require("chance")
const chance = new chancejs()
require('console-stamp')(console, { 
    format: ':date(HH:MM:ss)' 
} );
const notify = require('./functions/notification');
const { default: consoleStamp } = require("console-stamp");
const bot = new Discord.Client({disableEveryone: true})

let prefix = config.prefix

ConsoleTitle("Akame Selfbot")

bot.on("ready", async () =>{
console.log(`[+] Client Logged In: ${bot.user.tag}`)
bot.user.setPresence({ game: { name: `${config.activity}` }, status: `${config.status}` }).catch(err => {
    console.log("Error setting status from config. " + err)
})
notify(`Client Online, Presence Active`)
}, 1000)

bot.on("message", async message => {
    if(message.author.id !== config.id) return;
    if(!message.content.startsWith(prefix)) return;
    let args = message.content.substring(prefix.length).split(" ")
    let command = args.shift()

let ascii = [
    "",
    "",
    "",
    "",
]
   
    switch(command){

        case "help":
            message.edit(`
\`\`\`
help       | Displays Current Message
adhelp     | Displays Advanced Help List
serverdm   | Send A Requested Dm To The Guild
globaldm   | Send A Dm To All Friends
haste      | Upload Text To Hastebin
guildlist  | Shows Current Client Guild List
number     | Generates Random Number
coinflip   | Flips A Coin For Heads Or Tails
uptime     | Shows Current Uptime Usage
stats      | Shows Client Statistics
plans      | Shows Rain Price List
tos        | Shows Rain's Terms Of Service
methods    | Shows Rain's Method List
userinfo   | Shows Available Info About User
autobumper | Allows The Self To Bump Servers For You
socials    | Shows Avalible Social Media List
spam       | Spams The Requested Message
ping       | Shows Current Client Latency
guilds     | Shows Current Guild List
geoip      | Allows You To geolocated The Requested Host
stress     | Allows You To Send Api Requests To Host
\`\`\``);
notify(`Help Command Executed`)
        break

        case "adhelp":
            message.edit(`
\`\`\`
autobumper <start/end>

haste    | [text]
userinfo | [user]
dm       | [user] [text]
spam     | [text] [amount] [delay]
geo      | [host]
stress   | [host] [port] [time] [method]
webhook  | [hookid] [hooktoken] [message]
\`\`\``);
        break;

        case "plans":
            message.edit(`
\`\`\`ansi
‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎‎ [0;34mRain Updates
                   
[0;37m060 Seconds [0;34m| [0;37m1 Concurrent [0;34m | [0;37m10s Cooldown [0;34m | [0;37m$15 Monthly
[0;37m090 Seconds [0;34m| [0;37m1 Concurrent [0;34m | [0;37m10s Cooldown [0;34m | [0;37m$30 Monthly
[0;37m120 Seconds [0;34m| [0;37m2 Concurrent [0;34m | [0;37m10s Cooldown [0;34m | [0;37m$45 Monthly
[0;37m200 Seconds [0;34m| [0;37m3 Concurrent [0;34m | [0;37m10s Cooldown [0;34m | [0;37m$60 Monthly
\`\`\``);
        break;

        case "methods":
            message.edit(`
\`\`\`ansi
[0;34m[[0;37mMethods[0;34m]
[0;37mUDP
[0;37mPPS
[0;37mSTD
[0;37mVSE  
[0;37mRND

[0;37mTCP
[0;37mSMP
[0;37mHSK
[0;37mBYP
\`\`\``);
        break;

        case "tos":
            message.edit(`
\`\`\`ansi
‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎‎ [0;34mRain Rules
        
[0;37m1[0;34m] [0;37mSending More Than 3 Attacks To One Host
[0;37m2[0;34m] [0;37mCommitting Method Abuse On Multiple Occasions
[0;37m3[0;34m] [0;37mAttempting To Send Attacks To Government Sites
[0;37m4[0;34m] [0;37mSharing Net Logins Or Information With Others
[0;37m5[0;34m] [0;37mAttempting To Hit Dstats/Private Datacamps
[0;37m6[0;34m] [0;37mDouble conning a single host
[0;37m7[0;34m] [0;37mNo self promotion in the discord
[0;37m8[0;34m] [0;37mNotify of us of issues (dms only)
[0;37m9[0;34m] [0;37mJust dont her w shit talk and ur vibing
\`\`\``);
        break;

        case "shrug":
            message.edit(`
\`\`\`
¯\_(ツ)_/¯ 
\`\`\``);
        break;

        case "hug":
            message.edit(`
\`\`\`
(づ｡◕‿‿◕｡)づ
 
\`\`\``);
        break;

        case "ping":
            ping_msg = await message.channel.send(`🏓 Pinging...`)
    
            ping_msg.edit(`🏓 Pong!\nLatency is ${Math.floor(ping_msg.createdTimestamp - message.createdTimestamp)}ms`);
        break;

        case "socials":
            message.edit(`**Discord:  **\`\`𝒅𝒊𝒔𝒄𝒐𝒓𝒅.𝒈𝒈/𝒏𝒔𝑷𝑻𝒏𝒅8𝑨]\`\`\n**Instagram:  **\`\`𝒅𝒆𝒏𝒊𝒂𝒍.𝒄𝒔/𝒎8𝒓𝒆\`\``)
        break;

        case "spam":
            message.delete()
            num = 0
            let msg = args[0]
            let amount = args[1]
            let waittime = args[2]
            while(num < amount){
                await wait(waittime + "s")
                num = num + 1
                message.channel.send(msg)   
            }
        notify(`Spam Case Executed Waiting For End`)
        break;
    
        case 'dm':
            if(!args[0]) return message.channel.send("Who do I send to?")
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if(!user) return message.channel.send("You didnt specify a user or the user isnt valid :P")
            if(!args.slice(1).join(" ")) return message.channel.send("I need a message to send :P")
            user.user.send(args.slice(1).join(" ")).catch(() => message.channel.send("I cant dm them! 😭")).then(() => message.channel.send(`Sent the message to ${user.user.tag} :P`))
        notify(`Successfully Dm'D User`)
        break;

        case "testthin":
    
        break; 

        case "autobumper":
            message.delete()
            if(args[0] == "start"){ 
                var bumper = setInterval(() => {
                    message.channel.send("!d bump")
                }, 7200000);
            }
            if(args[0] == "end"){
                clearInterval(bumper)
            }
            notify(`Auto Bumper Begun`)
            break;
   
    
        case "userinfo":
            let theuser = message.mentions.users.first()
            if (!theuser) { return message.edit(":x: Unknown user!") }
            message.edit("Username: **" + theuser.username + "**\nDiscrim - **" + theuser.discriminator + "**\nID - **" + theuser.id +  "**\nStatus - **" + theuser.presence.status + "**\n");
            break;

        case "stats":
            message.edit("I am on **" + bot.guilds.size + "** servers with **" + bot.users.size + "** users on them")
            break;
    
        case 'uptime':
            message.delete
            notify("The uptime is " + moment.duration(bot.uptime).format(' D [days], H [hrs], m [mins], s [seconds]') + "")
            break;

        case 'coinflip':
            message.edit("" + chance.pickone(["I flipped a coin and got **heads**!", "I flipped a coin and got **tails**!"]))
            break;
    
        case 'number':
            message.delete()
            message.channel.send("" + chance.integer({ min: 0, max: 10000 }))
            break;
    
        case 'guildlist':
            message.edit(bot.guilds.forEach(g => { message.edit(g.name) }))
        break;

        case 'haste':
            let haste = args.slice(0).join(" ")
            if (!args[0]) { return message.edit(":x: What do you want to post to Hastebin?") }
            hastebin(haste).then(r => {
                message.edit(":white_check_mark: Posted text to Hastebin at this URL: " + r);
            }).catch(message.edit(":x: An error has occurred. Details: " + console.error));
        break;

        case 'stress':
            let host = args[0]
            let port = args[1]
            let time = args[2]
            let method = args[3]
            if(!method) notify(`Invalid Arguement`); else {
            axios.get(`${config.apikey}${host}&port=${port}&time=${time}&method=${method}`);
            notify(`An Attack Was Sent To ${host}`)
            }
        break;

        case 'guildlist':
            message.edit(bot.guilds.forEach(g => { message.edit(g.name) }))
        break;

        case 'geo':
        if(!args[0]) return message.channel.send('No arguments');

        let geohost = args[0]
        snekfetch.get(`http://ip-api.com/json/${geohost}`).then(r => {var string = JSON.stringify(r.body)
        message.edit(`
**IP:** ${geohost}
**City:** ${r.body.city}
**Region:** ${r.body.region}
**Country:** ${r.body.country}
**Timezone:** ${r.body.timezone}
**ISP:** ${r.body.isp}
**ASN:** ${r.body.as}  
`)})
        console.log(`[38;2;255;125;26m[AKAME] Api Request Was Used`)
            
        break;

        case 'osinfo':
            message.edit(`
**Uptime:** <t:${parseInt(bot.readyTimestamp / 1000)}:R> 
**CPU Model** ${os.cpus()[0].model}
**CPU Usage** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}%
**Node.js** ${process.version}
**Discord.js** ${version}
            `)
        break;



    }
});

bot.login(config.token);