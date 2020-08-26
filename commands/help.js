const discord = require("discord.js");
const botConfig = require("../botconfig.json");
module.exports.run = async (client, message, args) => {
    var help = new discord.MessageEmbed()
 
    .setTitle(`**● Help commands:**`)
    .setTimestamp()
    .setColor("#1f2e18")
    .setDescription("**Speler commands:** \n ?help \n > Krijg dit command te zien! \n ?idee \n > Laat een idee achter! \n ?ticket \n > Maak een ticket aan! \n ?serverinfo \n > Krijg alle informatie over onze  server! \n \n **Moderation Commands:** \n ?ban \n > Ban iemand van de server! \n ?kick \n > Kick iemand van de server! \n ?mute \n > Zorg dat iemand niet meer kan praten! \n ?clear \n Verwijderer meer berichten in 1 keer! \n ?warn \n > Geef iemand een waarschuwing in de server! \n ?close \n > Sluit een ticket van iemand! \n ?giveaway \n > Maak een giveaway aan!")

        return message.channel.send(help);
   

}
 
module.exports.help = {
    name: "help",
    description: "dit is Alle Serverinformatie wat u op dit moment nodig Heeft."
}