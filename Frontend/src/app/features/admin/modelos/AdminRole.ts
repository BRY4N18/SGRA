export interface AdminRole {
  id: number;
  name: string;
  description: string;
  users: number;
  status: 'Activo' | 'Inactivo';
  modules: number;
  updated: string;
}
