import { generateId } from "ai";
import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import { ollama } from "ollama-ai-provider";
import { type ReactNode } from "react";

export interface ServerMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ClientMessage {
  role: 'user' | 'assistant';
  id: string;
  display: ReactNode;
}

export async function continueConversation(
  input: string
): Promise<ClientMessage> {
  'use server';

  // const model = ollama('phi3:mini')
  const model = ollama('taozhiyuai/llama-3-8b-ultra-instruct:q2_k')
  const history = getMutableAIState<typeof AI>()

  // Update the AI state with the new user message.
  history.update([
    ...history.get(),
    { role: 'user', content: input }
  ]);

  const response = await streamUI({
    model,
    messages: history.get(),
    system: [
      `Your name is Phi.`,
      `You are a helpful assistant who gives accurate and brief answers.`,
      `You don't repeat the user's question back to them.`
    ].join(' '),
    text: ({ content, done }) => {
      if (done) {
        history.done([
          ...history.get(),
          { role: 'assistant', content },
        ]);
      }

      return <div>{content} </div>;
    },
  });

  // Update the AI state again with the response from the model.
  // history.done([
  //     ...history.get(),
  //     { role: 'assistant', content: response.value }
  // ]);

  return {
    id: generateId(),
    role: 'assistant',
    display: response.value,
  };
}

interface Actions {
  continueConversation: typeof continueConversation
}

export const AI = createAI<ServerMessage[], ClientMessage[], Actions>({
  actions: {
    continueConversation,
  },
  initialAIState: [],
  initialUIState: [],
});
