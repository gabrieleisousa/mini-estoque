import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProdutoService {
  constructor(private prisma: PrismaService) { }

  async criar(dados: CreateProdutoDto) {
    const produtoExistente = await this.prisma.produto.findFirst({
      where: { nome: dados.nome }
    })

    if (produtoExistente) {
      throw new ConflictException("Já existe um produto com este nome")
    }
  

    return this.prisma.produto.create({
      data: dados
    });
  }

  listarTodos() {
    return this.prisma.produto.findMany();
  }

  async buscarPorID(id: number) {
    const produto = await this.prisma.produto.findUnique({
    where: { id }
   });

   if (!produto) {
    throw new ConflictException('Produto com o ID ${id} não foi encontrado')
   }
   return produto;
  }

  async atualizar(id: number, dados: UpdateProdutoDto) {
    await this.buscarPorID(id);

    if (dados.nome) {
      const produtoExistente = await this.prisma.produto.findFirst({
        where: {
          nome: dados.nome,
          NOT: { id }
        }
      });

      if (produtoExistente)
        throw new ConflictException("Já existe outro produto cadastrado com esse nome")
    }

    return this.prisma.produto.update({
      where: { id },
      data: dados
    });
  }

  async deletar(id: number) {

    await this.buscarPorID(id);
 
    return this.prisma.produto.delete({
      where: { id }
    });
  }
  }
