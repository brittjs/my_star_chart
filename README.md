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