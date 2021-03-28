const fs = require('fs')
const Discord = require("discord.js")
module.exports = {
    run: async(message, args, client) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("vous n\'avez pas la permission de faire cela.")
        const member = message.mentions.members.first()
        if (!member) return message.channel.send("Personne mal mentionner")
        if (member.hasPermission("ADMINISTRATOR")) return message.channel.send("vous n\'avez pas la permission de faire cela.")
        const reason = args.slice(1).join(" ")
        if (!reason) return message.channel.send("Raison invalide")
        if (!client.db.warns[member.id]) client.db.warns[member.id] = []
        client.db.warns[member.id].unshift({
            reason,
            date: Date.now(),
            mod: message.author.id
        })
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        message.channel.send(new Discord.MessageEmbed()
            .setTitle("__Warn__")
            .setDescription(`${member.user.tag} a été warn\nraison : **${reason}**`)
            .setColor("#ff0000"))
    },
    name: "warn",
    guilOnly: true,
    help: {
        description: 'Cette commande permet de mettre un warn',
        syntax: '<personne> [raison]'
    }
}