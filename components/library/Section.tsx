import { sleep } from "@/utils/helpers"
import { randomBytes, randomInt } from "crypto"
import { Suspense } from "react"
import { CharacterLoading, Character } from "./Character"
import { unstable_cache } from "next/cache"
import { getSnowflake } from "@util/snowflake";

export interface ISection {
    flake: string
    name: string
    __bloatware: Buffer
    characterIds: string[]
}

const typeToSection = (type: string): ISection => ({
    flake: type,
    name: type.toLocaleUpperCase(),
    // Addresses Safari weirdness needing at least 2048 bytes in a response to allow streaming with loading UI
    __bloatware: randomBytes(2048),
    characterIds: new Array(randomInt(1, 3))
        .fill(1)
        // Map every position to a new snowflake
        .map((): string => getSnowflake())
})

export const getSection = async (type: string): Promise<ISection> => {
    await sleep(850)

    return typeToSection(type)
}

export const getCachedSection = unstable_cache(
    async (type: string) => getSection(type),
    ['library--section-by-type']
)

export async function Section({section: data}: { section: ISection }) {
    return (
        <section className="m-2 p-2 rounded border border-neutral-400">
            <h1>{data.name} charcters</h1>
            <div className="flex gap-2 overflow-x-auto">
                {data.characterIds.map(flake => <Suspense fallback={<CharacterLoading/>} key={flake}>
                        <Character flake={flake}/>
                    </Suspense>
                )}
            </div>
        </section>
    )
}