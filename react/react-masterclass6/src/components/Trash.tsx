import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const TrashBox = styled.div`
    position: absolute;
    bottom: 30px;
    right: 30px;
    img {
        width: 90px;
        height: 90px;
        &:hover {
            opacity: 0.6;
        }
    }
`;

function Trash() {
    return (
        <>
            <Droppable droppableId="trash-box">
                {
                    (provided) =>
                    <TrashBox ref={provided.innerRef} {...provided.droppableProps}>
                        <img src="img/trash.png" />
                        {/* {provided.placeholder} */}
                    </TrashBox>
                }
            </Droppable>
        </>
    )
}

export default Trash;