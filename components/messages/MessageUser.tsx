import { CoreUserMessage } from "ai";

interface IProps {
    message: CoreUserMessage
}

export default function MessageUser ({ message }: IProps) {
    return <article className="message user flex gap-2 self-end">
        <main className="max-w-prose grow p-2 border border-white rounded-xl ml-2">
            <h1 className="text-sm text-neutral-400">User:</h1>
            <p className="whitespace-pre-line">{message.content as string}</p>
        </main>
        <picture className="m-2">
            <div className="w-12 h-12 rounded-full bg-slate-500" />
        </picture>
    </article>
}
