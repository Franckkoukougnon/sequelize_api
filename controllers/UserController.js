const User = require("../models/User");

// recuperation des Users
const getUser = async (req, res) => {
  try {
    const user = await User.findAll();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      error: "Impossible de récupérer les utilisateurs",
      details: error.message,
    });
  }
};

// recuperation d'un User

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    const fullName = user.getFullName();

    res.status(200).json({
      id: user.id,
      fullName,
    }); // La réponse réussie est envoyée ici si l'utilisateur existe
  } catch (error) {
    res.status(400).json({
      error: "Impossible de récupérer l'utilisateur",
      details: error.message,
    });
  }
};

// creation d'un User
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const user = await User.create({ firstName, lastName, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({
      error: "Impossible de créer l'utilisateur",
      details: error.message,
    });
  }
};

// modification d'un User
const modifyUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    await user.update({ firstName, lastName, email });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      error: "Impossible de modifier l'utilisateur",
      details: error.message,
    });
  }
};

// suppression d'un User
const deletedUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({
      error: "Impossible de supprimer l'utilisateur",
      details: error.message,
    });
  }
};

module.exports = { getUser, getUserById, createUser, modifyUser, deletedUser };
