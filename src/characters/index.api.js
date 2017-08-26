import axios from 'axios';
import { convertedToNumberIfPossible } from '../_utility/formatting.utils';

const baseSWAPIUrl = 'https://swapi.co/api';
const personUrlToId = (url) => {
  const urlLookup = /https:\/\/swapi.co\/api\/people\/(\d+)\//;
  return url.replace(urlLookup, '$1');
};

const mapCharacterFromApi = characterFromApi => ({
  name: characterFromApi.name,
  gender: characterFromApi.gender,
  birthYear: characterFromApi.birth_year,
  height: convertedToNumberIfPossible(characterFromApi.height),
  mass: convertedToNumberIfPossible(characterFromApi.mass),
  eyeColor: characterFromApi.eye_color,
  hairColor: characterFromApi.hair_color,
  skinColor: characterFromApi.skin_color,
  numFilms: characterFromApi.films.length,
  numVehicles: characterFromApi.vehicles.length,
});

export const arrayOfCharactersIntoObject = arrayOfCharacters => arrayOfCharacters
  .reduce(
    (infoObject, character) => {
      const characterId = personUrlToId(character.url);
      infoObject[characterId] = mapCharacterFromApi(character);
      return infoObject;
    },
    {}
  );

export const getCharacters = page => (
  axios.get(`${baseSWAPIUrl}/people/?page=${page}`)
    .then(({ status, data }) => {
      if (status !== 200 || !(data && data.results && data.results.length)) {
        throw new Error('error retrieving characters');
      }
      return data;
    })
);

export const getAllCharacters = (startingPage = 1, savedResults = []) => (
  getCharacters(startingPage)
    .then(({ results, next }) => {
      const allResults = savedResults.concat(results);
      if (next) {
        return getAllCharacters(startingPage + 1, allResults);
      }
      return arrayOfCharactersIntoObject(allResults);
    })
);
