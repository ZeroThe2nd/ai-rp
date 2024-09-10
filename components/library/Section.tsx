import { sleep } from "@/utils/helpers"
import { randomBytes, randomInt } from "crypto"
import { Suspense } from "react"
import { CharacterLoading, Character } from "./Character"

export interface ISection {
    flake: string
    name: string
    __bloatware: Buffer
    characterIds: string[]
}

const typeToSection = (type: string) => ({
    flake: type,
    name: type.toLocaleUpperCase(),
    __bloatware: randomBytes(2048),
    characterIds: new Array(randomInt(1, 11))
        .fill(1)
        .map((_, i): string => i.toString())
})

export const getSection = async (type: string): Promise<ISection> => {
    await sleep(850)

    return typeToSection(type)
}

export async function Section({ section: data }: { section: ISection }) {
    return (
        <section className="m-2 p-2 rounded border border-neutral-400">
            <h1>{data.name} charcters</h1>
            <div className="flex gap-2 overflow-x-auto">
                {data.characterIds.map(flake => <Suspense fallback={<CharacterLoading />} key={flake} >
                    <Character flake={flake} />
                </Suspense>
                )}
            </div>
        </section>
    )
}