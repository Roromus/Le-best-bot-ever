const fs = require('fs')
const Discord = require("discord.js")
module.exports = {
    run: async(message, args, client) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("vous n\'avez pas la permission de faire cela.")
        const member = message.mentions.members.first()
        if (!member) return message.channel.send("Personne mal mentionner")
        if (member.hasPermission("ADMINISTRATOR")) return message.channel.send("vous n\'avez pas la permission de faire cela.")
        if (!client.db.warns[member.id]) return message.channel.send('Ce membre n\'a aucun warn.')
        const warnIndex = parseInt(args[1], 10) - 1
        if (warnIndex < 0 || !client.db.warns[member.id][warnIndex]) return message.channel.send('Ce warn n\'existe pas.')
        const { reason } = client.db.warns[member.id].splice(warnIndex, 1)[0]
        if (!client.db.warns[member.id].length) delete client.db.warns[member.id]
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        message.channel.send(new Discord.MessageEmbed()
            .setTitle("__Warn__")
            .setDescription(`${member.user.tag} a été unwarn\nraison du warn : **${reason}**`)
            .setColor("#00ff00"))
    },
    name: "unwarn",
    guilOnly: true,
    help: {
        description: 'Cette commande permet d\'enlever un warn',
        syntax: '<personne> [numéro]'
    }
}