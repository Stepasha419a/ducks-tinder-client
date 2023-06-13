export { GenerateTokensCommand } from './generate-tokens';
export { RemoveTokenCommand } from './remove-token';

import { GenerateTokensCommandHandler } from './generate-tokens';
import { RemoveTokenCommandHandler } from './remove-token';

export const TokenHandlers = [
  GenerateTokensCommandHandler,
  RemoveTokenCommandHandler,
];
