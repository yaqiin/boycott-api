const express = require('express');
const { getLanguage } = require('../utils/i18n');
const { translate } = require('../utils/i18n');
const { asyncHandler } = require('../middleware/errorHandler');
const { loadData } = require('../utils/dataLoader');

const router = express.Router();
const data = loadData();

/**
 * @swagger
 * /why-boycott:
 *   get:
 *     summary: Get educational content about boycotting
 *     tags: [Why Boycott]
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
 *         description: List of boycott reasons
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
 *                       icon:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *       500:
 *         description: Internal server error
 */
router.get('/', asyncHandler(async (req, res) => {
  const lang = getLanguage(req);

  const translatedReasons = data.whyBoycott.map(reason => ({
    icon: reason.icon,
    title: translate(reason.title, lang),
    description: translate(reason.description, lang),
  }));

  res.json({ data: translatedReasons });
}));

module.exports = router;

