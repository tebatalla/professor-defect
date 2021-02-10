const Discord = require('discord.js')
const command = require('./command')
require('dotenv').config();

const Client = new Discord.Client()

Client.on('ready', () => {
  console.log('Professor Defect is online.')
})

Client.on('message', (message) => {
  if (message.author === Client.user) return

  if (message.content.includes(Client.user.toString())) {
    message.channel.send('beep boop.')
  }

  if (message.content.startsWith('sts')) {
    command(message)
  }
})

Client.login(process.env.BOT_TOKEN)
