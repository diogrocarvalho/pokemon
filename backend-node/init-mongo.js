db.createUser({
  user: "diogo",
  pwd: "password_app_pokemon",
  roles: [
    {
      role: "readWrite",
      db: "pokemon",
    },
  ],
});
db.createCollection("pokemon");
