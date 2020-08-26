const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
  message.delete()
    var idee = args.join(" ");
 
    if (!idee) return message.channel.send("Geen Idee meegegeven gelieve een idee mee te geven.");
 
    var ideeEmbed = new discord.MessageEmbed()
        .setTitle("Nieuw Idee")
        .setColor("#1f2e18")
        .addField("Idee: ", idee)
        .addField("Ingezonden door: ", message.author);
 
    var ideeChannel = message.guild.channels.cache.find(ch => ch.name === "「📃」idee");
    if (!ideeChannel) return message.guild.send("Kan het kanaal niet vinden");
 
    ideeChannel.send(ideeEmbed).then(embedMessage => {
        embedMessage.react('👍');
        embedMessage.react('👎');
    });
 
 
}
 
module.exports.help = {
    name: "idee",
    description: "Heb je een idee. Zet het dan hier en misschien passen we het toe."
}