import React from "react";
import RelatedContent from "../RelatedContent";

const StarshipDetail = ({ type, infos, people }) => {
  const relatedContentArr = [people];
  return (
    <section className={"fiche fiche-" + type}>
      <h1 className="glowing-title">{infos.name}</h1>
      <table className="divers">
        {(infos.model && infos.model) !== infos.name && (
          <tr>
            <td className="label">Modèle</td>{" "}
            <td className="info">{infos.model}</td>
          </tr>
        )}
        {infos.manufacturer && (
          <tr>
            <td className="label">Constructeur</td>{" "}
            <td className="info">{infos.manufacturer}</td>
          </tr>
        )}
        {infos.cost_in_credits && (
          <tr>
            <td className="label">Coût</td>{" "}
            <td className="info">{infos.cost_in_credits} crédits</td>
          </tr>
        )}
        {infos.length && (
          <tr>
            <td className="label">Longueur</td>{" "}
            <td className="info">{infos.length}</td>
          </tr>
        )}
        {infos.max_atmosphering_speed && (
          <tr>
            <td className="label">Vitesse maximale en atmosphère</td>{" "}
            <td className="info">{infos.max_atmosphering_speed}</td>
          </tr>
        )}
        {infos.crew && (
          <tr>
            <td className="label">Equipage</td>{" "}
            <td className="info">{infos.crew}</td>
          </tr>
        )}
        {infos.passengers && (
          <tr>
            <td className="label">Passagers</td>{" "}
            <td className="info">{infos.passengers}</td>
          </tr>
        )}
      </table>
      {relatedContentArr.map(
        (related) =>
          related.length > 0 && (
            <RelatedContent related={related} key={related[0].type} />
          )
      )}
    </section>
  );
};

export default StarshipDetail;
