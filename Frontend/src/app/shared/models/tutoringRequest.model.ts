import { RequestStatus } from './requestStatus.enum';
import { User } from './user.model';

export interface TutoringRequest {
  id?: string | number;
  requester?: User;
  status?: RequestStatus;
  createdAt?: string;
  updatedAt?: string;
  notes?: string;
}
