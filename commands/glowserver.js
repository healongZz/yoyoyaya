const Discord = require("discord.js");
const send = require("qucik.hook");

exports.run = (client, message, Discord, prefix) => {

message.delete();
const embed = new Discord.RichEmbed()

.setColor("RANDOM")
.setAuthor(message.guild.name, message.guild.iconURL)
.setDescription("**You Can Invite Your Friends To Server With This Link , And Help Grow Server !Now , And Thank You Guy For Support Me Alway . I LOVE U ALL GUY**")
.addField("Website :", "https://tamotoji.tk/")
.addField("InviteLink : ", "https://discord.gg/ZWWD7zT")

message.channel.send("\@everyone").then(m => m.delete(200));
send(message.channel, embed, {
   name: "TAMOTOJI Manager:",
   icon: "https://cdn.discordapp.com/avatars/356510829920780289/ed63db302e8f5a53bb26b2ca04d1b203.png?size=2048"
  })

}
