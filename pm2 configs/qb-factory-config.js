module.exports = {
  apps: [
    {
      name: 'java',
      cwd: '.',
      script: 'usr/bin/java',
      args: ['-jar', '/root/qb_factory/factory-1.0-SNAPSHOT.jar'],
      watch: ['/root/qb_factory/factory-1.0-SNAPSHOT.jar'],
      node_args: [],
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      exec_interpreter: '',
      instances: 'max',
      exec_mode: 'cluster',
    },
  ],
};
