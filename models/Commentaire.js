const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Importer correctement le modèle User
const User = require("./User");

class Commentaire extends Model {}

Commentaire.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // Nom de la table Users
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Commentaire",
  }
);

// Définir la relation plusieurs-à-un (un commentaire appartient à un utilisateur)
Commentaire.belongsTo(User, {
  foreignKey: "userId", // Utiliser la clé étrangère userId
});

module.exports = Commentaire;
