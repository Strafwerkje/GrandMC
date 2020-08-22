const discord = require("discord.js");
const botConfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

    const categoryID = "736133679826599997";

    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;

    var ticketExist = false;

    message.guild.channels.cache.forEach(channel => {

        if (channel.name == "「🎫」" + userName.toLowerCase()) {
            ticketExist = true;

            message.reply("Je hebt al een ticket!");

            return;
        }

    });

    if (ticketExist) return;

    var embed = new discord.MessageEmbed()
    .setFooter(botConfig.footer)
    .setTitle("Welkom " + message.author.username)
        .setDescription("_**Uw ticket is aangemaakt!**_")
        .setTimestamp()

    message.channel.send(embed);

    message.guild.channels.create("🎫║" + userName.toLowerCase(), { type: 'text' }).then(
        (createdChannel) => {
            createdChannel.setParent(categoryID).then(
                (settedParent) => {

                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'), {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false
                    });
                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === 'Staff Team'), {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        CONNECT: true,
                        READ_MESSAGES_HISTORY: true,
                        READ_MESSAGES: true
                    });

                    settedParent.updateOverwrite(message.author, {
                        CREATE_INSTANT_INVITE: false,
                        VIEW_CHANNEL: true,
                        READ_MESSAGES: true,
                        SEND_MESSAGES: true,
                        ATTACH_FILES: true,
                        CONNECT: true,
                        ADD_REACTIONS: true,
                        READ_MESSAGES_HISTORY: true

                    });
                    var embedParent = new discord.MessageEmbed()  
                    .setTitle(`Hallo ${message.author.username}`)
                    .setDescription("`bedankt voor het maken van uw ticket, u kunt uw klacht/vraag/opmerking alvast achterlaten, ons support team zal dit zo snel mogelijk behandelen")
                    .setTimestamp()
 
                    settedParent.send(`<@${message.author.id}>`, embedParent)

                }
            ).catch(err => {
                message.channel.send("Oh jee, iets ging niet helemaal goed! (catch 1)"),
                    console.log(err);
            });
        }
    ).catch(err => {
        message.channel.send("Oh jee, iets ging niet helemaal goed! (catch 2)"),
            console.log(err);
    });

}

module.exports.help = {
    name: "ticket",
    description: "dit is Onze ticket systeem."
}