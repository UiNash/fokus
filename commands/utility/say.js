const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "say",
  description: "Command say(embed) to repeat a message",
  aliases: ["decir"],
  category: "utility",
  args: true,
  usage: "<message>",
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setColor("#f4f4f4")
      .setDescription(args.join(" "));
    await message.channel.send(embed);
    message.delete().catch(console.error);
  }
};