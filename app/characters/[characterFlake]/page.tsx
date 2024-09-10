type Props = Readonly<{
    params: {
        characterFlake: string
    }
}>

export default async function CharcterPage ({params: { characterFlake }}: Props) {
    return (
        <div>
            Showing character details {characterFlake}
        </div>
    )
}
