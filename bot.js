const express = require('express');
const app = express();
const http = require('http');
    app.get("/",(request, response) => {
      console.log(`pingleme işlemi başarılı başarılıysa bu yazıyı loglarda görürsün`);
      response.sendStatus(200);
    });
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const db = require('quick.db')
const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};



client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}; 
/////60gx-d30c

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
  };

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});



client.login(ayarlar.token);



//////////////////////////Hata Alırsanız Discorddan Bildirebilirsiniz//////////////
//--KOMUTLAR--\\

////////////////////İsterseniz Aşağıdaki Komutu Silebilirsiniz///////////////////////
client.on('message', async (msg, member, guild) => {
  if (msg.content.toLowerCase() === "sa") {
    msg.reply("**Aleyküm Selam Hoşgeldin^^** ");
  }
});

////////////////////İsterseniz Yukarıdaki Komutu Silebilirsiniz///////////////////////
///küfür///
client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;

  let i = await db.fetch(`küfürFiltre_${msg.guild.id}`);
  if (i == "acik") {
    const küfür = [
      "amcık",
      "yarrak",
      "orospu",
      "piç",
      "sikerim",
      "sikik",
      "amına",
      "pezevenk",
      "yavşak",
      "ananı",
      "anandır",
      "orospu",
      "evladı",
      "göt",
      "pipi",
      "sokuk",
      "yarak",
      "bacını",
      "karını",
      "amk",
      "aq",
      "mk",
      "anaskm"
    ];
    if (küfür.some(word => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("MANAGE_WEBHOOKS")) {
          msg.delete();
          let embed = new Discord.RichEmbed()
            .setColor(0xffa300)
            .setFooter("Soulless? | Küfür Sistemi", client.user.avatarURL)
            .setAuthor(
              msg.guild.owner.user.username,
              msg.guild.owner.user.avatarURL
            )
            .setDescription(
              "" +
                `***${msg.guild.name}***` +
                " adlı sunucunuzda küfür yakaladım."
            )
            .addField(
              "Küfür Eden Kişi",
              "Kullanıcı: " + msg.author.tag + "\nID: " + msg.author.id,
              true
            )
            .addField("Engellenen mesaj", msg.content, true)
            .setTimestamp();
          msg.guild.owner.user.send(embed);
          return msg.channel
            .send(
              `${msg.author}, Küfür Etmek Yasak! Senin Mesajını Özelden Kurucumuza Gönderdim.`
            )
            .then(msg => msg.delete(25000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});
///BOT DM
client.on("message", msg => {
  
var channel = client.channels.get("747911656083947551")

if(msg.channel.type === "dm") {
  
if(msg.author.bot) return;
const embed = new Discord.RichEmbed()
.setTitle(`${client.user.username} Dm`)
.setTimestamp()
.setColor("RANDOM")
.setThumbnail(`${msg.author.avatarURL}`)
.addField("Gönderen", msg.author.tag)
.addField("Gönderen ID", msg.author.id)
.addField("Gönderilen Mesaj", msg.content)

channel.send(embed)

}
});
///reklam///
client.on("message", async msg => {
  let antoxd = await db.fetch(`antoxd${msg.guild.id}`);
  if (antoxd === "acik") {//Lord Creative
    const reklam = ["discord.gg", "https://discordapp.com/invite/"];
    if (reklam.some(word => msg.content.includes(word))) {
      msg.delete();
    }
  }
});
///reklam-engelle///
client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;

  let i = await db.fetch(`reklamFiltre_${msg.guild.id}`);
  if (i == "acik") {
    const reklam = [
      "discord.app",
      "discord.gg",
      "invite",
      "discordapp",
      "discordgg",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az"
    ];
    if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("MANAGE_GUILD")) {
          msg.delete();
          let embed = new Discord.RichEmbed()
            .setColor(0xffa300)
            .setFooter(
              "Soulless?  -|-  Reklam engellendi.",
              client.user.avatarURL
            )
            .setAuthor(
              msg.guild.owner.user.username,
              msg.guild.owner.user.avatarURL
            )
            .setDescription(
              "Soulless? | Reklam Sistemi, " +
                `**${msg.guild.name}**` +
                " Adlı Sunucuda Reklam Yakaladım."
            )
            .addField(
              "Reklamı yapan kişi",
              "Kullanıcı: " + msg.author.tag + "\nID: " + msg.author.id,
              true
            )
            .addField("Engellenen mesaj", msg.content, true)
            .setTimestamp();
          msg.guild.owner.user.send(embed);
          return msg.channel
            .send(`${msg.author.tag}, Reklam Yapmak Yasak!`)
            .then(msg => msg.delete(25000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});""
client.on('message', async message => {
    const ms = require('parse-ms');

  if(message.author.bot) return;
  if(!message.guild) return;
  if(message.content.includes(`${prefix}afk`)) return;
  
  if(await db.fetch(`afk_${message.author.id}`)) {
      var user = message.mentions.users.first();
    let zamans = await db.fetch(`afksüre_${message.author.id}`);
    let timeObj = ms(Date.now() - zamans);
      message.reply(`Artık AFK değilsin, **${timeObj.hours}** Saat **${timeObj.minutes}** Dakika **${timeObj.seconds}** Saniyedir AFKydın`);
        db.delete(`afk_${message.author.id}`);
    db.delete(`afksüre_${message.author.id}`);
  }
  
  var user = message.mentions.users.first();
  if(!user) return;
  var REASON = await db.fetch(`afk_${user.id}`);
  
  if(REASON) {
    let zamant = await db.fetch(`afksüre_${user.id}`);
    let timeObj = ms(Date.now() - zamant);
    const muah2  = new Discord.MessageEmbed()
     .setDescription(`<@${user.id}> kullanıcısı AFK `)
                  .setColor("2F3136")
                  .addField(`Saat :`,`${timeObj.hours}`,true)
                  .addField(`Dakika :`,`${timeObj.minutes}`,true)
                  .addField(`Saniye :`,`${timeObj.seconds}`,true)
                 .setThumbnail(user.avatarURL())
    message.channel.send(muah2)
  }
});
///otorol///
client.on("guildMemberAdd", async (member, guild, message) => {
  let role = db.fetch(`otorolisim_${member.guild.id}`);
  let otorol = db.fetch(`autoRole_${member.guild.id}`);
  let i = db.fetch(`otorolKanal_${member.guild.id}`);
  if (!otorol || otorol.toLowerCase() === "yok") return;
  else {
    try {
      if (!i) return;
      if (!role) {
        member.addRole(member.guild.roles.get(otorol));
        var embed = new Discord.RichEmbed()
          .setDescription(
            "**Sunucuya Yeni Katılan** @" +
              member.user.tag +
              " **Kullanıcısına** <@&" +
              otorol +
              ">  **Rolü verildi:white_check_mark:**"
          )
          .setColor("0x36393E")
          .setFooter(`Soulless? | Otorol Sistemi`);
        member.guild.channels.get(i).send(embed);
      } else if (role) {
        member.addRole(member.guild.roles.get(otorol));
        var embed = new Discord.RichEmbed()
          .setDescription(
            `**Sunucuya Yeni Katılan** \`${member.user.tag}\` **Kullanıcısına** \`${role}\` **Rolü verildi.**`
          )
          .setColor("0x36393E")
          .setFooter(`Soulless? | Otorol Sistemi`);
        member.guild.channels.get(i).send(embed);
      }
    } catch (e) {
      console.log(e);
    }
  }
});

//--------------------------------Hg Kanalı---------------------------------\\
client.on("guildMemberAdd", member => {  
  const kanal = "748141345658634301";
  let user = client.users.get(member.id);
  require("moment-duration-format");
    const kurulus = new Date().getTime() - user.createdAt.getTime();  
    var kontrol;
if (kurulus < 1296000000) kontrol = '<a:iptal:747416119039754320> **__Bu Hesap Güvenilir Değil__**'
if (kurulus > 1296000000) kontrol = '<a:onay:747414463631720510> **__Bu Hesap Güvenilir Gözüküyor__**'
  moment.locale("tr");
  let kobs = client.channels.get(kanal);
kobs.send("<a:ucgen:747414437547212892> **Hoşgeldin! " + member + " Seninle Birlikte __\`" + member.guild.memberCount + "\`__ Kişiyiz! \n <a:hype:747414437375377581> Hesabın Oluşturulma Tarihi:** " + moment(member.user.createdAt).format("**__YYYY__** **__DD MMMM dddd__**") +  "  \n\n"  + kontrol + " \n\n"  
  );
});
//////////TagAlanaRolVerme

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
    let tag = "is Soulless?"; //tagınız
    let sunucu = "746068955353055352"; //sunucu ID
    let kanal = "748141345658634301" //log kanal id
    let rol = "747889545554690059"; // rol ID
    if (newUser.username.includes(tag) && !client.guilds.get(sunucu).members.get(newUser.id).roles.has(rol)) {
      client.channels.get(kanal).send(`${newUser} **__${tag}__** tagını aldığı için **__Soulless?__** rolünü kazandı!`)
      client.guilds.get(sunucu).members.get(newUser.id).addRole(rol)
    } if (!newUser.username.includes(tag) && client.guilds.get(sunucu).members.get(newUser.id).roles.has(rol)) {
      client.guilds.get(sunucu).members.get(newUser.id).removeRole(rol)
      client.channels.get(kanal).send(`${newUser} **__${tag}__** tagını çıkardığı için **__Soulless?__** rolünü kaybetti!`)
    }

  }
})


//ArkadaşlarÜsttekiKanalİDYazan Yer Boş Kalırsa Botunuz Çalışmaz Ve Error Verir Eğerki Doldurmak İstemezsiniz Komutu Silebilirsiniz