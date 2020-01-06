import {spawn, Thread, Worker} from "threads"

//@ts-ignore
const driverUpdateWorker = new Worker('./test.thread.ts');

(async () => {
    const threaded = await spawn(driverUpdateWorker);
    const ob = threaded.testMethod();
    console.log("BEGIN");
    await ob;
    console.log("DONE MAIN");
    await Thread.terminate(threaded);
})();
