import { CoreSystemMessage } from "ai";

interface IProps {
    message: CoreSystemMessage
}

export default function MessageSystem ({ message }: IProps) {
    return <article className="message system">
        <h1>System: </h1>
        <pre>{message.content as string}</pre>
    </article>
}
