import React from 'react';
import { ThemeProvider } from 'styled-components';
import tinycolor from 'tinycolor2';
import ApiReadyComponent from './ApiReadyComponent';
import ContextualBackground from './ContextualBackground';
import ClassicContainer from './ClassicContainer';
import Markdown from './Markdown';
import AsyncEditor from './AsyncEditor';
import LoadTrain from './LoadTrain';
import WideButton from './WideButton';
import { getApiKey } from '../storage';

class ContentPage extends React.Component {
  state = {
    content: null,
    isError: false,
    isFetching: false,
    isEditing: false,
    hasApiKey: !!getApiKey(),
  }

  componentDidMount() {
    this.fetchRoutine();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.alias !== this.props.match.params.alias) {
      this.fetchRoutine();
    }
  }

  fetchRoutine() {
    const { match, fetchContent } = this.props;
    const { alias } = match.params;

    this.setState({ isFetching: true });

    fetchContent(alias).then(({ res, json }) => {
      if (res.status !== 200) {
        // TODO: check if 404, redirect.
        this.setState({
          isError: true,
          isFetching: false,
          content: null,
        });
      } else {
        this.setState({
          isFetching: false,
          isError: false,
          content: json.data.content.text,
        });
      }
    });
  }

  render() {
    const { match } = this.props;
    const { params } = match;
    const { content, isFetching, isEditing, hasApiKey } = this.state;

    const hex = tinycolor(`#${params.hex}`);
    const split = hex.splitcomplement()
      .map(h => h.toHexString())
      .filter(h => h !== hex.toHexString());

    const ContentTheme = (theme) => ({
      ...theme,
      context: {
        primary: hex.toHexString(),
        complements: split,
        foreground: hex.isLight() ? theme.colors.pen : theme.colors.cloud,
      },
    });

    const openEditor = () => this.setState({ isEditing: true });
    const closeEditor = () => this.setState({ isEditing: false });

    return (
      <ThemeProvider theme={ContentTheme}>
        <ContextualBackground doublePaddingTop>
          <ClassicContainer doublePaddingTop>
            {isFetching ? <LoadTrain /> : (
              isEditing ? (
                <AsyncEditor
                  alias={params.alias}
                  text={content}
                  postSave={closeEditor}
                />
              ) : (
                <React.Fragment>
                  {hasApiKey ? <WideButton onClick={openEditor} doubleMarginBottom>Edit</WideButton> : null}
                  <Markdown text={content} />
                </React.Fragment>
              )
            )}
          </ClassicContainer>
        </ContextualBackground>
      </ThemeProvider>
    );
  }
}

export default ApiReadyComponent(ContentPage);
