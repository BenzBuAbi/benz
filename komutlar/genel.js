const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;
exports.run = (client, message, args) => {
  
    const juke = new Discord.RichEmbed()
    .setColor('BLACK')
    .setAuthor(`Soulless? | Genel Komutlar`, client.user.avatarURL) 
.setThumbnail(client.user.avatarURL)
      .addField('**Komutlar:**', '`afk`, `avatar`, `i`, `kullanıcı-bilgi`, `ping`, `say`, `sil`')
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
    name: 'genel',
      category: 'Yardım',
      description: 'Yardım kategorilerini gösteir.',
};