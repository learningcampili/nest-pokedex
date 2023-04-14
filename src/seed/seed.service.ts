import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios'
import { PokeResponse } from './interfaces/poke-response.inteface';


@Injectable()
export class SeedService {

  private readonly axios:AxiosInstance = axios; 
  

  async  executeSeed() {
    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');

    // console.log(data.results)

    data.results.forEach(({name,url})=>{
      const segments = url.split('/')
      const no:number = Number(segments[segments.length -2])
      console.log({name,no})
      
    })
    return data.results

    }

    
  }

 

