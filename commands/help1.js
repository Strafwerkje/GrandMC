const discord = require("discord.js");
const botConfig = require("../botconfig.json");
module.exports.run = async (client, message, args) => {
    var help = new discord.MessageEmbed()
 
    .setTitle(`**● Help commands:**`)
    .setTimestamp()
    .setColor("#0099ff")
    .setDescription("**Speler commands:** \n ?help \n > Krijg dit command te zien! \n ?ticket \n > Maak een ticket aan! \n ?serverinfo \n > Krijg alle informatie over onze  server!")

        return message.channel.send(help);
   

}
 
module.exports.help = {
    name: "help",
    description: "dit is Alle Serverinformatie wat u op dit moment nodig Heeft."
}