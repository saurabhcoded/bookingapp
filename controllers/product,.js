const { PRODUCT } = require("../models/model");
const { bookingValidation } = require("../validation");

const newProductController = async (user, body) => {
  const validatedBody = await bookingValidation(body);
  console.log(validatedBody);
  if (!validatedBody.error) {
    const product = new PRODUCT({
      ...validatedBody.value,
    });
    const savedproduct = product.save();
    console.log(savedproduct);
    return {
      statusCode: 200,
      data: { status: "ok", message: "New Product Created Succefully" },
    };
  } else {
    return {
      statusCode: 400,
      data: { status: "error", messgae: "Validatin error in input" },
    };
  }
};

const getProductController = async (user, body) => {
  const fetchedProducts = await PRODUCT.find({ email: user });
  if (fetchedProducts) {
    return {
      statusCode: 204,
      data: {
        status: "ok",
        message: "New Product Created Succefully",
        products: fetchedProducts,
      },
    };
  } else {
    return {
      statusCode: 404,
      data: {
        status: "error",
        message: "OOPs something went wrong",
      },
    };
  }
};
const updateProductController = async (
  user,
  id,
  { title, subtitle, description, image, price, duration, classes, type, tag }
) => {
  var oldProduct = await PRODUCT.findOne({ _id: id });
  // oldProduct = {
  //   ...oldProduct,
  // };
  if (oldProduct) {
    oldProduct.title = title;
    oldProduct.subtitle = subtitle;
    oldProduct.description = description;
    oldProduct.image = image;
    oldProduct.price = price;
    oldProduct.duration = duration;
    oldProduct.classes = classes;
    oldProduct.type = type;
    oldProduct.tag = tag;
    oldProduct.updated_on = Date.now();
    oldProduct.save();
    console.log(oldProduct);
    return {
      statusCode: 200,
      data: { status: "ok", message: "New Product Created Succefully" },
    };
  } else {
    return {
      statusCode: 404,
      data: { status: "error", message: "OOps Product Not Found" },
    };
  }
};
const deleteProductController = async (user, id, body) => {
  const removeProduct = await PRODUCT.findOneAndRemove({
    _id: id,
    email: user,
  });
  console.log(removeProduct);
  if (removeProduct) {
    return {
      statusCode: 200,
      data: { status: "ok", message: "Deleted Succefully" },
    };
  } else {
    return {
      statusCode: 404,
      data: { status: "error", message: "Product Already Deleted" },
    };
  }
};

module.exports = {
  getProductController,
  newProductController,
  updateProductController,
  deleteProductController,
};
