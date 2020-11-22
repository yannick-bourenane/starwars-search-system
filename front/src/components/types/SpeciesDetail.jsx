import React from "react";
import RelatedContent from "../RelatedContent";

const SpeciesDetail = ({ type, infos, people, homeWorld }) => {
  const relatedContentArr = [people, homeWorld];
  return (
    <section className={"fiche fiche-" + type}>
      <h1 className="glowing-title">{infos.name}</h1>
      <table className="divers">
        {infos.classification && (
          <tr>
            <td className="label">Classification</td>{" "}
            <td className="info">{infos.classification}</td>
          </tr>
        )}
        {infos.average_height && (
          <tr>
            <td className="label">Average height</td>{" "}
            <td className="info">{infos.average_height}</td>
          </tr>
        )}
        {infos.skin_colors && (
          <tr>
            <td className="label">Skin colors</td>{" "}
            <td className="info">{infos.skin_colors}</td>
          </tr>
        )}
        {infos.hair_colors && (
          <tr>
            <td className="label">Hair colors</td>{" "}
            <td className="info">{infos.hair_colors}</td>
          </tr>
        )}
        {infos.eye_colors && (
          <tr>
            <td className="label">Eye colors</td>{" "}
            <td className="info">{infos.eye_colors}</td>
          </tr>
        )}
        {infos.average_lifetd && (
          <tr>
            <td className="label">Average lifetd</td>{" "}
            <td className="info">{infos.average_lifetd}</td>
          </tr>
        )}
        {infos.language && (
          <tr>
            <td className="label">Language</td>{" "}
            <td className="info">{infos.language}</td>
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

export default SpeciesDetail;
