import { Request, Response, NextFunction } from "express";
import service from "@services/user.service";
import logger from "@utils/logger";
import { getTotalPageSize } from "@utils/utils";

export async function create(req: Request, res: Response, next: NextFunction) {
  const { firstName, lastName, username, password } = req.body;
  try {
    const user = await service.createUser({ firstName, lastName, username, password });
    res.json(user);
  } catch (error) {
    logger.error("Error occurred:", error);
    next(error);
  }
}
export async function update(req: Request, res: Response, next: NextFunction) {
  const { id, firstName, lastName, username } = req.body;
  try {
    const user = await service.updateUserById({ id, firstName, lastName, username });

    res.json(user);
  } catch (error) {
    logger.error("Error occurred:", error);
    next(error);
  }
}
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
  // if (req.params.id !== req.user?.id) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }
  try {
    const user = await service.getById(req.params.id);
    user ? res.json(user) : res.sendStatus(404);
  } catch (error) {
    logger.error("Error occurred:", error);
    next(error);
  }
}
export async function deleteById(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await service.deleteById(req.params.id);
    user ? res.json(user) : res.sendStatus(404);
  } catch (error) {
    logger.error("Error occurred:", error);
    next(error);
  }
}
