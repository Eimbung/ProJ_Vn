import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function Try() {

    const { state } = useLocation();
    const canvasRef = useRef(null);
    const picture = state.imgf
    console.log(picture.length)
    const counter = state.count
    const codina = state.codination

    const [INDEX, setINDEX] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const image = new Image();

        image.src = URL.createObjectURL(picture[INDEX])

        image.onload = () => {
            canvas.width = 700;
            canvas.height = 650;
            ctx.drawImage(image, 0, 0, image.width, image.height,
                0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = '#FF0000';
            ctx.font = '15px serif';
            ctx.fillStyle = '#FF0000';

            codina[INDEX].forEach((box, index) => {
                ctx.beginPath();
                ctx.strokeRect(box[0], box[1], box[2], box[3]);
                const center_x = Number(((box[0]) + (box[0] + box[2])) / 2) - 5;
                const center_y = Number(((box[1]) + (box[1] + box[3])) / 2) + 5;
                ctx.fillText(`${index + 1}`, center_x, center_y);
                ctx.stroke();
            });
        }
        
    }, [INDEX])

    return (
        <>
            <div className='flex justify-center mt-4 '>
                <div className=' bg-zinc-200 border-2 border-green-400 shadow-3xl'>
                    <canvas ref={canvasRef} />
                </div>
            </div>
            <div className='flex justify-center mt-4'>
                <Stack spacing={2}>
                    <Pagination count={picture.length} onChange={ (e , page ) => {
                        console.log("index",page - 1)
                        setINDEX(page-1)
                    }}/>

                </Stack>
            </div>

        </>
    )
}

export default Try
