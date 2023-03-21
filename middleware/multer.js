const axios = require("axios");
const FormData = require("form-data");
const private = process.env.private_key;
const endpoint = "https://api.imagekit.io/v1/files/upload";

async function imageKit(buffer, name) {
  try {
    let image = new FormData();
    // console.log(image, "=========");
    image.append("file", buffer.toString("base64"));
    image.append("fileName", `${name}`);
    // Object.keys(buffer).forEach((e, i) => {
    //   image.append("file", buffer[e].toString("base64"));
    //   image.append("fileName", `${Date.now()}-${i + 1}.jpg`);
    // });
    const key = private;
    let encodedKey = Buffer.from(key).toString("base64");
    // console.log(buffer, "=========");
    return await axios.post(endpoint, image, {
      headers: {
        ...image.getHeaders(),
        Authorization: `Basic ${encodedKey}`,
      },
    });
  } catch (error) {
    console.log(error);
    // next(error);
  }
}

// async function imageKitDelete(file) {
//   try {
//     // Object.keys(buffer).forEach((e, i) => {
//     //   image.append("file", buffer[e].toString("base64"));
//     //   image.append("fileName", `${Date.now()}-${i + 1}.jpg`);
//     // });
//     const key = private;
//     let encodedKey = Buffer.from(key).toString("base64");
//     // console.log(buffer, "=========");
//     axios.delete(`${imageURL}?ik-t=${encodedKey}`);
//   } catch (error) {
//     console.log(error);
//     // next(error);
//   }
// }

module.exports = { imageKit };
