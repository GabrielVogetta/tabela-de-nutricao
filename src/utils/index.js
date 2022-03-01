export function calculateBmi(weight, height){
    
    const bmi = weight / (height ** 2);

    return bmi.toFixed(2);
}

export function colorSetter(bmi){
    
    let color;
    
    if(bmi < 18.5) color = 'yellow';
    if(bmi >= 18.5 && bmi <= 25) color = 'green';
    if(bmi > 25 && bmi <= 30) color = 'orange';
    if(bmi > 30) color = 'red';
        
    return `var(--${color})`;
}

export function calculateIdealWeight(weight, bmi){

    let bmiMin = 18.5;
    let bmiMax = 25;

    let min;
    let max;
    let good;

    min = (bmiMin * weight) / bmi;
    max = (bmiMax * weight) / bmi;
    good = (min + max) / 2;

    return [min.toFixed(0), good.toFixed(0), max.toFixed(0)];
}