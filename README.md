
===========

So far, just a skeleton. 

quick start
=============

**Install dependencies:**

```sh
$ npm install
```

**Create your own db:**
create bookstore database and load in data using this script

`https://gist.githubusercontent.com/kvirani/7742279/raw/bf24ac9bb25f2bfeb5200856a3c22f7733ef8e08/bookstore.sql`

```sh
$ createdb bookstore
$ psql bookstore < bookstore.sql
```

change this line in `index.js`    

`app.use(koaPg('postgres://username:password@localhost:5432/bookstore'));`

(use the username and password for your local machine)

**run:**

```sh
$ npm start
```










npm install

node index.js

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