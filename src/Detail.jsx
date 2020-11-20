import React, { useEffect, useContext, useState, useRef } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import colors from './colors'
import Separator from './Separator.jsx'

import { Context } from './App.jsx'
import Video from './Video.jsx'

import Button from './Button.jsx'
import DataPill from './DataPill.jsx'
import Loader from './Loader.jsx'

const Detail = () => {
  const { detail = {}, scrollTop, closeDetail } = useContext(Context)
  const [isImgLoaded, setIsImgLoaded] = useState(false)
  const [isVideoLoading, setIsVideoLoading] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const detailRef = useRef()

  const { id, duration, title, year, plot, short_plot, original_title } = detail

  const snapshot = _.get(detail, 'images.snapshot')
  const classification = _.get(detail, 'classification.name')
  const director = _.get(detail, 'directors[0].name')
  const country = _.get(detail, 'countries[0].name')

  return (
    <Container ref={detailRef} isVisible={!isClosing && !!id} top={scrollTop}>
      <ViewContainer isVisible={!!id}>
        <VideoContainer
          background={snapshot}
          isImgLoaded={isImgLoaded}
          isVideoLoading={isVideoLoading}
        >
          <Img
            key={snapshot}
            src={snapshot}
            onLoad={() => setIsImgLoaded(true)}
          />

          {isVideoPlaying && (
            <Video
              isVideoPlaying={isVideoPlaying}
              setIsVideoLoading={setIsVideoLoading}
            />
          )}

          {isVideoLoading && <Loader />}
        </VideoContainer>

        <DataContainer isVisible={!!isImgLoaded}>
          <TopRow>
            <CloseButton onClick={closeDetail}>
              <i className="icon-cancel-3"></i>
            </CloseButton>
          </TopRow>

          <Title>
            {title}
            <Director>{director}</Director>
          </Title>

          <BottomRow>
            <MetaDataRow>
              <DataPill className="icon-users" label={classification} />
              <DataPill className="icon-calendar-empty" label={year} />
              <DataPill className="icon-clock" label={`${duration} minutes`} />
              <DataPill className="icon-info-circled" label={original_title} />
              <Separator width={0.8} />
              <Button
                iconClass="icon-play"
                label="VER TRAILER"
                background={colors.black00}
                color={colors.white00}
                handleClick={() => setIsVideoPlaying(true)}
              />
              <Separator width={1} />
              <Button
                iconClass="icon-play"
                label="VER PELICULA"
                background={colors.yellow00}
                color={colors.black04}
              />
            </MetaDataRow>

            <DescriptionRow>{plot}</DescriptionRow>
          </BottomRow>
        </DataContainer>
      </ViewContainer>
    </Container>
  )
}

const Container = styled.div`
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
  transition: opacity 0.5s ease-out;
  background: rgba(20, 20, 20, 0.8);
  ${({ isVisible, top }) => (isVisible ? `top: ${top}px;` : '')}
`

const Title = styled.div`
  font-size: 4.5em;
  color: ${colors.white00};
  align-self: flex-start;
  font-weight: 800;
  text-shadow: rgba(0, 0, 0, 0.8) 0px 1px 1px;
  padding: 1em;
`

const Director = styled.div`
  font-size: 38px;
  opacity: 0.7;
`

const Img = styled.img`
  visibility: hidden;
  display: none;
`

const ViewContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
`

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
  background-image: url(${({ isImgLoaded, background }) =>
    isImgLoaded ? background : 'none'});
  background-size: cover;
  opacity: ${({ isImgLoaded }) => (isImgLoaded ? 1 : 0)};
  transition: all 1s ease-out;
`

const DataContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
  background: transparent;
  color: ${colors.white00};

  transition: all 1s ease-out;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
`

const TopRow = styled.div`
  position: absolute;
  top: 0;
  padding: 2em;
  background: transparent;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid transparent;
`

const CloseButton = styled.a`
  font-size: 2em;
  opacity: 0.8;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  & i {
    color: ${colors.yellow00};
  }
`

const BottomRow = styled.div`
  position: absolute;
  bottom: 0;
  padding: 2em 5em 4em 5em;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  box-sizing: border-box;
  border: 0px solid transparent;

  background: linear-gradient(
    180deg,
    rgba(153, 218, 255, 0) 0%,
    rgba(0, 0, 0, 0.7) 80%
  ); /* w3c */
`

const DescriptionRow = styled.div`
  font-size: 1.3em;
  font-weight: 700;
  color: ${colors.white00};
  padding: 1em 0em;
  text-shadow: rgba(0, 0, 0, 0.8) 0px 1px 1px;
`

const MetaDataRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 0.6em;
`

export default Detail
