const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const excel2csv = async (excelPath) => {


    const workbook = XLSX.readFile(excelPath, {cellNf: true, cellText: true, cellDates: true});

    const sheets = workbook.SheetNames;

    console.log(sheets);

    const excelFileName = path.basename(excelPath, '.xlsx');
    const csvDir = path.join(path.dirname(excelPath), excelFileName);

    // check if the csvDir exists. If not, create it.
    if (!fs.existsSync(csvDir)) {
        fs.mkdirSync(csvDir);
    }



    for (let i = 0; i < sheets.length; i++) {
            // convert the sheet to a csv file. The csv file should be named in the format 'sheetname.csv' and placed into a subdirectory named the same as the excel file.

            const sheet = workbook.Sheets[sheets[i]];
            const csv = XLSX.utils.sheet_to_csv(sheet, {FS: ',', RS: '\r\n', blankrows: true, forceQuotes: true});
            const csvName = sheets[i] + '.csv';
            const csvPath = path.join(csvDir, csvName);
            fs.writeFileSync(csvPath, csv);

    }

}

module.exports = {excel2csv};