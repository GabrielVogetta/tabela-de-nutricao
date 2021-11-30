import React from 'react';

export default function Person({name, weight, height, bmi}) {
    return (
        <tr>
            <td>{name}</td>
            <td>{weight}</td>
            <td>{height}</td>
            <td>{bmi}</td>
        </tr>
    )
}
