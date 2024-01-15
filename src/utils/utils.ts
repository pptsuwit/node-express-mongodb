const mongoose = require("mongoose");
import { userModel } from "@models/user.model";

export function isValidId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

export function userDetails(user: userModel) {
  const { id, firstName, lastName, username } = user;
  return { id, firstName, lastName, username };
}

// export function getTotalPageSize(totalData: number, pageSize: number) {
//   let size = Math.floor(totalData / pageSize);
//   if (totalData % pageSize > 0 && Math.floor(totalData / pageSize)) {
//     size += 1;
//   }
//   return size;
// }

export function getTotalPageSize(count: number, pageSize: number) {
  let totalPage = Math.floor(count / pageSize);
  if (count % pageSize > 0) {
    totalPage += 1;
  }
  if (pageSize == 1) {
    totalPage = count;
  }
  return totalPage;
}
