interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: ['Clients'],
  tenantRoles: [
    'Business Owner',
    'Project Manager',
    'Business Developer',
    'Marketing Manager',
    'Copywriter',
    'Graphics Designer',
    'Community Manager',
    'Social Media Manager',
  ],
  tenantName: 'Organization',
  applicationName: 'coindash',
  addOns: ['chat', 'notifications', 'file'],
};
