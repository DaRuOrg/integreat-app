import { range } from 'lodash'
import React, { ReactElement } from 'react'
import styled from 'styled-components/native'

const DotsContainer = styled.View`
  flex: 1;
  height: 10px;
  padding: 10px 10px 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.backgroundColor};
`
const Dot = styled.TouchableOpacity<{ isActive: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin-horizontal: 4px;
  background-color: ${props =>
    props.isActive ? props.theme.colors.textSecondaryColor : props.theme.colors.textDecorationColor};
`
type PropsType = {
  slideCount: number
  currentSlide: number
  goToSlide: (index: number) => void
}

const Pagination = ({ slideCount, currentSlide, goToSlide }: PropsType): ReactElement => {
  const goToSlideIndex = (index: number) => () => goToSlide(index)

  return (
    <DotsContainer>
      {range(slideCount).map(index => (
        <Dot key={index} isActive={index === currentSlide} onPress={goToSlideIndex(index)} />
      ))}
    </DotsContainer>
  )
}

export default Pagination
