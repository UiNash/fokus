const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = async (client, message) => {
  if (message.author.bot || !message.guild) return;

  let prefix = "?";
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName) || client.commands.find((command) => command.aliases && command.aliases.includes(commandName));
  
  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
    let embed = new Discord.MessageEmbed()
      .setColor(client.color)
      .setTitle(`Hi ${message.author.tag}!`)
      .setDescription(`My help command is \`${prefix}help\``)
      .setTimestamp()
      .setFooter(client.version, client.user.displayAvatarURL());
    let msg = await message.channel.send(embed);
    await msg.delete({ timeout: 10000 });
    message.delete().catch(console.error);
    return;
  }

  if (!message.content.startsWith(prefix) || (message.content.length === 1 && message.content.startsWith(prefix))) return;

  try {
    const development = [];
    fs.readdirSync("./commands/development").forEach((file) => {
      development.push(`${file.substring(0, file.length - 3)}`)
    });
    if (development.includes(commandName) && message.author.id !== client.owner) return;
    
    if (command.args && !args.length) {
      let reply = `You didn't put arguments, ${message.author}!`;
      if (command.usage) {
        reply += `\nUse the command like this: \`${prefix}${commandName} ${command.usage}\``;
      }
      let msg = await message.channel.send(reply)
      await msg.delete({ timeout: 10000 });
      message.delete().catch(console.error);
      return;
    }
    command.run(client, message, args);
  } catch (err) {
    const embed = new Discord.MessageEmbed()
      .setColor(client.color)
      .setDescription(`> The command \`${prefix}${commandName}\` does not exist!`)
      .setTimestamp()
      .setFooter(client.version, client.user.displayAvatarURL());
    let msg = await message.channel.send(embed);
    await msg.delete({ timeout: 10000 });
    message.delete().catch(console.error);
    return;
  
  }
};