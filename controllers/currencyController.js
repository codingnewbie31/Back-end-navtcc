import Currency from "../models/currencyModel.js";

// Create Currency
export const createCurrency = async (req, res) => {
  try {
    const currency = await Currency.create(req.body);
    res.status(201).json({
      status: true,
      message: "The data have been created successfully",
      data: currency,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "network error",
      error: error.message,
    });
  }
};

// Get All Currencies
export const getCurrencies = async (req, res) => {
  try {
    const allCurrencies = await Currency.findAll();
    res.json({
      success: true,
      message: "Retrieved all currencies successfully",
      data: allCurrencies,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "network error",
      error: error.message,
    });
  }
};

// Get Single Currency
export const getSingleCurrency = async (req, res) => {
  try {
    const currencyId = req.params.id;
    const existCurrency = await Currency.findOne({ where: { id: currencyId } });

    if (!existCurrency) {
      return res.status(404).json({
        success: false,
        message: `Currency not found with id number ${currencyId}`,
      });
    }

    res.json({
      success: true,
      message: `Get single currency successfully with id number ${currencyId}`,
      data: existCurrency,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Network error`,
      error: error.message,
    });
  }
};

// Update Currency
export const updateCurrency = async (req, res) => {
  try {
    const currencyId = req.params.id;
    const updatedBody = req.body;

    const existCurrency = await Currency.findByPk(currencyId);

    if (!existCurrency) {
      return res.status(404).json({
        success: false,
        message: `Currency not found with id number ${currencyId}`,
      });
    }

    const currency = await existCurrency.update(updatedBody);
    res.json({
      success: true,
      message: `Currency updated successfully`,
      data: currency,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Network error`,
      error: error.message,
    });
  }
};

// Delete Currency
export const deleteCurrency = async (req, res) => {
  try {
    const currencyId = req.params.id;
    const existCurrency = await Currency.findOne({ where: { id: currencyId } });

    if (!existCurrency) {
      return res.status(404).json({
        success: false,
        message: `Currency not found with id number ${currencyId}`,
      });
    }

    await existCurrency.destroy();
    res.json({
      success: true,
      message: `Currency deleted successfully with id number ${currencyId}`,
      data: existCurrency,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `network error`,
      error: error.message,
    });
  }
};