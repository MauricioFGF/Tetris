# Tetris: Uma releitura do clássico dos anos 80

## Equipe:
- Gabriel Gomes de Melo
- Matheus do Nascimento Araújo
- Maurício Felipe
- Wilson Wagner dos Santos Nascimento

## Desafio:
Recriar uma versão do jogo Tetris usando CSS, HTML e Javascript. Baseando-se no vídeo "Code Tetris: JavaScript Tutorial for Beginners" do canal freeCodeCamp.org do Youtube.

# Desenvolvimento:
### Dados Gerais:

Utilizando-se do tutorial do Youtube, cada membro do grupo criou uma versão para o projeto. À partir dos resultados, selecionamos o melhor deles e adicionamos funcionalidades adicionais, como as setas em tela e a trilha sonora original do jogo, tocada em piano.

### Descrição do código e do projeto:

Existem 4 repositórios principais, e um arquivo html, na "main". Dois desses repositórios, o "img" e o "sound", são responsáveis por guardar as mídias utilizadas, tanto como trilha sonora, quanto como ilustração. Já os dois outros repositórios são o "css" e o "js", contendo o código em CSS, que modela a forma aos elementos descritos nos códigos, e o código em JavaScript, responsável por dar boa parte das funcionalidades do projeto.

### Código .html:
  Em sua "head", instancia-se um ícone relacionado ao nome da página. No corpo da página, há a referência ao arquivo de áudio e às "divs" do código html. Duas classes aparecem: grid e mini grid. A "grid" é relacionada ao quadro principal do jogo, enquanto a "mini grid" é a caixa em que aparecem os próximos tetrominos a cair. Na classe "mini grid" são instanciados os botões, que possuem um código base no arquivo js.
  
### Código .css:
  O mais importante do código são as modificações no plano de fundo, na forma em que grid e minigrid se apresentam na tela, bem como nos formatos dos dos botões. Existem, ainda, @media queries, responsáveis pelo redimensionamento da tela de acordo com a necessidade do dispositivo.
  
### Código .js:
  Concentra desde as dimensões dos tetrominos, até as funções de inicialização, pontuação, desenho de novas peças, controle, rotação, restart, game over e gerenciamento do score. Há, ainda, o instanciamento dos comandos e das funções dos botões "up", "down", "left" e "right".

## Link do site:
- https://mauriciofgf.github.io/Software_Engineering_2021/
