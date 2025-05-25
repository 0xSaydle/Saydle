// scripts/runScheduler.ts
import { runScheduledSender } from "../lib/sendAffirmations"; // adjust to actual path

(async () => {
  try {
    const res = await runScheduledSender();
    console.log(res)
    console.log("Scheduler ran successfully.");
  } catch (err) {
    console.error("Error running scheduler:", err);
  }
})();
