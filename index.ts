import {Bot} from './structures/Bot';
import {Intent, IntentsManager} from "./managers/IntentsManager";

const token: string = 'MTE0MDMzNjAwNDcyNTc0MzYxNg.G-lEKw.8-hQqt7GPfrhXJQkor-0SJExYMiQB6MhJBNonI';
const botIntents: Intent[] = [Intent.GUILDS, Intent.GUILD_MESSAGES, Intent.GUILD_MEMBERS];
const intentsManager: IntentsManager = new IntentsManager(botIntents);
const bot: Bot = new Bot(intentsManager);

bot.login(token).then((): void => {
    console.log(bot.user.username);
});