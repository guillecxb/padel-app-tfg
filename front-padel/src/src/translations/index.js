import { useTranslation } from "react-i18next";

const translationHelper = (nameSpace) => () => useTranslation(nameSpace).t;

// common
export const useValidationTranslation = translationHelper("validation");
export const useNotificationsTranslation = translationHelper("notifications");
export const usePrivateLayoutTranslation = translationHelper("privateLayout");
export const useTablesTranslation = translationHelper("tables");
export const useRolesTranslation = translationHelper("roles");
export const useStatusesTranslation = translationHelper("statuses");
export const useFiltersTranslation = translationHelper("filters");
export const useAlertsTranslation = translationHelper("alerts");
export const useModalsTranslation = translationHelper("modals");

// pages
export const useLoginTranslation = translationHelper("login");
export const useOperatorDashboardTranslation = translationHelper("operatorDashboard");
export const useOperatorsTranslation = translationHelper("operators");
export const useOperatorCustomerTranslation = translationHelper("operatorCustomer");
export const useCustomerDashboardTranslation = translationHelper("customerDashboard");
export const useUsersTranslation = translationHelper("users");
export const useUsersCreateEditTranslation = translationHelper("usersCreateEdit");
export const useAuditoryLogTranslation = translationHelper("auditoryLog");
export const useDevicesTranslation = translationHelper("devices");
export const useConnectionsTranslation = translationHelper("connections");
export const useRulesTranslation = translationHelper("rules");
export const useSitesTranslation = translationHelper("sites");
export const useSimsTranslation = translationHelper("sims");
export const useServicesTranslation = translationHelper("services");
export const useNewsTranslation = translationHelper("news");
export const useFaqsTranslation = translationHelper("faqs");
export const useMembersAreaTranslation = translationHelper("membersArea");

export const useHelpCustomerDashboardTranslation = translationHelper("helpCustomerDashboard");
export const useHelpCustomerUsersTranslation = translationHelper("helpCustomerUsers");
export const useHelpCustomerCareOperatorsTranslation = translationHelper(
  "helpCustomerCareOperators"
);
export const useHelpCustomerSitesTranslation = translationHelper("helpCustomerSites");
export const useHelpCustomerDevicesTranslation = translationHelper("helpCustomerDevices");
