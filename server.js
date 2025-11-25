const express = require('express');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const whyBoycottRouter = require('./routes/whyBoycott');
const healthRouter = require('./routes/health');
const docsRouter = require('./routes/docs');
const { errorHandler } = require('./middleware/errorHandler');
const { PORT } = require('./config/constants');

const app = express();

app.use(express.json());

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/why-boycott', whyBoycottRouter);
app.use('/health', healthRouter);
app.use('/api-docs', docsRouter);

app.use(errorHandler);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
  });
}

module.exports = app;
