// Seleciona o elemento do carrossel
const carousel = document.querySelector('.carousel');

// Conta o número total de slides dentro do carrossel
const totalSlides = carousel.children.length;

// Índice atual do slide
let index = 0;

// Função que atualiza a posição do carrossel com base no slide atual
function updateCarousel() {
  carousel.style.transform = translateX(-${index * 100}vw);
}

// Define um intervalo para trocar de slide automaticamente a cada 4 segundos
setInterval(() => {
  index = (index + 1) % totalSlides; // Avança para o próximo slide, voltando ao início no final
  updateCarousel(); // Atualiza o carrossel
}, 4000);

// Evento de clique no botão "próximo" para ir ao slide seguinte
document.getElementById('proximo').addEventListener('click', () => {
  index = (index + 1) % totalSlides;
  updateCarousel();
});

// Evento de clique no botão "anterior" para voltar ao slide anterior
document.getElementById('anterior').addEventListener('click', () => {
  index = (index - 1 + totalSlides) % totalSlides; // Garante que o índice não fique negativo
  updateCarousel();
});

// Seleciona o formulário de comentários e a lista onde os comentários serão exibidos
const form = document.querySelector('#form-comentario');
const lista = document.querySelector('#lista-comentarios');

// Função para carregar os comentários salvos no localStorage e exibi-los na tela
function carregarComentarios() {
  const comentarios = JSON.parse(localStorage.getItem('comentarios')) || []; // Recupera os comentários salvos
  lista.innerHTML = ''; // Limpa a lista atual
  comentarios.forEach(({ nome, texto }) => {
    const div = document.createElement('div');
    div.innerHTML = <strong>${nome}:</strong> ${texto}; // Cria um elemento para cada comentário
    lista.appendChild(div);
  });
}

// Função para salvar um novo comentário no localStorage
function salvarComentario(nome, texto) {
  const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
  comentarios.push({ nome, texto }); // Adiciona o novo comentário à lista existente
  localStorage.setItem('comentarios', JSON.stringify(comentarios)); // Salva novamente no localStorage
}

// Adiciona o comportamento ao formulário para capturar o comentário enviado
form.addEventListener('submit', function(e) {
  e.preventDefault(); // Evita que a página seja recarregada
  const nome = prompt('Digite seu nome:'); // Solicita o nome do usuário
  const texto = this.querySelector('textarea').value.trim(); // Obtém o texto do comentário
  if (texto && nome) { // Verifica se ambos foram preenchidos
    salvarComentario(nome, texto); // Salva o comentário
    carregarComentarios(); // Atualiza a lista de comentários exibida
    this.querySelector('textarea').value = ''; // Limpa o campo de texto
  }
});

// Carrega os comentários automaticamente ao carregar a página
carregarComentarios();
