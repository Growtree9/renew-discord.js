import WebSocket from 'ws';
import axios, {AxiosResponse} from 'axios';
import {ClientUser} from "./ClientUser";
import {IntentsManager} from "../managers/IntentsManager";

interface GatewayResponse {
    url: string;
}

export class Bot {
    private socket: WebSocket | null = null;
    private heartbeatInterval: NodeJS.Timeout | null = null;
    private intentsManager: IntentsManager;
    public user: ClientUser | null = null;

    constructor(intentsManager: IntentsManager) {
        this.intentsManager = intentsManager;
    }

    public async login(token: string): Promise<void> {
        this.user = new ClientUser(token);

        try {
            const { url } = await this.getGatewayUrl(token);
            await this.connectToGateway(url, token);
        } catch (error) {
            console.error('Failed to start bot:', error);
            throw error;
        }
    }

    private async getGatewayUrl(token: string): Promise<GatewayResponse> {
        try {
            const response: AxiosResponse<any, any> = await axios.get('https://discord.com/api/v10/gateway/bot', {
                headers: {
                    "Authorization": `Bot ${token}`
                }
            });

            return response.data as GatewayResponse;
        } catch (error) {
            console.error('Failed to get gateway URL:', error);
            throw error;
        }
    }

    private connectToGateway(url: string, token: string): void {
        this.socket = new WebSocket(url);

        this.socket.on('open', (): void => {
            console.log('WebSocket connection established');
            this.identify(token);
        });

        this.socket.on('message', (data): void => {
            const packet = JSON.parse(data.toString());

            switch (packet.op) {
                case 10:
                    this.startHeartbeat(packet.d.heartbeat_interval);
                    break;
                default:
                    break;
            }
        });

        this.socket.on('close', (): void => {
            console.log(`WebSocket connection closed.`);
            this.reconnect(token);
        });

        this.socket.on('error', (error: Error): void => {
            console.error('WebSocket error:', error);
        });
    }

    private startHeartbeat(interval: number): void {
        this.heartbeatInterval = setInterval((): void => {
            this.sendHeartbeat();
        }, interval);
    }

    private sendHeartbeat(): void {
        this.socket?.send(JSON.stringify({ op: 1, d: null }));
    }

    private identify(token: string): void {
        this.socket?.send(JSON.stringify({
            op: 2,
            d: {
                token: token,
                intents: this.intentsManager.getIntents(),
                properties: {
                    $os: 'linux',
                    $browser: 'my_library',
                    $device: 'my_library'
                }
            }
        }));
    }

    private reconnect(token: string): void {
        if (this.heartbeatInterval !== null) {
            clearInterval(this.heartbeatInterval);
        }
        this.heartbeatInterval = null;

        this.login(token);
    }
}