const mapping: Record<string, string> = {
  'crypto-marketing-services': 'crypto_marketing_service',
  organizations: 'organization',
  'service-plans': 'service_plan',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
