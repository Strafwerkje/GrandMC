const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    // !announcement Titel ${splitser} Bericht ${splitser} Kleur ${splitser} Kanaal

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry jij kan dit niet doen");

    // Met dit gaan we tekst splitsen.
    var splitser = " ";

    // Nakijken als men wel gegevens meegeeft.
    if (args[0] == null) {

        var useMessage = new discord.MessageEmbed()
            .setTitle("Gebruik")
            .setColor("#00ee00")
            .setDescription(`?say title // bericht // kleur (optioneel)`);

        return message.channel.send(useMessage);

    }

    // Verkrijg al de args en splits ze met de splitser.
    args = args.join(" ").split(splitser);

    // Nakijken als je channel meegeeft of een kleur. Dit plaatsen we hier om een error te voorkomen bij de trim later.
    if (args[2] == undefined) args[2] = "#1f2e18";
    if (args[3] == undefined) args[3] = "general";

    // Opties die gezet worden als er iets niet wordt meegeven.
    // Voor het kanaal halen we de spaties weg.
    var options = {

        titel: args[0] || "Geen title opgegeven",
        bericht: args[1] || "Geen inhoud opgegeven",
        kleur: args[2].trim(),

    }

    // Verkrijgen van wie het bericht aanmaakt.
    var announcer = message.author;

    // Het bericht wat wordt verzonden.
    var announcementMessage = new discord.MessageEmbed()
        .setTitle(`${options.titel}`)
        .setColor(options.kleur)
        .setDescription(`${options.bericht} \n`)
        .setTimestamp()

    // Kanaal krijgen waar het verzonden moet worden.
    message.channel.send(announcementMessage);

}

module.exports.help = {
    name: "say",
    description: "dit is Onze aankondiging commando."
}