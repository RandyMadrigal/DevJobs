import { users } from "../model/users.model.js";
import { groups as groupsModel } from "../model/groups.model.js";
import { publications as publicationModel } from "../model/publications.model.js";
import { members as memberModel } from "../model/members.model.js";
import { validationResult } from "express-validator";

//TODO mejorar el manejo de las imagenes y Agregar validaciones.

export const group = async (req, res) => {
  try {
    const Id = req.body.Id;

    const group = await groupsModel.findOne({ where: { Id: Id } });

    if (!group) {
      return res.status(204).json({ message: "No Content" });
    } else {
      return res.status(201).json({ group: group });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getGroups = async (req, res) => {
  try {
    const group = await groupsModel.findAll({
      include: [{ model: publicationModel }],
    });

    if (group.length === 0) {
      return res.status(204).json({ message: "No Content" });
    } else {
      return res.status(200).json({ group: group });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createGroup = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.array() });
    }

    const { title, description, UserId, publicationId } = req.body;

    const existingGroup = await groupsModel.findOne({
      where: { title: title },
    });

    if (existingGroup) {
      return res
        .status(400)
        .json({ message: "the group title already exists" });
    }

    //para no generar un error a la hora de no enviar una Img
    const groupImg = req.file
      ? req.file.path.replace("\\", "/")
      : "../images/skill-logo";

    const result = await groupsModel.create({
      title,
      description,
      groupImg: groupImg,
      UserId,
      publicationId,
    });

    return res.status(200).json({
      message: "Group created successfully",
      Group: result,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const editGroup = async (req, res) => {
  try {
    const { Id, title, description, UserId } = req.body;

    const [group, existingTitle] = await Promise.all([
      groupsModel.findOne({
        where: { Id: Id, UserId: UserId },
      }),

      groupsModel.findOne({ where: { title: title } }),
    ]);

    if (!group || existingTitle) {
      return res.status(400).json({ message: "Invalid Data" });
    }

    // TODO: Agregar imagen
    const updateGroup = await groupsModel.update(
      {
        title: title,
        description: description,
      },
      { where: { Id: Id } }
    );

    return res.status(200).json({
      message: "Group Updated successfully",
      Group: updateGroup.dataValues,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteGroup = async (req, res) => {
  try {
    const { Id } = req.body;

    const group = await groupsModel.findOne({ where: { Id: Id } });

    if (!group) {
      return res.status(400).json({ message: "Invalid Data" });
    }

    await groupsModel.destroy({ where: { Id: Id } });

    return res.status(200).json({
      message: "Group delete successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMembers = async (req, res) => {
  try {
    const Id = req.body.Id;

    const group = await groupsModel.findOne({ where: { Id: Id } });

    //TODO devolver nombres de usuarios.
    if (!group) {
      return res.status(204).json({ message: "No Content" });
    } else {
      const result = await memberModel.findAll({ where: { groupId: Id } });
      return res.status(201).json({ Members: result });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
