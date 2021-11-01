PORT=3000

API_V1_PREFIX=/api/v1

SALT=$2b$10$UsguRYFFrdVauNbWHgBj/O
JWT_SECRET=x2Lvg3D6bbxj0PBIAjXSJA3DgOw2er1dUPuOihV2DU2uBag0HM

ACOUNT_FACTORY_BASE_URL=https://www.appstechlab.com
REBECCA_FACTORY_BASE_URL=https://www.api.rebeccafactory.appstechlab.com
QB_FACTORY_BASE_URL=https://www.api.qbfactory.appstechlab.com

PUSHER_APP_ID=1252147
PUSHER_KEY=f965f8f321e836a46208
PUSHER_SECRET=47ab24612b3d3bfcdcc3
PUSHER_CLUSTER=eu

SERVICE_PRIVATE_KEY=$2b$10$UsguRYFFrdVauNbWHgBj/OvvYEwhrqY5LSuEB9kIYWftkwlQ40ov.

module.exports = {
  apps: [
    {
      name: 'main',
      script: './dist/main.js',
      instances: 'max',
      watch: true,
      broadcast_logs: true,
      env: {
        NODE_ENV: 'production',
        PORT: 3000,

        API_V1_PREFIX: '/api/v1',

        SALT: '$2b$10$UsguRYFFrdVauNbWHgBj/O',
        JWT_SECRET: 'x2Lvg3D6bbxj0PBIAjXSJA3DgOw2er1dUPuOihV2DU2uBag0HM',

        ACOUNT_FACTORY_BASE_URL: 'https://www.appstechlab.com',
        REBECCA_FACTORY_BASE_URL: 'https://www.api.rebeccafactory.appstechlab.com',
        QB_FACTORY_BASE_URL: 'https://www.api.qbfactory.appstechlab.com',

        PUSHER_APP_ID: '1252147',
        PUSHER_KEY: 'f965f8f321e836a46208',
        PUSHER_SECRET: '47ab24612b3d3bfcdcc3',
        PUSHER_CLUSTER: 'eu',

        SERVICE_PRIVATE_KEY:
          '$2b$10$UsguRYFFrdVauNbWHgBj/OvvYEwhrqY5LSuEB9kIYWftkwlQ40ov.',
      },
    },
  ],
};
