'use client'

const EmptyCart = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center ">   
            <img

                src="/emptycart.gif"
                alt="Empty Cart"
                style={{ width: '500px', imageRendering: 'auto', opacity: '1.0' }} />   
            
           
           
        </div>
    )
}

export default EmptyCart;