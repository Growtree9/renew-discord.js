import { Bot } from './structures/Bot';

const token: string = 'MTE0MDMzNjAwNDcyNTc0MzYxNg.G-lEKw.8-hQqt7GPfrhXJQkor-0SJExYMiQB6MhJBNonI';
const bot: Bot = new Bot();

bot.login(token).then((): void => {
    console.log(bot.user.username)
});