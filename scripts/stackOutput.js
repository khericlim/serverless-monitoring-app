const path = require('path');
const fs = require('fs-extra');
const dotenv = require('dotenv');
const os = require('os');

const replaceInEnvFile = async (file, envs) => {
  const keys = Object.keys(envs);
  if (keys.length <= 0) {
    return;
  }

  const envFile = path.join(__dirname, '../frontend', file);
  await fs.ensureFile(envFile);
  const content = await fs.readFile(envFile);
  const envConfig = await dotenv.parse(content);

  keys.forEach(key => {
    envConfig[key] = envs[key];
  });

  await fs.remove(envFile);
  await Promise.all(
    Object.keys(envConfig).map(key =>
      fs.appendFile(envFile, `${key}=${envConfig[key]}${os.EOL}`),
    ),
  );
};

const handler = async (data, serverless, _) => {
  //this handler creates the environment for the frontend based on the services deployment output
  const {} = data;
};

module.exports = { handler };
