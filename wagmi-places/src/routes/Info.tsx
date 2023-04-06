import React from "react";

import {
  Heading,
  Center,
  Wrap,
  WrapItem,
  Flex,
  Spacer,
  OrderedList,
  ListItem,
  Container,
} from "@chakra-ui/react";

export const Info = () => {
  return (
    <div>
      <Container>
        <Heading>Carte de Pixels</Heading>
        <p>
          Bienvenue sur notre site web de carte de pixels ! Ici, vous pouvez
          voter pour la couleur que vous souhaitez voir utilisée pour chaque
          pixel de la carte. La couleur la plus populaire pour chaque pixel sera
          utilisée pour le colorier.
        </p>

        <Heading as={"h2"}>Comment ça marche ?</Heading>
        <OrderedList>
          <ListItem>Connectez vous via les boutons en haut à droite</ListItem>

          <ListItem>Cliquez sur le pixel que vous souhaitez colorier</ListItem>
          <ListItem>
            Sélectionnez la couleur que vous souhaitez utiliser parmi celles
            disponibles
          </ListItem>
          <ListItem>
            Votez pour la couleur en cliquant sur le bouton "Voter"
          </ListItem>
          <ListItem>
            Attendez que les autres utilisateurs votent pour leur couleur
            préférée
          </ListItem>
          <ListItem>
            La couleur la plus populaire sera utilisée pour colorier le pixel
            sélectionné
          </ListItem>
        </OrderedList>

        <Heading as={"h2"}>Règles du site</Heading>
        <p>
          Pour garantir une expérience agréable pour tous les utilisateurs, la
          carte est géréé par une <a href="/dao">DAO</a>
          Chaque joueur qui vote pour des pixels est automatiquement membre de
          la DAO.
        </p>

        <Heading as={"h2"}>Couleurs disponibles</Heading>
        <p>
          Certaines couleurs sont disponibles. Si vous souhaitez en avoir plus
          vous pouvez en proposer via la <a href="/dao">DAO</a>
        </p>

        <Heading as={"h2"}>Bonne utilisation !</Heading>
        <p>
          Nous espérons que vous apprécierez notre site web de carte de pixels.
          N'hésitez pas à nous contacter si vous avez des questions ou des
          suggestions d'amélioration.
        </p>
      </Container>
    </div>
  );
};
