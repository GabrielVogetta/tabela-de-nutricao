import { useState } from "react";
import './styles.css';

export default function Form(props){
    
    const [name, setName] = useState(props.name ? props.name : '');
    const [weight, setWeight] = useState(props.weight ? props.weight : '');
    const [height, setHeight] = useState(props.height ? props.height : '');
    
    return(
        <form 
            className='form'
            onSubmit={async e => {
                e.preventDefault();
                props.onSubmit(name, weight, height);
            }}
        >
            <input
                className='form-input'
                name="name"
                placeholder="Nome"
                type='text'
                value={name}
                onChange={e => {setName(e.target.value)}}
            />
            <input
                className='form-input'
                value={weight}
                name="weight"
                type='number'
                step="any"
                required
                placeholder="Peso kg"
                onChange={e => {setWeight(e.target.value)}}
            />
            <input
                className='form-input'
                value={height}
                name="height"
                type='number'
                step="any"
                required
                placeholder="Altura m"
                onChange={e => {setHeight(e.target.value)}}
            />
            <button type="submit" className='submit-button'>
                {props.submitLabel}
            </button>
        </form>
    );
}