const DB = require("better-sqlite3");
const settings = new DB("database/settings.db");

module.exports = async (client) => {
	settings.prepare("CREATE TABLE IF NOT EXISTS settings (guildid TEXT, prefix TEXT DEFAULT '?')").run();
	console.log(`
		Bot is ready!

	# Bot: ${client.user.tag}
	# ID: ${client.user.id}
	# Guilds: ${client.guilds.cache.size}
	# Users: ${client.users.cache.size}`);
	
		client.user.setPresence({
			status: "idle",
			activity: {
				name: "Mention to help you!",
				type: "PLAYING" 
			} 
		});
}