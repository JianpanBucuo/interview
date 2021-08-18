const Koa = require('koa');
const app = module.exports = new Koa();

app.use(async function(ctx) {
    console.log(process.env.SYSNAME)
  ctx.body = 'Hello www.flydean.com';
});

if (!module.parent) app.listen(3000);


 