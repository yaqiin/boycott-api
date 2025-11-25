const express = require('express');
const { getLanguage, translate } = require('./utils/i18n');
const { loadData } = require('./utils/dataLoader');
const { getProducts } = require('./utils/productService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const data = loadData();

app.get('/products', (req, res) => {
  try {
    const lang = getLanguage(req);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const categoryId = req.query.category_id;
    const countryCode = req.query.country;

    const result = getProducts(
      data.products,
      data.categories,
      data.countries,
      lang,
      { categoryId, countryCode },
      { page, limit }
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

app.get('/categories', (req, res) => {
  try {
    const lang = getLanguage(req);

    const translatedCategories = data.categories.map(category => ({
      id: category.id,
      name: translate(category.name, lang),
    }));

    res.json({ data: translatedCategories });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

app.get('/why-boycott', (req, res) => {
  try {
    const lang = getLanguage(req);

    const translatedReasons = data.whyBoycott.map(reason => ({
      icon: reason.icon,
      title: translate(reason.title, lang),
      description: translate(reason.description, lang),
    }));

    res.json({ data: translatedReasons });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
