export enum Intent {
    GUILDS = 'GUILDS',
    GUILD_MEMBERS = 'GUILD_MEMBERS',
    GUILD_BANS = 'GUILD_BANS',
    GUILD_EMOJIS = 'GUILD_EMOJIS',
    GUILD_INTEGRATIONS = 'GUILD_INTEGRATIONS',
    GUILD_WEBHOOKS = 'GUILD_WEBHOOKS',
    GUILD_INVITES = 'GUILD_INVITES',
    GUILD_VOICE_STATES = 'GUILD_VOICE_STATES',
    GUILD_PRESENCES = 'GUILD_PRESENCES',
    GUILD_MESSAGES = 'GUILD_MESSAGES',
    GUILD_MESSAGE_REACTIONS = 'GUILD_MESSAGE_REACTIONS',
    GUILD_MESSAGE_TYPING = 'GUILD_MESSAGE_TYPING',
    DIRECT_MESSAGES = 'DIRECT_MESSAGES',
    DIRECT_MESSAGE_REACTIONS = 'DIRECT_MESSAGE_REACTIONS',
    DIRECT_MESSAGE_TYPING = 'DIRECT_MESSAGE_TYPING',
}

export class IntentsManager {
    private readonly intents: Intent[] = [];

    constructor(initialIntents: Intent[] = []) {
        this.intents = initialIntents;
    }

    public getIntents(): string[] {
        return this.intents;
    }
}