const parseDuration = require("parse-duration"),
    humanizeDuration = require("humanize-duration")

const Discord = require("discord.js")
module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Personne mal mentionner')
        const duration = parseDuration(args[1])
        if (!duration) return message.channel.send("Temps mal renseigner")
        const reason = args.slice(2).join(' ') || 'Aucune raison fournie.'
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    permissions: 0
                }
            })
            message.guild.channels.cache.forEach(channel => channel.createOverwrite(muteRole, {
                SEND_MESSAGES: false,
                CONNECT: false,
                ADD_REACTIONS: false
            }))
        }
        await member.roles.add(muteRole)
        message.channel.send(new Discord.MessageEmbed()
            .setTitle("__Mute__")
            .setDescription(`${member} a été mute\nraison : **${reason}**\ntemps : **${humanizeDuration(duration, {language: 'fr'})}**`)
            .setColor("#ff0000"))
        setTimeout(() => {
            if (member.deleted) return
            if (member.roles != muteRole) return
            member.roles.remove(muteRole)
            message.channel.send(new Discord.MessageEmbed()
            .setTitle("__Démute__")
            .setDescription(`${member} a été démuté.`)
            .setColor("#00ff00"))
        }, duration)
    },
    name: 'tempmute',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de mute pendant une période donée',
        syntax: '<personne> [temps] (raison)'
    }
}