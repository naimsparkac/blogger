const fs = require('fs');

let xml = fs.readFileSync('BuzzReelC.xml', 'utf8');
const lines = xml.split('\n');

const fixedLines = lines.map(line => {
    // Specifically looking for `.br-age-gate` CSS lines that might cause issues.
    if (line.includes('transition:opacity .08s linear,visibility .08s linear!important')) {
        return line.replace(/transition:opacity \.08s linear,visibility \.08s linear!important/g, '');
    }

    // There was another issue: `resolveInitialState` handles the state properly
    // but the `catch(error)` and `finally` might override it.
    // If the JS fix caused "Blog Not found" or "Black screen" it was likely a JS parse error or runtime error
    // we introduced. Let's fix ONLY the transition.

    return line;
});

fs.writeFileSync('BuzzReelC.xml', fixedLines.join('\n'));
