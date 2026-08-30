# Meta Game Store — Site Institucional

Site institucional estático para a **Meta Game Store**, loja física de cartas colecionáveis (Magic: The Gathering, Yu-Gi-Oh! e Pokémon TCG) em Andradina-SP. O objetivo é centralizar em um só lugar as informações que os clientes mais buscam: se a loja está aberta agora, quais eventos estão rolando na semana e quando é o próximo torneio.

🔗 **[Ver site no ar](#)** <!-- substitua pelo link do deploy, se houver (GitHub Pages, Vercel, etc.) -->

## Funcionalidades

- **Status Aberto/Fechado em tempo real** — calculado a partir do horário de Brasília e da grade de funcionamento (terça e quinta 19h–22h, sábado 14h–19h), incluindo aviso de quando a loja reabre.
- **Carrossel de destaques** com troca automática a cada 4 segundos e navegação manual.
- **Mural de eventos** da semana, renderizado dinamicamente a partir de um arquivo de configuração.
- **Contador regressivo** (dias/horas/minutos) para o próximo evento em destaque.
- Botões flutuantes de acesso rápido ao **WhatsApp** e **Instagram**.
- Links diretos para a **loja online** (mypcards) e **localização no Google Maps**.

## Tecnologias

- HTML5 + CSS3 (sem frameworks de build)
- JavaScript puro (Vanilla JS), sem dependências externas de runtime
- [Tailwind CSS](https://tailwindcss.com/) via CDN, para agilidade de estilização
- Google Fonts (Orbitron + Raleway)

Não há backend nem processo de build: é um site 100% estático, pensado para ser hospedado em qualquer serviço simples de arquivos estáticos (GitHub Pages, Netlify, Vercel, etc.).

## Estrutura do projeto

```
├── index.html          # Estrutura da página
├── style.css           # Estilos customizados (complementa o Tailwind)
├── config.js           # Configuração de conteúdo: eventos, carrossel, próximo evento
├── script.js           # Lógica: carrossel, status da loja, mural, contador
└── img/
    ├── logo.png
    ├── whatsapp.png
    ├── instagram.png
    └── carrossel/      # Imagens do carrossel (1.jpeg, 2.jpeg, ...)
```

### Por que um `config.js` separado?

Todo o conteúdo variável do site — eventos da semana, data do próximo torneio, quantidade de imagens do carrossel — fica isolado em `config.js`. Isso permite que o conteúdo seja atualizado (por exemplo, pelo próprio dono da loja) sem precisar tocar em HTML ou JavaScript de lógica:

```js
const CONFIG = {
  carrossel: { pasta: "img/carrossel/", quantidade: 4, extensao: ".jpeg" },
  proximoEvento: { nome: "Friday Night Magic", data: "2026-09-20T19:00:00" },
  muralEventos: [
    { data: "Ter 11/08", titulo: "Encontro Casual de Yu-Gi-Oh às 19h" },
    // ...
  ]
};
```

## Como rodar localmente

Por ser um projeto estático, basta abrir o `index.html` em um navegador. Para evitar eventuais bloqueios de CORS ao carregar as imagens, recomenda-se servir os arquivos com um servidor local simples:

```bash
# Python
python3 -m http.server 8000

# ou Node.js
npx serve .
```

Depois é só acessar `http://localhost:8000`.

## Roadmap / possíveis melhorias

- [ ] Adicionar formulário de contato ou integração de agendamento de mesas para torneios
- [ ] Migrar o mural de eventos para uma fonte de dados externa (ex: planilha ou CMS headless), facilitando a atualização sem editar código
- [ ] Adicionar testes visuais de responsividade em diferentes tamanhos de tela

## Autor

Desenvolvido por [Gabriel](https://github.com/Gadelc-2004) como projeto freelance para cliente local.

## Licença

Este projeto foi desenvolvido sob encomenda para a Meta Game Store. Uso e redistribuição do código sujeitos a autorização do autor.
