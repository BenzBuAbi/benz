const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;
exports.run = (client, message, args) => {
  
    const juke = new Discord.RichEmbed()
    .setColor('BLACK')
    .setAuthor(`Soulless? | Eğlence Komutları`, client.user.avatarURL) 
.setThumbnail(client.user.avatarURL)
      .addField('**Komutlar:**', '`espri`, `rip`, `kralol`, `kaç-cm`, `wasted`, `alkış`, `sigarayak`, `aşkölçer`, `kapaklaflar`, `fbi`, `söv`')
    .setFooter(``, client.user.avatarURL)
    .setTimestamp()
    message.channel.send(juke).catch()

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'eğlence',
      category: 'Yardım',
      description: 'Yardım kategorilerini gösteir.',
};