const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const client = new discord.Client();
client.commands = new discord.Collection();

client.login(process.env.token);

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon de files niet vinden!");
        return;
    }

    jsFiles.forEach((f, i) => {
        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen!`);

        client.commands.set(fileGet.help.name, fileGet);
    })

})
client.on("ready", async() => {

    console.log(`${client.user.username} is online!`);
    client.user.setActivity(`GrandMC`, {type: "STREAMING"});

});

client.on("guildMemberAdd" , member => {


    var role = member.guild.roles.cache.get(`735938601258582017`);
   
     if(!role) return;
   
     member.roles.add(role);
   
     var channel = member.guild.channels.cache.get(`736106976286867497`);
   
     if(!channel) return;
   
     var joinEmbed = new discord.MessageEmbed()
     .setAuthor(`${member.user.tag}`)
     .setDescription(`Welkom **${member.user.username}** op de server van **➩ GrandMC!**`)
     .setColor("#1f2e18")
     .setTimestamp()
     .setThumbnail(member.user.displayAvatarURL())
   
    channel.send(joinEmbed);
       
    }) 
    client.on("guildMemberRemove" , member => {

   
        var channel = member.guild.channels.cache.get(`736169487576858635`);
      
        if(!channel) return;
      
      var leaveEmbed = new discord.MessageEmbed()
          .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
          .setDescription(`🔴   ${member.user.username} heeft de server verlater er zijn nog** ${member.guild.memberCount} **mensen in de server!  🔴`)
          .setColor("#FF0000")
          .setTimestamp()
          .setThumbnail(member.user.displayAvatarURL())
      
          channel.send(leaveEmbed);
      
      })
client.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);

    var commands = client.commands.get(command.slice(prefix.length));

    if (!message.content.startsWith(prefix)) return;

    if (commands) commands.run(client, message, arguments);

var randomXp = Math.floor(Math.random(1) * 15) +1;

console.log(randomXp);
});
