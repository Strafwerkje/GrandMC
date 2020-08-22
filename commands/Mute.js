const discord = require('discord.js');
const ms = require('ms');

module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Je hebt geen Permissie voor deze command!");

    if (!args[0]) return message.reply('geen gebruiker opgegeven.');

    if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply('geen Perms');
    
    var mutePerson = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
   
  if (!mutePerson) return message.reply('kan de gebruiker niet vinden.');
  
    if (mutePerson.hasPermission('KICK_MEMBERS')) return message.reply('sorry je kunt deze gebruiker niet muten');

    var muteRole = message.guild.roles.cache.find(role => role.name === '❌| Muted');


   if (!muteRole) return message.channel.send('De role ❌| Muted bestaat niet')
   
   var muteTime = args[1];
 
   if(!muteTime) return message.channel.send('geen tijd opgegeven');


await(mutePerson.roles.add(muteRole.id));
message.channel.send(`${mutePerson} is gemute voor ${muteTime}`);

setTimeout(() => {

  mutePerson.roles.remove(muteRole.id);

  message.channel.send(`${mutePerson} is geunmute`)

}, ms(muteTime));

}

module.exports.help = {
    name: "mute",
    description:"dit is de Mute commando."
}