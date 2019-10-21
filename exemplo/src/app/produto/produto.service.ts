import { Injectable } from '@angular/core';
import { Produto } from '../modelo/Protudo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mensagem } from '../modelo/Mensagem';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

//URL
private url = "http://localhost:8090/api/produto";

//Vetor
vetor: Produto[];


  //Construtor
  constructor(private http:HttpClient) {  }

  //Listar todos os produtos
  listarProdutos():Observable<Produto[]>{
    return this.http.get<Produto[]>(this.url); //retornar o vetor completo que esta naquela URL    
  }

  //Cadastrar um novo produto
  cadastrarProduto(objeto: Produto):Observable<Mensagem>{
    return this.http.post<Mensagem>(this.url, objeto); //vai acessar aquela url e manda o objeto

  }

  //Alterar um produto
  alterarProduto(objeto: Produto):Observable<Mensagem>{
    return this.http.put<Mensagem>(this.url, objeto);
  }

  //Excluir um Produto
  excluirProduto(codigo:number):Observable<Mensagem>{
    return this.http.delete<Mensagem>(this.url+"/"+codigo);
  }
}
