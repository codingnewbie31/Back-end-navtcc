import Category from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
  const body = req.body;
  try {
    const isExistCategory = await Category.findOne({ where: { categoryName: body.categoryName } });

    if (isExistCategory) {
      return res.json({
        status: false,
        message: `${body.categoryName} already exist`,
      });
    }

    const category = await Category.create(body);

    res.json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const allCategories = await Category.findAll();

    res.json({
      success: true,
      message: "Retrieved all categories successfully",
      data: allCategories,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "network error",
      error: error.message,
    });
  }
};

export const getSingleCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const existCategory = await Category.findOne({ where: { id: categoryId } });

    if (!existCategory) {
      return res.status(404).json({
        success: false,
        message: `Category not found with this ${categoryId}`,
      });
    }

    res.json({
      success: true,
      message: `Get single category successfully with this ${categoryId}`,
      data: existCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Network error",
      error: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updatedBody = req.body;

    const existCategory = await Category.findByPk(categoryId);

    if (!existCategory) {
      return res.status(404).json({
        success: false,
        message: `Category not found with this ${categoryId}`,
      });
    }

    const category = await existCategory.update(updatedBody);

    res.json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Network error",
      error: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const existCategory = await Category.findOne({ where: { id: categoryId } });

    if (!existCategory) {
      return res.status(404).json({
        success: false,
        message: `Category not found with this ${categoryId}`,
      });
    }

    await existCategory.destroy();
    res.json({
      success: true,
      message: `Category deleted successfully with this ${categoryId}`,
      data: existCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "network error",
      error: error.message,
    });
  }
};