import React from "react";
import RelatedContent from "../RelatedContent";

const PeopleDetail = ({
  type,
  infos,
  species,
  homeWorld,
  vehicles,
  starships,
}) => {
  const relatedContentArr = [species, homeWorld, vehicles, starships];
  return (
    <section className={"fiche fiche-" + type}>
      <h1 className="glowing-title">{infos.name}</h1>
      <table className="divers">
        {infos.gender && (
          <tr>
            <td className="label">Gender</td>{" "}
            <td className="info">{infos.gender}</td>
          </tr>
        )}
        {infos.birth_year && (
          <tr>
            <td className="label">Birth year</td>{" "}
            <td className="info">{infos.birth_year}</td>
          </tr>
        )}
        {infos.mass && (
          <tr>
            <td className="label">Mass</td>{" "}
            <td className="info">{infos.mass}</td>
          </tr>
        )}
        {infos.height && (
          <tr>
            <td className="label">Height</td>{" "}
            <td className="info">{infos.height}</td>
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

export default PeopleDetail;
