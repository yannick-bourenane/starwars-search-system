import React from "react";
import RelatedContent from "../RelatedContent";

const VehicleDetail = ({ type, infos, people }) => {
  const relatedContentArr = [people];
  return (
    <section className={"fiche fiche-" + type}>
      <h1 className="glowing-title">{infos.name}</h1>
      <table className="divers">
        {(infos.model && infos.model) !== infos.name && (
          <tr>
            <td className="label">Model</td>{" "}
            <td className="info">{infos.model}</td>
          </tr>
        )}
        {infos.manufacturer && (
          <tr>
            <td className="label">Manufacturer</td>{" "}
            <td className="info">{infos.manufacturer}</td>
          </tr>
        )}
        {infos.cost_in_credits && (
          <tr>
            <td className="label">Cost</td>{" "}
            <td className="info">{infos.cost_in_credits} credits</td>
          </tr>
        )}
        {infos.length && (
          <tr>
            <td className="label">Length</td>{" "}
            <td className="info">{infos.length}</td>
          </tr>
        )}
        {infos.max_atmosphering_speed && (
          <tr>
            <td className="label">Max atmosphering speed</td>{" "}
            <td className="info">{infos.max_atmosphering_speed}</td>
          </tr>
        )}
        {infos.crew && (
          <tr>
            {" "}
            <td className="label">Crew</td>{" "}
            <td className="info">{infos.crew}</td>
          </tr>
        )}
        {infos.passengers && (
          <tr>
            <td className="label">Passengers</td>{" "}
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

export default VehicleDetail;
