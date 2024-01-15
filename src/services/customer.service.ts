const db = require("@config/database");
import { customerModel, createCustomerModel } from "@models/customer.model";
export default {
  getAll,
  getById,
  deleteById,
  updateCustomerById,
  createCustomer,
  exportToExcel,
  getAllData,
  getTotalRecord,
  // exportToPDF,
};
async function countData() {
  return await db.Customer.count({});
}
async function getAll(page: number = 1, pageSize: number = 10) {
  const entity = await db.Customer.find()
    .sort({ _id: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  const data = entity.map((entity: customerModel) => {
    return details(entity);
  });
  const totalData = await countData();
  return { data, totalData };
}
async function getAllData() {
  const entity = await db.Customer.find();

  return entity.map((entity: customerModel) => {
    return details(entity);
  });
}
async function getTotalRecord() {
  const entity = await db.Customer.find();
  return entity.length;
}

async function getById(id: string) {
  const item = await getCustomer(id);
  return details(item);
}

async function createCustomer({ firstName, lastName, email, phone, birthdate, address }: createCustomerModel) {
  const entity = await db.Customer.create({
    customerId: "001",
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    birthdate: birthdate,
    address: address,
  });

  return {
    ...details(entity),
  };
}

async function updateCustomerById({ id, customerId, firstName, lastName, email, phone, birthdate, address }: customerModel) {
  await updateCustomer({ id, customerId, firstName, lastName, email, phone, birthdate, address });
  const entity = await getCustomer(id);
  return details(entity);
}

async function deleteById(id: string) {
  const entity = await deleteCustomer(id);
  return details(entity);
}

// db functions
async function getCustomer(id: string) {
  if (!db.isValidId(id)) throw new Error("Not found");
  const entity = await db.Customer.findById(id);
  if (!entity) throw new Error("Not found");
  return entity;
}

async function updateCustomer({ id, firstName, lastName, email, phone, birthdate, address }: customerModel) {
  if (!db.isValidId(id)) throw new Error("Not found");
  const entity = await db.Customer.findByIdAndUpdate(id, {
    firstName,
    lastName,
    email,
    phone,
    birthdate,
    address,
  });
  if (!entity) throw new Error("Not found");
  return entity;
}

async function deleteCustomer(id: string) {
  if (!db.isValidId(id)) throw new Error("Not found");
  const entity = await db.Customer.findByIdAndDelete(id);
  if (!entity) throw new Error("Not found");
  return entity;
}

export function details(item: customerModel) {
  const { id, customerId, firstName, lastName, email, phone, birthdate, address } = item;
  return { id, customerId, firstName, lastName, email, phone, birthdate, address };
}

import * as ExcelJS from "exceljs";
export async function exportToExcel(filePath: string) {
  // Create a new workbook and worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet 1");

  const header = ["customerId", "firstName", "lastName", "email", "phone", "birthdate", "address"];
  const entity = await db.Customer.find();

  // Add header row
  worksheet.addRow(header);
  entity.map((item: customerModel) => {
    const { customerId, firstName, lastName, email, phone, birthdate, address } = item;
    worksheet.addRow([customerId, firstName, lastName, email, phone, birthdate, address]);
  });
  // Define styles
  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true };
  headerRow.alignment = { vertical: "middle", horizontal: "center" };

  const dataRows = worksheet.getRows(2, entity.length + 2);
  dataRows?.forEach((row) => {
    row.alignment = { vertical: "middle", horizontal: "center" };
  });
  // Set column widths (e.g., width of column A to 15 and column B to 10)
  worksheet.getColumn(1).width = 13;
  worksheet.getColumn(2).width = 13;
  worksheet.getColumn(3).width = 13;
  worksheet.getColumn(4).width = 30;
  worksheet.getColumn(5).width = 15;
  worksheet.getColumn(6).width = 13;
  worksheet.getColumn(7).width = 35;

  // Save the workbook to a file
  await workbook.xlsx.writeFile(filePath);
}
