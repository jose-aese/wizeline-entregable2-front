const dotenv = require('dotenv');

dotenv.config({
  path: './development.env'
});

console.log( process.env['HOST'] )
export const environment = {
  production: true,
  host:  process.env['HOST'] || null
};

