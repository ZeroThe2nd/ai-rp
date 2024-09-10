import { type CoreMessage } from "ai";
import MessageUser from "./MessageUser";
import MessageAssistant from "./MessageAssistent";
import MessageSystem from "./MessageSystem";
import MessageTool from "./MessageTool";

interface IProps {
    message: CoreMessage
}

/**
 * ## Message
 * Renders a `CoreMessage` AI message as the right component.
 */
export default function Message ({ message }: IProps) {
    switch (message.role) {
        case 'user':
            return <MessageUser message={message} />
        case 'assistant':
            return <MessageAssistant message={message} />
        case 'system':
            return <MessageSystem message={message} />
        case 'tool':
            return <MessageTool message={message} />
    }

    return <pre>Unknown message role.</pre>
}
