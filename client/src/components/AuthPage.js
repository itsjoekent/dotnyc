import React from 'react';
import Block from './Block';
import ClassicContainer from './ClassicContainer';
import HeaderTypography from './HeaderTypography';
import ParagraphTypography from './ParagraphTypography';
import TextInput from './TextInput';
import InputLabel from './InputLabel';
import WideButton from './WideButton';
import {
  storeApiKey,
  getApiKey,
  storeEncryptionKey,
  getEncryptionKey,
} from '../storage';

const warning = `If you're Joe Kent, and only if you're Joe Kent, you should enter your secret NSA proof passwords here. Everyone else should promptly fuck off before I call the internet police.`;

class AuthPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiKey: getApiKey() || '',
      encryptionKey: getEncryptionKey() || '',
      showSaveConfirmation: false,
    };
  }

  render() {
    const { apiKey, encryptionKey, showSaveConfirmation } = this.state;

    const onType = (stateKey, event) => {
      this.setState({
        [stateKey]: event.target.value,
        showSaveConfirmation: false,
      });
    };

    const apiKeyHandler = (event) => onType('apiKey', event);
    const encryptionKeyHandler = (event) => onType('encryptionKey', event);

    const onSave = () => {
      storeApiKey(apiKey);
      storeEncryptionKey(encryptionKey);

      this.setState({ showSaveConfirmation: true });
    };

    return (
      <ClassicContainer doublePaddingTop>
        <HeaderTypography basePaddingTop>To Be Or Not To Be</HeaderTypography>
        <ParagraphTypography>{warning}</ParagraphTypography>
        <Block baseMarginTop>
          <InputLabel>API Key</InputLabel>
          <TextInput type="password" value={apiKey} onChange={apiKeyHandler} />
        </Block>
        <Block baseMarginTop>
          <InputLabel>Encryption Key</InputLabel>
          <TextInput type="password" value={encryptionKey} onChange={encryptionKeyHandler} />
        </Block>
        {showSaveConfirmation ? <InputLabel baseMarginTop>Saved!</InputLabel> : null}
        <WideButton doubleMarginTop onClick={onSave}>
          <ParagraphTypography land>Save</ParagraphTypography>
        </WideButton>
      </ClassicContainer>
    );
  }
}

export default AuthPage;
