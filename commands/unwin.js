const fs = require('fs')
const Discord = require("discord.js")
module.exports = {
    run: async(message, args, client) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("vous n\'avez pas la permission de faire cela.")
        const member = message.mentions.members.first()
        if (!member) return message.channel.send("Personne mal mentionner")
        if (!client.db.win[member.id]) return message.channel.send('Ce membre n\'a aucun win.')
        const nb = parseInt(args.slice(1, 2).join(" "))
        client.db.win[member.id] -= nb
        if (client.db.win[member.id] <= 0) delete client.db.win[member.id]
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        message.channel.send(new Discord.MessageEmbed()
            .setTitle("__Win__")
            .setDescription(`${member} a été unwin de ${nb} partie(s)`)
            .setColor("#ff0000"))
    },
    name: "unwin",
    guilOnly: true,
    help: {
        description: 'Cette commande permet d\'enlever un win',
        syntax: '<personne> [numéro]'
    }
}