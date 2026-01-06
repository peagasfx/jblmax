// Variáveis globais
let variacaoSelecionada = null;
let requiredColors = 1;
let selectedColors = [];

// Lista de cores
const colorOptions = [
  { id: 1, name: "Amarela" },
  { id: 2, name: "Azul" },
  { id: 3, name: "Vermelho" },
  { id: 4, name: "Azul Com Luz" },
  { id: 5, name: "Rosa Com Luz" },
  { id: 6, name: "Verde" },
  { id: 7, name: "Amarela Com Luz" },
  { id: 8, name: "Rosa" }
];

// Funções do modal
function abrirModal() {
  document.getElementById('meuModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function fecharModal() {
  document.getElementById('meuModal').classList.add('hidden');
  document.body.style.overflow = '';
}

function selecionarVariacao(el, cores) {
  document.querySelectorAll('.variacao-opcao').forEach(div => div.classList.remove('ativo'));
  el.classList.add('ativo');

  document.getElementById('div_ors_1').textContent = el.dataset.titulo;
  document.getElementById('div_ors_3').textContent = el.dataset.preco;
  document.getElementById('div_ors_2').textContent = el.dataset.precoComparacao;
  document.getElementById('div_ors_5').textContent = el.dataset.desconto;
  document.getElementById('img-solts').src = el.dataset.img;

  variacaoSelecionada = {
    titulo: el.dataset.titulo,
    preco: el.dataset.preco,
    precoComparacao: el.dataset.precoComparacao,
    desconto: el.dataset.desconto,
    link: el.dataset.link,
    img: el.dataset.img
  };
  
  requiredColors = parseInt(cores);

  const comprarBtn = document.getElementById('div_ors_4');
  comprarBtn.textContent = requiredColors === 1 ? 'Escolher 1 Cor' : `Escolher ${requiredColors} Cores`;
  comprarBtn.style.background = '#e91e63';
  comprarBtn.style.cursor = 'pointer';
  comprarBtn.onclick = abrirModalCores;
}

function abrirModalCores() {
  if (!variacaoSelecionada) return;
  
  const modal = document.getElementById('color-modal');
  modal.classList.remove('hidden');
  
  const colorsGrid = document.getElementById('colors-grid');
  colorsGrid.innerHTML = '';
  
  colorOptions.forEach(cor => {
    const div = document.createElement('div');
    div.className = 'color-option';
    div.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;padding:8px;">
        <div style="width:20px;height:20px;border-radius:4px;background:#f0f0f0;"></div>
        <span style="font-size:13px;color:#333;">${cor.name}</span>
      </div>
    `;
    div.onclick = () => selecionarCor(div, cor);
    colorsGrid.appendChild(div);
  });
  
  selectedColors = [];
  atualizarInfoSelecao();
}

function fecharModalCores() {
  document.getElementById('color-modal').classList.add('hidden');
}

function selecionarCor(el, cor) {
  const jaSelecionada = selectedColors.find(c => c.id === cor.id);
  if (jaSelecionada) {
    selectedColors = selectedColors.filter(c => c.id !== cor.id);
    el.classList.remove('selecionada');
  } else if (selectedColors.length < requiredColors) {
    selectedColors.push(cor);
    el.classList.add('selecionada');
  }
  atualizarInfoSelecao();
}

function atualizarInfoSelecao() {
  const btn = document.getElementById('confirm-button');

  if (selectedColors.length === requiredColors) {
    btn.style.background = '#e91e63';
    btn.style.cursor = 'pointer';
    btn.disabled = false;
  } else {
    btn.style.background = '#ccc';
    btn.style.cursor = 'not-allowed';
    btn.disabled = true;
  }
}

function irParaCheckout() {
  if (selectedColors.length === requiredColors && variacaoSelecionada) {
    document.getElementById('color-modal').classList.add('hidden');
    document.getElementById('meuModal').classList.add('hidden');
    document.body.style.overflow = '';
    
    window.location.href = variacaoSelecionada.link;
    
    setTimeout(() => {
      window.location.href = variacaoSelecionada.link;
    }, 100);
  }
}

// Event listeners
document.getElementById('color-modal').addEventListener('click', e => {
  if (e.target.id === 'color-modal') fecharModalCores();
});