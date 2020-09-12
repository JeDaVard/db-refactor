## What you can do
So you can connect to your SQL db, get big amount of 
data as an array by writing whatever query you need, use it as an array
or choose to save it as json. You can also process the json file
you just created or any json array to remove or to keep any fields you
need.

## How you can do

####**Class DbExport**
#####
Run an instance
~~~
const options = {
    outputFileName: 'users',
    toJson: true,
};

const dbExport = new DbExporter(credentials, options);
~~~
When **toJson** is **true**, **getData** method will save a json file in **projectFolder/data** folder, and return 
data as string, otherwise will not save, and will return array. You can name your file with **options.outputFileName**.
#####
Default options
`outputFileName: 'data', toJson: false`
##
Write a query and get the data. Note **getData** method returns a promise
#####
~~~
const query = 'SELECT * FROM public.users ORDER BY id ASC LIMIT 100';
dbExport.getData(query)
    .then((r: string | Object[] | void) => {
        if (r) console.log(r.length)
    })
    .catch(console.log)
~~~
#
####**Class DbAdapter**

Give the path of you json file. For exemple if you used the **DbExport** for saving your json, you can use the **outputPath** property of the same instance.

`const dataAdapter = new DataAdapter(dbExport.outputPath);`
##
You can count your documents by using its **count** property

`dataAdapter.count`
##

And finaly you can process your data by choose some 
fields to keep only, or fields to be removed. And 
then the new data will be save as new json fine in 
the same folder, and the method will return new array.
To keep the only fields you want, pass a string of fields to the 
**dbAdapter.process** like **'name id'** (don't forget spaces between fields).
The following example will keep only names and ids.
~~~
const whatToKeep = 'name id';
let data = dataAdapter.process(whatToKeep);
 console.log(data); // [{name: 'james', id: '1'},...]
~~~
In case you just want to remove some fields, you can write **"- "** at the beginning like so.

`const whatToRemove = '- password email';`