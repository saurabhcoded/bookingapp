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
const updateProductController = async (user, body) => {
  return {
    statusCode: 404,
    data: { status: "ok", message: "New Product Created Succefully" },
  };
};
const deleteProductController = async (user, body) => {
  return {
    statusCode: 404,
    data: { status: "ok", message: "New Product Created Succefully" },
  };
};

module.exports = {
  getProductController,
  newProductController,
  updateProductController,
  deleteProductController,
};
