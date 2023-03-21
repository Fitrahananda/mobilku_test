const { PrismaClient } = require("@prisma/client");
const sharp = require("sharp");
const { imageKit } = require("../middleware/multer");

const prisma = new PrismaClient();
class Picture {
  static async Post(req, res) {
    try {
      let nameFile = Date.now();

      const { name } = req.body;
      if (!name) {
        throw { message: "plese input name" };
      }
      if (!req.file) {
        throw { message: "plese input file" };
      }

      const { buffer, originalname } = req.file;
      if (!originalname.match(/\.(jpg|jpeg|png)$/)) {
        throw { message: "Only image files are allowed!" };
      }
      let pictures = [];
      for (let i = 1; i < 3; i++) {
        let picture = "";
        if (i === 1) {
          picture = await sharp(buffer)
            .resize({ width: 500, height: 500 })
            .toBuffer();
        } else {
          picture = await sharp(buffer)
            .resize({ width: 1000, height: 1000 })
            .toBuffer();
        }
        const result = await imageKit(picture, `${nameFile}-${i}.jpg`);
        pictures.push(result.data.url);
      }
      await prisma.Picture.create({
        data: {
          name: name,
          url1: pictures[0],
          url2: pictures[1],
        },
      });
      res.status(201).json({
        message: "add picture success",
      });
    } catch (error) {
      console.log(error);
      // console.log(error);
    }
  }

  static async Get(req, res) {
    try {
      const picture = await prisma.Picture.findMany({
        select: {
          id: false,
          name: false,
          url1: true,
          url2: false,
        },
      });
      res.status(201).json({
        data: picture,
      });
    } catch (error) {
      console.log(error);
      // console.log(error);
    }
  }

  static async Update(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
        throw { message: "plese input name" };
      }
      if (!req.file) {
        throw { message: "plese input file" };
      }

      const { buffer, originalname } = req.file;
      if (!originalname.match(/\.(jpg|jpeg|png)$/)) {
        throw { message: "Only image files are allowed!" };
      }
      const picture = await prisma.Picture.findMany({
        where: {
          name: name,
        },
      });
      let pictures = [];
      for (let i = 1; i < 3; i++) {
        let picture = "";
        if (i === 1) {
          picture = await sharp(buffer)
            .resize({ width: 500, height: 500 })
            .toBuffer();
        } else {
          picture = await sharp(buffer)
            .resize({ width: 1000, height: 1000 })
            .toBuffer();
        }
        const result = await imageKit(picture, `${Date.now()}-${i}.jpg`);
        pictures.push(result.data.url);
      }
      await prisma.Picture.update({
        data: {
          url1: pictures[0],
          url2: pictures[1],
        },
        where: {
          id: picture[0].id,
        },
      });
      res.status(201).json({
        data: picture[0].url1,
      });
    } catch (error) {
      console.log(error);
      // console.log(error);
    }
  }
}

module.exports = Picture;
