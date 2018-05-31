const yoMamma = require('yo-mamma').default;
const moment = require("moment");
const sm = require('string-similarity');
const Fortnite = require('fortnite');
const stats = new Fortnite("aff6929e-6efc-468d-9058-daba0491d714");
const Discord = require('discord.js'),
      Chance = require('chance'),
      random = new Chance(),
      arraySort = require('array-sort'), // This will be used for sorting arrays
      table = require('table'), // This will be used for preparing the output to a table
      send = require('quick.hook'),
      parseArgs = require('minimist');
const client = new Discord.Client();
const botconfig = require("./botconfig.json");
const superagent = require("superagent");
//const send = require("quick.hook");
const encode = require('strict-uri-encode');
const snekfetch = require('snekfetch');
const fs = require("fs");
const economy = require('discord-eco');
const talkedRecently = new Set();
const xp = require("./xp.json");
const token = require("./botconfig.json");
let queue = {};
const Cleverbot = require("cleverbot-node");
const clbot = new Cleverbot;
clbot.configure({botapi: "dqr2PbIOKMD8oQD6eCFy7kpRWXS0Hj98"});
const api = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";

client.on('guildMemberAdd', member => {
    member.guild.channels.get('446673535029739520').setName(`Total Users: ${member.guild.memberCount}`);
});

client.on('guildMemberRemove', member => {
    member.guild.channels.get('446673535029739520').setName(`Total Users: ${member.guild.memberCount}`);
});
//memberjoin : https://hastebin.com/gedecajeke.js

client.on("message", message => {
  if (message.channel.type === "dm") {
    clbot.write(message.content, (response) => {
      message.channel.startTyping();
      setTimeout(() => {
        message.channel.send(response.output).catch(console.error);
        message.channel.stopTyping();
      }, Math.random() * (1 - 3) + 1 * 1000);
    });
  }
});


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(']help', { type: 'WATCHING' })
  });

client.on("message", message => {
  
  let args = message.content.split(" ").slice(1);
  let name = args.join(' ');
  if (message.content.startsWith(botconfig.prefix + "createHook")) {
    message.channel.createWebhook(`${name}`)
      .then(webhook => webhook.edit(`${name}`)
        .then(wb => message.author.send(`**Here is You Webhook** : https://canary.discordapp.com/api/webhooks/${wb.id}/${wb.token}`))
        .catch(console.error))
      .catch(console.error);
    message.channel.send(`<:BOT:445430903808983050> **${message.author.tag}** Has Create Hook **${name}** From Channel !`).then(msg => msg.delete(99999));
    message.delete(5000)
  }
});

  client.on("guildCreate", async guild => {
    const invite = await guild.channels.first().createInvite({
      maxAge: 0
    });
    console.log(`Bot Has Invite To New Guild Â» ${guild.name} with invite: https://discord.gg/${invite.code}`)
  });
  
