const Discord = require("discord.js");

module.exports = {
  name: "about",
  description: "Estadísticas e información del bot",
  aliases: [],
  category: "information",
  args: false,
  usage: "",
  run: async (client, message, args) => {
    let owner = client.users.cache.get(client.owner)
    let seconds = (client.uptime / 1000);
    let d = Math.floor(seconds / 86400);
    let h = Math.floor(seconds / 3600);
    seconds %= 3600;
    let m = Math.floor(seconds / 60);
    let s = Math.floor(seconds % 60);
    let online = client.users.cache.filter(x => x.presence.status == "online").size.toLocaleString();
    let idle = client.users.cache.filter(x => x.presence.status == "idle").size.toLocaleString();
    let dnd = client.users.cache.filter(x => x.presence.status == "dnd").size.toLocaleString();
    let streaming = client.users.cache.filter(x => x.presence.activities.some(x => x.type == "STREAMING")).size.toLocaleString();
    let offline = client.users.cache.filter(x => x.presence.status == "offline").size.toLocaleString();
    
    const embed = new Discord.MessageEmbed()
      .setColor(client.color)
      .setDescription(`> **[Desarrollador]**
        > ${owner.tag} (**${owner.id}**)
        > 
        > **[Ping]**
        > 🏓 ${client.ws.ping} ms
        > 
        > **[Tiempo de actividad]**
        > ${d}d ${h}h ${m}m ${s}s
        > 
        > **[Libreria]**
        > Discord.js v${Discord.version}
        > 
        > **[Comandos]**
        > ${client.commands.size}
        > 
        > **[Servidores]**
        > ${client.guilds.cache.size}
        > 
        > **[Usuarios]**
        > Humans: ${client.users.cache.filter(x => !x.bot).size}
        > Robots: ${client.users.cache.filter(x => x.bot).size.toLocaleString()}
        > <:online:731414132963934249> ${online} <:idle:731414172897771603> ${idle} <:dnd:731414184881029121> ${dnd} <:streaming:731414204271165471> ${streaming} <:offline:731414156867010721> ${offline}`)
      .setTimestamp()
      .setFooter(client.version, client.user.displayAvatarURL());
    let msg = await message.channel.send(embed);
    await message.delete().catch(console.error);
  }
};