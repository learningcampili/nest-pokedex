import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model<Pokemon>
  ){}

 async  create(createPokemonDto: CreatePokemonDto) {   

    createPokemonDto.name = createPokemonDto.name.toLowerCase()
  try {
    const pokemon = await this.pokemonModel.create(createPokemonDto)
    return pokemon;

  } catch (error) {
    this.handleExceptions(error)
  }
}
  

  async findAll() {
    return this.pokemonModel.find({})
  }

  async findOne(term: string) {
     let pokemon:Pokemon

     if(!isNaN(+term)){
      pokemon = await this.pokemonModel.findOne({no:term})
     }
     
     // MongoId
     if(!pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById(term)
     }

     // Name
     if(!pokemon){
     pokemon = await this.pokemonModel.findOne({name:term.toLowerCase().trim()})
     }

     if(!pokemon) throw new NotFoundException(`pokemon not found`)

    return pokemon
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(term);
    if(updatePokemonDto.name){
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase()
    }

  try {    

    await pokemon.updateOne(updatePokemonDto)
    return { ...pokemon.toJSON(),...updatePokemonDto}

  } catch (error) {

    this.handleExceptions(error)
  }
  }

  async remove(id: string) {

    //  const pokemon = await this.findOne(id)   
    //  await pokemon.deleteOne()
    const result = await this.pokemonModel.findByIdAndDelete(id)
    if (!result) throw new BadRequestException(`Pokemon not found`)

    console.log(result)
  //  const {deletedCount, acknowledged} = await this.pokemonModel.deleteOne({_id:id})
  //  if (deletedCount === 0) throw new BadRequestException(`Pokemon not found`)

   return {message:'pokemon deleted successfully'}
    
  }


  private handleExceptions(error:any){

    if(error.code === 11000){
      throw new BadRequestException(`Pokemon allready exists in db ${JSON.stringify(error.keyValue)}`)
     }
     console.log(error)
     throw new InternalServerErrorException(`check server logs`)
  }
}
