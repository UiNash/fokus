module.exports = async (client, reaction, user) => {
  let channel = client.channels.cache.get("732046123057020968"); 
  let msg = await channel.messages.fetch("732094207774294038");

  if (reaction.emoji.id === "732084623647178793" && reaction.message.id === msg.id) {
    let member = await reaction.message.guild.members.fetch(user.id);
    member.roles.add("732051840908394537");
  } else if (reaction.emoji.id === "732068550235127818" && reaction.message.id === msg.id) {
    let member = await reaction.message.guild.members.fetch(user.id);
    member.roles.add("732051887154790400");
  } else if (reaction.emoji.id === "732069106563416095" && reaction.message.id === msg.id) {
    let member = await reaction.message.guild.members.fetch(user.id);
    member.roles.add("732050824460632164");
  } else if (reaction.emoji.id === "732086467907813377" && reaction.message.id === msg.id) {
    let member = await reaction.message.guild.members.fetch(user.id);
    member.roles.add("732050781695377428");
  } else if (reaction.emoji.id === "732068965769150494" && reaction.message.id === msg.id) {
    let member = await reaction.message.guild.members.fetch(user.id);
    member.roles.add("732051055843737713");
  } else if (reaction.emoji.id === "732068628622475285" && reaction.message.id === msg.id) {
    let member = await reaction.message.guild.members.fetch(user.id);
    member.roles.add("732050694047137823");
  } else if (reaction.emoji.id === "732083758794145792" && reaction.message.id === msg.id) {
    let member = await reaction.message.guild.members.fetch(user.id);
    member.roles.add("732050900348305530");
  } else if (reaction.emoji.id === "732075734063120425" && reaction.message.id === msg.id) {
    let member = await reaction.message.guild.members.fetch(user.id);
    member.roles.add("732050742570909838");
  } else if (reaction.emoji.id === "732069272930484226" && reaction.message.id === msg.id) {
    let member = await reaction.message.guild.members.fetch(user.id);
    member.roles.add("732051141390499904");
  } else if (reaction.emoji.id === "732069238935650314" && reaction.message.id === msg.id) {
    let member = await reaction.message.guild.members.fetch(user.id);
    member.roles.add("732054707966836787");
  } else if (reaction.emoji.id === "732069210515308554" && reaction.message.id === msg.id) {
    let member = await reaction.message.guild.members.fetch(user.id);
    member.roles.add("732050864902111263");
  }
};