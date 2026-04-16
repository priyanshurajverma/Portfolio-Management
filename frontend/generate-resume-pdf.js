const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // Read local HTML file
    const htmlPath = path.resolve(__dirname, 'public', 'resume.html');
    const html = fs.readFileSync(htmlPath, 'utf8');

    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Generate PDF
    await page.pdf({
        path: path.resolve(__dirname, 'public', 'resume.pdf'),
        format: 'A4',
        margin: { top: '20mm', right: '10mm', bottom: '20mm', left: '10mm' },
        printBackground: true,
    });

    console.log('✅ Resume PDF generated at public/resume.pdf');
    await browser.close();
})();
