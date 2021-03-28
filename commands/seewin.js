const Discord = require("discord.js")

module.exports = {
    run: async(message, args, client) => {
        const member = message.mentions.members.first()
        if (!member) return message.channel.send("Personne mal mentionner")
        if (!client.db.win[member.id]) return message.channel.send('Ce membre n\'a aucune win.')
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`**Total de wins :** ${client.db.win[member.id].length}`)
            .setColor("#35dfcf"))
        
    },
    name: "seewin",
    guilOnly: true,
    help: {
        description: 'Cette commande permet de voir les wins d\'une personne',
        syntax: '<personne>'
    }
}