import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {


  @Input()
  input_pokemon: any;

  pokemon: any;
  species: any;
  background_pokemon: string;
  color_abilities_array: any;
  color_abilities: any;


  constructor(private pokeService: PokemonService, private utilService: UtilService) { }

  ngOnInit(): void {

    console.log(this.input_pokemon);

    console.log("dans pokemon", this.input_pokemon, this.input_pokemon.url, this.pokemon);
    this.getPokemon();
  }

  getPokemon() {
    this.pokeService.getPokemon(this.input_pokemon.url).subscribe(
      data => {
        this.pokemon = data;
        console.log(this.pokemon);
        this.getPokemonSpecies(this.pokemon.species.url)
      },
      err => {
        console.log(err);
      });
  }

  getPokemonSpecies(url_species) {
    this.pokeService.getPokemonsSpecies(url_species).subscribe(
      data => {
        this.species = data;
        this.background_pokemon = this.species.color.name;
        console.log(this.species.color.name, this.utilService.getColourNameToHex(this.species.color.name), this.utilService.hexToRgb(this.utilService.getColourNameToHex(this.species.color.name)));
        this.color_abilities_array = this.utilService.hexToRgb(this.utilService.getColourNameToHex(this.species.color.name));
        this.colorAbilities(this.color_abilities_array);
      },
      err => {
        console.log(err);
      });
  }

  colorAbilities(rgb) {
    let r = rgb[0]-10 > 0 ? rgb[0]-120 : 0 ; 
    let g = rgb[1]-10 > 0 ? rgb[1]-100 : 0 ;
    let b = rgb[2]-10 > 0 ? rgb[2]-80 : 0 ;

    this.color_abilities = "rgb("+r+","+g+","+b+")";

  }


}