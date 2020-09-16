const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "say",
  description: "Comando say(embed) para repetir un mensaje",
  aliases: ["decir"],
  category: "utility",
  args: true,
  usage: "<contenido>",
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setColor(client.color)
      .setDescription(args.join(" "));
    await message.channel.send(embed);
    message.delete().catch(console.error);
  }
};