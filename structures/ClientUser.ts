import axios from 'axios';

export class ClientUser {
    public id: string | null = null;
    public username: string | null = null;
    public avatar: string | null = null;
    public discriminator: string | null = null;
    public publicFlags: number | null = null;
    public flags: number | null = null;
    public bot: boolean | null = null;
    public banner: string | null = null;
    public accentColor: string | null = null;
    public avatarDecoration: string | null = null;
    public bannerColor: string | null = null;
    public mfaEnabled: boolean | null = null;
    public locale: string | null = null;
    public premiumType: number | null = null;
    public email: string | null = null;
    public verified: boolean | null = null;
    public bio: string | null = null;

    constructor(private token: string) {
        this.fetchUserData();
    }

    private async fetchUserData() {
        try {
            const response = await axios.get('https://discord.com/api/v10/users/@me', {
                headers: {
                    "Authorization": `Bot ${this.token}`,
                    "Content-Type": "application/json"
                }
            });

            const data = response.data;

            this.id = data.id;
            this.username = data.username;
            this.avatar = data.avatar;
            this.discriminator = data.discriminator;
            this.publicFlags = data.public_flags;
            this.flags = data.flags;
            this.bot = data.bot;
            this.banner = data.banner;
            this.accentColor = data.accent_color;
            this.avatarDecoration = data.avatar_decoration;
            this.bannerColor = data.banner_color;
            this.mfaEnabled = data.mfa_enabled;
            this.locale = data.locale;
            this.premiumType = data.premium_type;
            this.email = data.email;
            this.verified = data.verified;
            this.bio = data.bio;
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    }
}