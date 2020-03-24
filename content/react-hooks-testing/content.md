React hooks are an elegant pattern for sharing logic between your React components. If you're not familiar with the concept, you can read more about them [here](https://reactjs.org/docs/hooks-intro.html).

One of the problems I recently ran into with creating custom React hooks was figuring out a clear strategy for testing the function independently of all the different components consuming the hook.

For example, imagine we were using the following hook in 10 different components.

```js
import { useState, useEffect } from 'react';

function useExample() {
  const [value, setValue] = useState(0);

  useEffect(() => setValue(1), []);

  return value;
}
```

This hook will initially return a value equal to 0, and after the initial render will return a value equal to 1. Rather than unit test this logic in several components, it would be great to write tests specific to this hook.

To write a unit test for this hook, there are two challenges to overcome.

1. We can't simply run something to the effect of `expect(useExample()).toBe...`, as it will return a React error stating we invoked the hook outside of a component being rendered.

2. We want a clear pattern to test the initial hook value, and the value after it renders.

To solve these challenges, this I was able to work out a simple test utility function,

```js
import React from 'react';
import { shallow, mount } from 'enzyme';

export default function testHook(runHook, flushEffects = true) {
  function HookWrapper() {
    const output = runHook();

    return (
      <span output={output} />
    );
  }

  const wrapperFunc = flushEffects ? mount : shallow;
  const wrapper = wrapperFunc(<HookWrapper />);

  return wrapper.find('span').props().output;
}
```

You can now easily unit test your custom React hooks by passing them to this function. Here is an example of how I would test the custom hook example I created earlier using Jest,

```js
import useExample from '../src/js/hooks/useExample';
import testHook from './_test-hook';

test('Initial value is 0', () => {
  const value = testHook(() => useExample(), false);
  expect(value).toBe(0);
});

test('Value after render is 1', () => {
  const value = testHook(() => useExample());
  expect(value).toBe(1);
});
```

If your application uses Hooks that rely on context values, you can also wrap the `HookWrapper` with that same context provider, and pass in the context value you want to leverage.

```js
import React from 'react';
import { shallow, mount } from 'enzyme';
import { ApplicationContext, defaultApplicationState } from '../src/js/Application';

export default function testHook(runHook, flushEffects = true, useApplicationContext = null) {
  function HookWrapper() {
    const output = runHook();

    return (
      <span output={output} />
    );
  }

  let Container = null;

  if (useApplicationContext) {
    const value = {
      ...defaultApplicationState,
      state: useApplicationContext(defaultApplicationState),
    };

    Container = ({ children }) => (
      <ApplicationContext.Provider value={value}>
        {children}
      </ApplicationContext.Provider>
    );
  }

  const wrapperFunc = flushEffects ? mount : shallow;

  const wrapper = wrapperFunc(Container ? (
    <Container>
      <HookWrapper />
    </Container>
  ) : (
    <HookWrapper />
  ));

  return wrapper.find('span').props().output;
}
```

To demonstrate, the following is a simple hook that relies on a context value. By default, it will set the return value to 0. If the context value is a valid number, it will set that to be the state value.

```js
import { useState, useEffect, useContext } from 'react';
import { ApplicationContext } from '../Application';

function useExampleContext() {
  const [value, setValue] = useState(0);
  const { contextValue } = useContext(ApplicationContext);

  useEffect(() => {
    if (contextValue !== value && typeof contextValue === 'number') {
      setValue(contextValue);
    }
  }, [contextValue]);

  return value;
}
```

And now you can test the hook in the following fashion,

```js
test('Initial value is 0', () => {
  const value = testHook(() => useExampleContext(), false);
  expect(value).toBe(0);
});

test('Value matches context value', () => {
  const value = testHook(() => useExampleContext(), true, (state) => ({ ...state, contextValue: 1 }));
  expect(value).toBe(1);
});
```

----

I hope this post was helpful for anyone else looking to unit test their custom React hooks, and I am curious to see how others have handled this problem!
