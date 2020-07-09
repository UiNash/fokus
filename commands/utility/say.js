const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "say",
  description: "Command to say to repeat a message",
  aliases: ["decir"],
  category: "utility",
  args: true,
  usage: "[embed] <message>",
  run: async (client, message, args) => {
    if (args[0].toLowerCase() === "embed" && args[1]) {
      const embed = new MessageEmbed()
        .setColor(client.color)
        .setDescription(args.slice(1).join(" "));
      message.channel.send(embed);
    } else {
      message.channel.send(args.join(" "));
    }
    message.delete().catch(console.error);
  }
};