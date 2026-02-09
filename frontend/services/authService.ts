/**
 * @fileoverview Seletor Dinâmico de Serviço de Autenticação.
 *
 * Este arquivo atua como um "switch" que determina qual implementação do serviço de
 * autenticação será utilizada em toda a aplicação. A escolha é baseada na variável
 * `USE_MOCKS`.
 *
 * - Em um ambiente de produção, ele exportará o `RealAuthService`, que se comunica
 *   com o backend real.
 * - Em um ambiente de desenvolvimento ou "demo", ele pode exportar o `MockAuthService`,
 *   que usa dados falsos para desenvolvimento do frontend sem depender da API.
 */

// Importa a flag que controla o uso de mocks. O caminho foi corrigido de '../mocks' para './mocks'.
import { USE_MOCKS } from './mocks';

// Importa a implementação real do serviço de autenticação.
import { authService as RealAuthService } from './real/authService';

// Importa a implementação de mock (falsa) do serviço de autenticação para testes e desenvolvimento.
import { authService as MockAuthService } from './mocks/authService';

/**
 * Exporta condicionalmente o serviço de autenticação apropriado.
 * Se `USE_MOCKS` for `true`, a aplicação usará o serviço com dados falsos (`MockAuthService`).
 * Caso contrário, usará o serviço real que se conecta à API (`RealAuthService`).
 */
export const authService = USE_MOCKS ? MockAuthService : RealAuthService;
