const fs = require('fs')
const Discord = require("discord.js")
module.exports = {
    run: (message, args, client) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("vous n\'avez pas la permission de faire cela.")
        const member = message.mentions.members.first()
        if (!member) return message.channel.send("Personne mal mentionner")
        const nb = args.slice(1, 2).join(" ") || 1
        if (!client.db.win[member.id]) client.db.win[member.id] = 0
        client.db.win[member.id] = client.db.win[member.id] + parseInt(nb)
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        message.channel.send(new Discord.MessageEmbed()
            .setTitle("__Win__")
            .setDescription(`**${member}** a gagner ${nb} partie(s)👏🎉`)
            .setColor("#00ff00"))
    },
    name: "win",
    guilOnly: true,
    help: {
        description: 'Cette commande permet de rentrer qui a gagner',
        syntax: '<personne>'
    }
}