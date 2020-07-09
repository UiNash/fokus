const { MessageEmbed } = require("discord.js");
module.exports = {
	name: "help",
	description: "Help command",
	aliases: ["cmd", "cmds"],
  category: "information",
	args: false,
  usage: "[command]",
	run: async (client, message, args) => {
    let msg = await message.channel.send("Wait a moment...")
    setTimeout(() => {
      let embed = new MessageEmbed()
        .setColor(client.color)
        .setDescription("The help command is in progress...")
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
};