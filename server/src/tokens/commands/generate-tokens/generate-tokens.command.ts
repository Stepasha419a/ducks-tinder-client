import { UserTokenDto } from 'auth/dto';

export class GenerateTokensCommand {
  constructor(public readonly payload: UserTokenDto) {}
}
