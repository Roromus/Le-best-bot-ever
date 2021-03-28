const parseDuration = require("parse-duration"),
    humanizeDuration = require("humanize-duration")

const Discord = require("discord.js")
module.exports = {
    run: async(message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("vous n\'avez pas la permission de faire cela.")
        const member = message.mentions.members.first()
        if (!member) return message.channel.send("Personne mal mentionner")
        if (member.hasPermission("ADMINISTRATOR")) return message.channel.send("vous n\'avez pas la permission de faire cela.")
        const duration = parseDuration(args[1])
        if (!duration) return message.channel.send("Temps mal renseigner")
        const reason = args.slice(2).join(" ") || "Aucune raison fourni"
        await member.ban({reason})
        message.channel.send(new Discord.MessageEmbed()
            .setTitle("__Banissement__")
            .setDescription(`${member.user.tag} a été banni\nraison : **${reason}**\ntemps : **${humanizeDuration(duration, {language: 'fr'})}**`)
            .setColor("#ff0000"))
        setTimeout(() => {
            if (!member.ban) return
            message.guild.members.unban(member)
            message.channel.send(new Discord.MessageEmbed()
            .setTitle("__Débanissement__")
            .setDescription(`${member.user.tag} a été débanni.`)
            .setColor("#00ff00"))
        }, duration)
    },
    name: "tempban",
    guilOnly: true,
    help: {
        description: 'Cette commande permet de bannir pendant une période donnée',
        syntax: '<personne> [temps] (raison)'
    }
}