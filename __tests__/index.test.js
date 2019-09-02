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

  test('getOrNull', () => {
    expect(some(2).getOrNull()).toBe(2);
    expect(none().getOrNull()).toBe(null);
    expect(option('foobar').getOrNull()).toBe('foobar');
    expect(option(undefined).getOrNull()).toBe(null);
    expect(option(null).getOrNull()).toBe(null);
  });

  test('getOrUndefined', () => {
    expect(some(2).getOrUndefined()).toBe(2);
    expect(none().getOrUndefined()).toBe(undefined);
    expect(option('foobar').getOrUndefined()).toBe('foobar');
    expect(option(undefined).getOrUndefined()).toBe(undefined);
    expect(option(null).getOrUndefined()).toBe(undefined);
  });

  test('map', () => {
    expect(some(2).map((x) => x)).toEqual(some(2));
    expect(some(2).map((x) => x * 2)).toEqual(some(4));
    expect(some(2).map((x) => [x, x * 3, x - 2])).toEqual(some([2, 6, 0]));
    expect(some(['foo', 'bar', 'baz']).map((x) => x.join(''))).toEqual(some('foobarbaz'));
    expect(none().map()).toEqual(none());
    expect(option('foobar').map((x) => x.split(''))).toEqual(option(['f', 'o', 'o', 'b', 'a', 'r']));
    expect(option(undefined).map((x) => x)).toEqual(none());
    expect(option(null).map((x) => x + 2)).toEqual(none());

    class Foo {
      get() {
        return 'bar';
      }
    }

    class Bar {
      toFoo() {
        return new Foo();
      }
    }

    expect(
      option(new Bar())
        .map((x) => x.toFoo())
        .map((x) => x.get()),
    ).toEqual(option('bar'));
  });
});