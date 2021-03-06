import React, { useEffect, useState, useRef, useContext } from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import styled from 'styled-components'
import colors from './constants.colors'
import { Context } from './component.App.jsx'

const PosterItem = ({ film }) => {
  const [isImgLoaded, setIsImgLoaded] = useState(null)
  const [isInViewport, setIsInViewport] = useState(false)
  const { openDetail } = useContext(Context)

  const {
    id,
    title,
    year,
    images: { artwork },
    highlighted_score: { score },
  } = film

  const onViewportPresenceChange = (isVisible) => {
    setIsInViewport(isVisible)
    console.log('Element is now %s', isVisible ? 'visible' : 'hidden')
  }
  return id ? (
    <VisibilitySensor
      onChange={onViewportPresenceChange}
      partialVisibility={true}
    >
      <Container onClick={() => openDetail(id)}>
        <PosterView>
          <VideoIconContainer>
            <VideoIcon className="icon-video" />
          </VideoIconContainer>
          <PosterImgContainer>
            {isInViewport && (
              <Poster
                src={artwork}
                isImgLoaded={isImgLoaded}
                onLoad={() => setIsImgLoaded(true)}
              />
            )}
          </PosterImgContainer>
        </PosterView>
        <Data>
          <Rating score={score}>{score}</Rating>
          {` `}
          <Year>{year}</Year>
        </Data>
        <Title>{title}</Title>
      </Container>
    </VisibilitySensor>
  ) : (
    <></>
  )
}

export const dimensions = {
  width: 18,
  height: 25.188,
  horizontalPadding: 1.6,
}

const dimensionsStyle = `
  min-width: ${dimensions.width}em;
  max-width: ${dimensions.width}em;
  min-height: ${dimensions.height}em;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  ${dimensionsStyle}

  padding: 0 ${dimensions.horizontalPadding}em;
  opacity: 0.7;
  overflow: hidden;
  border-radius: 10px;
  position: relative;
  transition: all 0.2s ease-in-out 0.001s;

  &:hover {
    opacity: 1;
  }

  &:active {
    opacity: 0.7;
  }
`

const Title = styled.div`
  padding-top: 0.6em;
  color: white;
  font-size: 0.9em;
`

const Data = styled.div`
  padding-top: 0.5em;
  display: flex;
  flex-direction: row;
  font-size: 0.75em;
`

const Year = styled.div`
  padding-top: 0.4em;
  color: ${colors.grey01};
  font-weight: 400;
`

const Detail = styled.div`
  min-width: 45em;
  position: relative;
  z-index: 0;
  left: -50px;

  & video {
    width: 100%;
    border-radius: 20px;
  }
`

const PosterImgContainer = styled.div`
  position: absolute;
  ${dimensionsStyle}
  min-height: 25.188em;
`

const Poster = styled.img`
  ${dimensionsStyle};
  min-height: 25.188em;
  border-radius: 10px;
  opacity: ${({ isImgLoaded }) => (isImgLoaded ? 1 : 0)};
  box-shadow: 6px 9px 5px -3px black;
  transition: all 0.5s;
`

const Rating = styled.div`
  background-color: ${({ score }) =>
    score > 7 ? colors.green00 : colors.purple00};
  color: ${({ score }) => (score > 7 ? colors.green01 : colors.purple01)};
  padding: 0.3em;
  border-radius: 5px;
  margin-detail: 0.5em;
  min-width: 1.7em;
  display: flex;
  justify-content: center;
  margin-right: 0.7em;
`

const PlayIconContainer = styled.div`
  position: absolute;
`

const PlayIcon = styled.div`
  font-size: 50px;
  color: ${colors.white00};
  opacity: 0.8;
`

const VideoIconContainer = styled.div`
  position: absolute;
  transition: all 0.3s;
  opacity: ${({ isImgLoaded }) => (isImgLoaded ? 0 : 1)};
`

const VideoIcon = styled.div`
  font-size: 50px;
  color: ${colors.black03};
`

const PosterView = styled.div`
  ${dimensionsStyle}

  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`
export default PosterItem
