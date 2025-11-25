const PORT = process.env.PORT || 3000;

function getBaseUrl() {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return `http://localhost:${PORT}`;
}

module.exports = {
  PORT,
  getBaseUrl,
};

