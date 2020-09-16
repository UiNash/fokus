const Discord = require("discord.js");
const math = require("math-expression-evaluator");

module.exports = {
  name: "math",
  description: "Comando para operaciones aritméticas",
  aliases: [],
  category: "utility",
  args: true,
  usage: "<operación>",
  run: async (client, message, args) => {
    try {
      let operation = args.join(" ")
      let result = math.eval(operation);
      const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .addField("Salida 📤", `\`\`\`xl\n${operation} = ${result}\n\`\`\``);
      let msg = await message.channel.send(embed);
      await msg.delete({ timeout: 10000 });
      message.delete().catch(console.error);
    } catch (err) {
      const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .addField("Salida 📤", "```diff\n- Error\n```");
      let msg = await message.channel.send(embed);
      message.delete().catch(console.error);
    }
  }
};