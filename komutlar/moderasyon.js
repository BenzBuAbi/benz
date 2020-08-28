const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;
exports.run = (client, message, args) => {
  
    const juke = new Discord.RichEmbed()
    .setColor('BLACK')
    .setAuthor(`Soulless? | Moderasyon Komutları`, client.user.avatarURL) 
.setThumbnail(client.user.avatarURL)
      .addField('**Komutlar:**', '`ban`, `banlist`, `dmduyur`, `duyur`, `emoji-yükle`, `kick`, `küfür-engel`, `mod-log`, `otorol`, `reklam-engelleme`, `rolal-ver`, `unban`')
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
    name: 'moderasyon',
      category: 'Yardım',
      description: 'Yardım kategorilerini gösteir.',
};