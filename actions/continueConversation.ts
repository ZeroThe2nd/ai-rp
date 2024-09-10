'use server';

import { CoreMessage, streamText } from 'ai';
import { createStreamableValue } from 'ai/rsc';
import { ollama } from 'ollama-ai-provider';

export async function continueConversation(
  // input: CoreUserMessage,
  messages: CoreMessage[]
) {
  // Dynamically load a model some day
  const model = ollama('taozhiyuai/llama-3-8b-ultra-instruct:q2_k')

  const result = await streamText({
    model,
    messages,
    system: `You are a helpful assistant. Your name is Zero.`,
    onFinish: async (ev) => {
      // Persist chat message logic
    }
  });

  // const { totalTokens } = await result.usage
  const { modelId, provider } = model

  // Additional data in an object to pass along in the response
  const data = {
    modelId, provider
  };

  const stream = createStreamableValue(result.textStream);

  return {
    // input,
    message: stream.value,
    data
  };
}
