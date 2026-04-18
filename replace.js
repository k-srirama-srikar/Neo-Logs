const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    // regex matches 'http://localhost:8000...' or "http://localhost:8000..." or `http://localhost:8000...`
    const regex = /(['"`])http:\/\/localhost:8000(.*?)\1/g;
    
    // Some urls might not end at the exact same quote if there are nested quotes, but for typical urls this works.
    // If it's a template literal with variables, (.*?) will capture until the closing backtick.
    const newContent = content.replace(regex, (match, p1, p2) => {
        return '`${process.env.REACT_APP_BACKEND_URL}' + p2 + '`';
    });
    
    // What if it is something like `http://localhost:8000/api/blogs/users/${username}`
    // p1 = `
    // p2 = /api/blogs/users/${username}
    // Result: `${process.env.REACT_APP_BACKEND_URL}/api/blogs/users/${username}`
    // This is perfect!
    
    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log('Updated: ' + filePath);
    }
}

function walkSync(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkSync(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            replaceInFile(fullPath);
        }
    }
}

walkSync(path.join(__dirname, 'src'));
console.log('Done');
