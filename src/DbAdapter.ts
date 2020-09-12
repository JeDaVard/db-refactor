import { readFileSync } from 'fs';

export class DataAdapter {
    constructor(public inputPath: string) {}

    get count() {
        return this.read().length;
    }

    read() {
        return JSON.parse(readFileSync(this.inputPath, 'utf8'));
    }

    process(processFields: string) {
        let columns = processFields.split(' ');
        const onlyRemove = columns[0] === '-';
        if (onlyRemove) columns.splice(0, 1);

        const data = this.read().map((row: any) => {
            const rowToBeProcessed = { ...row };

            Object.keys(rowToBeProcessed).forEach((r: string) => {
                onlyRemove && columns.includes(r) && delete rowToBeProcessed[r];
                !onlyRemove && !columns.includes(r) && delete rowToBeProcessed[r];
            });

            return rowToBeProcessed;
        });
        return data;
    }
}
