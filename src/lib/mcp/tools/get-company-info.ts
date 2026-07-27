import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_company_info",
  title: "О компании ABIS Group",
  description:
    "Возвращает общую информацию о группе компаний ABIS Group: год основания, направления деятельности, регионы присутствия.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      name: "ABIS Group",
      founded: 2010,
      years_on_market: 16,
      description:
        "ABIS Group — группа компаний с 16-летним опытом работы на рынке Казахстана и Центральной Азии. Развиваем направления освещения, красок, декоративных покрытий, дистрибуции и розничной торговли.",
      directions: ["Дистрибьюция", "Розница", "Консалтинг", "Комплектация"],
      product_categories: [
        "Освещение",
        "Лакокрасочные материалы",
        "Декоративные покрытия",
        "Лепнина",
        "Интерьерные решения",
        "Малярные инструменты",
      ],
      regions: ["Казахстан", "Центральная Азия"],
      cities: ["Алматы", "Астана", "Караганда"],
      website: "https://abis.group",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
