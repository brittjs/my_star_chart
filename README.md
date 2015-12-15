
===========

So far, just a skeleton. 

quick start
=============

**Install dependencies:**

```sh
$ npm install
```

**Create your own db:**
create database and load in data

```sh
$ createdb star-chart
$ psql star-chart < star-chart.sql
```

change this line in `config/default.js`    

`app.use(koaPg('postgres://username:password@localhost:5432/star-chart'));`

(use the username and password for your local machine)

**run:**

```sh
$ npm start
```

Open [http://localhost:3000](http://localhost:3000)

Components
==========

Uses following npm package : 

* `config` for config handling.
* `koa-router` for request routing purpose.
* `koa-static` for handling static content or assets.
* `koa-views` for template switching.
* `ect` for default templatin engine due to fast performance.
* `koa-pg` to connect to PostgreSQL.