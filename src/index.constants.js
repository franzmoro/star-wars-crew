import { omit } from 'lodash';

export const SORTING_ORDERS = {
  ascending: 'ASC',
  descending: 'DES',
};
export const SORTING_DIMENSIONS = {
  Favourite: 'favourite',
  Name: 'name',
  Gender: 'gender',
  '# Films featured': 'numFilms',
  '# Vehicles': 'numVehicles',
};

export const HEADER_NAMES = Object.keys(SORTING_DIMENSIONS);

export const MODAL_FIELDS = {
  Height: 'height',
  Mass: 'mass',
  'Birth Year': 'birthYear',
  'Eye Color': 'eyeColor',
  'Hair Color': 'hairColor',
  'Skin Color': 'skinColor',
  ...omit(SORTING_DIMENSIONS, 'Favourite', 'Name'),
};
