const Discord = require("discord.js");
const DB = require("better-sqlite3");
const settings = new DB("database/settings.db");
const util = require("util");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "eval",
  description: "",
  aliases: ["e"],
  category: "development",
  args: true,
  usage: "<javascript-code>",
  run: async (client, message, args) => {
    try {
      let code = await eval(args.join(" "));
      if (typeof code != "string") code = util.inspect(code, { depth: 0 });
      message.channel.send(code, { code: "js" });
    } catch (err) {
      message.channel.send(err, { code: "js" });
    }
  }
};