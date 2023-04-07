import React from "react";

export const DaoInfo = () => {
  return (
    <div>
      <h1>DAO de la Carte de Pixels</h1>
      <p>
        Bienvenue sur notre site web de DAO de la carte de pixels ! Ici, vous
        pouvez proposer des changements à la carte, tels que l'ajout de
        nouvelles couleurs, l'agrandissement de la carte ou l'effacement de
        zones existantes. Les membres de la DAO pourront ensuite voter pour ces
        propositions, et celles qui obtiennent plus de 70% de votes seront
        automatiquement appliquées à la carte.
      </p>
      <h2>Comment ça marche ?</h2>
      <ul>
        <li>
          Proposez une idée pour la carte en remplissant le formulaire
          correspondant
        </li>
        <li>
          Attendez que les membres de la DAO votent pour votre proposition
        </li>
        décision importante concernant la carte. Les membres les plus actifs
        auront donc un pouvoir de décision plus important que les autres
        membres.
      </ul>
      <h2>Que pouvez-vous proposer ?</h2>
      <p>Vous pouvez proposer les types de changements suivants :</p>
      <ul>
        <li>
          Ajout de nouvelles couleurs : proposez une nouvelle couleur en
          spécifiant les valeurs R, G et B correspondantes
        </li>
        <li>
          Agrandissement de la carte : proposez d'ajouter des pixels
          supplémentaires à la carte en spécifiant le nombre de pixels à ajouter
          en X et en Y
        </li>
        <li>
          Effacement d'une zone de la carte : proposez d'effacer une zone
          existante de la carte en spécifiant les coordonnées de la zone à
          effacer
        </li>
      </ul>
      <h2>Bonne utilisation !</h2>
      <p>
        Nous espérons que vous apprécierez notre site web de DAO de la carte de
        pixels. N'hésitez pas à nous contacter si vous avez des questions ou des
        suggestions d'amélioration.
      </p>
    </div>
  );
};
