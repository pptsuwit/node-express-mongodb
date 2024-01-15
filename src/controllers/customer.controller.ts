import { Request, Response, NextFunction } from "express";
import service from "@services/customer.service";
import { customerModel } from "@models/customer.model";

import PDFDocument from "pdfkit";
import * as path from "path";
import { getTotalPageSize } from "@utils/utils";

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const page: number = parseInt(req.query.page as string) || 1;
    const pageSize: number = parseInt(req.query.pageSize as string) || 10;
    const totalRecord = await service.getTotalRecord();
    const data = await service.getAll(page, pageSize);
    res.json({
      data: data.data,
      pagination: { currentPage: page, recordPerPage: data.data.length, totalPage: getTotalPageSize(data.totalData, pageSize), totalRecord: totalRecord },
    });
  } catch (error) {
    next(error);
  }
}
export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const entity = await service.getById(req.params.id);
    entity ? res.json(entity) : res.sendStatus(404);
  } catch (error) {
    next(error);
  }
}
export async function create(req: Request, res: Response, next: NextFunction) {
  const { firstName, lastName, email, phone, birthdate, address } = req.body;
  try {
    const entity = await service.createCustomer({ firstName, lastName, email, phone, birthdate, address });
    res.json(entity);
  } catch (error) {
    next(error);
  }
}
export async function update(req: Request, res: Response, next: NextFunction) {
  const { id, firstName, lastName, email, phone, birthdate, address } = req.body;
  try {
    const entity = await service.updateCustomerById({ id, firstName, lastName, email, phone, birthdate, address });
    res.json(entity);
  } catch (error) {
    next(error);
  }
}
export async function deleteById(req: Request, res: Response, next: NextFunction) {
  try {
    const entity = await service.deleteById(req.params.id);
    entity ? res.json(entity) : res.sendStatus(404);
  } catch (error) {
    next(error);
  }
}
export async function exportExcel(req: Request, res: Response, next: NextFunction) {
  try {
    const fileName = "customer.xlsx";
    const filePath = path.join(__dirname, fileName);
    await service.exportToExcel(filePath);
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error("Error sending Excel file:", err);
      }
    });
  } catch (error) {
    next(error);
  }
}
export async function exportPDF(req: Request, res: Response, next: NextFunction) {
  try {
    const fileName = "customer_report.pdf";
    const header = "Customer Report";

    const data = await service.getAllData();

    const doc = new PDFDocument({ size: "A4", margin: 10 });
    doc.pipe(res); // Send the PDF as response

    // Write content to the PDF
    doc.fontSize(18).text(header, { align: "center" });
    doc.moveDown();
    // Create table header

    doc.font("Helvetica-Bold");
    const headerLinePosStart = 10;
    const headerLinePosEnd = 590;
    const columnHeight = 5;
    const headerY = doc.y + columnHeight;
    // // start column
    // doc
    //   .moveTo(headerLinePosStart, headerY - columnHeight)
    //   .lineTo(headerLinePosStart, headerY + headerLineH)
    //   .stroke();
    // doc.moveTo(headerLinePosStart, doc.y).lineTo(headerLinePosEnd, doc.y).stroke();

    const customerWidth = 30;
    const nameWidth = 110;
    const emailWidth = 160;
    const phoneWidth = 80;
    const addressWidth = 200;

    const alignCustomerId = { width: customerWidth, align: "center" };
    const alignName = { width: nameWidth, align: "center" };
    const alignEmail = { width: emailWidth, align: "center" };
    const alignPhone = { width: phoneWidth, align: "center" };
    const alignAddress = { width: addressWidth, align: "center" };

    const posId = 10;
    const posName = posId + customerWidth;
    const posEmail = posName + nameWidth;
    const posPhone = posEmail + emailWidth;
    const posAddr = posPhone + phoneWidth + 15;
    doc.fontSize(12).text("ID", posId, headerY, alignCustomerId);
    doc.fontSize(12).text("Name", posName, headerY, alignName);
    doc.text("Email", posEmail, headerY, alignEmail);
    doc.text("Phone", posPhone, headerY, alignPhone);
    doc.text("Address", posAddr, headerY, alignAddress);

    doc.moveTo(headerLinePosStart, doc.y).lineTo(headerLinePosEnd, doc.y).stroke();

    data.forEach((item: customerModel) => {
      doc.font("Helvetica"); // Reset font for table content

      const contentColumnHeight = 10;

      const y = doc.y + contentColumnHeight;

      doc.fontSize(12).text(`${item.customerId}`, posId, y, alignCustomerId);
      doc.fontSize(12).text(`${item.firstName} ${item.lastName}`, posName + 10, y, { width: nameWidth, align: "left" });
      doc.fontSize(12).text(`${item.email}`, posEmail + 10, y, { width: emailWidth, align: "left" });
      doc.fontSize(12).text(`${item.phone}`, posPhone, y, alignPhone);
      doc.fontSize(12).text(`${item.address}`, posAddr + 10, y, { width: addressWidth, align: "left" });
    });

    doc.end(); // Finalize the PDF

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
  } catch (error) {
    next(error);
  }
}
