const discord = require("discord.js");
const botConfig = require("../botconfig.json");
const verificationLevels = {
    NONE: 'None',
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: '(╯°□°）╯︵ ┻━┻',
    VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};
const regions = {
    brazil: 'Brazil',
    europe: 'Europe',
    hongkong: 'Hong Kong',
    india: 'India',
    japan: 'Japan',
    russia: 'Russia',
    singapore: 'Singapore',
    southafrica: 'South Africa',
    sydney: 'Sydney',
    'us-central': 'US Central',
    'us-east': 'US East',
    'us-west': 'US West',
    'us-south': 'US South'
};
module.exports.run = async (client, message, args) => {
    var members = message.guild.members.cache;
    var embed = new discord.MessageEmbed()
 
    .setTitle(`**● Server Name:** ➩ GrandMC`,)
    .setTimestamp()
    .setThumbnail(message.author.displayAvatarURL())
    .setColor("#1f2e18")

    .addField("_**Algemeen:**_", [
        `**💥 | Server Name:** ${message.guild.name}`,
        `**🤴 | Created By:** <@${message.guild.ownerID}>`,
        `**📧 | ID:** ${message.guild.id}`,
        `**⚡ | Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : `Niet`}`,
        `**🌍 | Region:** ${regions[message.guild.region]}`,
        `**👥 | Members: ** ${message.guild.memberCount}`,        
        `\u200b`
        ])
        .addField(`_**Userinfo:**_`, [
            `**👤 | User Name:** ${message.author.username}`,
            `**📧 | User ID:** ${message.author.id}`,
            `**👋 | Joint On:** ${message.member.joinedAt}`,
            `\u200b`
            ])
        .addField(`_**Botinfo:**_`, [
            `**👤 | Bot name:** ${client.user.username}`,
            `**📧 | Bot ID:** ${client.user.id}`,
            `**👋 | Bot since:** ${client.user.createdAt}`,
            `**🔢 | Bot on servers:** ${client.guilds.cache.size}`,
            `**💻 | Bot prefix:** ${botConfig.prefix}`,
            `**✨ | Bot creater:** 𝕊𝕥𝕣𝕒𝕗𝕨𝕖𝕣𝕜𝕛𝕖#8485`,
            `\u200b`
            ])
        return message.channel.send(embed);
   

}
 
module.exports.help = {
    name: "serverinfo",
    description: "dit is Alle Serverinformatie wat u op dit moment nodig Heeft."
}