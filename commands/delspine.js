const Discord = require("discord.js")
module.exports = {
    run: async(message, args, client) => {
        client.snipes.clear()
        message.channel.send("Les snipes ont bien été suprimé")
    },
    name: 'delsnipe',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de faire dire quelque chose au bot',
        syntax: '[text]'
    }
}