// Seção: Configuração e Controle do Carrossel
const imagens = Array.from(
  { length: CONFIG.carrossel.quantidade }, 
  (_, index) => `${CONFIG.carrossel.pasta}${index + 1}${CONFIG.carrossel.extensao}`
);

let imagemAtual = 0;
let timerSlide = null;

const slide = document.getElementById("slide");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

slide.onerror = function() {
  console.warn(`Imagem não encontrada: ${slide.src}. Pulando...`);
  proximaImagem();
};

function exibirImagem(index) {
  slide.style.opacity = 0;

  setTimeout(() => {
    slide.src = imagens[index];
    slide.alt = `Destaque da Meta Game Store — imagem ${index + 1}`;
    slide.style.opacity = 1;
  }, 300);
}

function proximaImagem() {
  imagemAtual = (imagemAtual + 1) % imagens.length;
  exibirImagem(imagemAtual);
}

function imagemAnterior() {
  imagemAtual = (imagemAtual - 1 + imagens.length) % imagens.length;
  exibirImagem(imagemAtual);
}

function reiniciarTimer() {
  clearInterval(timerSlide);
  timerSlide = setInterval(proximaImagem, 4000);
}

if (nextBtn && prevBtn) {
  nextBtn.addEventListener("click", () => {
    proximaImagem();
    reiniciarTimer();
  });

  prevBtn.addEventListener("click", () => {
    imagemAnterior();
    reiniciarTimer();
  });
}

exibirImagem(0);
timerSlide = setInterval(proximaImagem, 4000);

// Seção: Renderização do Mural de Eventos
function carregarMural() {
  const mural = document.getElementById("muralEventos");
  if (!mural) return;

  mural.innerHTML = CONFIG.muralEventos.map(evento => `
    <div class="event-item">
      <span class="text-cyan-300 font-bold shrink-0">${evento.data}</span>
      <span>${evento.titulo}</span>
    </div>
  `).join("");
}
carregarMural();

// Seção: Verificação de Status da Loja (Aberto/Fechado)
function verificarStatus() {
  const agora = new Date();
  const brasilia = new Date(
    agora.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })
  );

  const dia = brasilia.getDay();
  const hora = brasilia.getHours();
  const minuto = brasilia.getMinutes();

  const totalMin = hora * 60 + minuto;

  const aberto =
    ((dia === 2 || dia === 4) && totalMin >= 19 * 60 && totalMin < 22 * 60) ||
    (dia === 6 && totalMin >= 14 * 60 && totalMin < 19 * 60);

  const badge = document.getElementById('statusLoja');
  const dot = document.getElementById('statusDot');
  const texto = document.getElementById('statusTexto');

  if (aberto) {
    badge.className = 'status-badge status-open';
    dot.className = 'dot dot-open';
    texto.innerHTML = 'LOJA ABERTA';
  } else {
    badge.className = 'status-badge status-closed';
    dot.className = 'dot dot-closed';

    const proximos = [
      { dia: 2, inicio: 19, label: 'Terça às 19h' },
      { dia: 4, inicio: 19, label: 'Quinta às 19h' },
      { dia: 6, inicio: 14, label: 'Sábado às 14h' }
    ];

    let proximo = null;

    for (let i = 0; i < 7; i++) {
      const diaVerif = (dia + i) % 7;
      const match = proximos.find(p => p.dia === diaVerif);

      if (match) {
        if (i === 0 && totalMin >= match.inicio * 60) {
          continue;
        }
        proximo = match.label;
        break;
      }
    }

    texto.innerHTML = proximo
      ? `LOJA FECHADA <span style="color:#94a3b8;">• Abre ${proximo}</span>`
      : 'LOJA FECHADA';
  }
}

verificarStatus();
setInterval(verificarStatus, 60000);

// Seção: Temporizador do Próximo Evento
const elNomeEvento = document.getElementById("nomeProximoEvento");
if (elNomeEvento) elNomeEvento.textContent = CONFIG.proximoEvento.nome;

const dataEvento = new Date(CONFIG.proximoEvento.data);

function atualizarContador() {
  const agora = new Date();
  const diferenca = dataEvento - agora;

  if (diferenca < 0) {
    document.getElementById("dias").textContent = "00";
    document.getElementById("horas").textContent = "00";
    document.getElementById("minutos").textContent = "00";
    return;
  }

  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferenca / (1000 * 60)) % 60);

  document.getElementById("dias").textContent = String(dias).padStart(2, "0");
  document.getElementById("horas").textContent = String(horas).padStart(2, "0");
  document.getElementById("minutos").textContent = String(minutos).padStart(2, "0");
}

atualizarContador();
setInterval(atualizarContador, 1000);