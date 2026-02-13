export interface AdminUser {
  id: number;
  fullName: string;
  identifier: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  institution: string;
  role: string;
  username: string;
  status: 'Activo' | 'Inactivo';
  accountStatus: 'Activa' | 'Bloqueada';
}
