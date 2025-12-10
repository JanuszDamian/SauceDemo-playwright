export class Logger {
    private logs: string[] = [];

    log(message: string) {
        const timestamp = new Date().toISOString();
        this.logs.push(`[${timestamp}] ${message}`);
    }

    getLogs() {
        return this.logs.join("\n");
    }
}
