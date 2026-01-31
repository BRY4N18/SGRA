import { TutoringRequest } from './tutoringRequest.model';
import { User } from './user.model';

export interface RequestInvitation {
  id?: string | number;
  request?: TutoringRequest;
  recipient?: User;
  sentAt?: string;
  respondedAt?: string;
}
