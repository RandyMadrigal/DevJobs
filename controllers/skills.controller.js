import { skills as skillModel } from "../model/skills.model.js";
import { validationResult } from "express-validator";

//TODO mejorar el manejo de las imagenes y Agregar validaciones.

export const Skill = async (req, res) => {
  try {
    const Id = req.body.Id;

    const skill = await skillModel.findOne({ where: { Id: Id } });

    if (!skill) {
      return res.status(204).json({ message: "No Content" });
    } else {
      return res.status(201).json({ skill: skill });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getSkills = async (req, res) => {
  try {
    const skills = await skillModel.findAll();

    if (skills.length === 0) {
      return res.status(204).json({ message: "No Content" });
    } else {
      return res.status(200).json({ skill: skills });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createSkill = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.array() });
    }

    const { skillName, skillShortName, skillParent, UserId } = req.body;

    const [existingSkill, existingShortName] = await Promise.all([
      skillModel.findOne({ where: { skillName } }),
      skillModel.findOne({ where: { skillShortName } }),
    ]);

    if (existingSkill || existingShortName) {
      return res.status(400).json({ message: "Skill already exist" });
    }

    //para no generar un error a la hora de no enviar una Img
    const skillIcon = req.file
      ? req.file.path.replace("\\", "/")
      : "../images/skill-logo";

    const result = await skillModel.create({
      skillName,
      skillShortName,
      skillIcon: skillIcon,
      skillParent,
      UserId,
    });

    return res.status(200).json({
      message: "Skill created successfully",
      Skill: result,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const editSkill = async (req, res) => {
  try {
    const { Id, skillName, skillShortName, skillParent } = req.body;

    const skill = await skillModel.findOne({ where: { Id: Id } });

    if (!skill) {
      return res.status(400).json({ message: "Invalid Data" });
    }

    // TODO: Agregar imagen
    const updateSkill = await skillModel.update(
      {
        skillName: skillName,
        skillShortName: skillShortName,
        skillParent: skillParent,
      },
      { where: { Id: Id } }
    );

    return res.status(200).json({
      message: "Skill Updated successfully",
      Skill: updateSkill.dataValues,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const { Id } = req.body;

    const skill = await skillModel.findOne({ where: { Id: Id } });

    if (!skill) {
      return res.status(400).json({ message: "Invalid Data" });
    }

    await skillModel.destroy({ where: { Id: Id } });

    return res.status(200).json({
      message: "Skill delete successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
