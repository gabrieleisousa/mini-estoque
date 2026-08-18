import { IsNotEmpty,IsNumber, IsOptional,IsPositive,IsInt, Min,IsBoolean, IsString } from "class-validator";

export class CreateProdutoDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsOptional()
    descricao?: string;

    @IsNumber()
    @IsPositive()
    preco: number;

    @IsInt()
    @Min(0)
    quantidade: number;

    @IsBoolean()
    @IsOptional()
    status: boolean;
}
