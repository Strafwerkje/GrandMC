const botConfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

    var help = new discord.MessageEmbed()
    .setColor("#1f2e18")
    .setTitle("Dit zijn al onze help commands!")
    .setDescription("**Player commands:** /n ?help /n > Krijg dit command te zien! /n ?ticket /n > Maak een ticket aan om hulp te krijgen van ons support team! /n")
    .setTimestamp()

    message.channel.send(help);
}
module.exports.help = {
    name: "help",
    description:"geef dit en help command"

}