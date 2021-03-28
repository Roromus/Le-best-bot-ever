const Discord = require("discord.js")
module.exports = {
    run: async(message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("vous n\'avez pas la permission de faire cela.")
        const member = message.mentions.members.first()
        if (!member) return message.channel.send("Personne mal mentionner")
        if (member.hasPermission("ADMINISTRATOR")) return message.channel.send("vous n\'avez pas la permission de faire cela.")
        const reason = args.slice(1).join(" ") || "Aucune raison fourni"
        await member.ban({reason})
        message.channel.send(new Discord.MessageEmbed()
            .setTitle("__Banissement__")
            .setDescription(`${member.user.tag} a été banni\nraison : **${reason}**`)
            .setColor("#ff0000"))
    },
    name: "ban",
    guilOnly: true,
    help: {
        description: 'Cette commande permet de bannir',
        syntax: '<personne> (raison)'
    }
}