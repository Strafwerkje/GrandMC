const discord = require("discord.js");
const botConfig = require("../botconfig.json");


module.exports.run = async(bot, message, args) => {

    if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Je hebt geen Permissie voor deze command!");

    if(!message.guild.me.hasPermission("KICK_MEMBERS"))return message.reply("Geen perms");

    if (!args[0]) return message.reply("Geen gebruiker opgegeven.");

    if (!args[1]) return message.reply("Geen redenen opgegeven!");

    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

    var reason = args.slice(1).join(" ");

    if (!kickUser) return message.reply("gebruiker niet gevonden");

    var embedPrompt = new discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Gelieve binnen 30 sec te reageren")
        .setDescription(`Wil je ${kickUser} kicken?`)

 const kickUserEmbed = new discord.MessageEmbed()
        .setColor("#ff0000")
        .setFooter(message.member.displayName)
        .setTimestamp()
        .setDescription(`**Gekickt: ** ${kickUser} (${kickUser.id})
        **Gekickt door: *_* ${message.author}
        **Redenen:  ${reason}`);

    message.channel.send(embedPrompt).then(async msg => {

        var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

        if (emoji === "✅") {

            msg.delete();

            kickUser.kick(reason).catch(err => {
                if (err) return message.reply("Er is iets foutgelopen");
            });

            kickUser.send(kickUserEmbed);

        } else if (emoji === "❌") {

            msg.delete();

            message.reply("Kick geanuleerd").then(m => m.delete(5000));
        }
     
    });


}

async function promptMessage(message, author, time, reactions) {

    time *= 1000;

    for (const reaction of reactions) {
        await message.react(reaction)
    }

    var filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

    return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);


}
 
module.exports.help = {
    name: "kick",
    description: "dit is onze Kick systeem"
}