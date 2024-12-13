const express = require("express");
const router = express.Router();
const {
  getCommentaire,
  getCommentaireById,
  createCommentaire,
  modifyCommentaire,
  deleteCommentaire,
} = require("../controllers/CommentaireController");

router.get("/", getCommentaire);
router.get("/:id", getCommentaireById);
router.post("/", createCommentaire);
router.put("/:id", modifyCommentaire);
router.delete("/:id", deleteCommentaire);

module.exports = router;
