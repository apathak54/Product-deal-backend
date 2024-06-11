import xlsx from 'xlsx'
import Client from '../models/Client.js';

export default function readSpreadsheet(filename, workspaceId) {
    var workbook = xlsx.readFile(`uploads/${filename}`);
    let worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const clients = [];
    let index = 2
    while (true) {
        const sno = worksheet[`A${index}`];
        if (!sno || !Number.isInteger(sno.v)) {
            break;
        }
    
        const clientData = {
            clientName: worksheet[`B${index}`]?.v || 'Not Assigned',
            companyName: worksheet[`C${index}`]?.v || 'Not Assigned',
            email: worksheet[`D${index}`]?.v || 'Not Assigned',
            commodity: worksheet[`E${index}`]?.v || 'Not Assigned',
            status: 'pending',
            workspace_id: workspaceId,
        };
    
        const newClient = new Client(clientData);
        clients.push(newClient);
        index++;
    }
    
    
    

    return clients;
}