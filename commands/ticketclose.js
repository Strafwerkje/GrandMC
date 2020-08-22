const discord = require("discord.js");

module.exports.run = async(Client, message, args) =>{

     message.delete();

    const categoryID = "736133679826599997";

    if(! message.member.roles.cache.has("736108236134154273")) return message.reply("You can't use this command");

    if (message.channel.parentID == categoryID) {
        message.channel.delete();

        var ticketLog = new discord.MessageEmbed()
         .setTitle("Ticket Log, " + message.channel.name)
         .setColor("#3de361")
         .setFooter("GrandMC BOT")
         .setTimestamp()
         .setDescription(`de Ticket is gesloten door. ${message.author.username}`)
   
        var logsTicket = message.member.guild.channels.cache.find(channel => channel.name === "log")
        if (!logsTicket) return message.reply("We can't find the log channel");

        logsTicket.send(ticketLog);

    } else {

        message.channel.send("You can't use this command here")

    }

}

module.exports.help = {
    name: "close",
    description: "dit is onze Close commando allen Toegankelijk voor Tickets."
}