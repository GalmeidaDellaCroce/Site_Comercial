O que é: um site estático (HTML + CSS + JS puro, sem framework/backend) pra loja física — a Meta Game Store, em Andradina-SP, que vende cartas de Magic, Yu-Gi-Oh e Pokémon TCG.

O que ele faz, funcionalmente:

Carrossel de imagens de destaque, com troca automática a cada 4s e navegação manual (prev/next)
Indicador "Aberto/Fechado" em tempo real, calculado com base no horário de Brasília e nos dias de funcionamento (terça/quinta 19h-22h, sábado 14h-19h) — inclusive mostra quando reabre
Mural de eventos carregado dinamicamente de uma lista de configuração
Contador regressivo (dias/horas/minutos) pro próximo evento (Friday Night Magic)
Botões flutuantes de WhatsApp/Instagram, link pra loja online (mypcards) e link de localização no Maps
Usa Tailwind via CDN + Google Fonts (Orbitron/Raleway) pra um visual "gamer/cyber"

Ponto interessante do ponto de vista técnico: tudo é orientado por dados — config.js centraliza eventos, datas e parâmetros do carrossel, então trocar imagens/eventos não exige mexer no HTML nem no JS. Isso é uma boa prática de manutenção pra passar pro cliente final também.
