export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
  username?: string;
  avatar?: string;
  job?: string;
  organization?: string;
  location?: string;
  role: RoleType;
}
