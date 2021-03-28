const Discord = require("discord.js")

module.exports = {
    run: message => {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle("Mon titre")
            .setDescription("Description1 \nDescription2")
            .setColor("RANDOM")
            .setTimestamp())
    },
    name: "embed"
}