import { proyects as proyectModel } from "../model/proyects.model.js";

//TODO mejorar el manejo de las imagenes y Agregar validaciones.

export const getProyect = async (req, res) => {
  try {
    const Id = req.body.Id;

    const proyect = await proyectModel.findOne({ where: { Id: Id } });

    if (!proyect) {
      return res.status(204).json({ message: "No Content" });
    } else {
      return res.status(201).json({ proyect: proyect });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getProyects = async (req, res) => {
  try {
    const proyect = await proyectModel.findAll();

    if (proyect.length === 0) {
      return res.status(204).json({ message: "No Content" });
    } else {
      return res.status(200).json({ proyect: proyect });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createProyect = async (req, res) => {
  try {
    const { proyectName, proyectDesc, proyectUrl, proyectRepository, UserId } =
      req.body;

    //para no generar un error a la hora de no enviar una Img
    const proyectImages = req.file
      ? req.file.path.replace("\\", "/")
      : "../images/proyect-img";

    const result = await proyectModel.create({
      proyectName,
      proyectDesc,
      proyectUrl,
      proyectRepository,
      proyectImages: proyectImages,
      UserId,
    });

    return res.status(200).json({
      message: "Proyect created successfully",
      proyect: result,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const editProyect = async (req, res) => {
  try {
    const { Id, proyectName, proyectDesc, proyectUrl, proyectRepository } =
      req.body;

    const proyect = await proyectModel.findOne({ where: { Id: Id } });

    if (!proyect) {
      return res.status(400).json({ message: "Invalid Data" });
    }

    // TODO: Agregar imagen
    const updateProyect = await proyectModel.update(
      {
        proyectName: proyectName,
        proyectDesc: proyectDesc,
        proyectUrl: proyectUrl,
        proyectRepository: proyectRepository,
      },
      { where: { Id: Id } }
    );

    return res.status(200).json({
      message: "proyect Updated successfully",
      proyect: updateProyect.dataValues,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProyect = async (req, res) => {
  try {
    const { Id } = req.body;

    const proyect = await proyectModel.findOne({ where: { Id: Id } });

    if (!proyect) {
      return res.status(400).json({ message: "Invalid Data" });
    }

    await proyectModel.destroy({ where: { Id: Id } });

    return res.status(200).json({
      message: "proyect delete successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
