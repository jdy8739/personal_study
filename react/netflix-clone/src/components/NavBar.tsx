import styled from "styled-components";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

const Nav = styled(motion.div)`
    width: 100%;
    height: 100px;
    color: white;
    position: fixed;
    display: flex;
`;

const Col = styled.div<{ width?: number }>`
    height: 100%;
    width: ${ props => props.width ? props.width : 0 }%;
    display: flex;
    align-items: center;
`;

const Logo = styled(motion.svg)`
    margin: 0 40px;
    width: 25%;
    min-width: 120px;
    height: 100%;
    fill: red;
    path {
        stroke-width: 5px;
        stroke: white;
    }
`;

const Items = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
`;

const Item = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    a {
        text-decoration: none;
        color: white;
    }
`;

const Circle = styled(motion.div)`
    background-color: red;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    bottom: -15px;
`;

const Search = styled(motion.div)`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
    color: red;
`;

const SearchInput = styled(motion.input)`
    background-color: transparent;
    border-radius: 0px;
    border: 1px solid white;
    padding: 5px;
    color: white;
    transform-origin: right;
    transform: scaleX(0);
    margin-right: 100px;
`;

const LogoVariants = {
    hover: {
        fillOpacity: [0.8, 1, 0.5, 1, 0.2, 1, 0.5, 1],
        transition: {
            duration: 1,
            repeat: Infinity
        }
    },
    initial: {
        fillOpacity: 1
    }
};

function NavBar() {

    const homeMatch = useMatch('/');
    const tvMatch = useMatch('/tv');

    const [searchOpen, setSearchOpen] = useState(false);

    const inputAnimation = useAnimation();
    const searchAnimation = useAnimation();

    const toggleSearch = () => {
        if(searchOpen) {
            inputAnimation.start({ scaleX: 0 });
            searchAnimation.start({ x: 180 });
        } else {
            inputAnimation.start({ scaleX: 1, transition: { type: 'linear' } });
            searchAnimation.start({ x: 0, transition: { type: 'linear' } });
        }
        setSearchOpen(a => !a);
    };

    const { scrollY } = useViewportScroll();
    const [y, setY] = useState<number>(0);
    scrollY.onChange(() => setY(scrollY.get()));

    return (
        <>
            <Nav
            animate={{
                backgroundColor: y > 100 ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 1)'
            }}
            >
                <Col width={40}>
                    <Logo
                    variants={LogoVariants}
                    whileHover="hover"
                    initial="initial"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1024"
                    height="276.742"
                    viewBox="0 0 1024 276.742"
                    >
                        <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
                    </Logo>
                    <Items>
                        <Item>
                            <Link to={'/'}>Home</Link>
                            {
                                homeMatch == null ? null : <Circle layoutId="circle" />
                            }
                        </Item>
                        &emsp;
                        <Item>
                            <Link to={'/tv'}>Tv</Link>
                            {
                                tvMatch == null ? null : <Circle layoutId="circle" />
                            }
                        </Item>
                    </Items>
                </Col>
                <Col width={60} 
                style={{ 
                    justifyContent: 'flex-end',
                    marginRight: '100px'
                }}>
                    <Search onClick={toggleSearch}
                    initial={{
                        x: 180
                    }}
                    animate={searchAnimation}
                    ></Search>
                    &ensp;
                    <SearchInput placeholder="search movies or genres."
                    initial={{
                        scaleX: 0
                    }}
                    animate={inputAnimation}
                    />
                </Col>
            </Nav>
        </>
    )
}

export default NavBar;