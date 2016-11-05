var Discord = require("discord.js");
var bot = new Discord.Client();
var prefix = "?" //You can change this to a prefix you like but, PLEASE DON'T USE "!"
var general = require("./commands/general.js")
if(process.env.BOT_TOKEN){
  var token = process.env.BOT_TOKEN
}else{
  // Put your token below if you are not using an environment variable
  var token = "TOKEN"

}

if(process.env.OWNER_ID){
  var owner = String(process.env.OWNER_ID)
}else{

// Put your ID here
var owner = "ID"

}

bot.on("ready", () => {
    console.log("Bot is online and ready on " + bot.guilds.size + " servers!");
});

bot.on("message",function(msg){
if(msg.author.id === owner){
  if(msg.content === prefix+"reload"){
    try{
      delete require.cache[require.resolve("./commands/general.js")]
      general = require("./commands/general.js")
      msg.channel.sendMessage("Files reloaded!")
    }catch(err){
      msg.channel.sendMessage("Could not reload files, error: ```"+err.stack+"```")
    }
  }
}
})

bot.on("message", function(msg){


  var env = {
    "bot":bot,
    "msg":msg,
    "general":general,
    "process":process,
    "prefix":prefix
  }

  var input = msg.content.toLowerCase();
    if (!input.startsWith(prefix)) return;
    if (msg.author.bot) return;

    var input = msg.content.toLowerCase().replace(prefix, "");
    for(var x of Object.keys(general)){
      if(input.startsWith(x)){
        general[x].process(bot,msg,env);
        break;
      }
    }


});

bot.login(token);
