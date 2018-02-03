const express = require('express');
const app = express();
app.use(express.json())

const fonts = {
  Roboto: {
    normal: './fonts/RobotoMono-Regular.ttf',
    bold: './fonts/RobotoMono-Bold.ttf',
    italics: './fonts/RobotoMono-Italic.ttf',
    bolditalics: './fonts/RobotoMono-BoldItalic.ttf'
  }
};

const PdfPrinter = require('pdfmake/src/printer');
const printer = new PdfPrinter(fonts);

app.post('/', (req, res) => {
  try {
    const doc = req.body;
    const pdfDoc = printer.createPdfKitDocument(doc);
    let bufs = [];
    pdfDoc.on('data', function (d) { bufs.push(d) });
    pdfDoc.on('end', function () {
      const buf = Buffer.concat(bufs);
      res.set('Content-Type', 'application/pdf');
      res.send(buf);
    });
    pdfDoc.end();
  } catch(err) {
    console.error(err);
    res.status(500);
    res.json({status: 500, body: 'Internal Server Error'})
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on Port ${port}.`);
});
