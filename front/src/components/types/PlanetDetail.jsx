import React from "react";
import RelatedContent from "../RelatedContent";

const PlanetDetail = ({ type, infos, people }) => {
  const relatedContentArr = [people];
  return (
    <section className={"fiche fiche-" + type}>
      <h1 className="glowing-title">{infos.name}</h1>
      <table className="divers">
        {infos.climate && (
          <tr>
            <td className="label">Climate</td>{" "}
            <td className="info">{infos.climate}</td>
          </tr>
        )}
        {infos.terrain && (
          <tr>
            <td className="label">Terrain</td>{" "}
            <td className="info">{infos.terrain}</td>
          </tr>
        )}
        {infos.gravity && (
          <tr>
            <td className="label">Gravity</td>{" "}
            <td className="info">{infos.gravity}</td>
          </tr>
        )}
        {infos.population && (
          <tr>
            <td className="label">Population</td>{" "}
            <td className="info">{infos.population}</td>
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

export default PlanetDetail;
