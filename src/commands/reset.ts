import { resetDb } from "src/lib/db/queries/reset";

export async function handlerReset(cmdName: string, ...args: string[]) {
    console.log("reset in");
    if (args.length !== 0) {
        throw new Error(`usage: ${cmdName}`);
    };
    await resetDb();
}