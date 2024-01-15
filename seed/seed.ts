import { seedCustomer } from "./customer";
import { seedUser } from "./user";
async function main() {
  console.log("main run");
  await seedCustomer();
  await seedUser();
}

main().catch((error) => {
  console.error("An error occurred:", error);
});
