const SUPPORTED_LANGUAGES = ['ar', 'bn', 'en', 'es', 'fr', 'id', 'tr', 'ur'];
const DEFAULT_LANGUAGE = 'en';

function getLanguage(req) {
  const acceptLanguage = req.headers['accept-language'] || DEFAULT_LANGUAGE;
  
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, q = 'q=1'] = lang.trim().split(';');
      const quality = parseFloat(q.split('=')[1]) || 1;
      return { code: code.split('-')[0].toLowerCase(), quality };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const lang of languages) {
    if (SUPPORTED_LANGUAGES.includes(lang.code)) {
      return lang.code;
    }
  }
  
  return DEFAULT_LANGUAGE;
}

function translate(obj, lang) {
  if (!obj || typeof obj !== 'object') return obj;
  
  if (obj[lang]) {
    return obj[lang];
  }
  
  return obj[DEFAULT_LANGUAGE] || obj[Object.keys(obj)[0]] || obj;
}

module.exports = {
  getLanguage,
  translate,
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
};

