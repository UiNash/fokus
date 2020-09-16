const Discord = require("discord.js");

module.exports = {
	name: "ban",
	description: "Banea a un miembro que rompa las reglas",
	aliases: [],
  category: "moderation",
  args: true,
  usage: "<@miembro|id> [razón]",
	run: async (client, message, args) => {
		let member = message.guild.members.cache.get(args[0].replace(/[<@!>]/g, ""));
    let reason = (args.slice(1).join(" ") || "Razón no especificada");
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
      const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTitle(message.author.tag)
        .setDescription("> Necesito permisos para banear")
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 10000 });
    } else if (!message.member.hasPermission("BAN_MEMBERS")) {
      const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTitle(message.author.tag)
        .setDescription("> Necesitas permisos para banear")
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 10000 });
    } else if (!member) {
      const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTitle(message.author.tag)
        .setDescription("> Necesitas poner un usuario válido")
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      msg.delete({ timeout: 10000 });
    } else if (!member.bannable) {
      const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTitle(message.author.tag)
        .setDescription("> No puedo banear a este miembro")
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      msg.delete({ timeout: 10000 });
    } else if (member.roles.highest.comparePositionTo(message.member.roles.highest) > 0) {
      const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTitle(message.author.tag)
        .setDescription("> No puedes banear a este miembro")
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      msg.delete({ timeout: 10000 });
    } else {
      const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTitle(member.user.tag)
        .setDescription(`> Te han baneado ${message.guild.name}!`)
        .addField("> Autor", `${message.author.tag} (${message.author.id})`)
        .addField("> Razón", reason)
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      await member.send(embed);
      member.ban({ reason: `${reason}, by ${message.author.tag} (${message.author.id})` }).then(async () => {
        const embed = new Discord.MessageEmbed()
          .setColor(client.color)
          .setTitle(message.author.tag)
          .setDescription(`> ${member.user.tag} ha sido baneado en el gremio`)
          .setTimestamp()
          .setFooter(client.version, client.user.displayAvatarURL());
        let msg = await message.channel.send(embed)
        msg.delete({ timeout: 10000 })
      }).catch(console.error)
    }
    message.delete().catch(console.error);
	}
};