import { CoreAssistantMessage } from "ai";

interface IProps {
    message: CoreAssistantMessage
}

export default function MessageAssistant ({ message }: IProps) {
    return <article className="message assistant flex gap-2 self-start">
    <picture className="m-2">
        <div className="w-12 h-12 rounded-full bg-slate-700" />
    </picture>
    <main className="max-w-prose grow p-2 border border-white rounded-xl mr-2">
        <h1 className="text-sm text-neutral-400">Assistant:</h1>
        <p className="whitespace-pre-line">{message.content as string}</p>
    </main>
</article>
}
