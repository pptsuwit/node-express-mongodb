import { Request, Response, NextFunction } from "express"; // Import types as needed
import { exportPDF, exportExcel, create, update, getAll, getById, deleteById } from "../../src/controllers/customer.controller"; // Replace with actual module path
import service from "../../src/services/customer.service";
import createServer from "../../src/config/server";
import PDFDocument from "pdfkit";
const request = require("supertest");
const app = createServer();
jest.mock("../../src/services/customer.service", () => ({
  createCustomer: jest.fn(),
  updateCustomerById: jest.fn(),
  getAll: jest.fn(),
  getAllData: jest.fn(),
  getById: jest.fn(),
  deleteById: jest.fn(),
  exportToExcel: jest.fn(),
}));
jest.mock("../../src/middlewares/authorize.ts", () => ({
  authorize: jest.fn((req, res, next) => {
    next();
  }),
}));

describe("Customer Controller", () => {
  const mockRequest = {} as Request;
  const mockResponse = {} as Response;
  const mockNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Manually mock the download function
    mockResponse.download = jest.fn((filePath: string, callback: any) => {
      callback(undefined); // Simulate a successful download
    });
  });
  describe("create", () => {
    it("should create a new customer", async () => {
      const mockCustomer = { firstName: "John", lastName: "Doe" };
      const expectedResponse = { id: 1, ...mockCustomer };
      const mockCreateCustomer = service.createCustomer as jest.Mock;
      mockCreateCustomer.mockResolvedValue(expectedResponse);

      mockRequest.body = mockCustomer;
      mockResponse.json = jest.fn();

      await create(mockRequest, mockResponse, mockNext);

      expect(mockCreateCustomer).toHaveBeenCalledWith(mockCustomer);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle errors", async () => {
      const mockError = new Error("Some error");
      const mockCreateCustomer = service.createCustomer as jest.Mock;
      mockCreateCustomer.mockRejectedValue(mockError);

      mockRequest.body = {};
      mockNext.mockImplementationOnce((error) => {
        expect(error).toBe(mockError);
      });

      await create(mockRequest, mockResponse, mockNext);

      expect(mockCreateCustomer).toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe("update", () => {
    it("should update a customer", async () => {
      const mockCustomer = { id: 1, firstName: "John", lastName: "Doe" };
      const expectedResponse = mockCustomer;
      const mockUpdateCustomer = service.updateCustomerById as jest.Mock;
      mockUpdateCustomer.mockResolvedValue(expectedResponse);

      mockRequest.body = mockCustomer;
      mockResponse.json = jest.fn();

      await update(mockRequest, mockResponse, mockNext);

      expect(mockUpdateCustomer).toHaveBeenCalledWith(mockCustomer);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle errors", async () => {
      const mockError = new Error("Some error");
      const mockUpdateCustomer = service.updateCustomerById as jest.Mock;
      mockUpdateCustomer.mockRejectedValue(mockError);

      mockRequest.body = {};
      mockNext.mockImplementationOnce((error) => {
        expect(error).toBe(mockError);
      });

      await update(mockRequest, mockResponse, mockNext);

      expect(mockUpdateCustomer).toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe("getAll", () => {
    it("should get all customers", async () => {
      const expectedResponse = {
        data: [
          { id: 1, firstName: "John" },
          { id: 2, firstName: "Jane" },
        ],
        pagination: { currentPage: 1, recordPerPage: 2, totalPage: 1, totalRecord: 2 },
      };
      const mockGetAllCustomers = service.getAll as jest.Mock;
      mockGetAllCustomers.mockResolvedValue(expectedResponse);
      mockRequest.query = { page: "1", pageSize: "2" };
      mockResponse.json = jest.fn();
      mockResponse.sendStatus = jest.fn();
      await getAll(mockRequest, mockResponse, mockNext);
      expect(mockGetAllCustomers).toHaveBeenCalledWith(1, 2);
      // expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
      expect(mockNext).not.toHaveBeenCalled();
    });
    it("should handle errors", async () => {
      const mockError = new Error("Some error");
      const mockGetAllCustomers = service.getAll as jest.Mock;
      mockGetAllCustomers.mockRejectedValue(mockError);
      mockNext.mockImplementationOnce((error) => {
        expect(error).toBe(mockError);
      });
      await getAll(mockRequest, mockResponse, mockNext);
      expect(mockGetAllCustomers).toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe("getById", () => {
    it("should get a customer by ID", async () => {
      const mockCustomer = { id: 1, firstName: "John" };
      const expectedResponse = mockCustomer;
      const mockGetCustomerById = service.getById as jest.Mock;
      mockGetCustomerById.mockResolvedValue(expectedResponse);

      mockRequest.params = { id: "1" };
      mockResponse.json = jest.fn();
      mockResponse.sendStatus = jest.fn();

      await getById(mockRequest, mockResponse, mockNext);

      expect(mockGetCustomerById).toHaveBeenCalledWith("1");
      expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
      expect(mockResponse.sendStatus).not.toHaveBeenCalled();
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle not found", async () => {
      const mockGetCustomerById = service.getById as jest.Mock;
      mockGetCustomerById.mockResolvedValue(null);

      mockRequest.params = { id: "1" };
      mockResponse.json = jest.fn();
      mockResponse.sendStatus = jest.fn();

      await getById(mockRequest, mockResponse, mockNext);

      expect(mockGetCustomerById).toHaveBeenCalledWith("1");
      expect(mockResponse.json).not.toHaveBeenCalled();
      expect(mockResponse.sendStatus).toHaveBeenCalledWith(404);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle errors", async () => {
      const mockError = new Error("Some error");
      const mockGetCustomerById = service.getById as jest.Mock;
      mockGetCustomerById.mockRejectedValue(mockError);

      mockRequest.params = { id: "1" };
      mockNext.mockImplementationOnce((error) => {
        expect(error).toBe(mockError);
      });

      await getById(mockRequest, mockResponse, mockNext);

      expect(mockGetCustomerById).toHaveBeenCalledWith("1");
      expect(mockResponse.json).not.toHaveBeenCalled();
      expect(mockResponse.sendStatus).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe("deleteById", () => {
    it("should delete a customer by ID", async () => {
      const mockCustomer = { id: 1, firstName: "John" };
      const expectedResponse = mockCustomer;
      const mockDeleteCustomerById = service.deleteById as jest.Mock;
      mockDeleteCustomerById.mockResolvedValue(expectedResponse);

      mockRequest.params = { id: "1" };
      mockResponse.json = jest.fn();
      mockResponse.sendStatus = jest.fn();

      await deleteById(mockRequest, mockResponse, mockNext);

      expect(mockDeleteCustomerById).toHaveBeenCalledWith("1");
      expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
      expect(mockResponse.sendStatus).not.toHaveBeenCalled();
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle not found", async () => {
      const mockDeleteCustomerById = service.deleteById as jest.Mock;
      mockDeleteCustomerById.mockResolvedValue(null);

      mockRequest.params = { id: "1" };
      mockResponse.json = jest.fn();
      mockResponse.sendStatus = jest.fn();

      await deleteById(mockRequest, mockResponse, mockNext);

      expect(mockDeleteCustomerById).toHaveBeenCalledWith("1");
      expect(mockResponse.json).not.toHaveBeenCalled();
      expect(mockResponse.sendStatus).toHaveBeenCalledWith(404);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle errors", async () => {
      const mockError = new Error("Some error");
      const mockDeleteCustomerById = service.deleteById as jest.Mock;
      mockDeleteCustomerById.mockRejectedValue(mockError);

      mockRequest.params = { id: "1" };
      mockNext.mockImplementationOnce((error) => {
        expect(error).toBe(mockError);
      });

      await deleteById(mockRequest, mockResponse, mockNext);

      expect(mockDeleteCustomerById).toHaveBeenCalledWith("1");
      expect(mockResponse.json).not.toHaveBeenCalled();
      expect(mockResponse.sendStatus).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe("exportExcel", () => {
    it("should export customers to Excel", async () => {
      let testFilePath = __dirname.split("\\__tests__").slice(0, -1).join("\\") + "\\";
      testFilePath = testFilePath.split("\\").slice(0, -1).join("\\") + "\\";
      testFilePath = `${testFilePath}src\\controllers\\customer.xlsx`;
      const mockFilePath = testFilePath;
      const mockExportToExcel = service.exportToExcel as jest.Mock;
      mockExportToExcel.mockResolvedValue(mockFilePath);
      const mockDownload = mockResponse.download as jest.Mock;
      mockDownload.mockImplementationOnce((filePath: string, callback: any) => {
        // Ensure the filePath matches the mockFilePath
        expect(filePath).toBe(mockFilePath);

        callback(undefined); // Simulate a successful download
      });
      await exportExcel(mockRequest, mockResponse, mockNext);

      expect(mockExportToExcel).toHaveBeenCalledWith(mockFilePath);
      expect(mockResponse.download).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalled();
    });

    it("should handle errors", async () => {
      const mockError = new Error("Some error");
      const mockExportToExcel = service.exportToExcel as jest.Mock;
      mockExportToExcel.mockRejectedValue(mockError);

      mockNext.mockImplementationOnce((error) => {
        expect(error).toBe(mockError);
      });

      await exportExcel(mockRequest, mockResponse, mockNext);

      expect(mockExportToExcel).toHaveBeenCalled();
      expect(mockResponse.download).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalled();
    });

    it("should handle errors", async () => {
      const mockError = new Error("Some error");
      const mockExportToExcel = service.exportToExcel as jest.Mock;
      mockExportToExcel.mockRejectedValue(mockError);

      mockNext.mockImplementationOnce((error) => {
        expect(error).toBe(mockError);
      });

      await exportExcel(mockRequest, mockResponse, mockNext);

      expect(mockExportToExcel).toHaveBeenCalled();
      expect(mockResponse.download).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe("exportPDF function", () => {
    it("should generate a PDF document", async () => {
      const req = {} as Request;
      const res: Response = {
        setHeader: jest.fn(),
        end: jest.fn(),
      } as unknown as Response;
      const next = jest.fn() as NextFunction;

      const mockData = [
        {
          customerId: 1,
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          phone: "1234567890",
          address: "123 Main St",
        },
        // Add more mock data as needed
      ];

      (service.getAllData as jest.Mock).mockResolvedValue(mockData);

      const mockPDFDoc = new PDFDocument(); // You can also mock the PDFDocument class
      const pipeMock = jest.fn();
      mockPDFDoc.pipe = pipeMock;
      mockPDFDoc.end = jest.fn();

      const pdfDocMock = jest.spyOn(PDFDocument.prototype, "pipe").mockReturnValue(mockPDFDoc);

      await exportPDF(req, res, next);

      // expect(pipeMock).toHaveBeenCalledWith(res);
      // expect(mockPDFDoc.fontSize).toHaveBeenCalledWith(18);
      // Test other expectations based on your code

      // Ensure the service.getAll() is called
      expect(service.getAllData).toHaveBeenCalled();

      // Ensure the response headers are set correctly
      expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/pdf");
      expect(res.setHeader).toHaveBeenCalledWith("Content-Disposition", "attachment; filename=customer_report.pdf");

      // Ensure the PDFDocument is finalized
      // expect(mockPDFDoc.end).toHaveBeenCalled();

      // Ensure the 'next' function is not called (no errors occurred)
      expect(next).not.toHaveBeenCalled();
    });
  });
});

describe("Customer Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/customer", () => {
    it("should get all customers", async () => {
      const expectedResponse = {
        data: [
          { id: 1, name: "John" },
          { id: 2, name: "Jane" },
        ],
        pagination: { currentPage: 1, recordPerPage: 2, totalPage: 1, totalRecord: 2 },
      };

      const mockGetAllCustomers = service.getAll as jest.Mock;
      mockGetAllCustomers.mockResolvedValue(expectedResponse);

      const response = await request(app).get("/api/customer").expect(200);
      expect(response.body).toEqual(expectedResponse);
      expect(mockGetAllCustomers).toHaveBeenCalled();
    });

    it("should handle errors", async () => {
      const mockError = new Error("Some error");
      const mockGetAllCustomers = service.getAll as jest.Mock;
      mockGetAllCustomers.mockRejectedValue(mockError);

      const response = await request(app).get("/api/customer").expect(500);

      expect(response.body).toEqual({ message: "Some error" });
      expect(mockGetAllCustomers).toHaveBeenCalled();
    });
  });

  describe("GET /api/customer/:id", () => {
    it("should get a customer by ID", async () => {
      const expectedResponse = { id: 1, firstName: "John" };
      const mockGetCustomerById = service.getById as jest.Mock;
      mockGetCustomerById.mockResolvedValue(expectedResponse);

      const response = await request(app).get("/api/customer/1").expect(200);

      expect(response.body).toEqual(expectedResponse);
      expect(mockGetCustomerById).toHaveBeenCalledWith("1");
    });

    it("should handle not found", async () => {
      const mockGetCustomerById = service.getById as jest.Mock;
      mockGetCustomerById.mockResolvedValue(null);

      const response = await request(app).get("/api/customer/1").expect(404);
      expect(response.error.text).toEqual("Not Found");
      expect(mockGetCustomerById).toHaveBeenCalledWith("1");
    });
  });

  describe("POST /api/customer", () => {
    it("should create a new customer", async () => {
      const mockCustomer = { firstName: "John", lastName: "Test", email: "email@email.com", phone: "000000000", address: "addres for test" };
      const expectedResponse = { id: 1, ...mockCustomer };
      const mockCreateCustomer = service.createCustomer as jest.Mock;
      mockCreateCustomer.mockResolvedValue(expectedResponse);

      const response = await request(app).post("/api/customer").send(mockCustomer).expect(200);

      expect(response.body).toEqual(expectedResponse);
      expect(mockCreateCustomer).toHaveBeenCalledWith(mockCustomer);
    });
  });

  describe("PUT /api/customer", () => {
    it("should update a customer", async () => {
      const mockCustomer = { id: 1, firstName: "John", lastName: "Test", email: "email@email.com", phone: "000000000", address: "addres for test" };
      const expectedResponse = mockCustomer;
      const mockUpdateCustomer = service.updateCustomerById as jest.Mock;
      mockUpdateCustomer.mockResolvedValue(expectedResponse);

      const response = await request(app).put("/api/customer").send(mockCustomer).expect(200);

      expect(response.body).toEqual(expectedResponse);
      expect(mockUpdateCustomer).toHaveBeenCalledWith(mockCustomer);
    });
  });

  describe("DELETE /api/customer/:id", () => {
    it("should delete a customer by ID", async () => {
      const expectedResponse = { id: 1, name: "John" };
      const mockDeleteCustomerById = service.deleteById as jest.Mock;
      mockDeleteCustomerById.mockResolvedValue(expectedResponse);

      const response = await request(app).delete("/api/customer/1").expect(200);

      expect(response.body).toEqual(expectedResponse);
      expect(mockDeleteCustomerById).toHaveBeenCalledWith("1");
    });
  });
});
