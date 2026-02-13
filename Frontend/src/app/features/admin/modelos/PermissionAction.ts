type PermissionKey = 'view' | 'create' | 'edit' | 'delete';

export interface PermissionAction {
  key: PermissionKey;
  label: string;
  icon: string;
}
