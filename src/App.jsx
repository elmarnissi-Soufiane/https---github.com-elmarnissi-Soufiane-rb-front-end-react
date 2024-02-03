import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function App() {
    const [isPlanete, setIsPlanete] = useState(false);
    const [graviteCurseur, setGraviteCurseur] = useState(1);
    const [corpsCelestes, setCorpsCelestes] = useState([]);
    const [corpsSelectionne, setCorpsSelectionne] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get('https://api.le-systeme-solaire.net/rest/bodies');
                setCorpsCelestes(response.data.bodies);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };

        fetchData();
    }, []);

    const basculerIsPlanete = () => {
        setIsPlanete(!isPlanete);
    };

    const changerGraviteCurseur = (nouvelleGravite) => {
        setGraviteCurseur(nouvelleGravite);
    };

    const handleBodySelection = (selectedOption) => {
        const corpsSelectionne = corpsCelestes.find((corps) => corps.id === selectedOption.value);
        setCorpsSelectionne(corpsSelectionne);
    };

    const optionsDropdown = corpsCelestes
        .filter((corps) => (isPlanete ? corps.isPlanet : true) && corps.gravity >= graviteCurseur)
        .map((corps) => ({
            value: corps.id,
            label: corps.name,
        }));

    return ( <
            div className = 'card m-auto mt-5 p-3 bg-light'
            style = {
                { width: '500px' }
            } >
            <
            h1 className = 'text-primary' > RHOBS Chalenge < /h1>

            <
            div >
            <
            div className = 'mb-3 row p-3' >
            <
            div className = 'form-check col' >
            <
            input className = 'form-check-input'
            type = 'checkbox'
            id = 'disabledFieldsetCheck'
            checked = { isPlanete }
            onChange = { basculerIsPlanete }
            /> <
            label className = 'form-check-label'
            htmlFor = 'disabledFieldsetCheck' >
            is Planet <
            /label> < /
            div > <
            div className = 'col' >
            <
            div className = 'd-flex' >
            <
            input type = 'range'
            className = 'form-range'
            min = '1'
            max = '10'
            value = { graviteCurseur }
            onChange = {
                (e) => changerGraviteCurseur(Number(e.target.value))
            }
            /> <
            p className = 'm-3 mt-0' > gravity < /p> < /
            div > <
            /div> < /
            div > <
            /div>

            <
            div >
            <
            div className = 'mb-3 row p-2' >
            <
            div className = 'col' >
            <
            label className = 'form-check-label'
            htmlFor = 'disabledFieldsetCheck' >
            Bodies:
            <
            /label> <
            Select options = { optionsDropdown }
            onChange = { handleBodySelection }
            placeholder = 'Select a body' /
            >
            <
            /div> < /
            div > <
            /div>

            <
            div className = 'border p-5' >
            <
            p className = 'text-center' > info on the body < /p> {
            corpsSelectionne ? ( <
                div >
                <
                p > Name: { corpsSelectionne.name } < /p> <
                p >
                Mass: { corpsSelectionne.mass.massValue }
                x 10 ^ { corpsSelectionne.mass.massExponent } <
                /p> <
                p > Gravity: { corpsSelectionne.gravity } < /p> { / * Ajoutez plus de détails au besoin * / } < /
                div >
            ) : (
                ''
            )
        } <
        /div> < /
    div >
);
}

export default App;