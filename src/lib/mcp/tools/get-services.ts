import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_services",
  title: "Услуги ABIS Group",
  description:
    "Возвращает список услуг для партнёров и клиентов: обучение, маркетинг, комплектация объектов, аренда тренинг-зала.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const services = [
      {
        id: "distribution",
        name: "Дистрибьюция и импорт",
        description: "Поставка освещения, красок и декоративных покрытий партнёрам по Казахстану и Центральной Азии.",
      },
      {
        id: "retail",
        name: "Розничная торговля",
        description: "Салоны SVET.KZ и Центр Красок №1 в Алматы, Астане и Караганде.",
      },
      {
        id: "consulting",
        name: "Консалтинг и комплектация",
        description: "Подбор освещения, красок и декоративных решений для объектов: ЖК, частные дома, HoReCa, коммерческие и общественные помещения.",
      },
      {
        id: "education",
        name: "Обучение и тренинги",
        description: "Тренинг-зал ABIS Group для обучения партнёров и специалистов. Помещение также сдаётся в аренду.",
      },
      {
        id: "marketing",
        name: "Маркетинговая поддержка",
        description: "Маркетинговая поддержка партнёров и продвижение брендов группы.",
      },
    ];
    return {
      content: [{ type: "text", text: JSON.stringify(services, null, 2) }],
      structuredContent: { services },
    };
  },
});
