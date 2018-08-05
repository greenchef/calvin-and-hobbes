const dotenv = require('dotenv');

dotenv.load({ path: `.env.${process.env.NODE_ENV}` });
