import axios from "axios";

export const explainCode = async (
  code: string,
  apiKey: string
) => {
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "deepseek/deepseek-chat",
      messages: [
        {
          role: "user",
          content:
            "Explain this code:\n\n" +
            code,
        },
      ],
    },
    {
      headers: {
        Authorization:
          `Bearer ${apiKey}`,
      },
    }
  );

  return response.data.choices[0]
    .message.content;
};