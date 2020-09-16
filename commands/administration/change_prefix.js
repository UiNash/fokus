const { MessageEmbed } = require("discord.js");
const DB = require("better-sqlite3");
const settings = new DB("database/settings.db");

module.exports = {
  name: "setprefix",
  description: "Establecer el prefix del bot en el servidor",
  aliases: [],
  category: "administration",
  args: true,
  usage: "<prefix> (max 3 characters)",
  run: async (client, message, args) => {
    let file = settings.prepare("SELECT * FROM settings WHERE guildid = ?").get(message.guild.id);
    if (args[1]) {
      const embed = new MessageEmbed()
        .setColor(client.color)
        .setDescription("> El prefix no puede contener espacios")
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 10000 });
      message.delete().catch(console.error);
    } else if (message.mentions.users.first() || message.mentions.channels.first() || message.mentions.roles.first()) {
      const embed = new MessageEmbed()
        .setColor(client.color)
        .setDescription("> El prefix no puede ser una mención")
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 10000 });
      message.delete().catch(console.error);
    } else if (args[0].length > 3) {
      const embed = new MessageEmbed()
        .setColor(client.color)
        .setDescription("> El prefix no puede contener más de 3 caracteres")
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 10000 });
      message.delete().catch(console.error);
    } else if (file.prefix === args[0]) {
      const embed = new MessageEmbed()
        .setColor(client.color)
        .setDescription("> El prefix no puede ser el mismo que el actual")
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 10000 });
      message.delete().catch(console.error);
    } else {
      settings.prepare("UPDATE settings SET prefix = ? WHERE guildid = ?").run(args[0], message.guild.id);
      const embed = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`> El prefix ha sido reemplazado por \`${args[0]}\``)
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 20000 });
      message.delete().catch(console.error);
    }
  }
};