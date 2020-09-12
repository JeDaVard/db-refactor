import config from './config';
// Run configs
config();

import { DbExporter } from './DbExport';
import { DataAdapter } from './DbAdapter';

// Import db credentials
import credentials from './config/db';

// Override default options
const options = {
    outputFileName: 'testUsers',
    toJson: true,
};
// Run an instance and pass the credentials
// const dbExport = new DbExporter(credentials, options);

// Write a query and get the data as described in readMe
// dbExport.getData('SELECT * FROM public.users ORDER BY id ASC LIMIT 100')
//     .then((r: string | Object[] | void) => {
//         if (r) console.log(r.length)
//     })
//     .catch(console.log)

//Pass the path of your saved json to DataAdapter
// const dataAdapter = new DataAdapter(dbExport.outputPath);

// Count your docs
// console.log(dataAdapter.count)

// Remove names and ids, then save as new json
// const whatToRemove = '- name id';
// let data = dataAdapter.process(whatToRemove);
// console.log(data);
