import { Client } from 'pg';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const defaultOptions = {
    outputFileName: 'data',
    toJson: false,
};

interface ClientConfig {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
    ssl?: {
        rejectUnauthorized: boolean;
    };
}

interface DbExport {
    options: typeof defaultOptions;
    getData(query: string): Promise<string | Object[] | void>;
}

export class DbExporter implements DbExport {
    constructor(private credentials: ClientConfig | string, public options = defaultOptions) {}

    outputPath = path.resolve(`data/${this.options.outputFileName}.json`);
    toJson = this.options.toJson;

    private client: any = null;

    private connect(): void {
        const credentials =
            typeof this.credentials === 'string'
                ? { connectionString: this.credentials }
                : this.credentials;

        this.client = new Client(credentials);
        this.client.connect();
    }
    async getData(query: string) {
        try {
            this.connect();
            const res = await this.client.query(query);
            const data = this.toJson
                ? (JSON.stringify(res.rows) as string)
                : (res.rows as Object[]);

            if (typeof data === 'string') {
                writeFileSync(this.outputPath, data);
            }

            return data;
        } catch (e) {
            console.log('ERROR: ', e);
        }
    }
}
