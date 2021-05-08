const env = process.env;

const config = {
  db: {
    host: env.DB_HOST || 'freedb.tech',
    user: env.DB_USER || 'freedbtech_alejomaf',
    password: env.DB_PASSWORD || 'alejo1999',
    database: env.DB_NAME || 'freedbtech_LibraryManager'
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};


module.exports = config;