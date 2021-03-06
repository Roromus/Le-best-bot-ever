const config = require('../config.json')
 
module.exports = {
    run: (message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        if (!args[0]) return message.channel.send('Veuillez indiquer du texte à envoyer.')
        message.delete()
        message.channel.send(message.content.trim().slice(`${config.prefix}say`.length))
    },
    name: 'say',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de faire dire quelque chose au bot',
        syntax: '[text]'
    }
}