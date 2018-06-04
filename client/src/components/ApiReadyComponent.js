import React from 'react';
import 'whatwg-fetch';

export default function ApiReadyComponent(Component) {
  class ApiReadyComponentWrapper extends React.Component {
    constructor(props) {
      super(props);

      this.prefix = window.location.port === '3000' ? 'http://localhost:5001/api/' : '/api/';

      this.fetchContent = this.fetchContent.bind(this);
      this.pushContent = this.pushContent.bind(this);
    }

    fetchContent(alias) {
      console.log(this.prefix)
      const path = `${this.prefix}content/${alias}`;

      return fetch(path).then(async (res) => {
        const json = await res.json();

        return {
          res,
          json,
        };
      });
    }

    pushContent(alias, text) {

    }

    render() {
      const { fetchContent, pushContent } = this;
      const helpers = { fetchContent, pushContent };

      return (
        <Component {...this.props} {...helpers} />
      );
    }
  }

  return ApiReadyComponentWrapper;
}
