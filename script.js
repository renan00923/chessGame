
var tabuleiroXadrez = Chessboard('tabuleiroXadrez', {
    pieceTheme: 'assets/img/{piece}.png',
    draggable: true,
    position: 'start',
    onDrop: movimentoPeca,
    onDragStart: movimentosPossiveis,
    moveSpeed: 100
});

var jogo = new Chess();
var pecaSelecionada = null;

function movimentoPeca(local, alvo) {
    var move = jogo.move({
            from: local,
            to: alvo,
            promotion: 'q' 
        });

    if (move === null) {
        return 'snapback';
    } 

    tabuleiroXadrez.position(jogo.fen());
    console.log(jogo.history());

    xequeMate();

}
function movimentosPossiveis(local, peca) {
    var movimentosPossiveis = jogo.moves({
        square: local,
        verbose: true
    });
    
    if(jogo.game_over()) {
        return
    }
    if((jogo.turn() === 'w' && peca.search(/w/) === -1) || (jogo.turn() === 'b' && peca.search(/b/) === -1)) {
        alert(`É a vez do jogador: ${jogo.turn() === 'w' ? 'branco' : 'preto'}`);
        return false;
    }

    mostrarMovimentos(local);
    destacarMovimentos();
    
    pecaSelecionada = local;
    console.log(pecaSelecionada);
    
    return true;
}
function mostrarMovimentos(local) {
    var movimentosPossiveis = [jogo.moves({
        square: local
    })];

    console.log(movimentosPossiveis);
    return movimentosPossiveis;
}

function xequeMate() {
    if(jogo.game_over()) {
        alert('Xeque Mate!');
    }
}

function destacarMovimentos() {
    const casas = document.querySelectorAll("[data-square]");

    casas.forEach(casasQuadrado => {
        console.log(casasQuadrado.getAttribute("data-square"));
    });

}