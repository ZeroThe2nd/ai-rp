/**
 * ## Sleep Helper
 * Promise-ify a sleep call to help where small sleeps are needed.
 *
 * @param sleep Defaults to AR Waifu
 */
export const sleep = async (sleep: number = 416) => await new Promise<void>(
    (resolve) => setTimeout(resolve, sleep)
)

function randInt(min: number, max: number): number {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max) + 1;
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}