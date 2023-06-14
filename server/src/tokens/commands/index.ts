export { GenerateTokensCommand } from './generate-tokens';
export { RemoveTokenCommand } from './remove-token';
export { ValidateRefreshTokenCommand } from './validate-refresh-token';
export { ValidateAccessTokenCommand } from './validate-access-token';

import { GenerateTokensCommandHandler } from './generate-tokens';
import { RemoveTokenCommandHandler } from './remove-token';
import { ValidateRefreshTokenCommandHandler } from './validate-refresh-token';
import { ValidateAccessTokenCommandHandler } from './validate-access-token';

export const TokenHandlers = [
  GenerateTokensCommandHandler,
  RemoveTokenCommandHandler,
  ValidateRefreshTokenCommandHandler,
  ValidateAccessTokenCommandHandler,
];
