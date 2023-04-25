const squares = document.querySelectorAll('.square')
const player = document.querySelector('.player')
const player1 = document.querySelector('#player1')
const player2 = document.querySelector('#player2')
const btnPlay = document.querySelector('#play')
const btnNewPlay = document.querySelector('#nPlay')
const btnReset = document.querySelector('#reset')

let velha = 0
const posVencedores = [[0, 1, 2], [3, 4 ,5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]


//Play
btnPlay.addEventListener('click', function () {
  player.dataset.atual = 'X'
  player.innerText = 'Vez de ' + player.dataset.atual + ': '  + player1.value

  player1.setAttribute('disabled', true)
  player2.setAttribute('disabled', true)
  btnPlay.setAttribute('disabled', true)

  btnReset.removeAttribute('disabled')
  btnNewPlay.removeAttribute('disabled')
  btnNewPlay.setAttribute('disabled', true)


  squares.forEach( function (square) {
    square.dataset.enable = 'true'
    square.innerText = ''
  })

  player1.dataset.points = '0'
  player2.dataset.points = '0'
  velha = 0
})

//Reset
btnReset.addEventListener('click', function () {
  player1.removeAttribute('disabled')
  player2.removeAttribute('disabled')

  btnPlay.removeAttribute('disabled')
  btnNewPlay.setAttribute('disabled', true)
  btnReset.setAttribute('disabled', true)

  squares.forEach( function (square) {
    square.dataset.enable = 'false'
    square.innerText = ''
  })

  player1.value = ''
  player2.value = ''
  document.getElementById('p1').innerText = ''
  document.getElementById('p2').innerText = ''
  document.getElementById('velha').innerText = ''
  player.innerText = 'Vez de: '
})

btnNewPlay.addEventListener('click', function () {
  btnNewPlay.setAttribute('disabled', true)
  player.innerText = 'Vez de ' + player.dataset.atual + ': '  + (player.dataset.atual === 'X' ? player1.value : player2.value)
  squares.forEach( function (square) {
    square.dataset.enable = 'true'
    square.innerText = ''
  })
})

//Pre-visualização posição
squares.forEach(function (square) {
  square.addEventListener('mouseover', function () {
    if(square.dataset.enable === 'true') {
      square.innerText = player.dataset.atual
    }
  })
  square.addEventListener('mouseout', function () {
    if(square.dataset.enable === 'true') {
      square.innerText = ''
    }
  })

  //Escolha de posição
  square.addEventListener('click', function () {
    if(square.dataset.enable === 'true') {
      square.innerText = player.dataset.atual
      square.dataset.enable = 'false'
      
      if(player.dataset.atual === 'X'){
        player.dataset.atual = 'O'
        player.innerText = 'Vez de ' + player.dataset.atual + ': '  + player2.value
      }
      else{
        player.dataset.atual = 'X'
        player.innerText = 'Vez de ' + player.dataset.atual + ': '  + player1.value
      }


      if(verificaVencedor() || verificaEmpate()) {
        squares.forEach( function (square) {
          square.dataset.enable = 'false'
        })
        btnNewPlay.removeAttribute('disabled')
      }
    }
  })
})

function verificaVencedor() {
  let winner
  posVencedores.forEach( function (pos) {
    if(
      squares[pos[0]].dataset.enable === 'false' && squares[pos[0]].innerText === 'X' &&
      squares[pos[1]].dataset.enable === 'false' && squares[pos[1]].innerText === 'X' &&
      squares[pos[2]].dataset.enable === 'false' && squares[pos[2]].innerText === 'X' 
    ) {
      player.innerText = player1.value + ' foi o vencedor'
      winner = 'X'
      player1.dataset.points++
      document.getElementById('p1').innerText = player1.value + ': ' + player1.dataset.points + ' pontos'
    }
    else if(
      squares[pos[0]].dataset.enable === 'false' && squares[pos[0]].innerText === 'O' &&
      squares[pos[1]].dataset.enable === 'false' && squares[pos[1]].innerText === 'O' &&
      squares[pos[2]].dataset.enable === 'false' && squares[pos[2]].innerText === 'O' 
    ) {
      player.innerText = player2.value + ' foi o vencedor'
      winner = 'O'
      player2.dataset.points++
      document.getElementById('p2').innerText = player2.value + ': ' + player2.dataset.points + ' pontos'
      
    }
  })
  return winner
}

function verificaEmpate () {
  let empate = true
  squares.forEach( function (square) {
    if(square.dataset.enable === 'true') {
      empate = false
    }
  })
  if(empate) {
    player.innerText = 'Empate'
    velha++;
    document.getElementById('velha').innerText = 'Empate' + ': ' + velha + ' pontos'
  }
  return empate
}

// function clearTable () {
//   squares.forEach( function (square) {
//     square.dataset.enable = 'false'
//     square.innerText = ''
//   })
// }