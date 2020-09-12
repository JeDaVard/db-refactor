import dotenv from 'dotenv'

export default () => {
    const defaultConfig = undefined;
    const devConfig = { path: '.env.execution'}

    const options = process.env.NODE_ENV === 'execution' ? defaultConfig : devConfig;

    return dotenv.config(options)
}