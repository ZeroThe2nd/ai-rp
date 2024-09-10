import { getCharacterCached } from "@/components/library/Character"

type Props = Readonly<{
  params: { characterFlake: string }
}>

export default async function Page({ params: { characterFlake } }: Props) {
  const character = await getCharacterCached(characterFlake)

  return <article className="max-w-prose mx-auto">

    <header className="flex gap-4 mb-4">
      <picture>
        <div className="rounded-lg bg-neutral-700 w-48 aspect-square" />
      </picture>
      <div className="grow-0">
        <h1 className="text-3xl font-light">{character.name}</h1>
        <h2 className="text-neutral-400 font-light mb-2">{character.subtitle}</h2>

        <ul className="tags flex gap-2 flex-wrap">
          {character.tags.slice(0, 8).map((tag, i) => <li
            key={i}
            className="shrink-0 rounded-full px-3 py-1 bg-neutral-700 capitalize"
          >
            {tag}
          </li>)}
        </ul>

      </div>
    </header>

    <div className="text-sm font-mono flex gap-2">
      <p>Flake: {character.flake}</p>
      <p>Slug: {character.slug}</p>
    </div>

    <main>
      <h2 className="text-lg font-light mb-2">Biography</h2>
      {character.shortBio}
    </main>

  </article>
}
