import { CoreToolMessage } from "ai";

interface IProps {
    message: CoreToolMessage
}

export default function MessageTool ({ message }: IProps) {
    return <article className="message tool border-l border-l-4 border-l-solid border-l-red-500 pl-4 mb-4">
        <h1>Tool: </h1>
        <p>Tool send a message. Rendering not implemented.</p>
        {/* <pre>{message.content as string}</pre> */}
    </article>
}
