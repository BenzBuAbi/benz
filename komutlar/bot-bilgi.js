const Discord = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
require("moment-duration-format");
module.exports.run = async (bot, message) => {
  let premium2 = await db.fetch(`pre_${message.guild.id}`)
  let pre
  if(!premium2){
    pre = "Hayır!"
  }else{
    pre = "Evet!"
  }
  const duration = moment
    .duration(bot.uptime)
    .format("D [gün], H [saat], m [dakika], s [saniye]");
  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .addField(`Versiyon`, `2.7`, true)
    .addField(`Aktiflik Süresi`, duration, true)
    .addField(`Sunucular`, bot.guilds.size.toLocaleString(), true)
    .addField(`Kullanıcılar`, bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString(), true)
    .addField(
      `Ram Kullanımı`,
      `%${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}`,
      true
    )
    .addField(`Yapımcım`, `<@518456368538058783>`, false)
    .addField(`Sınırsız Discord Linki`, `https://discord.gg/B3aQWrY`, false)
    .setFooter(bot.user.username, bot.user.avatarURL);
  message.channel.send(embed);
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['i', 'istatistik'],
  permLevel: 0,
  kategori: "sunucu"
};

module.exports.help = {
  name: "i",
  description: "bot-bilgi",
  usage: "i"
};
