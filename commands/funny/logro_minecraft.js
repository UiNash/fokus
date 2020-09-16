const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");
const minecraft = require("../../supplies/achievements.json");

module.exports = {
	name: "logro",
	description: "Enviar imagen en forma de logro de minecraft",
	aliases: [],
  category: "funny",
  args: true,
  usage: "<mensaje> (min 2 caracteres & max 24)",
	run: async (client, message, args) => {
    try {
      if (args.join(" ").length > 23) {
        const embed = new MessageEmbed()
          .setColor(client.color)
          .setDescription("> El número máximo de caracteres permitido es 24 (api limitation)")
          .setTimestamp()
          .setFooter(client.version, client.user.displayAvatarURL());
        let msg = await message.channel.send(embed);
        await msg.delete({ timeout: 10000 });
        message.delete().catch(console.error);
      } else if (args.join(" ").length < 2) {
       const embed = new MessageEmbed()
          .setColor(client.color)
          .setDescription("> El número mínimo de caracteres permitido es 2")
          .setTimestamp()
          .setFooter(client.version, client.user.displayAvatarURL());
        let msg = await message.channel.send(embed);
        await msg.delete({ timeout: 10000 });
        message.delete().catch(console.error);
      } else {
        const { body } = await superagent.get(minecraft[Math.floor(Math.random() * minecraft.length)]).query({ h: "¡Logro conseguido!", t: args.join(" ") });
        await message.channel.send({ files: [{ attachment: body, name: "achievement.jpg" }] });
        message.delete().catch(console.error);
      }
    } catch (err) {
      console.error(err);
    }
	}
};