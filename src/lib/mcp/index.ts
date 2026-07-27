import { defineMcp } from "@lovable.dev/mcp-js";
import getCompanyInfo from "./tools/get-company-info";
import getBrands from "./tools/get-brands";
import getContacts from "./tools/get-contacts";
import getShowrooms from "./tools/get-showrooms";
import getServices from "./tools/get-services";

export default defineMcp({
  name: "abis-group-mcp",
  title: "ABIS Group MCP",
  version: "0.1.0",
  instructions:
    "Публичный MCP-сервер ABIS Group — группы компаний из Казахстана (освещение, краски, декоративные покрытия). Используйте инструменты для получения информации о компании, брендах, контактах, салонах и услугах.",
  tools: [getCompanyInfo, getBrands, getContacts, getShowrooms, getServices],
});
