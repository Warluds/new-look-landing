import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_brands",
  title: "Дочерние бренды ABIS Group",
  description:
    "Возвращает список брендов и направлений внутри экосистемы ABIS Group с описанием каждого.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const brands = [
      {
        id: "svet-kz",
        name: "SVET.KZ",
        description: "Салоны освещения Svet.kz — профессиональный и декоративный свет.",
      },
      {
        id: "centre-krasok-1",
        name: "Центр Красок №1",
        description: "Розничная сеть салонов красок и декоративных покрытий.",
      },
      {
        id: "centre-krasok-1-pro",
        name: "Центр Красок №1 PRO",
        description: "Краски и инструменты для профессионалов.",
      },
      {
        id: "pro-decor",
        name: "PRO DECOR",
        description: "Освещение и краски для профессионалов.",
      },
      {
        id: "and-asia",
        name: "AND Asia",
        description: "Дистрибуция и импорт.",
      },
      {
        id: "decor-plus",
        name: "Decor+",
        description: "Декоративные покрытия и интерьерные решения.",
      },
    ];
    return {
      content: [{ type: "text", text: JSON.stringify(brands, null, 2) }],
      structuredContent: { brands },
    };
  },
});
