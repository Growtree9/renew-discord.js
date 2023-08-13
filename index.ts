import {Bot} from './structures/Bot';
import {Intent, IntentsManager} from "./managers/IntentsManager";

const token: string = '';
const botIntents: Intent[] = [Intent.GUILDS, Intent.GUILD_MESSAGES, Intent.GUILD_MEMBERS];
const intentsManager: IntentsManager = new IntentsManager(botIntents);
const bot: Bot = new Bot(intentsManager);

bot.login(token).then((): void => {
    console.log(bot.user.username);
});
