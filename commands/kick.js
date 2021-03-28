const Discord = require("discord.js")
module.exports = {
    run: async(message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("vous n\'avez pas la permission de faire cela.")
        const member = message.mentions.members.first()
        if (!member) return message.channel.send("Personne mal mentionner")
        if (member.hasPermission("ADMINISTRATOR")) return message.channel.send("vous n\'avez pas la permission de faire cela.")
        const reason = args.slice(1).join(" ") || "Aucune raison fourni"
        await member.kick(reason)
        message.channel.send(new Discord.MessageEmbed()
            .setTitle("__Exclusion__")
            .setDescription(`${member.user.tag} a été kick\nraison : **${reason}**`)
            .setColor("#ff0000"))
    },
    name: "kick",
    guilOnly: true,
    help: {
        description: 'Cette commande permet de kick',
        syntax: '<personne>'
    }
}