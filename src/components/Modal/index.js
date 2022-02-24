import './styles.css';

export default function Modal({children, isOpen, style}){
    return(
        <>
            {isOpen &&
                <div className='modal' style={style}>
                    {children}
                </div>
            }
        </>
    );
}