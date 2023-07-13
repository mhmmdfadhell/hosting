const { product } = require("../../models");

exports.addPrduct = async (req, res) => {
  try {
    const { body } = req;
    const userId = req.user.id;
    console.log("body", body);

    const newProduct = await product.create({
      ...body,
      idUser: userId,
      image: req.file.filename,
    });

    res.send({
      status: "success",
      data: { newProduct },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const path = process.env.PATH_FILE;

    const products = await product.findAll({
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });

    let data = JSON.parse(JSON.stringify(products));

    data = data.map((item) => {
      return { ...item, image: path + item.image };
    });

    res.send({
      status: "success",
      data: { data },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed get resources",
    });
  }
};

exports.getProduct = async (req, res) => {
  const path = process.env.PATH_FILE;
  const { id } = req.params;
  try {
    let products = await product.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });

    products = JSON.parse(JSON.stringify(products));

    res.send({
      status: "success",
      data: {
        ...products,
        image: path + products.image,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await product.update(req.body, {
      where: {
        id,
      },
    });

    let products = await product.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      product: { products },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Server Error",
    });
  }
};

exports.updateProductStock = async (req, res) => {
  try {
    const { id } = req.params;

    // Get the product by ID
    const targetProduct = await product.findOne({
      where: {
        id,
      },
    });

    // Check if the product exists
    if (!targetProduct) {
      return res.status(404).send({
        status: "error",
        message: "Product not found",
      });
    }

    // Calculate the reduced stock
    const { stock } = req.body;
    const updatedStock = targetProduct.stock - stock;

    // Check if the stock goes below 0
    if (updatedStock < 0) {
      return res.status(400).send({
        status: "error",
        message: "Insufficient stock",
      });
    }

    // Update the product with the reduced stock
    await product.update(
      { stock: updatedStock },
      {
        where: {
          id,
        },
      }
    );

    // Get the updated product
    const updatedProduct = await product.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Server Error",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await product.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      id: id,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
    });
  }
};
