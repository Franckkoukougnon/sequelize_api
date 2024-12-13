const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/database");
const User = require("./models/User");
const Commentaire = require("./models/Commentaire");
const app = express();
const userRoutes = require("./routes/UserRoute");
const commentaireRoutes = require("./routes/CommentaireRoute");

// Configurer body-parser pour parser le JSON
app.use(bodyParser.json());

// Connexion à la base de données
db.authenticate()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

// Utilisation des routes
app.use("/users", userRoutes);
app.use("/comments", commentaireRoutes);

// Point de test
app.get("/test", (req, res) => {
  res.send("Hello World");
});

// Définir les relations après l'importation des modèles
User.hasMany(Commentaire, { foreignKey: "userId" });
Commentaire.belongsTo(User, { foreignKey: "userId" });

// Synchronisation des modèles
db.sync()
  .then(() => console.log("Modèles synchronisés avec la base de données"))
  .catch((err) =>
    console.error("Erreur de synchronisation des modèles :", err)
  );

// Point de départ (route de test)
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Démarrer le serveur
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
