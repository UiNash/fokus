const { MessageEmbed } = require("discord.js");
const DB = require("better-sqlite3");
const settings = new DB("database/settings.db");

module.exports = {
  name: "help",
  description: "Comando de ayuda",
  aliases: ["cmd", "cmds", "ayuda"],
  category: "information",
  args: false,
  usage: "[comando]",
  run: async (client, message, args) => {
    let prefix = settings.prepare("SELECT prefix FROM settings WHERE guildid = ?").get(message.guild.id).prefix;
    if (args[0]) {
      let commandName = args[0];
      const command = client.commands.get(commandName) || client.commands.find(command => command.aliases && command.aliases.includes(commandName));
      if (command && command.category != "development") {
      const embed = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(`Help | ${commandName}`)
        .setDescription(`> **[Description]**
          > \`${command.description}\`
          > 
          > **[Alias]**
          > \`${command.aliases.length === 0 ? "No tiene alias" : command.aliases.join("`, `")}\`
          > 
          > **[Uso]**
          > \`${prefix}${commandName} ${command.usage}\``)
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      await message.channel.send(embed)
      } else {
        const embed = new MessageEmbed()
          .setColor(client.color)
          .setDescription(`The command \`${commandName}\` was not found`)
          .setTimestamp()
          .setFooter(client.version, client.user.displayAvatarURL());
        message.channel.send(embed)
      }
    } else {
    let msg = await message.channel.send("Espera un momento...")
    setTimeout(() => {
      let embed = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(`Help | ${client.user.username}`)
        .setDescription(`> **[Administración]**
          > \`${client.commands.filter(cmd => cmd.category === "administration").keyArray().join("`, `")}\`
          > 
          > **[Diversión]**
          > \`${client.commands.filter(cmd => cmd.category === "funny").keyArray().join("`, `")}\`
          > 
          > **[Información]**
          > \`${client.commands.filter(cmd => cmd.category === "information").keyArray().join("`, `")}\`
          > 
          > **[Moderación]**
          > \`${client.commands.filter(cmd => cmd.category === "moderation").keyArray().join("`, `")}\`
          > 
          > **[Utilidad]**
          > \`${client.commands.filter(cmd => cmd.category === "utility").keyArray().join("`, `")}\``)
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      message.author.send(embed).then(() => {
        msg.edit("Revisa tus mensajes privados");
      }).catch(() => {
        msg.edit("No es posible enviarte el mensaje...");  
      });
    }, 2000);
    await msg.delete({ timeout: 5000 });
    message.delete().catch(console.error);
    }
  }
};