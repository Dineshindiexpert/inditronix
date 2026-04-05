'use client';
  

const Loading = () => {
    return (
        <>
       
        <div className='d-flex   justify-content-center align-items-center vh-100 bg-white'>
            <img
                src="/loading.gif"
                alt="Loading..."
                style={{ width: '200px', imageRendering: 'auto', opacity: '0.9' }} />

        </div>
        </>
    )
}

export default Loading
