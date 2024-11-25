import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function gerarDescricaoComGemini(imageBuffer) {
  const prompt = "Gere uma descrição em português do brasil para a seguinte imagem:";

  try {
    // Criar uma parte para o prompt
    const imagePart = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/png",
      },
    };

    // Criar o array de partes para a geração de conteúdo
    const parts = [
      { text: prompt },
      imagePart
    ];

    // Gerar o conteúdo usando o array de partes
    const result = await model.generateContent(parts);
    const response = await result.response;
    return response.text() || "Alt-text não disponível.";
  } catch (erro) {
    console.error("Erro ao obter alt-text:", erro.message, erro);
    throw new Error("Erro ao obter alt-text do Gemini.");
  }
}