import React, { useState } from "react";

const LengthConverter = () => {
  // Les hooks d'état pour gérer les valeurs du formulaire et le résultat
  const [inputValue, setInputValue] = useState("");
  const [sourceUnit, setSourceUnit] = useState("meters");
  const [targetUnit, setTargetUnit] = useState("feet");
  const [result, setResult] = useState("");

  // Objets de conversion pour différentes unités de longueur
  const unitConversions = {
    meters: {
      feet: 3.28084,
      inches: 39.3701,
    },
    feet: {
      meters: 0.3048,
      inches: 12,
    },
    inches: {
      meters: 0.0254,
      feet: 0.0833333,
    },
  };

  // Fonction de conversion de longueur
  const convertLength = () => {
    // Convertir la valeur saisie en nombre
    const value = parseFloat(inputValue);

    // Vérifier si la valeur saisie est un nombre
    if (isNaN(value)) {
      setResult("Veuillez saisir une valeur numérique valide.");
      return;
    }

    // Vérifier si les unités de conversion sont valides
    if (!unitConversions[sourceUnit] || !unitConversions[sourceUnit][targetUnit]) {
      setResult("Unités de conversion non valides.");
      return;
    }

    // Appliquer la conversion en fonction de l'unité source et de l'unité cible
    const convertedValue = value * unitConversions[sourceUnit][targetUnit];
    setResult(`${value} ${sourceUnit} équivaut à ${convertedValue.toFixed(2)} ${targetUnit}`);
  };

  // Gérer le changement de la valeur saisie
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Gérer le changement de l'unité source
  const handleSourceUnitChange = (e) => {
    setSourceUnit(e.target.value);
  };

  // Gérer le changement de l'unité cible
  const handleTargetUnitChange = (e) => {
    setTargetUnit(e.target.value);
  };

  // Gérer la soumission du formulaire de conversion
  const handleSubmit = (e) => {
    e.preventDefault();
    convertLength();
  };

  return (
    <div>
      <h2>Convertisseur de longueur</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Longueur :
          <input type="text" value={inputValue} onChange={handleInputChange} />
        </label>
        <label>
          Unité de départ :
          <select value={sourceUnit} onChange={handleSourceUnitChange}>
            <option value="meters">Mètres</option>
            <option value="feet">Pieds</option>
            <option value="inches">Pouces</option>
          </select>
        </label>
        <label>
          Unité de destination :
          <select value={targetUnit} onChange={handleTargetUnitChange}>
            <option value="meters">Mètres</option>
            <option value="feet">Pieds</option>
            <option value="inches">Pouces</option>
          </select>
        </label>
        <button type="submit">Convertir</button>
      </form>
      <div>Résultat : {result}</div>
    </div>
  );
};

export default LengthConverter;
