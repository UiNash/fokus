const Discord = require("discord.js");

module.exports = {
	name: "kick",
	description: "Kick a member who breaks the rules",
	aliases: [],
  category: "moderation",
  args: true,
  usage: "<@member|id> [reason]",
	run: async (client, message, args) => {
		let member = message.guild.members.cache.get(args[0].replace(/[<>@!]/g, ""));
    let reason = (args.slice(1).join(" ") || "Reason not specified");
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
      const embed = new Discord.MessageEmbed()
        .setColor("#f4f4f4")
        .setTitle(message.author.tag)
        .setDescription("> I need permissions to kick")
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 10000 });
    } else if (!message.member.hasPermission("KICK_MEMBERS")) {
      const embed = new Discord.MessageEmbed()
        .setColor("#f4f4f4")
        .setTitle(message.author.tag)
        .setDescription("> You need permissions to kick")
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 10000 });
    } else if (!member) {
      const embed = new Discord.MessageEmbed()
        .setColor("#f4f4f4")
        .setTitle(message.author.tag)
        .setDescription("> You need put a valid user")
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      msg.delete({ timeout: 10000 });
    } else if (!member.bannable) {
      const embed = new Discord.MessageEmbed()
        .setColor("#f4f4f4")
        .setTitle(message.author.tag)
        .setDescription("> I can't kick this member")
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      msg.delete({ timeout: 10000 });
    } else if (member.roles.highest.comparePositionTo(message.member.roles.highest) > 0) {
      const embed = new Discord.MessageEmbed()
        .setColor("#f4f4f4")
        .setTitle(message.author.tag)
        .setDescription("> You don't kick this member")
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      msg.delete({ timeout: 10000 });
    } else {
      const embed = new Discord.MessageEmbed()
        .setColor("#f4f4f4")
        .setTitle(member.user.tag)
        .setDescription(`> You have been kicked from ${message.guild.name}!`)
        .addField("> Author", `${message.author.tag} (${message.author.id})`)
        .addField("> Reason", reason)
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      await member.send(embed);
      member.kick(`${reason}, by ${message.author.tag} (${message.author.id})`).then(async () => {
        const embed = new Discord.MessageEmbed()
          .setColor("#f4f4f4")
          .setTitle(message.author.tag)
          .setDescription(`> ${member.user.tag} has been kicked from the guild`)
          .setTimestamp()
          .setFooter(client.version, client.user.displayAvatarURL());
        let msg = await message.channel.send(embed)
        msg.delete({ timeout: 10000 })
      }).catch(console.error)
    }
    message.delete().catch(console.error);
	}
};