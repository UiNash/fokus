const { MessageEmbed } = require("discord.js");
const DB = require("better-sqlite3");
const settings = new DB("database/settings.db");

module.exports = {
  name: "help",
  description: "Help command",
  aliases: ["cmd", "cmds"],
  category: "information",
  args: false,
  usage: "[commandName]",
  run: async (client, message, args) => {
    let prefix = settings.prepare("SELECT prefix FROM settings WHERE guildid = ?").get(message.guild.id).prefix;
    if (args[0]) {
      let commandName = args[0];
      const command = client.commands.get(commandName) || client.commands.find(command => command.aliases && command.aliases.includes(commandName));
      if (command && command.category != "development") {
      const embed = new MessageEmbed()
        .setColor("#f4f4f4")
        .setAuthor(`Help | ${commandName}`)
        .setDescription(`> **[Description]**
          > \`${command.description}\`
          > 
          > **[Aliases]**
          > \`${command.aliases.length === 0 ? "Has no aliases" : command.aliases.join("`, `")}\`
          > 
          > **[Usage]**
          > \`${prefix}${commandName} ${command.usage}\``)
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      await message.channel.send(embed)
      } else {
        const embed = new MessageEmbed()
          .setColor("#f4f4f4")
          .setDescription(`The command \`${commandName}\` was not found`)
          .setTimestamp()
          .setFooter(client.version, client.user.displayAvatarURL());
        message.channel.send(embed)
      }
    } else {
    let msg = await message.channel.send("Wait a moment...")
    setTimeout(() => {
      let embed = new MessageEmbed()
        .setColor("#f4f4f4")
        .setAuthor(`Help | ${client.user.username}`)
        .setDescription(`> **[Administration]**
          > \`${client.commands.filter(cmd => cmd.category === "administration").keyArray().join("`, `")}\`
          > 
          > **[Funny]**
          > \`${client.commands.filter(cmd => cmd.category === "funny").keyArray().join("`, `")}\`
          > 
          > **[Information]**
          > \`${client.commands.filter(cmd => cmd.category === "information").keyArray().join("`, `")}\`
          > 
          > **[Moderation]**
          > \`${client.commands.filter(cmd => cmd.category === "moderation").keyArray().join("`, `")}\`
          > 
          > **[Utility]**
          > \`${client.commands.filter(cmd => cmd.category === "utility").keyArray().join("`, `")}\``)
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      message.author.send(embed).then(() => {
        msg.edit("Check your private messages");
      }).catch(() => {
        msg.edit("It is not possible to send you the message...");  
      });
    }, 2000);
    await msg.delete({ timeout: 5000 });
    message.delete().catch(console.error);
    }
  }
};