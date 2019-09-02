// @flow
import { some, none, option, None, Some } from '../src/index';

describe('Option', () => {
  test('option constructor', () => {
    expect(option(null)).toBeInstanceOf(None);
    expect(option(undefined)).toBeInstanceOf(None);
    expect(option(2)).toBeInstanceOf(Some);
    expect(option(true)).toBeInstanceOf(Some);
    expect(option('foo')).toBeInstanceOf(Some);
    expect(option([1, 2, 3, 4])).toBeInstanceOf(Some);
    expect(option({ foo: 'bar' })).toBeInstanceOf(Some);
    expect(option(none())).toBeInstanceOf(Some);
    expect(option(none())).toBeInstanceOf(Some);
    expect(option(0)).toBeInstanceOf(Some);
    expect(option(false)).toBeInstanceOf(Some);
    expect(option('')).toBeInstanceOf(Some);
    expect(option([])).toBeInstanceOf(Some);
    expect(option({})).toBeInstanceOf(Some);
  });

  test('isDefined', () => {
    expect(none().isDefined()).toBe(false);
    expect(some(2).isDefined()).toBe(true);
    expect(option(0).isDefined()).toBe(true);
    expect(option(false).isDefined()).toBe(true);
  });

  test('isEmpty', () => {
    expect(none().isEmpty()).toBe(true);
    expect(some(2).isEmpty()).toBe(false);
    expect(option(0).isEmpty()).toBe(false);
    expect(option(false).isEmpty()).toBe(false);
  });

  test('get', () => {
    expect(some(2).get()).toBe(2);
    expect(none().get).toThrowError('NO VALUE');
    expect(option('foobar').get()).toBe('foobar');
    expect(option(undefined).get).toThrowError('NO VALUE');
    expect(option(null).get).toThrowError('NO VALUE');
  });

  test('getOrElse', () => {
    expect(some(2).getOrElse()).toBe(2);
    expect(none().getOrElse(7)).toBe(7);
    expect(option('foobar').getOrElse('baz')).toBe('foobar');
    expect(option(undefined).getOrElse('baz')).toBe('baz');
    expect(option(null).getOrElse('baz')).toBe('baz');
  });

  test('default', () => {
    expect(some(2).default()).toBe(2);
    expect(none().default(7)).toBe(7);
    expect(option('foobar').default('baz')).toBe('foobar');
    expect(option(undefined).default('baz')).toBe('baz');
    expect(option(null).default('baz')).toBe('baz');
  });
});
