const WebFramework = require('@midwayjs/web').Framework;
const web = new WebFramework().configure({
  port: 7001,
  hostname: '0.0.0.0',
});

const { Bootstrap } = require('@midwayjs/bootstrap');
Bootstrap.load(web).run();
