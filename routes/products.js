const express = require('express');
const { getLanguage } = require('../utils/i18n');
const { getProducts } = require('../utils/productService');
const { asyncHandler } = require('../middleware/errorHandler');
const { loadData } = require('../utils/dataLoader');

const router = express.Router();
const data = loadData();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get products with pagination and filters
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: string
 *           example: tech
 *         description: Filter by category ID
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *           example: US
 *         description: Filter by country code
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *           example: Coca
 *         description: Search products by name (case-insensitive partial match)
 *       - in: header
 *         name: Accept-Language
 *         schema:
 *           type: string
 *           default: en
 *           enum: [ar, bn, en, es, fr, id, tr, ur]
 *         description: Language preference
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       category:
 *                         type: string
 *                       country:
 *                         type: string
 *                       alternatives:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                             link:
 *                               type: string
 *                             country:
 *                               type: string
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     hasNextPage:
 *                       type: boolean
 *                     hasPrevPage:
 *                       type: boolean
 *       500:
 *         description: Internal server error
 */
router.get('/', asyncHandler(async (req, res) => {
  const lang = getLanguage(req);
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const categoryId = req.query.category_id;
  const countryCode = req.query.country;
  const productName = req.query.name;

  const result = getProducts(
    data.products,
    data.categories,
    data.countries,
    lang,
    { categoryId, countryCode, productName },
    { page, limit }
  );

  res.json(result);
}));

module.exports = router;

