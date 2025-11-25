const { getBaseUrl } = require('../config/constants');

function getSwaggerUiHtml() {
  const baseUrl = getBaseUrl();
  const specUrl = `${baseUrl}/api-docs/swagger.json`;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Boycott API Documentation</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui.css" />
  <style>
    html {
      box-sizing: border-box;
      overflow: -moz-scrollbars-vertical;
      overflow-y: scroll;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }
    body {
      margin: 0;
      background: #fafafa;
    }
    .error-message {
      padding: 40px;
      text-align: center;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .error-message h2 {
      color: #d32f2f;
      margin-bottom: 16px;
    }
    .error-message a {
      color: #1976d2;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div id="swagger-ui">
    <div class="error-message">
      <h2>Loading API Documentation...</h2>
      <p>If this message persists, <a href="${specUrl}" target="_blank">click here to view the raw API specification</a></p>
    </div>
  </div>
  <script>
    (function() {
      var specUrl = "${specUrl}";
      var bundleUrl = "https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui-bundle.js";
      var presetUrl = "https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui-standalone-preset.js";
      
      function loadScript(url) {
        return new Promise(function(resolve, reject) {
          var script = document.createElement('script');
          script.src = url;
          script.onload = resolve;
          script.onerror = function() {
            reject(new Error('Failed to load: ' + url));
          };
          document.head.appendChild(script);
        });
      }
      
      function initSwagger() {
        if (typeof SwaggerUIBundle === 'undefined' || typeof SwaggerUIStandalonePreset === 'undefined') {
          document.getElementById('swagger-ui').innerHTML = 
            '<div class="error-message"><h2>Failed to load Swagger UI</h2><p>The required JavaScript files could not be loaded from the CDN.</p><p><a href="' + specUrl + '" target="_blank">View raw API specification</a></p></div>';
          return;
        }
        
        try {
          window.ui = SwaggerUIBundle({
            url: specUrl,
            dom_id: '#swagger-ui',
            presets: [
              SwaggerUIBundle.presets.apis,
              SwaggerUIStandalonePreset
            ],
            layout: "StandaloneLayout",
            deepLinking: true
          });
        } catch (error) {
          document.getElementById('swagger-ui').innerHTML = 
            '<div class="error-message"><h2>Error initializing Swagger UI</h2><p>' + error.message + '</p><p><a href="' + specUrl + '" target="_blank">View raw API specification</a></p></div>';
        }
      }
      
      Promise.all([
        loadScript(bundleUrl),
        loadScript(presetUrl)
      ]).then(function() {
        initSwagger();
      }).catch(function(error) {
        console.error('Error loading Swagger UI:', error);
        document.getElementById('swagger-ui').innerHTML = 
          '<div class="error-message"><h2>Failed to load Swagger UI</h2><p>' + error.message + '</p><p><a href="' + specUrl + '" target="_blank">View raw API specification</a></p></div>';
      });
    })();
  </script>
</body>
</html>`;
}

module.exports = { getSwaggerUiHtml };

