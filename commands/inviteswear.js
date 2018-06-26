const Discord = require("discord.js");
const send = require("quick.hook");

exports.run = (client, message, args, prefix) => {
message.delete();
//const args = message.content.slice(prefix.length).split(/ +/);
//const commandName = args.shift().toLowerCase();

let link = args[1];
    const embed = new Discord.RichEmbed()
    .setColor("RANDON")
    .setDescription("\@everyone\n\n**Now ! You Can Invite Your Friend or People To Server With This Link , And Help Grow Server And Help Me Guy !**")
    .addField("INVITE LINK", `[INVITE LINK](${link})\n**${link}**`)
    
   send(message.channel, embed, {
     name: "📝 MIRAI ANNOUNCED",
     icon: 'https://cdn.discordapp.com/attachments/461109418315087872/461154643649626115/34.png'
    })
}
