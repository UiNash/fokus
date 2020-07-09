module.exports = async (client) => {
  console.log(`${client.user.tag} is ready!`);
  client.user.setPresence({ status: "idle", activity: { name: "Mention to help you!", type: "PLAYING" } });
}