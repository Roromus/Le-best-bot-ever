const Discord = require("discord.js")
module.exports = {
    run: async(message, args, client) => {
        const snipes = client.snipes.get(message.channel.id) || [];
        const snipedmsg = snipes[args[0] - 1 || 0];
        if (!snipedmsg) return message.channel.send("Not a valid snipe!");
        const Embed = new Discord.MessageEmbed()
            .setAuthor(snipedmsg.author.tag, snipedmsg.author.displayAvatarURL({ dynamic: true, size: 256 }))
            .setDescription(snipedmsg.content)
            .setFooter(`Date: ${snipedmsg.date} | ${args[0] || 1}/${snipes.length}`)
        if (snipedmsg.attachment) Embed.setImage(snipedmsg.attachment);
        message.channel.send(Embed);
    },
    name: 'snipe',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de faire dire quelque chose au bot',
        syntax: '[text]'
    }
}