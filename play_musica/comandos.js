let musicas = [
  {
    titulo: "Bathwater",
    artista: "No Doubt",
    src: "musicas/03 Bathwater.mp3",
    img: "imagens/ros.jpg"
  },
  {
    titulo: "We Used To Be Friends",
    artista: "Dandy Warhol",
    src: "musicas/The Dandy Warhols - 02 - We Used To Be Friends.mp3",
    img: "imagens/dandy.jpg"
  },
  {
    titulo: "Aladin Sane",
    artista: "David Bowie",
    src: "musicas/02 Aladdin Sane.mp3",
    img: "imagens/aladin_sane.jpg"
  },
  {
    titulo: "Take The Box",
    artista: "Amy Winehouse",
    src: "musicas/09. Take The Box.mp3",
    img: "imagens/frank.jpeg"
  },
  {
    titulo: "You Wreck Me Baby",
    artista: "Tom Petty",
    src: "musicas/07 - You Wreck Me Baby.mp3",
    img: "imagens/tom_petty.jpg"
  }
];

let musica = document.querySelector('audio');
let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');
let indexMusica = 0;

renderizarMusica(indexMusica);

document.querySelector('.botao-play').addEventListener('click', tocarMusica);
document.querySelector('.botao-pause').addEventListener('click', pausarMusica);
musica.addEventListener('timeupdate', atualizaBarra);

document.querySelector('.voltar').addEventListener('click', () => {
  indexMusica--;
  if (indexMusica < 0) {
    indexMusica = musicas.length;
  };
renderizarMusica(indexMusica);
tocarMusica();
});

document.querySelector('.proxima').addEventListener('click', () => {
  indexMusica++;
  if (indexMusica > musicas.length) {
    indexMusica = 0;
  };
  renderizarMusica(indexMusica);
  tocarMusica();
});

function renderizarMusica(index) {
  // Substitui música que está tocando
  musica.setAttribute('src', musicas[index].src); // vai mudar o atributo src do html
  // Evento para carregar as músicas
  musica.addEventListener('loadeddata', () => {
    // Mudanças de música
    nomeMusica.textContent = musicas[index].titulo;
    nomeArtista.textContent = musicas[index].artista;
    imagem.src = musicas[index].img;
    let duracaoMusica = document.querySelector('.fim');
    duracaoMusica.textContent = converterTempo(Math.floor(musica.duration));

  });

};


function tocarMusica() {
  musica.play();
  document.querySelector('.botao-pause').style.display = 'block';
  document.querySelector('.botao-play').style.display = 'none';
};

function pausarMusica() {
  musica.pause();
  document.querySelector('.botao-pause').style.display = 'none';
  document.querySelector('.botao-play').style.display = 'block';
};

function atualizaBarra() {
 let barra = document.querySelector('progress');
 barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
let tempoDecorrido = document.querySelector('.inicio');
tempoDecorrido.textContent = converterTempo(Math.floor(musica.currentTime));
let duracaoMusica = document.querySelector('.fim');
duracaoMusica.textContent = converterTempo(Math.floor(musica.duration));
}

function converterTempo(segundos) {
  let campoMinutos = Math.floor(segundos/60);
  let campoSegundos = segundos % 60;
  if (campoSegundos < 10){
    campoSegundos = '0' + campoSegundos;
  }
  return campoMinutos+ ':' +campoSegundos;
}

