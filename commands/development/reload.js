const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "reload",
  description: "",
  aliases: ["r"],
  category: "development",
  args: true,
  usage: "[event] <eventName|commandName>",
  run: async (client, message, args) => {
    if (args[0].toLowerCase() === "event" && args[1]) {
      try {
        let event = args[1];
        let content = require(`../../events/${event}.js`);
        delete require.cache[require.resolve(`../../events/${event}.js`)];
        client.removeAllListeners(event);
        client.on(event, content.bind(null, client));
        const embed = new Discord.MessageEmbed()
          .setColor("#f4f4f4")
          .setDescription(`Event \`${event}\` was reloaded!`)
          .setTimestamp()
          .setFooter(client.version, client.user.displayAvatarURL());
        let msg = await message.channel.send(embed);
        await msg.delete({ timeout: 10000 });
        message.delete().catch(console.error);
      } catch (err) {
        const embed = new Discord.MessageEmbed()
          .setColor(client.color)
          .setDescription(`There was an error while reloading the event \`${event}\``)
          .setTimestamp()
          .setFooter(client.version, client.user.displayAvatarURL());
        let msg = await message.channel.send(embed);
        await msg.delete({ timeout: 10000 });
        message.delete().catch(console.error);
      }
    } else {
      const commandName = args[0].toLowerCase()
      const commands = [];
      fs.readdirSync("./commands/").filter((subfolder) => {
        let fullPath = path.join("./commands/", subfolder);
        fs.readdirSync(fullPath).forEach((file) => {
          if (file == `${commandName}.js`) {
            commands.push(`${fullPath.replace("commands/", "../")}/${file}`);
          }
        });
      });
      try {
        delete require.cache[require.resolve(commands[0])];
        const command = require(commands[0]);
        client.commands.set(command.name, command);
        const embed = new Discord.MessageEmbed()
          .setColor("#f4f4f4")
          .setDescription(`Command \`${commandName}\` was reloaded!`)
          .setTimestamp()
          .setFooter(client.version, client.user.displayAvatarURL());
        let msg = await message.channel.send(embed);
        await msg.delete({ timeout: 10000 });
        message.delete().catch(console.error);
      } catch (err) {
        const embed = new Discord.MessageEmbed()
          .setColor(client.color)
          .setDescription(`There was an error while reloading the command \`${commandName}\``)
          .setTimestamp()
          .setFooter(client.version, client.user.displayAvatarURL());
        let msg = await message.channel.send(embed);
        await msg.delete({ timeout: 10000 });
        message.delete().catch(console.error);
      }
    }
  }
};