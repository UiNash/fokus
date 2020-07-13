const superagent = require("superagent");
const Discord = require("discord.js");

module.exports = {
	name: "supreme",
	description: "Send image in the form of the Supreme logo",
	aliases: [],
  category: "funny",
  args: true,
  usage: "<message> (min 2 characters & max 24)",
	run: async (client, message, args) => {
    if (args.join(" ").length < 2) {
      const embed = new Discord.MessageEmbed()
        .setColor("#f4f4f4")
        .setDescription("> The minimum number of characters allowed is 2")
        .setTimestamp()
        .setFooter(client.version, client.user.displayAvatarURL());
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 10000 });
      message.delete().catch(console.error);
    } else if (args.join(" ").length > 24) {
      const embed = new Discord.MessageEmbed()
        .setColor("#f4f4f4")
        .setDescription("> The maximum number of characters allowed is 24")
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