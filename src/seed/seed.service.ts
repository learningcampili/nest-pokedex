import { Injectable } from '@nestjs/common';

import { PokeResponse } from './interfaces/poke-response.inteface';

import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model<Pokemon>,

    private  readonly  http:AxiosAdapter
  ){}

 
  

    // async  executeSeed() {

    // await this.pokemonModel.deleteMany()// borra todos los registros

    // const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');

    // // console.log(data.results)
    // const insertPromisesArray =[]// array de promesas

    // data.results.forEach(({name,url})=>{
    //   const segments = url.split('/')
    //   const no:number = Number(segments[segments.length -2])

    //   console.log({name,no})

    //   // const pokemon = await this.pokemonModel.create({no,name})  
    //   insertPromisesArray.push(this.pokemonModel.create({name,no})) // inserta cada promesa en el array de promesas   
      
    // }) 
    
    // await Promise.all(insertPromisesArray) // resuleve todas las promesas

    // return {message:'seed success'}

    // } 


    async  executeSeed() {

      await this.pokemonModel.deleteMany()// borra todos los registros
  
      const data  = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
  
     
      const pokemonsToInsert:{name:string,no:number}[] =[]
  
      data.results.forEach(({name,url})=>{
        const segments = url.split('/');
        const no:number = Number(segments[segments.length -2]);
        pokemonsToInsert.push({name,no})        
      });

     await this.pokemonModel.insertMany(pokemonsToInsert);
  
      return {message:'seed success'}
  
      } 

    
  }

 

 

