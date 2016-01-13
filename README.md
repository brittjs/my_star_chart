**As a collaborative project marking the end of the Lighthouse Labs web development bootcamp this app uses koa, a Nodejs framework, and JavaScript to allow users to create a list of tasks, recieve stars for each completed task, and share their achievements with friends. This project is still in progress.**

quick start
=============

**Install dependencies:**

```sh
$ npm install
```

**Create your own local db:**

```sh
$ dropdb   starchart
$ createdb starchart
$ sequelize db:migrate
$ sequelize db:seed
```

change this line in `config/config.json` to use the username for your local machine

```sh
3:  "username": "okay",
```

**Run:**

```sh
$ npm start
```

Open [http://localhost:3000](http://localhost:3000)
