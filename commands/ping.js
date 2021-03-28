const fs = require('fs')
const Discord = require("discord.js")
module.exports = {
    run: (message, args, client) => {
        message.channel.send("Recherche du ping...").then(m => {
            var ping = m.createdTimestamp - message.createdTimestamp;

            var pingembed = new Discord.MessageEmbed()
                .setAuthor(`Le ping est : ${ping}`)
                .setColor('#0099ff')

            m.edit(pingembed)
        });
    },
    name: "ping",
    guilOnly: true,
    help: {
        description: 'Cette commande permet de voir le ping',
    }
}