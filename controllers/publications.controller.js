import { publications as publicationModel } from "../model/publications.model.js";
import { validationResult } from "express-validator";

//TODO mejorar el manejo de las imagenes y Agregar validaciones.

export const Publication = async (req, res) => {
  try {
    const Id = req.body.Id;

    const publication = await publicationModel.findOne({ where: { Id: Id } });

    if (!publication) {
      return res.status(204).json({ message: "No Content" });
    } else {
      return res.status(201).json({ publication: publication });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getPublications = async (req, res) => {
  try {
    const publication = await publicationModel.findAll({ limit: 50 });

    if (publication.length === 0) {
      return res.status(204).json({ message: "No Content" });
    } else {
      return res.status(200).json({ publication: publication });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createPublication = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.array() });
    }

    const { title, description, requirements, benefits, address, UserId } =
      req.body;

    //para no generar un error a la hora de no enviar una Img
    const publicationsImg = req.file
      ? req.file.path.replace("\\", "/")
      : "../images/code-img";

    const result = await publicationModel.create({
      title,
      description,
      requirements,
      benefits,
      address,
      UserId,
    });

    return res.status(200).json({
      message: "Publication created successfully",
      Publication: result,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const editPublication = async (req, res) => {
  try {
    const { Id, title, description, requirements, benefits, address } =
      req.body;

    const publication = await publicationModel.findOne({ where: { Id: Id } });

    if (!publication) {
      return res.status(400).json({ message: "Invalid Data" });
    }

    // TODO: Agregar imagen
    const updatepublication = await publicationModel.update(
      {
        title: title,
        description: description,
        requirements: requirements,
        benefits: benefits,
        address: address,
      },
      { where: { Id: Id } }
    );

    return res.status(200).json({
      message: "publication Updated successfully",
      publication: updatepublication.dataValues,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deletePublication = async (req, res) => {
  try {
    const { Id } = req.body;

    const publication = await publicationModel.findOne({ where: { Id: Id } });

    if (!publication) {
      return res.status(400).json({ message: "Invalid Data" });
    }

    await publicationModel.destroy({ where: { Id: Id } });

    return res.status(200).json({
      message: "publication delete successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
