module.exports = {
	name: "ping",
	description: "The average ping of client API",
	aliases: [],
  category: "information",
  args: false,
  usage: "",
	run: async (client, message, args) => {
		let msg = await message.channel.send(`🏓 Pong! ${client.ws.ping} ms`);
		await msg.delete({ timeout: 10000 });
		message.delete().catch(console.error);
	}
};