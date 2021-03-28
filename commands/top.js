const fs = require('fs')
const Discord = require("discord.js")
module.exports = {
    run: (message, args, client) => {
        classement = []
        Object.entries(client.db.win).forEach(([key, value]) => {
            classement.push({ id: key, value: value });
        });
        classement.sort(function (a, b) {
            return a.value - b.value;
          });
        classement.reverse()
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`__**Classement :**__\n\n${classement.map((e, i) => `**${i + 1}.** <@${e.id}> ==> ${e.value}`).join('\n\n')}`)
            .setColor("#35dfcf"))
        
    },
    name: "top",
    guilOnly: true,
    help: {
        description: 'Cette commande permet de voir le classement',
    }
}