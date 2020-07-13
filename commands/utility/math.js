const Discord = require("discord.js");
const math = require("math-expression-evaluator");

module.exports = {
  name: "math",
  description: "Command for arithmetic operations",
  aliases: [],
  category: "utility",
  args: true,
  usage: "<operation>",
  run: async (client, message, args) => {
    try {
      let operation = args.join(" ")
      let result = math.eval(operation);
      const embed = new Discord.MessageEmbed()
        .setColor("#f4f4f4")
        .addField("Output 📤", `\`\`\`xl\n${operation} = ${result}\n\`\`\``);
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 10000 });
      message.delete().catch(console.error);
    } catch (err) {
      const embed = new Discord.MessageEmbed()
        .setColor("#f4f4f4")
        .addField("Output 📤", `\`\`\`diff\n- Invalid entry\n\`\`\``);
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 20000 });
      message.delete().catch(console.error);
    }
  }
};