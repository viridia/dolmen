import { describe, expect, test } from 'vitest';
import { camelToKebab } from './kebab';

describe('camelToKebab', () => {
  test('words', () => {
    expect(camelToKebab('StackOverflow')).toBe('stack-overflow');
    expect(camelToKebab('camelCase')).toBe('camel-case');
    expect(camelToKebab('alllowercase')).toBe('alllowercase');
    expect(camelToKebab('ALLCAPITALLETTERS')).toBe('allcapitalletters');
    expect(camelToKebab('CustomXMLParser')).toBe('custom-xml-parser');
    expect(camelToKebab('APIFinder')).toBe('api-finder');
    expect(camelToKebab('JSONResponseData')).toBe('json-response-data');
    expect(camelToKebab('Person20Address')).toBe('person20-address');
    expect(camelToKebab('UserAPI20Endpoint')).toBe('user-api20-endpoint');
  });
});
