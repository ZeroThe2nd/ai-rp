import {getAiResponse} from "@/actions/ai.simple"
import {getSnowflake} from "@/utils/snowflake"
import {randomBytes} from "crypto"
import {unstable_cache} from 'next/cache';

export interface ICharacter {
    flake: string
    slug: string
    name: string
    subtitle: string
    shortBio: string
    tags: string[]
    __bloatware: Buffer
}

export const getCharacter = async (flake: string): Promise<ICharacter> => {
    const {text: name} = await getAiResponse('Write a fantasy character name without explaining it.')
    const {text: subtitle} = await getAiResponse(`Write a humourous character subtitle within 10 words for ${name}.`)
    const {text: shortBio} = await getAiResponse(`Write a short character description for ${name}, ${subtitle}.`)
    const {text: tagStr} = await getAiResponse('Write 7 character traits as tags separated by commas.')

    const tags = tagStr.trim().split(',')

    return {
        flake: getSnowflake(),
        slug: flake,
        name,
        subtitle,
        shortBio,
        tags,
        __bloatware: randomBytes(2048)
    }
}

export const getCharacterCached = unstable_cache(
    async (snowflake: string) => await getCharacter(snowflake),
    ['character--by-snowflake']
)

export function CharacterLoading() {
    return (<div
        className="m-2 p-2 rounded border border-white h-48 w-24 animate-pulse bg-neutral-600"
    />)
}

export async function Character({flake}: { flake: string }) {
    const character = await getCharacter(flake)

    return <a href={`/library/${character.slug}`}>
        <article className="m-2 p-2 rounded border border-white">
            <h1>{character.name}</h1>
            <small>{character.flake}</small>
        </article>
    </a>
}
