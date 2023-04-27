const fs = require('fs');

module.exports = {
    readFileContent() {
        return fs.readFileSync ('./productLinks.txt', 'utf8');
    }
}