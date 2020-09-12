import config from './config';
// Run configs
config();

import { DbExporter } from './DbExport';
import { DataAdapter } from './DbAdapter';

// Import db credentials
import credentials from './config/db';

const options = {
    outputFileName: 'testUsers',
    toJson: true,
};

const dbExport = new DbExporter(credentials, options);

// dbExport.getData('SELECT * FROM public.users ORDER BY id ASC LIMIT 100')
//     .then((r: string | Object[] | void) => {
//         if (r) console.log(r.length)
//     })
//     .catch(console.log)

const dataAdapter = new DataAdapter(dbExport.outputPath);

let data = dataAdapter.process('- name id tiktok_id')[0];
console.log(data);
