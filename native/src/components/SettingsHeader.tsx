import * as React from 'react'
import { ReactNode } from 'react'
import styled from 'styled-components/native'
import { HeaderBackButton, StackHeaderProps } from '@react-navigation/stack'
import { TFunction } from 'react-i18next'
import dimensions from '../constants/dimensions'
import { ThemeType } from 'build-configs'

const Horizontal = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const HorizontalLeft = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`
const BoxShadow = styled.View`
  elevation: 1;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.18;
  shadow-radius: 1px;
  background-color: ${props => props.theme.colors.backgroundAccentColor};
  height: ${dimensions.headerHeight}px;
`
const HeaderText = styled.Text`
  flex: 1;
  flex-direction: column;
  text-align-vertical: center;
  height: 50px;
  font-size: 20px;
  color: ${props => props.theme.colors.textColor};
  font-family: ${props => props.theme.fonts.native.decorativeFontBold};
`
export type PropsType = StackHeaderProps & {
  t: TFunction
  theme: ThemeType
}

class SettingsHeader extends React.PureComponent<PropsType> {
  goBack = (): void => {
    this.props.navigation.goBack()
  }

  render(): ReactNode {
    return (
      <BoxShadow theme={this.props.theme}>
        <Horizontal>
          <HorizontalLeft>
            <HeaderBackButton onPress={this.goBack} labelVisible={false} />
            <HeaderText theme={this.props.theme}>{this.props.t('settings')}</HeaderText>
          </HorizontalLeft>
        </Horizontal>
      </BoxShadow>
    )
  }
}

export default SettingsHeader
