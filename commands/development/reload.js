const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "reload",
  description: "",
  aliases: ["r"],
  category: "development",
  args: false,
  usage: "",
  run: async (client, message, args) => {
    if (!args.length) {
      const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription("> Do you want to restart the client session? **[yes/no]**")
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      await message.delete().catch(console.error);
      await message.channel
        .awaitMessages(m => m.author.id === message.author.id, { max: 1 })
        .then(async (collected) => {
          if (collected.first().content.toLowerCase() === "yes") {
            await msg.delete();
            await collected.first().delete().catch(console.error);
            client.destroy();
            process.exit();
          } else {
            await msg.delete();
            collected.first().delete().catch(console.error);
          }
        });
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
          .setColor(client.color)
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