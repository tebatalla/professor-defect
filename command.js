const Discord = require('discord.js')
const axios = require('axios')
const cheerio = require('cheerio')
const _ = require('lodash')

module.exports = (message, client) => {
  const command = _.startCase(message.content.substr(4)).replace(' ', '_')

  axios.get(`https://slay-the-spire.fandom.com/wiki/${command}`).then(response => {
    const $ = cheerio.load(response.data)

    const img = $('.pi-image-thumbnail').attr('src')
    const title = $('.page-header__title').text()

    const embed = new Discord.RichEmbed()
      .setColor('#f2ca4e')
      .setTitle(title)
      .setImage(img)
      .setURL(`https://slay-the-spire.fandom.com/wiki/${command}`)

    $('.pi-data').each((index, element) => {
      embed.addField($(element).find('.pi-data-label').text(), $(element).find('.pi-data-value').text(), true)
    })

    message.channel.send(embed)
  })
  .catch(error => {
    console.log(error)
    message.channel.send("I'm afraid I didn't find what you were looking for.", )
  })
}
