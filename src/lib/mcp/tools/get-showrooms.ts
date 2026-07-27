import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const SHOWROOMS = [
  {
    city: "Алматы",
    brand: "SVET.KZ",
    name: "Салон SVET.KZ Алматы",
    address: "ТК ARMADA, ул. Кабдолова 1/8, ряд 3, блок 1, линия G",
  },
  {
    city: "Астана",
    brand: "SVET.KZ",
    name: "Салон SVET.KZ Астана",
    address: "Астана",
  },
  {
    city: "Караганда",
    brand: "SVET.KZ",
    name: "Салон SVET.KZ Караганда",
    address: "Караганда",
  },
  {
    city: "Алматы",
    brand: "Центр Красок №1",
    name: "Центр Красок №1 Алматы",
    address: "Алматы",
  },
];

export default defineTool({
  name: "get_showrooms",
  title: "Салоны ABIS Group",
  description:
    "Возвращает список розничных салонов ABIS Group. Можно опционально отфильтровать по городу или бренду.",
  inputSchema: {
    city: z.string().optional().describe("Город (например, 'Алматы')."),
    brand: z.string().optional().describe("Бренд (например, 'SVET.KZ')."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ city, brand }) => {
    const filtered = SHOWROOMS.filter(
      (s) =>
        (!city || s.city.toLowerCase() === city.toLowerCase()) &&
        (!brand || s.brand.toLowerCase() === brand.toLowerCase()),
    );
    return {
      content: [{ type: "text", text: JSON.stringify(filtered, null, 2) }],
      structuredContent: { showrooms: filtered, count: filtered.length },
    };
  },
});
