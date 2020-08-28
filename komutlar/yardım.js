const Discord = require('discord.js');


exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor('BLACK')
.setTitle('Soulless? | Yardım Menüsü')
.setTimestamp()
.addField('.genel','Genel Komutları Gösterir.')
.addField('.moderasyon','Moderasyon Komutlarını Gösterir.')
.addField('.eğlence','Eğlence Komutlarını Gösterir.')
.setFooter('Soulless? | Yardım Sistemi')
.setImage('https://cdn.discordapp.com/attachments/748140844607078481/748234350885339206/asdasd.gif')
.setTimestamp()
.setThumbnail(client.user.avatarURL)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['help','Yardım','HELP','Help','YARDIM'], 
  permLevel: 0 
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};