'use client';

import { AI, ClientMessage } from "@/actions/ai";
import { generateId } from "ai";
import { useActions, useUIState } from "ai/rsc";
import { useState } from "react"

type Props = Readonly<{
  params: {
    /** The character slug */
    characterFlake: string,
    /** The chat id */
    chatFlake: string | number
  }
}>

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = 'force-dynamic';
export const maxDuration = 45;

export default function CharacterChatPage({ params: { characterFlake, chatFlake } }: Props) {
  const { continueConversation } = useActions<typeof AI>();
  const [input, setInput] = useState<string>('');
  const [conversation, setConversation] = useUIState<typeof AI>();

  // const handleSubmit = async (event: SubmitEvent) => {
  //   event.preventDefault();
  //   if (!(event.currentTarget instanceof HTMLFormElement)) return

  //   setConversation([
  //     ...conversation,
  //     { id: Date.now(), role: 'user', display: event.currentTarget.message.value },
  //   ]);

  //   const response = await continueConversation(event.currentTarget.message.value);
  //   setConversation([
  //     ...conversation,
  //     { id: Date.now(), role: 'assistant', display: response },
  //   ]);
  // };

  const onSendMessage = async () => {
    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      { id: generateId(), role: 'user', display: input },
    ]);

    const message = await continueConversation(input);

    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      message,
    ]);
  }

  return (
    <>
      <div className="flex flex-col w-full min-h-full max-w-prose py-2 mx-auto stretch">
        <div>Charcter: {characterFlake} - Chat: {chatFlake ?? 'default'}</div>
        <ul>
          {conversation.map(message => (
            <li key={message.id} className="whitespace-pre-line">{message.display}</li>
          ))}
        </ul>

        <form
          action={onSendMessage}
          className="fixed flex bottom-0 w-full max-w-prose mb-2 gap-2"
        >
          <input
            className='p-2 border border-white-800 bg-black rounded-xl grow'
            value={input}
            placeholder="Say something..."
            onChange={ev => setInput(ev.target.value)}
          />
          <button type='submit'
            className='border border-white-800 bg-black rounded-xl p-2'
          >
            Send
          </button>
        </form>
      </div>

      {/* <div className="flex flex-col w-full min-h-full max-w-prose py-2 mx-auto stretch"> */}
      {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}

      {/* <div className='messages flex flex-col gap-4'>
              {messages.map((m, i) => <Message message={m} key={i} />)}
            </div> */}
      {/* </div> */}
    </>
  );
}
