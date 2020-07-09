const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const path = require("path");

client.color = "#f4f4f4";
client.commands = new Discord.Collection();
client.db = require("mongoose");
client.owner = "700582841741738024";
client.version = "version 1.1.2";

const commands = [];

fs.readdirSync("./commands/").forEach((subfolder) => {
  let fullPath = path.join("./commands", subfolder);
  fs.readdirSync(fullPath).forEach((file) => {
    commands.push(`./${fullPath}/${file}`);
  });
});

commands.map((file) => {
  const command = require(file);
  client.commands.set(command.name, command);
})

fs.readdirSync("./events/").forEach((file) => {
    let event = file.substring(0, file.length - 3),
      content = require(`./events/${file}`);
    client.on(event, content.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
})

client.login();