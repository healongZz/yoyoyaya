const Discord = require("discord.js");
const send = require("quick.hook");

exports.run = (client, message, args, prefix) => {
message.delete();
let link = args[0];
    const embed = new Discord.RichEmbed()
    .setColor("RANDON")
    .setDescription("\@everyone\n\n**Now ! You Can Invite Your Friend or People To Server With This Link , And Help Grow Server And Help Me Guy !**")
    .addField("INVITE LINK", `[INVITE LINK](${link})\n**${link}**`)
    
   let m = send(message.channel, embed, {
     name: "📝 MIRAI ANNOUNCEMENTS",
     icon: 'https://cdn.discordapp.com/attachments/461109418315087872/461152816510140448/326031.png'
   })
   m.react("📝");
}
