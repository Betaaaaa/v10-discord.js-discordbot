var command = {}
var custom = require("../data/customcoms.json")
var fs = require("fs")

command.ping = {
  "name":"ping",
  "usage":"ping",
  "description":"Ping Pong command",
  "process":function(bot,msg,env){
    var now = Date.now()
    msg.channel.sendMessage("Pinging...").then(function(message){
      var end = Date.now()
      message.edit("Pong! `"+(end - now)+"ms`")
    })
  }
}

command.help = {
  "name":"help",
  "usage":"help",
  "description":"Sends you list of commands and help",
  "process":function(bot,msg,env){
    var e = msg.content.split(" ").splice(1).join(" ")
    if(e === ""){
    var help = "```ruby\nBot Commands:\n"
    var commands = env.general
    for(var i = 0;i<Object.keys(commands).length;i++){
      help += `${env.prefix}${commands[Object.keys(commands)[i]].usage} - ${commands[Object.keys(commands)[i]].description}\n`
    }
    for(var i = 0;i<Object.keys(env.admin).length;i++){
      help += `${env.prefix}${env.admin[Object.keys(env.admin)[i]].usage} - ${env.admin[Object.keys(env.admin)[i]].description}\n`
    }
    help += "\n\nFor more info on a command type "+env.prefix+"help [command name]\n```"
    msg.channel.sendMessage("Sending commands now...").then(function(message){
    msg.author.sendMessage(help).then(function(){
      message.edit("Commands in your DM's now!")
    })
  })
}else{

  if(env.general[e]){
    msg.channel.sendMessage(`\`\`\`\n${env.prefix}${env.general[e].usage}\n\n${env.general[e].description}\`\`\``)
  }
  if(env.admin[e]){
    msg.channel.sendMessage(`\`\`\`\n${env.prefix}${env.admin[e].usage}\n\n${env.admin[e].description}\`\`\``)
  }
  if(!env.admin[e] && !env.general[e]){
    msg.channel.sendMessage("Sorry I could not find command `"+e+"`")
  }
}
  }
}

command.git = {
  "name":"git",
  "usage":"git",
  "description":"Sends a link to the bot's GitHub repo",
  "process":function(bot,msg,env){
    msg.reply("check out my GitHub at https://github.com/Betaaaaa/v10-discord.js-discordbot !")
  }
}

command.info = {
  "name":"info",
  "usage":"info",
  "description":"Displays basic information about the bot.",
  "process":function(bot,msg,env){
    msg.reply("Repository created by **Beta ツ#2214**, made for the people.\nDevelopers:\n   Beta ツ#2214\n   ASIANBOI#4122\n   Joseph#5210\nContributors:\n   Marisa Kirisame#7740")
  }
}

command.addcom = {
  "name":"addcom",
  "usage":"addcom <name> <output>",
  "description":"Add a custom command to the current server!",
  "process":function(bot,msg,env){
      var args = msg.content.split(" ").splice(1).join(" ")
      var cmd = args.split(" ")[0]
      var output = args.replace(cmd+" ","")
      if(!custom[msg.guild.id]){
        custom[msg.guild.id] = {}
      }
      if(custom[msg.guild.id][cmd]){
        msg.channel.sendMessage("That command already exists!")
        return;
      }

      custom[msg.guild.id][cmd] = output
      console.log(custom)
      fs.writeFile("./data/customcoms.json",JSON.stringify(custom),function(err){
        if(err){
          msg.reply("Could not create custom command")
          console.log("Could not create custom command:\n\n"+err)
        }
        msg.channel.sendMessage("Ok! Custom command created")
      })
  }
}

command.delcom = {
  "name":"delcom",
  "usage":"delcom <command name>",
  "description":"Deletes custom commands from a server",
  "process":function(bot,msg,env){
    var cmd = msg.content.split(" ").splice(1).join(" ")
    if(!custom[msg.guild.id] || custom[msg.guild.id] === {}){
      msg.reply("This server has no custom commands :sob:")
      return
    }
    if(custom[msg.guild.id][cmd]){
      msg.reply("Deleting command")
      delete custom[msg.guild.id][cmd]
      fs.writeFile("../data/customcoms.json",JSON.stringify(custom),function(err){
      if(err) return
      })
    }else{
      msg.reply("That command does not exist!")
    }
  }
}

command.comlist = {
  "name":"comlist",
  "usage":"comlist",
  "description":"Lists all custom commands on a server",
  "process":function(bot,msg,env){
    if(!custom[msg.guild.id] || custom[msg.guild.id] === {} ){
      msg.channel.sendMessage("This server has no custom commands")
      return
    }

    var cmdtext = "```\nCustom Commands:\n"
    for(var i = 0;i < Object.keys(custom[msg.guild.id]).length;i++){
      cmdtext += `${env.prefix}${Object.keys(custom[msg.guild.id])[i]}\n`
    }
    cmdtext += "```"
    msg.channel.sendMessage(cmdtext)


  }
}

module.exports = command
