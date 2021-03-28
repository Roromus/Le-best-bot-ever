const fs = require('fs')
const Discord = require("discord.js")
const moment = require('moment')
moment.locale('fr')
module.exports = {
    run: async(message, args, client) => {
        const member = message.mentions.members.first()
        if (!member) return message.channel.send("Personne mal mentionner")
        if (!client.db.warns[member.id]) return message.channel.send('Ce membre n\'a aucun warn.')
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`**Total de warns :** ${client.db.warns[member.id].length}\n\n__**10 derniers warns :**__\n\n${client.db.warns[member.id].slice(0, 10).map((warn, i) => `**${i + 1}.** ${warn.reason}\nSanctionné ${moment(warn.date).fromNow()} par <@!${warn.mod}>`).join('\n\n')}`)
            .setColor("#35dfcf"))
        
    },
    name: "seewarn",
    guilOnly: true,
    help: {
        description: 'Cette commande permet de voir les warns d\'une personne',
        syntax: '<personne>'
    }
}