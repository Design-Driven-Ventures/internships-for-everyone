import Replicate from "replicate";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const { messages, persona } = await readBody(event);

  // get last message from body array
  const newMessage = messages[messages.length - 1];

  // remove last message from body array
  messages.pop();

  const replicate = new Replicate({
    auth: config.private.REPLICATE_API_TOKEN,
  });

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

  const output = await replicate.run("meta/meta-llama-3-70b-instruct", {
    input,
  });

  return output.join("");
});
