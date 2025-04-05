const { Bot, Keyboard } = require("grammy");
require("dotenv").config();

const bot = new Bot(process.env.BOT_API_KEY); // <-- place your token inside this string

bot.api.setMyCommands([
  {
    command: "start",
    description: "Запуск бота",
  },
  {
    command: "cat",
    description: "Получить кота",
  },
  {
    command: "help",
    description: "Помощь в получении кота",
  },
  {
    command: "credits",
    description: "Инфо о боте",
  },
]);

bot.command("start", async (ctx) => {
  const shareKeyboard = new Keyboard().text("🐱 Дай кота").resized();
  await ctx.reply("Привет, хочешь получить кота? Нажми на кнопку или отправь /cat :3", {
    reply_markup: shareKeyboard,
  });
});

bot.command("help", async (ctx) => {
  await ctx.reply("Нажми на кнопку или отправь /cat и получишь кота :3");
});

bot.command("credits", async (ctx) => {
  await ctx.reply("Автор бота: @davidleyn");
});

bot.command("cat", async (ctx) => {
  const catImage = await getCatImage();
  await ctx.replyWithPhoto(catImage);
});

bot.hears(/кот/, async (ctx) => {
  const catImage = await getCatImage();
  await ctx.replyWithPhoto(catImage);
});

bot.on("message", (ctx) => ctx.reply("Я тебя не понял >_<"));

async function getCatImage() {
  const catData = await fetch("https://api.thecatapi.com/v1/images/search");
  const catDataProcessed = await catData.json();
  const catImage = catDataProcessed[0].url;
  return catImage;
}

bot.start();
