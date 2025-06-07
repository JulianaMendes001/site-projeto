// =================== CARROSSEL ===================

// Seleciona os elementos do carrossel
const slide = document.querySelector('.carousel-slide');
const imagens = slide?.querySelectorAll('img') || [];
let index = 0;

// Função que atualiza a posição do carrossel
function mostrarSlide(i) {
  slide.style.transform = `translateX(-${i * 100}%)`;
}

// Muda de slide automaticamente a cada 4 segundos
setInterval(() => {
  if (imagens.length > 0) {
    index = (index + 1) % imagens.length;
    mostrarSlide(index);
  }
}, 4000);

// Botão de próximo
const btnProximo = document.getElementById('proximo-destaques');
if (btnProximo) {
  btnProximo.addEventListener('click', () => {
    index = (index + 1) % imagens.length;
    mostrarSlide(index);
  });
}

// Botão de anterior
const btnAnterior = document.getElementById('anterior-destaques');
if (btnAnterior) {
  btnAnterior.addEventListener('click', () => {
    index = (index - 1 + imagens.length) % imagens.length;
    mostrarSlide(index);
  });
}

// Corrige na primeira carga da página
window.addEventListener('load', () => {
  if (imagens.length > 0) mostrarSlide(index);
});

// =================== COMENTÁRIOS ===================

const form = document.querySelector('#form-comentario');
const lista = document.querySelector('#lista-comentarios');

// Carrega comentários do localStorage
function carregarComentarios() {
  const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
  lista.innerHTML = '';
  comentarios.forEach(({ nome, texto }) => {
    const div = document.createElement('div');
    div.innerHTML = `<strong>${nome}:</strong> ${texto}`;
    lista.appendChild(div);
  });
}

// Salva novo comentário
function salvarComentario(nome, texto) {
  const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
  comentarios.push({ nome, texto });
  localStorage.setItem('comentarios', JSON.stringify(comentarios));
}

// Envia novo comentário
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const nome = prompt('Digite seu nome:');
    const texto = this.querySelector('textarea').value.trim();
    if (texto && nome) {
      salvarComentario(nome, texto);
      carregarComentarios();
      this.querySelector('textarea').value = '';
    }
  });
}

// Carrega comentários ao abrir a página
carregarComentarios();
