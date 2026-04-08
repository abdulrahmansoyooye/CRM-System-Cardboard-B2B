const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (file.endsWith('.controller.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      if (!content.includes('sendResponse')) {
        content = 'import sendResponse from \'../../core/response/sendResponse\';\n' + content;
        changed = true;
      }

      const regex = /res\.status\((\d+)\)\.json\(\{\s*success:\s*(true|false)(?:,\s*message:\s*'([^']+)')?,\s*data:\s*([^}\s]+)\s*\}\);/g;
      
      if (regex.test(content)) {
        content = content.replace(regex, (match, statusCode, success, message, data) => {
          return `sendResponse(res, {\n    statusCode: ${statusCode},\n    success: ${success},\n    message: '${message || (statusCode == 201 ? 'Created successfully' : 'Success')}',\n    data: ${data}\n  });`;
        });
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Fixed:', fullPath);
      }
    }
  }
}

processDir('c:/Users/HP/Documents/cardbox/api/src/module');
console.log('Done');
