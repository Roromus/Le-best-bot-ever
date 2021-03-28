const Discord = require("discord.js")
const moment = require('moment')
module.exports = {
    run: (message, args) => {
        if(message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else{
            user = message.author;
        }
        const member = message.guild.member(user);
        
        const embed = new Discord.MessageEmbed() 
        .setColor('#ff5555')
        .setThumbnail(user.avatarURL())
        .setTitle(`Information sur ${user.username}#${user.discriminator} :`)
        .addField('ID du compte:', `${user.id}`, true)
        .addField('Pseudo sur le serveur :', `${member.nickname ? member.nickname : 'Aucun'}`, true)
        .addField('A crée son compte le :', `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
        .addField('A rejoint le serveur le :', `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
        .addField('Status:', `${member.presence.status}`, true)
        .addField('Joue a :', `${member.presence.game ? member.presence.game : 'Rien'}`, true)
        .addField('Roles :', member.roles.cache.map(roles => `${roles}`).join(', '), true)
        .addField(`En réponse a :`,`${message.member}`)
        message.channel.send(embed)
        message.channel.send(`${member.game}`)
    },
    name: 'user-info',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de voir les info de quelqu\'un',
        syntax: '(personne)'
    }
}