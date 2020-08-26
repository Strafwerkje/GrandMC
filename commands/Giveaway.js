const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    var item = "";
    var time;
    var winnerCount;

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You have no permission!");

    winnerCount = args[0];
    time = args[1];
    item = args.splice(2,args.length).join(" ");

    if(!winnerCount) return message.reply("Geef een aantal op AUB!");

    if(!time) return message.reply("Geef een tijd op AUB!");

    if(!item) return message.reply("Geef een item op AUB!");

    message.delete();

    var date = new Date().getTime();
    var dateEnd = new Date(date + (time * 1000));

    var giveawayEmbed = new discord.MessageEmbed()
    .setTitle("🎉**Giveaway time!**🎉")
    .setFooter(`End: ${dateEnd}`)
    .setDescription(item)
    .setColor("#1f2e18");

    var embedSend = await message.channel.send(giveawayEmbed);
    embedSend.react("🎉");

    setTimeout(function(){

        var random = 0;
        var winners = [];
        var inList = false;

        var peopleReacted = embedSend.reactions.cache.get("🎉").users.cache.array();

        for (let i = 0; i < peopleReacted.length; i++) {
            
            if(peopleReacted[i].id == bot.user.id){
                peopleReacted.splice(i,1);
                continue;
            }
            
        }

        if (peopleReacted.length == 0) {
            return message.channel.send("Niemand heeft mee gedaan dus de bot wint!");
        }

        if(peopleReacted.length < winnerCount) {
            return message.channel.send("Er zijn te wijnig mensen dus de bot wint!");
        }

        for (let y = 0; y < winnerCount.length; y++) {

            inList = false;

            random = Math.floor(Math.random() * peopleReacted.length);

            for (let o = 0; o < winners.length; o++) {

                if(winners[o] == peopleReacted[random]){
                    inList = true;
                    y--;
                    break;
                }
                
            }
            
            if(!inList){
                winners.push(peopleReacted[random]);
            }

        }

    for (let y = 0; y < winners.length; y++) {
        
        message.channel.send("Geveliciteerd:" + winners[y].username + `Je hebt gewonnen ${item}`);
    }

    }, time * 1000)

}

module.exports.help = {
    name: "giveaway",
    description:"Maak een giveaway!"
}