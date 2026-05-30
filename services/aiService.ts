import axios from "axios";
import { OPENROUTER_API_KEY } from "@env";


export const generateCode = async (
  prompt: string
) => {
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "deepseek/deepseek-chat",
      messages: [
        {
          role: "user",
          content: `Generate code for: ${prompt}`,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
    }
  );

  return response.data.choices[0]
    .message.content;
};
export const explainCode = async (
  code: string
) => {
  const response =
    await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model:
          "deepseek/deepseek-chat",
        messages: [
          {
            role: "user",
            content:
              `Explain this code:\n\n${code}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        },
      }
    );

  return response.data.choices[0]
    .message.content;
};