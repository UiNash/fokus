const { execSync } = require("child_process");

module.exports = {
	name: "exec",
  description: "",
  aliases: [],
  category: "development",
  args: true,
  usage: "<command-line>",
	run: async (client, message, args) => {
		try {
			let process = execSync(args.join(" "));
			message.channel.send(process, { code: "sh" })
        .catch((err) => {
        if (err.code === 50006) {
          message.channel.send("a")
        }
      });
		} catch (err) {
			message.channel.send(err, { code: "sh" });
		}
	}
};