const TelegramBot = require('node-telegram-bot-api');
const {gameOptions, againOptions} = require('./option.js')


const token = '7527782705:AAEmmW0QuRU3xnblERChvcR8PS8IfgbUAmY';

const bot = new TelegramBot(token, {polling: true});

const obj = {};


const startGame = async (chatId) => {
  await bot.sendMessage(chatId, "Bot bir sonni o'yladi, u qaysiki, 0 dan 9 gacha bo'lgan son, aytinchi u nechchi sonini o'yladi?");
  const randomNumber = Math.floor(Math.random() * 10);
obj[chatId] = randomNumber;
await bot.sendMessage(chatId, "To'g'ri sonni toping", gameOptions);
}


const bootstrap = () => {

  bot.setMyCommands([
    {
     command: '/start',
     description: "Bot haqida ma'lumot",
    },
   
    {
     command: '/info',
     description: "Batafsilroq",
    },
   
    {
     command: '/game',
     description: "O'yin boshlash",
    }
   ])

   bot.on('message', async (msg) => {
    console.log(msg);
    const text = msg.text;
   /* console.log(msg) */
    const chatId = msg.chat.id;
   
    if(text === "/start") {
     await bot.sendSticker(chatId,
      'https://tlgrm.eu/_/stickers/d3b/00a/d3b00a8e-c214-4c5f-a8f1-abc8078559d6/5.webp');
       await bot.sendPhoto( chatId, 'https://yandex.uz/images/search?pos=9&from=tabbar&img_url=https%3A%2F%2Flookw.ru%2F8%2F833%2F1476174200-10.jpg&text=image+linux&rpt=simage&lr=10942')
     return bot.sendMessage(chatId, `Assalomu alaykum hurmatli ${msg.from?.first_name}, sizni o'quv botimizda ko'rib turganimizdan xursandmiz. `)
    }
   
   
    if(text === "/info") {
     return bot.sendMessage(chatId, `Sizning telegram username bu ${msg.from?.username}, sizning ismingiz esa ${msg.from?.first_name}`)
    }

if(text === "/game") {
return startGame(chatId)
  
}

    
   bot.sendMessage(chatId, "Yozishda kalit so'zlardan foydalaning, yoki '/' belgisidan, uyam oxshmasa ashetda 'Menu' turibdi ashini bosib o'zizga kerakli tanlovni tanlang, boshimni qottirmasdan...")
   
   });


   bot.on("callback_query", msg => {
    // console.log(callback_query);
    const data = msg.data;
    const chatId = msg.message.chat.id;

if(data === "/again") {
  return startGame(chatId)
}

if (data == obj[chatId]) {
  bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/d3b/00a/d3b00a8e-c214-4c5f-a8f1-abc8078559d6/192/17.webp');
return bot.sendMessage(
    chatId, `Tabriklaymiz siz to'g'ri javob berdingiz, bot ${obj[chatId]} sonini o'ylagan edi`, againOptions
  )

}else {
  bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/d3b/00a/d3b00a8e-c214-4c5f-a8f1-abc8078559d6/192/28.webp');
 
  return  bot.sendMessage(chatId, ` Siz tanlagan son ${data}, bot ${obj[chatId]} sonini o'ylagan edi.`, againOptions)

  
}

 
    /* console.log(msg); */
   })
}


bootstrap()


