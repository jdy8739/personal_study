import styled from "styled-components";

interface CircleStyleProps {
    bgColor: string;
    borderColor?: string;
}

const CircleStyle = styled.div<CircleStyleProps>`
    background-color: ${ props => props.bgColor };
    width: 300px;
    height: 300px;
    border-radius: 50%;
    border: 5px solid ${ props => props.borderColor };
`;


function Circle2({ bgColor, borderColor }: CircleStyleProps) {
    return (
        <>
            <CircleStyle bgColor={ bgColor } borderColor={ borderColor ?? 'blue' }></CircleStyle>
        </>
    )
}

export default Circle2;