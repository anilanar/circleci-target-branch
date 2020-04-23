import { getTargetBranchName } from "../index";

async function run() {
   const name = await getTargetBranchName();
   if (name) {
    console.log(name);
   }
   process.exit(0);
}

run();