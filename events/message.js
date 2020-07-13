const Discord = require("discord.js");
const fs = require("fs");
const DB = require("better-sqlite3");
const settings = new DB("database/settings.db");

module.exports = async (client, message) => {
	if (message.author.bot || !message.guild) return;

	if(!settings.prepare("SELECT * FROM settings WHERE guildid = ?").get(message.guild.id)) {
		settings.prepare("INSERT INTO settings (guildid) VALUES(?)").run(message.guild.id);
	}

	let prefix = settings.prepare("SELECT prefix FROM settings WHERE guildid = ?").get(message.guild.id).prefix;
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) || client.commands.find(command => command.aliases && command.aliases.includes(commandName));

	if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
		let embed = new Discord.MessageEmbed()
			.setColor("#f4f4f4")
			.setTitle(`Hi ${message.author.tag}!`)
			.setDescription(`My help command is \`${prefix}help\``)
			.setTimestamp()
			.setFooter(client.version, client.user.displayAvatarURL());
		let msg = await message.channel.send(embed);
		await msg.delete({ timeout: 10000 });
		message.delete().catch(console.error);
		return;
	}

	if (!message.content.startsWith(prefix)) return;

	if (!command) return;

	const development = [];
	fs.readdirSync("./commands/development").forEach(file => {
		development.push(`${file.substring(0, file.length - 3)}`);
	});
	if (development.includes(commandName) && message.author.id !== "700582841741738024") return;

	if (command.args && !args.length) {
		let reply = `You didn't put arguments, ${message.author}!`;
		if (command.usage) {
			reply += `\nUse the command like this: \`${prefix}${commandName} ${command.usage}\``;
		}
		let msg = await message.channel.send(reply);
		await msg.delete({ timeout: 10000 });
		message.delete().catch(console.error);
		return;
	}

	command.run(client, message, args);
};