import Replicate from "replicate";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const { messages, persona } = await readBody(event);

  // get last message from body array
  const newMessage = messages[messages.length - 1];

  // remove last message from body array
  messages.pop();

  // Classify safetfy of the message

  const replicate = new Replicate({
    auth: config.private.REPLICATE_API_TOKEN,
  });

  console.log(newMessage.message);

  const promptSafety = await replicate.run(
    "meta/meta-llama-guard-2-8b:b063023ee937f28e922982abdbf97b041ffe34ad3b35a53d33e1d74bb19b36c4",
    {
      input: {
        prompt: newMessage.message,
      },
    }
  );

  console.log("promptSafety", promptSafety);

  if (promptSafety.includes("unsafe")) {
    return "[message-unsafe]";
  }

  let prompt_template = `<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n${persona}<|eot_id|>`;

  // add previous messages to prompt_template
  messages.forEach(async (message) => {
    if (message.from === "you") {
      prompt_template += `<|start_header_id|>user<|end_header_id|>\n\n${message.message}<|eot_id|>`;
    } else {
      prompt_template += `<|start_header_id|>assistant<|end_header_id|>\n\n${message.message}<|eot_id|>`;
    }
  });

  // add last message to prompt_template
  prompt_template +=
    "<|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n";

  const input = {
    prompt: newMessage.message,
    min_tokens: 0,
    temperature: 1.1,
    prompt_template,
  };

  const reply = await replicate.run("meta/meta-llama-3-70b-instruct", {
    input,
  });

  console.log(reply.join(""));

  const replySafety = await replicate.run(
    "meta/meta-llama-guard-2-8b:b063023ee937f28e922982abdbf97b041ffe34ad3b35a53d33e1d74bb19b36c4",
    {
      input: {
        prompt: newMessage.message,
        assistant: reply.join(""),
      },
    }
  );

  console.log("replySafety", replySafety);

  if (replySafety.includes("unsafe")) {
    return "[message-unsafe]";
  }

  return reply.join("");
});
