import { Component, OnInit } from '@angular/core';
import { Produto } from '../modelo/Protudo';
import { ProdutoService } from './produto.service';
import { Mensagem } from '../modelo/Mensagem';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  //Índice do vetor
  indiceVetor:number;

  //Vetor de Teste
  //produtos = ["Galaxy S10", "iPhone 11", "Moto G7", "Galaxy S9"];

  /* produtos = [
   {"produto":"Galaxy S10","marca":"Samsung", "valor":4800},
    {"produto":"iPhone 11","marca":"Apple", "valor":5900},
    {"produto":"Moto G7","marca":"Motorola", "valor":1300}
  ];*/

  produtos:Produto[]; //definindo o tipo do vetor 

    //Objeto da classe produto
    produto = new Produto();

  //Exibir botões do formulário
  btnCadastrar: boolean = true;
  btnEditar: boolean= false;
  

  //Contrutor
  constructor(private servico:ProdutoService) {}


  //Ao inicar
  ngOnInit() { 
    this.selecionar();
  }

  //Selecionar todos os produtos
  selecionar(){
    this.servico.listarProdutos()
    .subscribe(dados =>{this.produtos = dados})
  }

  //Editar produto
  editarProduto(indice){

    //Troca de botões
    this.btnCadastrar = false;
    this.btnEditar = true;

    this.indiceVetor = indice;

    //Aparecer nas caixas de texto

    this.produto.codigo = this.produtos[indice].codigo;
    this.produto.produto = this.produtos[indice].produto;
    this.produto.marca = this.produtos[indice].marca;
    this.produto.valor = this.produtos[indice].valor;
  }

  //Cancelar edição do produto
  cancelarEdicaoProduto(){
    this.btnCadastrar = true;
    this.btnEditar = false;

    this.produto.codigo = null;
    this.produto.produto = null;
    this.produto.marca = null;
    this.produto.valor = null;
  }

  //Cadastrar produto 
  cadastrar(){

    //Converter um objeto em um JSON
    var objeto =  JSON.stringify(this.produto); //para converter um objeto em json

    //Adicionar um objeto JSON convertido ao vetor
    this.produtos.push(JSON.parse(objeto));

  //Enviar dados para API
    var msg = new Mensagem();

    this.servico.cadastrarProduto(JSON.parse(objeto))
    .subscribe(resposta => {
      msg = resposta;
      alert(msg.mensagem);
    })

  //Limpar os campos
  this.produto.produto = null;
  this.produto.marca = null;
  this.produto.valor = null;


  
  }
  //Excluir produto
  excluir(){

    //API
    var msg = new Mensagem();

    this.servico.excluirProduto(this.produto.codigo)
    .subscribe(resposta => {
      msg = resposta;
      alert (msg.mensagem);
    })

  //Excluir do vetor
    this.produtos.splice(this.indiceVetor,1);



    //Limpar o objeto
    this.produto.codigo = null;
    this.produto.produto = null;
    this.produto.marca = null;
    this.produto.valor = null;

  //Alterar os botões
  this.btnCadastrar = true;
  this.btnEditar = false;
  }

  //Alterar produto
  alterar(){

    //Criar um objeto JSON
    var objeto = JSON.stringify(this.produto);

    //API
    var msg = new Mensagem();
    this.servico.alterarProduto(JSON.parse(objeto))
    .subscribe(resposta => {
      msg = resposta;
      alert(msg.mensagem);
    })

    //Alterar o vetor
    this.produtos[this.indiceVetor] = JSON.parse(objeto); //alterar o objeto


    //Limpar o objeto
    this.produto.codigo = null;
    this.produto.produto = null;
    this.produto.marca = null;
    this.produto.valor = null;

  //Alterar os botões
  this.btnCadastrar = true;
  this.btnEditar = false;

  }
}
