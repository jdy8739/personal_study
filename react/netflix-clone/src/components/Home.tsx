import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovies, getPoster } from "../API";

interface IData {
    page: number,
    results: IMovie[]
};

interface IMovie {
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    title: string,
    release_date: string,
    overview: string
};

const BackgroundImg = styled.div<{ imgPath: string }>`
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.9)), url(${ props => props.imgPath });
    background-size: cover;
    background-position: center center;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    color: white;
`;

const Title = styled.h1`
    font-size: 62px;
    margin-bottom: 10px;
    margin-left: 40px;
`;

const SubTitle = styled.h5`
    font-size: 18px;
    margin-top: 10px;
    margin-left: 40px;
    width: 45%;
`;

const Slider = styled(motion.div)`
    width: 100%;
    margin-top: -150px;
`;

const Row = styled(motion.div)`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 12px;
`;

const Box = styled(motion.div)`
    width: 100%;
    height: 150px;
    min-width: 150px;
    position: relative;
    &:first-child {
        transform-origin: left;
    }
    &:last-child {
        transform-origin: right;
    }
`;

const Thumbnail = styled.div<{ imgPath: string }>`
    background-color: red;
    background-image: url(${ props => props.imgPath });
    background-size: cover;
    background-position: center center;
    width: 100%;
    height: 100%;
`;

const Info = styled(motion.div)`
    width: 100%;
    height: 50px;
    background-color: red;
    position: absolute;
    bottom: 0;
    opacity: 0.0;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalBg = styled(motion.div)`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.0);
    position: fixed;
    top: 0;
`;

const Modal = styled(motion.div)`
    width: 470px;
    height: 280px;
    background-color: red;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto auto;
    border-radius: 20px;
    background-size: cover;
    background-position: center center;
    overflow: hidden;
`;

const ModalPic = styled.div<{ imgPath: string }>`
    width: 100%;
    height: 70%;
    background-image: linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.9)), url(${ props => props.imgPath });
    background-size: cover;
    background-position: center center;
`;

const rowVariants = {
    start: { 
        x: window.innerWidth - 5,
        transition: {
            duration: 1
        }
    },
    end: { 
        x: 0,
        transition: {
            type: 'linear',
            duration: 1
        }
    },
    exit: { 
        x: -window.innerWidth + 5,
        transition: {
            duration: 1
        }
    },
};


const boxVariants = {
    hover: {
        scale: 1.3,
        y: -40,
        zIndex: 100,
        transition: {
            type: 'tween',
            delay: 0.3
        }
    }
};


const infoVariants = {
    hover: {
        opacity: 0.9
    }
};

const COL_NUM = 6;

function Home() {

    const { isLoading, data } = useQuery<IData>(['movies', 'now_playing'], getMovies);

    const [stop, setStop] = useState(false);
    
    const [index, setIndex] = useState(0);

    const handleSetIndex = () => {
        if(!stop && data) {
            setStop(true);
            setIndex((index) => Math.floor(data?.results.length / COL_NUM) > index + 1 ? index += 1 : 0);
        }
    };

    const nav = useNavigate();

    const movieMatch = useMatch('/movie/:id');

    const [targetMovie, setTargetMovie] = useState<IMovie>();

    const toggleModal = (id?: number) => {
        if(!movieMatch && typeof id === 'number') {
            nav(`/movie/${id}`);
            setTargetMovie(data?.results.find(movie => movie.id === id));
        }
        else nav('/');
    };
    
    const clickedMovie = movieMatch && data?.results.find(movie => movie.id === Number(movieMatch.params.id));

    return (
        <>
            {
                isLoading ? <h2>loading...</h2> : 
                <>
                    <BackgroundImg 
                    onClick={handleSetIndex}
                    imgPath={`${ getPoster(data ? data?.results[0].backdrop_path : '') }`}
                    >
                        <Title>{ data?.results[0].title }</Title>
                        <SubTitle>{ data?.results[0].overview }</SubTitle>
                    </BackgroundImg>
                    <AnimatePresence onExitComplete={() => setStop(false)}>
                        <Slider key={index}>
                            <Row 
                            variants={rowVariants}
                            initial="start"
                            animate="end"
                            exit="exit"
                            >
                                {
                                    [0, 1, 2, 3, 4, 5].map((item, i) => {
                                        return (
                                            <Box 
                                            variants={boxVariants}
                                            whileHover="hover"
                                            key={ i }
                                            onClick={() => toggleModal(data?.results[item + index * 6 + 1].id || 0)}
                                            layoutId={String(data?.results[item + index * 6 + 1].id)}
                                            >
                                                <Thumbnail imgPath={ getPoster(data?.results[item + index * 6 + 1].backdrop_path || '', 'w500') } />
                                                <Info
                                                variants={infoVariants}
                                                >
                                                    { data?.results[item + index * 6 + 1].title }
                                                </Info>
                                            </Box>
                                        )
                                    })
                                }
                            </Row>
                        </Slider>
                    </AnimatePresence>
                    {
                        movieMatch === null ? null :
                        <AnimatePresence>
                            <ModalBg
                            onClick={() => toggleModal()}
                            animate={{
                                backgroundColor: 'rgba(0, 0, 0, 0.3)'
                            }}
                            >
                                <Modal 
                                layoutId={String(clickedMovie?.id)}
                                >
                                    <ModalPic imgPath={ getPoster(clickedMovie?.backdrop_path || '', 'w500') } />
                                    <h3
                                    style={{
                                        color: 'white',
                                        position: "absolute",
                                        bottom: '90px',
                                        left: '30px'
                                    }}
                                    >{ clickedMovie?.title }</h3>
                                    <p
                                    style={{
                                        color: 'white'
                                    }}
                                    >{ clickedMovie ? clickedMovie?.overview.length > 80 ? 
                                        clickedMovie?.overview.slice(0, 80) + '...' : clickedMovie?.overview : '' }</p>
                                </Modal>
                            </ModalBg>
                        </AnimatePresence>
                    }
                </>
            }
        </>
    )
}

export default Home;