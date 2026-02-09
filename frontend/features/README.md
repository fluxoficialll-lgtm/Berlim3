### 🎨 Arquitetura por Features (Feature-Sliced Design)

Este diretório é o núcleo da nossa arquitetura de frontend e implementa o padrão **[Feature-Sliced Design (FSD)](https://feature-sliced.design/)**. O objetivo é dividir a aplicação em "fatias" de funcionalidades de negócio, tornando o código altamente modular, escalável e fácil de manter.

Cada subdiretório aqui representa uma **feature de negócio** (ex: `auth`, `groups`, `profile`, `reels`). Tudo o que é necessário para essa feature funcionar (componentes de UI, hooks com lógica, constantes, etc.) está encapsulado dentro de sua respectiva pasta.

---

#### Estrutura Interna de uma Feature Slice

Cada "fatia" de feature é auto-contida e geralmente segue uma estrutura interna previsível:

-   **`/components`**: Contém os componentes React que são **específicos e exclusivos** desta feature. Por exemplo, `profile/components/ProfileHeader.tsx` só é usado dentro do contexto do perfil.
-   **`/hooks`**: Armazena os hooks do React que encapsulam a lógica de estado e os efeitos colaterais da feature. Ex: `groups/hooks/useGroupSettings.ts`.
-   **`/logic`**: Para lógica de negócio pura (funções que não são hooks) que pode ser reutilizada dentro da feature. Ex: `groups/logic/AccessValidator.ts`.
-   **`/constants`**: Define constantes e valores estáticos que são relevantes apenas para esta feature. Ex: `groups/constants/GroupRoles.ts`.

Nem toda feature terá todas essas pastas, mas essa é a estrutura recomendada.

---

####  गोल्डन रूल: A Regra de Ouro da Dependência

A regra mais importante do Feature-Sliced Design é:

> **Uma feature NUNCA deve depender diretamente de outra feature.**

-   **NÃO FAÇA:** `import { UserAvatar } from '../../profile/components/UserAvatar';` dentro de `features/groups/components/MemberList.tsx`.
-   **FAÇA:** A comunicação e composição de features são orquestradas pelas camadas superiores, como `pages/` ou `flows/`. Uma página (`pages/GroupDetails.tsx`) pode importar e usar componentes de `features/profile` e `features/groups` para compor a UI final.

Essa regra previne o acoplamento forte e o código "espaguete", garantindo que as features permaneçam independentes e reutilizáveis.

---

#### Como Usar Este Diretório

-   **Para Adicionar uma Funcionalidade:** Crie uma nova pasta de feature (ex: `features/chat/`). Desenvolva seus componentes, hooks e lógica dentro dela. Em seguida, vá para o diretório `pages/` para criar a página que irá consumir e exibir sua nova feature.
-   **Para Modificar uma Funcionalidade:** Localize a pasta da feature correspondente. As chances são de que 90% do código que você precisa alterar estará contido ali dentro.
