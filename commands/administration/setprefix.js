const { MessageEmbed } = require("discord.js");
const DB = require("better-sqlite3");
const settings = new DB("database/settings.db");

module.exports = {
  name: "setprefix",
  description: "Set the bot prefix on this server",
  aliases: [],
  category: "administration",
  args: true,
  usage: "<prefix> (max 3 characters)",
  run: async (client, message, args) => {
    let file = settings.prepare("SELECT * FROM settings WHERE guildid = ?").get(message.guild.id);
    if (args[1]) {
      const embed = new MessageEmbed()
        .setColor("#f4f4f4")
        .setDescription("The prefix cannot contain spaces")
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 10000 });
      message.delete().catch(console.error);
    } else if (message.mentions.users.first() || message.mentions.channels.first() || message.mentions.roles.first()) {
      const embed = new MessageEmbed()
        .setColor("#f4f4f4")
        .setDescription("The prefix cannot be a mention")
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 10000 });
      message.delete().catch(console.error);
    } else if (args[0].length > 3) {
      const embed = new MessageEmbed()
        .setColor("#f4f4f4")
        .setDescription("The prefix cannot contain more than 3 characters")
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 10000 });
      message.delete().catch(console.error);
    } else if (file.prefix === args[0]) {
      const embed = new MessageEmbed()
        .setColor("#f4f4f4")
        .setDescription("The prefix cannot be the same as the current one")
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 10000 });
      message.delete().catch(console.error);
    } else {
      settings.prepare("UPDATE settings SET prefix = ? WHERE guildid = ?").run(args[0], message.guild.id);
      const embed = new MessageEmbed()
        .setColor("#f4f4f4")
        .setDescription(`The prefix has been replaced by \`${args[0]}\``)
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 20000 });
      message.delete().catch(console.error);
    }
  }
};