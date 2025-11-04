import { spawn } from "child_process";

const child = spawn("npm", ["run", "dev"], { stdio: "inherit", shell: true });

child.on("close", (code) => {
  console.log(`Vite dev server exited with code ${code}`);
});
