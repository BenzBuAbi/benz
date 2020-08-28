const Discord = require("discord.js");
const { oneLine,} = require
module.exports.run = async (client, message, args) => {
  let guild = "747889545554690059";
  client.premium_subscription_count == 0
    const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    let count = 0;
    
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
  var msg = message;
  var üyesayısı = msg.guild.members.size.toString();
  /////////////////////////////////////
  var sessayı = count.toString();
  //////////////////////////////////////////
  var onlayn = message.guild.members.filter(m => m.presence.status !== "offline").size
   //////////////////////////////////////////////////
     let tag = message.guild.roles.find(rol => rol.id === `747889545554690059`); //////boost rol ıd
   var tagkisi = tag.members.size
  /////////////////////////
  String.prototype.replaceA = function (find, replace) {
    return this.replace(new RegExp(find, 'g'), replace);
  }
  const donustur = function(sayi) {
    let gorunum = sayi.toString()
      .replaceA('0', '0a')
      .replaceA('1', '1a')
      .replaceA('2', '2a')
      .replaceA('3', '3a')
      .replaceA('4', '4a')
      .replaceA('5', '5a')
      .replaceA('6', '6a')
      .replaceA('7', '7a')
      .replaceA('8', '8a')
      .replaceA('9', '9a')
    gorunum = gorunum 
     .replaceA("0a",'<a:darwensifir:747416228087463997>')
    .replaceA("1a", "<a:darwenbir:747416210718851072>")
    .replaceA("2a", "<a:darweniki:747416214787194910>")
    .replaceA("3a", "<a:darwenuc:747416221372252221>")
    .replaceA("4a", '<a:darwendort:747416213281570817>')
    .replaceA("5a", '<a:darwenbes:747416212056572004>')
    .replaceA("6a", '<a:darwenalti:747416216267784192>')
    .replaceA("7a", '<a:darwenyedi:747416219832811610>')
    .replaceA("8a", '<a:darwensekiz:747416222957830204>')
    .replaceA("9a", '<a:darwendokuz:747416226006827068>')
    return gorunum
  }
message.react("a:tagflame:740214244770971739")
  ////////////////////////////////////////////////////////////
  const embed = new Discord.RichEmbed()
  .setColor('BLACK')
  .setDescription(`
<a:alev:747423512439816222> **Sunucuda Bulunan Üye sayısı**: _${donustur(üyesayısı)}_

<a:alev:747423512439816222> **Ses Kanallarındaki Aktif Sayısı**: _${donustur(sessayı)}_

<a:alev:747423512439816222> **Sunucuda Bulunan Aktif Üye Sayısı**: _${donustur(onlayn)}_

<a:alev:747423512439816222> **Sunucu Tagımızda Bulunan Kişi Sayısı**: _${donustur(tagkisi)}_`)
.setTimestamp()
  .setFooter(`Komutu Kullanan: ${msg.author.tag} `)
  .setAuthor(msg.guild.name, msg.guild.iconURL)
msg.channel.send(embed).then
  }
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["Say","sAy","SAY"],
  permLevel: 0
};
exports.help = {
  name: 'say'
};