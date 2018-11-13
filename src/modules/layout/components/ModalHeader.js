// @flow

import * as React from 'react'
import styled from 'styled-components'
import type { NavigationScene } from 'react-navigation'
import type { ThemeType } from 'modules/theme/constants/theme'
import HeaderBackButton from 'react-navigation-stack/dist/views/Header/HeaderBackButton'

const Horizontal = styled.View`
  flex:1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const HorizontalLeft = styled.View`
  flex:1;
  flex-direction: row;
  align-items: center;
`

const BoxShadow = styled.View`
  background-color: transparent;
  height: ${props => props.theme.dimensions.modalHeaderHeight};
`

type PropsType = {
  scene: NavigationScene,
  scenes: Array<NavigationScene>,
  theme: ThemeType
}

type StateType = {
  searchActive: boolean
}

class ModalHeader extends React.PureComponent<PropsType, StateType> {

  getDescriptor (): { [key: string]: any } {
    // $FlowFixMe
    return this.props.scene.descriptor
  }

  goBack = () => {
    this.getDescriptor().navigation.goBack(null)
  }

  render () {
    return (
      <BoxShadow theme={this.props.theme}>
        <Horizontal>
          <HorizontalLeft>
            <HeaderBackButton onPress={this.goBack} />
          </HorizontalLeft>
        </Horizontal>
      </BoxShadow>
    )
  }
}

export default ModalHeader
