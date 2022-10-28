const { date } = require("joi");
const { PRODUCT } = require("../models/model");
const { productValidation, inum, mongoIdValidation } = require("../validation");

async function newProductController(req, res) {
  const user = req.user;
  const body = req.body;
  const validatedBody = await productValidation(body);
  console.log(validatedBody);
  if (!validatedBody.error) {
    const product = new PRODUCT({
      ...validatedBody.value,
      email: user,
    });
    const savedproduct = await product.save();
    console.log(savedproduct);
    res.status(200).json({
      status: inum.IDLE,
      message: `Product (${savedproduct.title}) created.product ID ${savedproduct._id}`,
    });
  } else {
    res.status(400).json({
      status: inum.ERROR,
      message: validatedBody.error.message.replaceAll(`\"`, ""),
    });
  }
}

async function getProductController(req, res) {
  const user = req.user;
  const body = req.body;
  console.log(user, body);
  const fetchedProducts = await PRODUCT.find({ email: user });
  console.log(fetchedProducts);
  if (fetchedProducts) {
    res.status(202).json({
      status: inum.IDLE,
      message: "fetched successfully",
      data: fetchedProducts,
    });
    console.log("if BLOCK");
  } else {
    return {
      statusCode: 204,
      data: {
        status: inum.ERROR,
        message: "No Product Found",
      },
    };
  }
}
async function updateProductController(req, res) {
  const id = req.params.id;
  const user = req.user;
  const body = req.body;
  const validatedId = await mongoIdValidation({ id: req.params.id });
  console.log(validatedId);
  if (validatedId.error) {
    res.status(422).json({
      error: inum.ERROR,
      message: validatedId.error.message.replaceAll(`\"`, ""),
    });
  } else {
    const newBody = { ...body, updated_on: new Date() };
    var oldProduct = await PRODUCT.findById(validatedId.value.id);
    console.log(oldProduct);
    if (oldProduct) {
      try {
        await PRODUCT.findOneAndUpdate({ _id: id }, { ...newBody }).then(
          (response) => {
            res.status(200).json({
              status: inum.IDLE,
              message: `Product ${response.title} updated successfully. product ID ${response._id}`,
            });
          }
        );
      } catch (error) {
        console.log(error);
        res.status(404).json({
          status: inum.ERROR,
          message: error,
        });
      }
    } else {
      res.status(208).json({
        status: inum.IDLE,
        message: "Product Not Found",
      });
    }
  }
}
async function deleteProductController(req, res) {
  //product delete logics here
  const user = req.user;
  console.log(user);
  const body = req.body;
  const validatedId = await mongoIdValidation({ id: req.params.id });
  const id = validatedId.value.id;
  console.log(validatedId);
  if (validatedId.error) {
    res.status(422).json({
      error: inum.ERROR,
      message: validatedId.error.message.replaceAll(`\"`, ""),
    });
  } else {
    await PRODUCT.findOneAndRemove({
      _id: id,
      email: user,
    }).then((response) => {
      if (response) {
        res.status(200).json({
          status: inum.IDLE,
          message: `product ${response.title} deleted succesfully. product ID ${response._id}`,
        });
      } else {
        res.status(303).json({
          status: inum.ERROR,
          message: `product with ID ${id} Already deleted succesfully. `,
        });
      }
    });
  }
}

module.exports = {
  getProductController,
  newProductController,
  updateProductController,
  deleteProductController,
};
