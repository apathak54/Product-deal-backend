import xlsx from 'xlsx'

export default function readSpreadsheet() {
    var workbook = xlsx.readFile("data.csv");
    console.log(workbook);
    let worksheet = workbook.Sheets[workbook.SheetNames[0]];
    console.log(worksheet)
    for (let index = 1; index < 7; index++) {
        const id = worksheet[`A${index}`].v;
        const name = worksheet[`B${index}`].v;
        console.log({
            id: id, name: name
        })
    }
}