import { ISection, Section, getSection } from "@/components/library/Section";

const getSections = async (): Promise<ISection[]> => {
    const sections = []
    const types = [
        'popular',
        'rising',
        'new',
    ]

    for await (let type of types) {
        sections.push(await getSection(type))
    }

    return sections
}

export default async function Page() {
    const sections = await getSections()
    console.debug('Loaded library')

    return (
        <>
            <div>
                Showing categories
            </div>
            <div>
                {sections.map(section => <Section section={section} key={section.flake} />)}
            </div>
        </>
    )
}
