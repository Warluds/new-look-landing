import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_contacts",
  title: "Контакты ABIS Group",
  description:
    "Возвращает контактные данные ABIS Group: телефон, e-mail, головной офис и социальные сети.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const contacts = {
      phone: "+7 727 227 50 18",
      email: "info@abis.kz",
      head_office: {
        city: "Алматы",
        address: "ТК ARMADA, ул. Кабдолова 1/8, 1 блок, 1G линия",
        country: "Казахстан",
      },
      website: "https://abis.group",
      social: {
        instagram: "https://instagram.com/abis.group",
        facebook: "https://facebook.com/ABIS.Group.kz",
        youtube: "https://youtube.com/@abisgroup5800",
      },
    };
    return {
      content: [{ type: "text", text: JSON.stringify(contacts, null, 2) }],
      structuredContent: contacts,
    };
  },
});
