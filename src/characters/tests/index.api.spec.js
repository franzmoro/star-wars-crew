import { arrayOfCharactersIntoObject } from '../index.api';
import mockSWAPIResponse from './mocks/SWAPIResponse.json';
import expectedMappedResult from './mocks/expectedMappedResult.json';

describe('CHARACTERS API TESTS', () => {
  it('should be able to map properly the response from the api', () => {
    const { page1, page2 } = mockSWAPIResponse;
    const concatenatedAPIResponse = [...page1.results, ...page2.results];
    const actual = arrayOfCharactersIntoObject(concatenatedAPIResponse);
    expect(actual).toEqual(expectedMappedResult);
  });
});
