const Commentaire = require("../models/Commentaire");
const User = require("../models/User");

// recuperation des Commentaires
const getCommentaire = async (req, res) => {
  try {
    const listCommentaire = await Commentaire.findAll();

    if (listCommentaire.length === 0) {
      return res.status(404).json({ error: "Aucun commentaire trouvé" });
    }
    const commentaire = await Commentaire.findAll();
    res.status(200).json(commentaire);
  } catch (error) {
    res.status(400).json({
      error: "Impossible de récupérer les commentaires",
      details: error.message,
    });
  }
};

// recuperation d'un Commentaire
const getCommentaireById = async (req, res) => {
  try {
    const commentaire = await Commentaire.findByPk(req.params.id);
    if (!commentaire) {
      return res.status(404).json({ error: "Commentaire non trouvé" });
    }
    res.status(200).json(commentaire);
  } catch (error) {
    res.status(400).json({
      error: "Impossible de récupérer le commentaire",
      details: error.message,
    });
  }
};

const createCommentaire = async (req, res) => {
  try {
    const { content, userId } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        error: "Utilisateur introuvable",
        message: `Aucun utilisateur trouvé avec l'ID ${userId}`,
      });
    }

    // Créer le commentaire si l'utilisateur existe
    const commentaire = await Commentaire.create({ content, userId });
    res.status(201).json(commentaire);
  } catch (error) {
    res.status(400).json({
      error: "Impossible de créer le commentaire",
      details: error.message,
    });
  }
};

// modification d'un Commentaire
const modifyCommentaire = async (req, res) => {
  try {
    const { content, userId } = req.body;
    const commentaire = await Commentaire.findByPk(req.params.id);
    if (!commentaire) {
      return res.status(404).json({ error: "Commentaire non trouvé" });
    }
    await Commentaire.update({ content, userId });
    res.status(200).json(commentaire);
  } catch (error) {
    res.status(400).json({
      error: "Impossible de modifier le commentaire",
      details: error.message,
    });
  }
};

// suppression d'un Commentaire
const deleteCommentaire = async (req, res) => {
  try {
    const commentaire = await Commentaire.findByPk(req.params.id);
    if (!commentaire) {
      return res.status(404).json({ error: "Commentaire non trouvé" });
    }
    await commentaire.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({
      error: "Impossible de supprimer le commentaire",
      details: error.message,
    });
  }
};

module.exports = {
  getCommentaire,
  getCommentaireById,
  createCommentaire,
  modifyCommentaire,
  deleteCommentaire,
};
