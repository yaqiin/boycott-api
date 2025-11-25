const express = require('express');
const { getLanguage } = require('../utils/i18n');
const { translate } = require('../utils/i18n');
const { asyncHandler } = require('../middleware/errorHandler');
const { loadData } = require('../utils/dataLoader');

const router = express.Router();
const data = loadData();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all product categories
 *     tags: [Categories]
 *     parameters:
 *       - in: header
 *         name: Accept-Language
 *         schema:
 *           type: string
 *           default: en
 *           enum: [ar, bn, en, es, fr, id, tr, ur]
 *         description: Language preference
 *     responses:
 *       200:
 *         description: List of categories
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
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *       500:
 *         description: Internal server error
 */
router.get('/', asyncHandler(async (req, res) => {
  const lang = getLanguage(req);

  const translatedCategories = data.categories.map(category => ({
    id: category.id,
    name: translate(category.name, lang),
  }));

  res.json({ data: translatedCategories });
}));

module.exports = router;

