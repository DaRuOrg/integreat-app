import * as React from 'react'
import { ReactNode } from 'react'
import styled from 'styled-components'

import dimensions from '../constants/dimensions'

type PropsType = {
  children?: string
}

const LONG_TITLE_LENGTH = 25
export const HEADER_TITLE_HEIGHT = 50

const HeaderTitleDiv = styled.div<{ long: boolean }>`
  display: flex;
  align-items: center;
  font-size: ${props => (props.long ? '1.3rem' : '1.8rem')};
  max-height: ${dimensions.headerHeightLarge};
  font-weight: 800;
  flex: 1;
  order: 2;
  padding: 0 10px;
  box-sizing: border-box;

  @media ${dimensions.minMaxWidth} {
    font-size: ${props => (props.long ? '1.5rem' : '1.8rem')};
  }

  @media ${dimensions.smallViewport} {
    font-size: ${props => (props.long ? '1.2rem' : '1.5rem')};
    height: ${HEADER_TITLE_HEIGHT}px;
    order: 3;
    min-width: 100%;
    justify-content: center;
    padding: 0 10px;
    text-align: center;
  }
`

/**
 * The title of a Header. Is only designed for the Header component.
 */
class HeaderTitle extends React.PureComponent<PropsType> {
  render(): ReactNode {
    const { children } = this.props
    return <HeaderTitleDiv long={(children?.length || 0) >= LONG_TITLE_LENGTH}>{children}</HeaderTitleDiv>
  }
}

export default HeaderTitle
