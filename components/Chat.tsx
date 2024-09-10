'use client';

import { ChangeEvent, useState } from 'react';
import { type CoreMessage } from 'ai';
import { readStreamableValue } from 'ai/rsc';
import { continueConversation } from '@action/continueConversation';
import Message from '@component/messages';

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = 'force-dynamic';
export const maxDuration = 45;

export default function Chat() {
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [input, setInput] = useState('Give me a random fact please.');
  const [data, setData] = useState<null | object>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    // window?.localStorage.setItem('userChatInput', e.target.value)
  }

  const formAction = async () => {
    const newMessages: CoreMessage[] = [
      ...messages,
      { content: input, role: 'user' },
    ];

    setMessages(newMessages);
    setInput('');
    // window?.localStorage.removeItem('userChatInput')

    const { message, data } = await continueConversation(
      // { content: input, role: 'user' },
      messages
    );
    setData(data);

    for await (const content of readStreamableValue(message)) {
      setMessages([...newMessages, {
        role: 'assistant',
        content: content as string,
      }]);
    }
  }

  return (
    <div className="flex flex-col w-full min-h-full max-w-prose py-2 mx-auto stretch">

      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}

      <div className='messages flex flex-col gap-4'>
        {messages.map((m, i) => <Message message={m} key={i} />)}
      </div>

      <form
        action={formAction}
        className="fixed flex bottom-0 w-full max-w-prose mb-2 gap-2"
      >
        <input
          className='p-2 border border-white-800 bg-black rounded-xl grow'
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
        <button type='submit'
          className='border border-white-800 bg-black rounded-xl p-2'
        >
          Send
        </button>
      </form>
    </div>
  );
}
