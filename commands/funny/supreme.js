const superagent = require("superagent");
const Discord = require("discord.js");

module.exports = {
	name: "supreme",
	description: "Enviar imagen en forma de logo Supreme",
	aliases: [],
  category: "funny",
  args: true,
  usage: "<mensaje> (min 2 caracteres & max 24)",
	run: async (client, message, args) => {
    if (args.join(" ").length < 2) {
      const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription("> El número mínimo de caracteres permitido es 2")
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 10000 });
      message.delete().catch(console.error);
    } else if (args.join(" ").length > 24) {
      const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription("> El número máximo de caracteres permitido es 24 (api limitation)")
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 10000 });
      message.delete().catch(console.error);
    } else {
		  const { body } = await superagent.get(`https://api.alexflipnote.dev/supreme?text=${args.join(" ")}`);
      let supreme = new Discord.MessageAttachment(body, "supreme.jpg");
      let msg = await message.channel.send(supreme);
      await message.delete().catch(console.error);
    }
	}
};