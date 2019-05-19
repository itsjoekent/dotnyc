import React, { useEffect, useState } from 'react';

/**
 * Load a component using code splitting.
 * https://webpack.js.org/guides/code-splitting/
 *
 *
 * @param {String} props.componentName File name of the component.
 * @param {Object} props.passthrough Props to pass to the loaded component.
 */
function AsyncComponent(props) {
  const { componentName, passthrough = {} } = props;

  const [{ Component }, setComponent] = useState({ Component: null });

  useEffect(() => {
    async function importComponent() {
      const { default: DefaultComponent } = await import(`./Home`);

      setComponent({ Component: DefaultComponent });
    }

    if (! componentName || ! componentName.length) {
      throw new Error('Invalid use of AsyncComponent');
    }

    if (Component) {
      return;
    }

    importComponent();
  }, [Component, componentName]);

  if (! Component) {
    return null;
  }

  return (
    <Component {...(passthrough || {})} />
  );
}

export default AsyncComponent;
