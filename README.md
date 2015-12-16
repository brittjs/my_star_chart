quick start
=============

**Install dependencies:**

```sh
$ npm install
```

**Create your own local db:**

```sh
$ createdb starchart
$ sequelize db:migrate
$ sequelize db:create
```

change this line in `config/config.json` to use the username for your local machine

```sh
   "username": "okay",
```

**Run:**

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