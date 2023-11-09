import { comments as commentModel } from "../model/comments.model.js";
import { validationResult } from "express-validator";

export const createComment = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.array() });
    }

    const { description, UserId, publicationId } = req.body;

    const result = await commentModel.create({
      description,
      UserId,
      publicationId,
    });

    return res.status(200).json({
      message: "comment created successfully",
      comment: result,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const editComment = async (req, res) => {
  try {
    const { Id } = req.body;

    const comment = await commentModel.findOne({ where: { Id: Id } });

    if (!comment) {
      return res.status(400).json({ message: "Invalid Data" });
    }

    // TODO: Agregar imagen
    const updateComment = await commentModel.update(
      {
        description: description,
      },
      { where: { Id: Id } }
    );

    return res.status(200).json({
      message: "comment Updated successfully",
      comment: updateComment.dataValues,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { Id } = req.body;

    const commnet = await commentModel.findOne({ where: { Id: Id } });

    if (!commnet) {
      return res.status(400).json({ message: "Invalid Data" });
    }

    await commentModel.destroy({ where: { Id: Id } });

    return res.status(200).json({
      message: "comment delete successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
