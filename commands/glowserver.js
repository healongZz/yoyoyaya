const Discord = require("discord.js");
const send = require("quick.hook");

exports.run = (client, message, Discord, prefix) => {

if(message.member.hasPermission("MANAGER_MESSAGE")) return message.channel.send("Ot Mean Permission xD");

message.delete();
const embed = new Discord.RichEmbed()

.setColor("RANDOM")
.setThumbnail(message.guild.iconURL)
.setAuthor(message.guild.name, message.guild.iconURL)
.setDescription("**You Can Invite Your Friends To Server With This Link , And Help Grow Server !Now , And Thank You Guy For Support Me Alway . I LOVE U ALL GUY**")

.addField("Website :", "https://tamotoji.tk/")
.addField("InviteLink : ", "https://discord.gg/ZWWD7zT")

message.channel.send("\@everyone");//.then(m => m.delete(200));
send(message.channel, embed, {
   name: "TAMOTOJI Manager",
   icon: "https://cdn.discordapp.com/attachments/460329537805484032/462505598487887874/LEGEND_20180629_140900.gif"
  })

}
