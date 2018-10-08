import React from 'react';
import { Layout } from './Layout';
import { Link } from 'react-router-dom';
import Markdown from './Markdown';
import { DoubleSpacer, BaseBottomSpacer } from './Spacer';
import { Header, Paragraph, PassiveLink } from './Type';
import { Centered, Column, RowJustifiedCenter } from './Flex';

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: false,
      fetchFailed: false,
      text: null,
    };

    this.fetchMarkupText = this.fetchMarkupText.bind(this);
  }

  componentDidMount() {
    const { directory } = this.props;

    // This state should never happen, but just in case...
    if (! directory) {
      this.setState({
        fetchFailed: true,
      });
      return;
    }

    try {
      this.fetchMarkupText();
    } catch (error) {
      this.setState({
        fetchFailed: true,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // ....do we need this? each route makes its own content so i dont think so
  }

  async fetchMarkupText() {
    const { directory } = this.props;

    const path = `${process.env.PUBLIC_URL}/content/${directory}/post.md`;

    this.setState({
      isFetching: true,
      fetchFailed: false,
      text: null,
    });

    const res = await fetch(path);

    if (res.status !== 200) {
      this.setState({
        isFetching: false,
        fetchFailed: true,
      });

      return;
    }

    const text = await res.text();

    this.setState({
      isFetching: false,
      fetchFailed: false,
      text,
    });
  }

  render() {
    const { directory, location } = this.props;
    const {
      isFetching,
      fetchFailed,
      text,
    } = this.state;

    if (fetchFailed) {
      return (
        <Centered fillHeight>
          <DoubleSpacer>
            <Column>
              <BaseBottomSpacer>
                <RowJustifiedCenter>
                  <Header tier={3}>There was an error loading the page, can you try again?</Header>
                </RowJustifiedCenter>
              </BaseBottomSpacer>
              <RowJustifiedCenter>
                <Link to={location.pathname}>
                  <PassiveLink>Refresh Page</PassiveLink>
                </Link>
              </RowJustifiedCenter>
            </Column>
          </DoubleSpacer>
        </Centered>
      );
    }

    if (isFetching) {
      return (
        <Centered fillHeight>
          <DoubleSpacer>
            <Column fillWidth>
              <RowJustifiedCenter>
                <Paragraph>Loading...</Paragraph>
              </RowJustifiedCenter>
            </Column>
          </DoubleSpacer>
        </Centered>
      );
    }

    return (
      <Layout>
        <Markdown text={text} directory={directory} />
      </Layout>
    );
  }
}

export default Content;
