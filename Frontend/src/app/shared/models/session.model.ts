import { SessionMode } from './sessionMode.enum';
import { SessionType } from './sessionType.enum';
import { TutoringRequest } from './tutoringRequest.model';
import { User } from './user.model';

export interface Session {
  id?: string | number;
  request?: TutoringRequest;
  type?: SessionType;
  mode?: SessionMode;
  facilitator?: User;
  startsAt?: string;
  endsAt?: string;
  location?: string;
}
