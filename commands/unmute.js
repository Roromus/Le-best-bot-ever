const Discord = require("discord.js")
module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Personne mal mentionner')
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie.'
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
        if (!muteRole) return message.channel.send('Il n\'y a pas de muterole.')
        await member.roles.remove(muteRole)
        message.channel.send(new Discord.MessageEmbed()
            .setTitle("__Démute__")
            .setDescription(`${member} a été démuté`)
            .setColor("#00ff00"))
    },
    name: 'unmute',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de démute',
        syntax: '<personne>'
    }
}