client.on("guildMemberAdd", function(member) {
    let role = member.guild.roles.find("name", "PLAYER");
    member.addRole(role).catch(console.error);
});

  client.on("message", async message => {
    //  if (talkedRecently.has(message.author.id)) {
  //      message.channel.send("**Wait 30 Second Before Getting Typing This Again.** - " + message.author).then(msg => msg.delete(4500));
  //  } else {
    if(message.author.bot) return;
    const args = message.content.slice(botconfig.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();  

   if(command === "jumboemoji" || command === "jb") {
    if(!args[0]) return message.channel.send(`**Provide an emoji to jumbify.** ${botconfig.prefix}jumboemoji :clap:`).then(msg => msg.delete(12000));
    try {
      const emote = Discord.Util.parseEmoji(args[0]);
      if (emote.animated === true) {
        const URL = `https://cdn.discordapp.com/emojis/${emote.id}.gif?v=1`;
        const { body: buffer } = await snekfetch.get(`${URL}`);
        const toSend = fs.writeFileSync('emote.gif', buffer);
        message.channel.send({ file: 'emote.gif' });
      } else if (emote.id === null) {
        const twemote = twemoji.parse(args[0]);
        const regex = /src="(.+)"/g;
        const regTwemote = regex.exec(twemote)[1];
        const { body: buffer } = await snekfetch.get(`${regTwemote}`);
        const toSend = fs.writeFileSync('emote.png', buffer);
        await message.channel.send({ file: 'emote.png' });
      } else {
        const URL = `https://cdn.discordapp.com/emojis/${emote.id}.png`;
        const { body: buffer } = await snekfetch.get(`${URL}`);
        const toSend = fs.writeFileSync('emote.png', buffer);
        message.channel.send({ file: 'emote.png' });
      }
    } catch (error) {
      if (error.message === 'TypeError: Cannot read property \'1\' of null') {
        message.reply('Give me an actual emote.');
      }
    }
  }

	  if(command === "needhelp" || command === "nhelp") {
		  message.delete()
		  if(args[0] == "help") {
			  message.channel.send(`Usege : **${botconfig.prefix}needhelp [request message]** \n\nExamples : **${botconfig.prefix}needhelp How i Can Get Rank|Role From Server !**`).then(msg => msg.delete(9009));
			  return;
			  }
		  let text = args.join(" ");
		  const needhelp = new Discord.RichEmbed()
		  .setColor('RANDOM')
		  .setAuthor(`${message.author.username} Request Help !`, message.author.avatarURL)
		  .addField(`Request`, text)
		  .addField(`From Channel :`, message.channel)
		  .setTimestamp()
		  
		  let nhc = message.guild.channels.find(`name`, "request-help");
		  if(!nhc) return message.channel.send("I Can't Not Find **request-help** Channel !")
		  nhc.send(needhelp);
		  message.channel.send(`__**${message.author.username}**__ :\n\n**Thank You For Request-Help , Your Request Message Will Send To STAFF To Reply Your Request Back!**`).then(msg => msg.delete(10000));	
		  }
	  if(command === "time" || command === "clock") {
		  var today = new Date()
                  let Day = today.toString().split(" ")[0].concat("day");
                  let Month = today.toString().split(" ")[1]
                  let Year = today.toString().split(" ")[3]
                  message.channel.send(`\`${Day}\` \`${Month}\` \`${Year}\`\n\`Time of day:\` \`${today.toString().split(" ")[4]}\``)
 }

	  
  if(command === "ctc" || command === "create-textchannel") {
  let channel = args.join(" ");
  if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("**You do not have permission to do that!**");
  message.guild.createChannel(channel, 'text');
  message.channel.send(`✅ **${message.author.username}** Has Create Text Channel **${channel}**`).then(msg => msg.delete(8000));

}

  if(command === "cvc" || command === "create-voicechannel") {
  let channel = args.join(" ");
  if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("**You do not have permission to do that!**");
  message.guild.createChannel(channel, 'voice');
  message.channel.send(`✅ **${message.author.username}** Has Create Text Channel **${channel}**`).then(msg => msg.delete(8000));

}
	
if(command === "newvideo" || command === "nv") {
  if(!message.member.hasPermission("MANAGE_MESSAGE")) return message.channel.send(`${message.author.username} You Don\'t Have **Manage Message** To Use This Commands !`);
message.delete()
if(args[0] == "help"){
  message.channel.send("**Enter  •  <YTUsername>  <VideoURL>**").then(msg => msg.delete(11000));
    return;
  }
  let username = args[0]; 
  let videoURL = args[1];
 
    send(message.channel, `📣 @here\n\n<:sparkles_fiery:446628397855145986> Username • **${username}** • Has Upload Video From YouTube !<:sparkles_fiery:446628397855145986>\n\n👍 **LIKE**  •  🔗 **SHARE**  •  <:YouTube:447660670108827659> **SUBSCRIBE**\n\n**[** ${videoURL} **]**  🚀__**Go Check Now**__🚀`, {
        name: 'YouTube',
        icon: 'https://cdn.discordapp.com/attachments/423294365696524291/447621468730425354/697037-youtube-256.png'
     
    })
}

     if(command === "topinvites" || command === "invites") {
    let invites = await message.guild.fetchInvites().catch(error => { // This will store all of the invites into the variable
        return message.channel.send('Sorry, I don\'t have the proper permissions to view invites!');
    }) // This will store all of the invites into the variable
    invites = invites.array();
    arraySort(invites, 'uses', { reverse: true }); // Be sure to enable 'reverse'
    let possibleInvites = [['User', 'Invite']]; // Each array object is a rown in the array, we can start up by setting the header as 'User' & 'Uses'
    invites.forEach(function(invite) {
        possibleInvites.push([invite.inviter.username, invite.uses]); // This will then push 2 items into another row
    })
    const embed = new Discord.RichEmbed()
        .setColor(0xCB5A5E)
        .addField('Leaderboard', `\`\`\`${table.table(possibleInvites)}\`\`\``);
    send(message.channel, embed, {
        name: 'Server Invites',
        color: '3447003',
        icon: 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/trophy-128.png'
    })
    
}  
  
  if(command === "discordpartner" || command === "discordpartners") {
  if(!message.member.hasPermission("MANAGE_MESSAGE")) return message.channel.send(`${message.author.username} You Don\'t Have **Manage Message** To Use This Commands !`);
  message.delete();
    if(args[0] == "help"){
  const help = new Discord.RichEmbed()
  .setDescription(`**${botconfig.prefix}discordpartner** **owneruser  •  servername  •  3 category •  description  •  invitelinks**`)
  .addField(`Examples`, `${botconfig.prefix}discordpartner MIRAI MIRAI-SERVER ANIME GAMING COMMUNITY NODESCRIPTION https://discord.gg/ZWWD7zT`)
  .setFooter('no work on [SPAEC] •  MIRAI SERVE = MIRAI-SERVER')
  .setColor('RANDOM')
    send(message.channel, help, {
        name: 'Discord Partners Help :',
        icon: 'https://cdn.discordapp.com/attachments/446630932145766401/447297316228038666/financiacionobras.png'
    })
    return;
  }
  let owneruser = args[0]; 
  let servername = args[1];
  let category = args[2];
  let category2 = args[3];
  let category3 = args[4];
  let description = args[5];
  let links = args[6];
  message.channel.send(`<:botton:445430903687217164>**OWNER NAME • ${owneruser}<:botton:445430903687217164>**\n\n<:sparkles_fiery:446628397855145986>**SERVE NAME • ${servername}**<:sparkles_fiery:446628397855145986>\n\n__**• Category**__\n\n${category} • ${category2} • ${category3}\n\n__**Server Description**__\n\n${description}\n\n__**• InviteLInk**__\n\n${links}\n\n**• Submit to advertise discord server** • **https://goo.gl/forms/oAP5JsgYmjGuu70X2**`);
}

  if(command === "leave" || command === "leaveserver") {
   message.delete(9000)
    if (!['356510829920780289',].includes(message.author.id)) return message.reply(`**You cant do that, only the bot developer can! || do ${botconfig.prefix}dev** `).then(msg => msg.delete(9000));
    message.channel.send('**Leaveing Server !**')
    message.guild.leave();
  };

  if(command === "autousername" || command === "autouser") {
    if(!args[0]) return message.reply("Please input some text !");
    let members = [];
    let indexes = [];
    message.guild.members.forEach(function(member) {
        members.push(member.user.username);
        indexes.push(member.id);
    })
    let match = sm.findBestMatch(args.join(' '), members);
    let username = match.bestMatch.target;
    let member = message.guild.members.get(indexes[members.indexOf(username)]);
    
    const memberE = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(`**${member.user.tag}**`);

    message.channel.send(memberE);
    
}

  if(command === "userinfo") {
	let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
        user = message.author;
    }
    const member = message.guild.member(user);
    const embed = new Discord.RichEmbed()
		.setColor('RANDOM')
		.setThumbnail(user.avatarURL)
		.setTitle(`${user.username}#${user.discriminator}`)
		.addField("ID:", `${user.id}`, true)
		.addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
		.addField("Bot:", `${user.bot}`, true)
		.addField("Status:", `${user.presence.status}`, true)
		.addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
		.addField("Roles:", member.roles.map(roles => `${roles.name}`).join('.  '), true)
		.addField("Created At:", `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
		.addField("Joined Server:", `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
		.setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`)
     message.channel.send({embed});
   }

   if(command === "status" ) {
   message.delete();
    if(!message.member.roles.some(r=>["STATUS", "status"].includes(r.name)) )
      return message.reply("You Need Invite 10 People To Get `STATUS` Roles To Use This Commands ! \n\nGo To #bot-command and do `--ranks` to view more role rewards !").then(msg => msg.delete(12000));
    if(!args[0]) {
       const statushelp = new Discord.RichEmbed()
       .setTitle(`Facebook Status xD : **${botconfig.prefix}status <STATUS>**`)
        return message.channel.send(statushelp).then(msg => msg.delete(8000));
    }
    let status = args.join(" ");
    message.delete();
    let announceEmbed = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .setFooter(`${message.author.username} Status :`, message.author.avatarURL)
    .setTimestamp()
    .setTitle(status)

    let statuss = message.guild.channels.find(`name`, "status-channel");
    if(!statuss) return message.channel.send("Please Use This Commands To #status-channel !");

    let m = await statuss.send(announceEmbed);
    await m.react(`👍`);
    await m.react(`❤`);
    await m.react(`😂`);
    await m.react(`😮`);
    await m.react(`😢`);
    await m.react(`😡`);

}

   if(command === "tq") {
    snekfetch.get(api).then(r => {
        let embed = new Discord.RichEmbed()
        .setTitle('Trump quotes generator')
        .setDescription(r.body.message)
        .setColor('RANDOM')
        message.channel.send(embed)
    })
}

  if(command === "guilds" || command === "guildlist") {
message.delete()
if (!['356510829920780289',].includes(message.author.id)) return message.reply(`**You cant do that, only the bot developer can! || do ${botconfig.prefix}dev**`).then(msg => msg.delete(9000));
	let user = message.mentions.users.first() || message.author;
	let servers = client.guilds.filter(g => g.members.has(user.id));
	var message2 = "```";
	for (var i = 0; i < servers.map(g => g.name).length; i++) {
		var temp = (i === 0 ? `On Guild List ${user.tag}\n` : "") + (i + 1) + ". " + servers.map(g => g.name)[i] + "\n";
		if ((message2 + temp).length <= 2000 - 3) {
			message2 += temp;
		} else {
			message2 += "```";
			message.channel.send(message2);
			message2 = "```";
		}
	}
	message2 += "```";
	message.channel.send(message2);
  }

   if(command === "random") {
    const embed = new Discord.RichEmbed()
        .setColor(0xffffff)
    if (!args[0] || args[0].toLowerCase() === 'list') {
        let resp = Object.keys(Object.getPrototypeOf(random))
        resp.shift();
        embed.setDescription(resp.join(', '))
             .setTitle(`${botconfig.prefix}random List `);
        return message.channel.send(embed)      
    }
    let item = args[0];
    args.shift();
    let options = parseArgs(args);
    delete options['_'];
    let response;
    try {
        response = random[item.toLowerCase()](options);
    } catch (e) {
        response = `Sorry, I can't return a random ${item}`;
    }
    if (typeof response === 'object') { // Parse Objects
        response = JSON.stringify(response, null, 4);
        embed.setDescription(`\`\`\`js\n${response}\`\`\``)
    } else { // Run if NOT an object
        embed.setFooter(response);   
    }
    message.channel.send(embed);
    
}

    if(command === "say") {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have permssion MANAGE_MESSAGE to use this !").then(msg => msg.delete(6000));
       message.channel.send(args.join(" "));
       message.delete();
    }   

   if(command == "dpto") {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have permssion **MANAGE_MESSAGE** to use this !");
    if(args[0] == "help"){
    message.reply("```Create #annoucements first and do k!chatembed on the channel you want message sand to #discord-partner```");
    return;
  }
    let chatchannel = message.guild.channels.find(`name`, "discord-partner");
    if(!chatchannel) return message.channel.send("you need create channel #discord-partner to chat !");
    message.delete().catch(O_o=>{});
    chatchannel.send(args.join(" "));

   }

   if(command == "annto") {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have permssion MANAGE_MESSAGE to use this !");
    if(args[0] == "help"){
    message.reply("```Create #annoucements first and do k!chatembed on the channel you want message sand to #announcements```");
    return;
  }
    let chatchannel = message.guild.channels.find(`name`, "announcements");
    if(!chatchannel) return message.channel.send("you need create channel #announcements to chat !");
    message.delete().catch(O_o=>{});
    chatchannel.send(args.join(" "));

   }

   if(command == "chatto") {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have permssion MANAGE_MESSAGE to use this !");
    if(args[0] == "help"){
    message.reply("```Create #annoucements first and do k!chatembed on the channel you want message sand to #chatto```");
    return;
  }
    let chatchannel = message.guild.channels.find(`name`, "chatto");
    if(!chatchannel) return message.channel.send("you need create channel #chatto to chat !");
    message.delete().catch(O_o=>{});
    chatchannel.send(args.join(" "));

   }

 if(command === "join") {
  return new Promise((resolve, reject) => {
const voiceChannel = message.member.voiceChannel;
if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply('I couldn\'t connect to your voice channel...');
voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
});
}

//https://hastebin.com/omiwegicuy.js

  if(command === "servconnect" || command === "serverconnect") {
  message.delete()
  const sc = new Discord.RichEmbed()
  .setAuthor(`${message.guild.name} Connect :`)
  .addField("FaceBook Group :", "[CLICK HERE](https://m.me/join/AbbccJ_t_9tfdaxn)", true)
  .addField("Discord Group :", "[CLICK HERE](https://discord.gg/7mS9GEY)", true)
  .setThumbnail(message.author.avatarURL)

    const pollTitle = await message.channel.send(sc);
      await pollTitle.react(`444878652090613763`);
      await pollTitle.react(`444873045488697375`);
      await pollTitle.react(`444873046776348679`);
      await pollTitle.react(`444873175747133471`);
      await pollTitle.react(`444873284622745610`);
    const filter = (reaction) => reaction.emoji.name === '444878652090613763';
    const collector = pollTitle.createReactionCollector(filter, { time: 1500 });
    const filter1 = (reaction) => reaction.emoji.name === '444873045488697375';
    const collector1 = pollTitle.createReactionCollector(filter1, { time: 1500 });
    const filter3 = (reaction) => reaction.emoji.name === '444873046776348679';
    const collector3 = pollTitle.createReactionCollector(filter3, { time: 1500 });
    const filter4 = (reaction) => reaction.emoji.name === '444873175747133471';
    const collector4 = pollTitle.createReactionCollector(filter4, { time: 1500 });
    const filter5 = (reaction) => reaction.emoji.name === '444873284622745610';
    const collector5 = pollTitle.createReactionCollector(filter5, { time: 1500 });
   
}

  if (command === "ign") {
  message.delete();
    if(args[0] == "help"){
  const help = new Discord.RichEmbed()
  .setDescription(`**${botconfig.prefix}ign** [**IGN-PUBG**]  [**IGN-FORTNITE**]  [**IGN-CSGO**]  [**IGN-GTAV**]  [**IGN-DOTA2**]  [**NAME-STEAMG**]\n\nExample : ${botconfig.prefix}ign pubg fortnite csgo gtav dota2 steamacc`)
  .setColor('RANDOM')
  message.channel.send(help).then(msg => msg.delete(11000));
    return;
  }
  let pubg = args[0];
  let fortnite = args[1];
  let csgo = args[2];
  let gtav = args[3];
  let dota = args[4];
  let steam = args[5];

  const ign = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(`${message.author.tag} - IGN :`, message.author.avatarURL)
  .setThumbnail(message.author.avatarURL)
  .addField("<:pubg:445459131931820044> PUBG IGN :", pubg, true)
  .addField("<:fortnite:445468274029887488> FORTNITE IGN :", fortnite, true)
  .addField("<:csgo:445457715574079509> CS-GO IGN :", csgo, true)
  .addField("<:gtav:445457716534575115> GTA V IGN :", gtav, true)
  .addField("<:dota:445457915285864458> DOTA 2 IGN :", dota, true)
  .addField("<:steam:445457979224096779> STEAM NAME :", steam, true)
  .setFooter("- = [SPAEC] ")
  .setTimestamp()
    const pollTitle = await message.channel.send(ign);
      await pollTitle.react(`445459131931820044`);
      await pollTitle.react(`445468274029887488`);
      await pollTitle.react(`445457715574079509`);
      await pollTitle.react(`445457716534575115`);
      await pollTitle.react(`445457915285864458`);
      await pollTitle.react(`445457979224096779`);
    const filter = (reaction) => reaction.emoji.name === '445459131931820044';
    const collector = pollTitle.createReactionCollector(filter, { time: 1500 });

    const filter1 = (reaction) => reaction.emoji.name === '445468274029887488';
    const collector1 = pollTitle.createReactionCollector(filter1, { time: 1500 });

    const filter2 = (reaction) => reaction.emoji.name === '445457715574079509';
    const collector2 = pollTitle.createReactionCollector(filter2, { time: 1500 });

    const filter3 = (reaction) => reaction.emoji.name === '445457716534575115';
    const collector3 = pollTitle.createReactionCollector(filter3, { time: 1500 });

    const filter4 = (reaction) => reaction.emoji.name === '445457915285864458';
    const collector4 = pollTitle.createReactionCollector(filter4, { time: 1500 });

    const filter5 = (reaction) => reaction.emoji.name === '445457979224096779';
    const collector5 = pollTitle.createReactionCollector(filter5, { time: 1500 });
   
}

  if(command === "lewd") {
    let {body} = await superagent
    .get(`https://nekos.life/api/lewd/neko`);
    if (!message.channel.nsfw) return message.reply("You can use this command only on nsfw channels!");
  
    let hentaiEmbed = new Discord.RichEmbed()
    .setColor("#f4cccc")
    .setTitle("Why does someone put a command like this?")
    .setImage(body.neko)
    .setFooter("Bot Version: 0.0.2");

    message.channel.send(hentaiEmbed);

}
 
  if(command === "get") {
  let [title, contents] = args.join(" ").split("|");
  if(!contents) {
    [title, contents] = ["Achievement Get :", title];
  }
  let rnd = Math.floor((Math.random() * 39) + 1);
  if(args.join(" ").toLowerCase().includes("burn")) rnd = 38;
  if(args.join(" ").toLowerCase().includes("cookie")) rnd = 21;
  if(args.join(" ").toLowerCase().includes("cake")) rnd = 10;

  if(title.length > 22 || contents.length > 22) return message.edit("Max Length: 22 Characters. Soz.").then(message.delete.bind(message), 2000);
  const url = `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`;
  snekfetch.get(url)
   .then(r=>message.channel.send("", {files:[{attachment: r.body}]}));
  message.delete(5000);
  message.react("445426199892590602");

}
      if(command === "ping") {
      const newemb = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle(`<:pepe:444483883480907776> Pong | ${Date.now() - message.createdTimestamp} ms`)
      message.channel.send({embed: newemb})
  }
  
    if(command === "setwatching") {
     if (message.author.id !== ('356510829920780289')) return message.channel.send("**You Can\'t Change Watching BOT | TaMoToJiáµ›áµ‰Ê³á¶¦á¶ á¶¦áµ‰áµˆ#5881**");
     const status = args.join(' ');
     if (status.length === 0) {
       const embed = new Discord.RichEmbed()
         .setColor('RANDOM')
         .setDescription(`${botconfig.prefix}setwatching [status]!`);
       message.channel.send({ embed });
       message.delete(500)
  }
  
    else if (status.length !== 0) {
    client.user.setActivity(`${status}`, {  type: "WATCHING"});
    const embed = new Discord.RichEmbed()
      .setColor("#7289DA")
      .setDescription(`${message.author.tag} You Sucessfully Changed Watching » **${status}** !`);
    message.channel.send({ embed });
    message.delete(5000);
  }};
    
    if(command === "clear") {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have permssion MANAGE_MESSAGE to use this !");
        if(!args[0]) return message.channel.send(`${botconfig.prefix}clear [limit to clear]`);
        message.channel.bulkDelete(args[0]).then(() => {
       message.channel.send(`message has been clear **${args[0]}** .`).then(msg => msg.delete(2000));
    });
}
    
    if (command === "serverinfo") {
      let online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
      let day = message.guild.createdAt.getDate()
      let month = 1 + message.guild.createdAt.getMonth()
      let year = message.guild.createdAt.getFullYear()
       let sicon = message.guild.iconURL;
       let serverembed = new Discord.RichEmbed()
       .setAuthor(message.guild.name, sicon)
       .setFooter(`Server Created : Day:${day} • Month:${month} • Year:${year}`)
       .setColor('RANDOM')
       .setThumbnail(sicon)
       .addField("ServerName", message.guild.name, true)
       .addField("OWNER", message.guild.owner.user.tag, true)
       .addField("Region", message.guild.region, true)
       .addField("Channels", message.guild.channels.size, true)
       .addField("MEMBER", message.guild.memberCount, true)
       .addField("Humans", message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size, true)
       .addField("BOT", message.guild.members.filter(m => m.user.bot).size, true)
       .addField("Online", online.size, true)
       .setImage("https://cdn.discordapp.com/attachments/443665749656207360/445222446719827968/ServerInfo_-_Mirai.png")
       .addField("Created At", message.member.joinedAt, true)

       message.channel.send(serverembed);
    
    }

   
   if(command === "help") {
    const serverEmbed = new Discord.RichEmbed()
    .setAuthor(`${botconfig.prefix}commands`, message.author.avatarURL)
    .setColor('RANDOM')
    .addField("Developer", "`guild` `leaveserver`")
    .addField("Mods", "`clear` `say` `chatto` `annto` `dpto` `discordpartners` `create voicechannel` `create textchannel`")
    .addField("Info", "`serverinfo` `serverrule` `servconnect` `userinfo` `topinvites` `developer`")
    .addField("General", "`ping` `avatar` `emojilist` `get` `random` `status`  `autousername`  `jumboemoji`  `needhelp`")
    .addField("Fun", "`Coming Soon`")
    .setFooter(`Requested by : ${message.author.tag}`);

    return message.channel.send(serverEmbed).then(msg => msg.delete(12000));
}

if(command === "dev" || command === "developer") {
  const dev = new Discord.RichEmbed()
  .setColor('RANDOM')
  .addField(`• Developer`, "TaMoToJiᵛᵉʳᶦᶠᶦᵉᵈ林坓龙#5881")
  .addField(`Facebook`, "[CLICK HERE TO VIEW](https://www.facebook.com/tamotoji168)")
  .addField('DiscordServer', `${message.author.username} [CLICK HERE TO JOIN SERVER](https://discord.gg/ZWWD7zT)`)
 // .setImage("https://cdn.discordapp.com/attachments/446881833213231105/447046532814995456/TAMOTOJI-PROFILE.jpg")
  message.channel.send(dev);
}

if(command === "serverrule") {
    const serverrule = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setImage('https://cdn.discordapp.com/attachments/443665749656207360/445215855534407690/ServerRules-Mirai.png')
    .setDescription("**ServerRule :**\n\n1. No Bullying\n2. No Spamming\n3. No Aggressive Fighting\n4. No Threats\n5. No Racist or Offensive or Degrading Content\n6. No Begging or Repeated Asking\n7. Any Sort of Abuse is Not Allowed\n8. Use Appropriate Channels\n9. No Punishment Evading\n10. No Links That Are Evasive\n11. Staff Decisions Are Final\n\nMore Check #server-rule")   
    const pollTitle = await message.channel.send(serverrule);
      await pollTitle.react(`444878652090613763`);
      await pollTitle.react(`444873045488697375`);
      await pollTitle.react(`444873046776348679`);
      await pollTitle.react(`444873175747133471`);
      await pollTitle.react(`444873284622745610`);
    const filter = (reaction) => reaction.emoji.name === '444878652090613763';
    const collector = pollTitle.createReactionCollector(filter, { time: 1500 });
    const filter1 = (reaction) => reaction.emoji.name === '444873045488697375';
    const collector1 = pollTitle.createReactionCollector(filter1, { time: 1500 });
    const filter3 = (reaction) => reaction.emoji.name === '444873046776348679';
    const collector3 = pollTitle.createReactionCollector(filter3, { time: 1500 });
    const filter4 = (reaction) => reaction.emoji.name === '444873175747133471';
    const collector4 = pollTitle.createReactionCollector(filter4, { time: 1500 });
    const filter5 = (reaction) => reaction.emoji.name === '444873284622745610';
    const collector5 = pollTitle.createReactionCollector(filter5, { time: 1500 });
    message.delete(800);
};

  if(command === "avatar") {
    let msg = await message.channel.send("Waitng avatar...");
    let mentionedUser = message.mentions.users.first() || message.author;

    let avatarEmbed = new Discord.RichEmbed()
    .setImage(mentionedUser.displayAvatarURL)
    .setColor(`RANDOM`)
    .setTitle(`Avatar`)
    .setDescription("[Avatar Link]("+mentionedUser.displayAvatarURL+")")
    .setFooter(`Requested by ${message.author.tag}`);
    message.channel.send(avatarEmbed)
    msg.delete();
}

   if(command === "emojilist") {
        const List = message.guild.emojis.map(e => e.toString()).join(" ");
        let sicon = message.guild.iconURL;
        const EmojiList = new Discord.RichEmbed() 
            .setTitle('➠ Server Emoji\'s List') 
            .setColor('RANDOM')
            .setAuthor(message.guild.name, sicon)
            .setDescription(List) 
            .setTimestamp() 
            .setFooter(message.guild.name) 
        message.channel.send(EmojiList); 
        message.react("📥");
  }


  //     talkedRecently.add(message.author.id);
   //     setTimeout(() => {
   //       // Removes the user from the set after a minute
   //       talkedRecently.delete(message.author.id);
   //     }, 80000);
  //  }

  });
  
  client.login(process.env.BOT_TOKEN);
