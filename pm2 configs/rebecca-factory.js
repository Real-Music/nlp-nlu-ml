module.exports = {
  apps: [
    {
      name: 'main',
      cwd: '.',
      script: 'main.py',
      args: '--interpreter=/root/rebecca-factory/venv/bin/uvicorn',
      node_args: [],
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      exec_interpreter: '',
      broadcast_logs: true,
      env: {
        SQLALCHEMY_DATABASE_URL:
          'mysql://doadmin:tbddNAgqf3pvrppQ@mysql-appstechlabs-do-user-3398155-0.b.db.ondigitalocean.com:25060/rebecca-factory',

        PORT: '5001',
        ENV: 'PROD',

        API_VERSION_PREFIX: '/api/v1',
        RAMSES_VERSION_PREFIX: '1.0',
        API_HASH_KEY:
          '$2b$10$UsguRYFFrdVauNbWHgBj/OQYjs3.MfeBVShXynPsEace4cTsyIIPy',

        GEARMAN_CLIENT_HOST_LIST: '127.0.0.1:4730',
        GEARMAN_WORKER_HOST_LIST: '127.0.0.1:4730',

        SERVICE_PRIVATE_KEY:
          '$2b$10$UsguRYFFrdVauNbWHgBj/OvvYEwhrqY5LSuEB9kIYWftkwlQ40ov.',

        PUSHER_APP_ID: '1252147',
        PUSHER_APP_KEY: 'f965f8f321e836a46208',
        PUSHER_APP_SECRET: '47ab24612b3d3bfcdcc3',
        PUSHER_APP_CLUSTER: 'eu',
      },
    },
  ],
};

