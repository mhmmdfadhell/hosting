const { topping } = require("../../models");

exports.addTopping = async (req, res) => {
  try {
    const { body } = req;
    const idUser = req.user.id;

    const newTopping = await topping.create({
      ...body,
      idUser: idUser,
      image: req.file.filename,
    });

    res.send({
      status: "success",
      data: { newTopping },
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.getToppings = async (req, res) => {
  const path = process.env.PATH_FILE;
  try {
    const toppings = await topping.findAll({
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });

    let data = JSON.parse(JSON.stringify(toppings));

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

exports.getTopping = async (req, res) => {
  const path = process.env.PATH_FILE;
  const { id } = req.params;
  try {
    let toppings = await topping.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });

    toppings = JSON.parse(JSON.stringify(toppings));

    res.send({
      status: "success",
      data: {
        ...toppings,
        image: path + toppings.image,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.updateTopping = async (req, res) => {
  try {
    const { id } = req.params;

    await topping.update(req.body, {
      where: {
        id,
      },
    });

    let toppings = await topping.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: { toppings },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.updateToppingStock = async (req, res) => {
  try {
    const { id } = req.params;

    // Get the product by ID
    const targetTopping = await topping.findOne({
      where: {
        id,
      },
    });

    // Check if the product exists
    if (!targetTopping) {
      return res.status(404).send({
        status: "error",
        message: "Product not found",
      });
    }

    // Calculate the reduced stock
    const { stock } = req.body;
    const updatedStock = targetTopping.stock - stock;

    // Check if the stock goes below 0
    if (updatedStock < 0) {
      return res.status(400).send({
        status: "error",
        message: "Insufficient stock",
      });
    }

    // Update the product with the reduced stock
    await topping.update(
      { stock: updatedStock },
      {
        where: {
          id,
        },
      }
    );

    // Get the updated product
    const updatedTopping = await topping.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      product: updatedTopping,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Server Error",
    });
  }
};

exports.deleteTopping = async (req, res) => {
  try {
    const { id } = req.params;

    await topping.destroy({
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
