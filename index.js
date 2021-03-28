const Discord = require('discord.js'),
    client = new Discord.Client({
        fetchAllMembers: true,
        partials: ['MESSAGE', 'REACTION']
    }),
    config = require('./config.json'),
    fs = require('fs'),
    humanizeDuration = require("humanize-duration"),
    Jimp = require("jimp"),
    list = require("./youtube.json"),
    search = require("youtube-search")

client.login(config.token)
client.commands = new Discord.Collection()
client.snipes = new Discord.Collection()
client.db = require("./db.json")
 
fs.readdir('./commands', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)
    })
})

client.on("ready", async () => {
    console.log("ready")
    client.user.setPresence({
        status: 'dnd',
        activity: {
            name: config.prefix + "help",
            type: 'WATCHING'
        }
    })
    const opts_hiizuro = {
        maxResults: 1000,
        key: config.youtube,
        type: "video",
        channelId: "UCFf9O7uRYV2k07aoqyhlSdA"
    }
    const opts_leptiaos = {
        maxResults: 1000,
        key: config.youtube,
        type: "video",
        channelId: "UCKINZCJojMeLkpfCcWXOqtQ"
    }
    let channel_new_vid_hiizuro = client.channels.cache.get("818470562514731059")
    let channel_new_vid_leptiaos = client.channels.cache.get("820583684896849940")
    setInterval(async function () {
        let results = await search('', opts_hiizuro).catch(err => console.log(err))
        for(let i = 0; i < results.results.length; i++){
            if (list.videos_hiizuro.indexOf(results.results[i].id) == -1) {
                channel_new_vid_hiizuro.send("**<@408630025810870276> viens de publier une videos:**\nhttps://www.youtube.com/watch?v=" + results.results[i].id)
                list.videos_hiizuro.push(results.results[i].id);
                fs.writeFile("./youtube.json", JSON.stringify(list, null, 4), (err) => {
                    if (err) message.channel.send("Une erreur est survenue.");
                });
            }
        }
        // deuxieme chaine
        let result = await search('', opts_leptiaos).catch(err => console.log(err))
        for(let i = 0; i < result.results.length; i++){
            if (list.videos_leptiaos.indexOf(result.results[i].id) == -1) {
                channel_new_vid_leptiaos.send("**<@456136767725371432> viens de publier une videos:**\nhttps://www.youtube.com/watch?v=" + result.results[i].id)
                list.videos_leptiaos.push(result.results[i].id);
                fs.writeFile("./youtube.json", JSON.stringify(list, null, 4), (err) => {
                    if (err) message.channel.send("Une erreur est survenue.");
                });
            }
        }
    }, 300000)
});
client.on("messageDelete", msg => {
    if (msg.author.bot) return;
    const snipes = msg.client.snipes.get(msg.channel.id) || [];
    snipes.unshift({
      content: msg.content,
      author: msg.author,
      image: msg.attachments.first() ? msg.attachments.first().proxyURL : null,
      date: new Date().toLocaleString("en-GB", {
        dataStyle: "full",
        timeStyle: "short",
      }),
    });
    snipes.splice(10);
    msg.client.snipes.set(msg.channel.id, snipes);
})
client.on('message', message => {
    if (message.type !== 'DEFAULT' || message.author.bot) return
 
    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith(config.prefix)) return
    const command = client.commands.get(commandName.slice(config.prefix.length))
    if (!command) return
    if (command.guildOnly && !message.guild) return message.channel.send('Cette commande ne peut être utilisée que dans un serveur.')
    command.run(message, args, client)
})
 
 
client.on('messageReactionAdd', (reaction, user) => {
    if (!reaction.message.guild || user.bot) return
    const reactionRoleElem = config.reactionRole[reaction.message.id]
    if (!reactionRoleElem) return
    const prop = reaction.emoji.id ? 'id' : 'name'
    const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
    if (emoji) reaction.message.guild.member(user).roles.add(emoji.roles)
    else reaction.users.remove(user)
})
 
client.on('messageReactionRemove', (reaction, user) => {
    if (!reaction.message.guild || user.bot) return
    const reactionRoleElem = config.reactionRole[reaction.message.id]
    if (!reactionRoleElem || !reactionRoleElem.removable) return
    const prop = reaction.emoji.id ? 'id' : 'name'
    const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
    if (emoji) reaction.message.guild.member(user).roles.remove(emoji.roles)
})
 
 
client.on('channelCreate', channel => {
    if (!channel.guild) return
    const muteRole = channel.guild.roles.cache.find(role => role.name === 'Muted')
    if (!muteRole) return
    channel.createOverwrite(muteRole, {
        SEND_MESSAGES: false,
        CONNECT: false,
        ADD_REACTIONS: false
    })
})
