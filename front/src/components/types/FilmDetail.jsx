import React from "react";
import RelatedContent from "../RelatedContent";

const FilmDetail = ({
  type,
  infos,
  people,
  species,
  planets,
  vehicles,
  starships,
}) => {
  const relatedContentArr = [people, species, planets, vehicles, starships];
  return (
    <section className={"fiche fiche-" + type}>
      <h1 className="glowing-title">{infos.title}</h1>
      <table className="divers">
        {infos.episode_id && (
          <tr>
            <td className="label">Movie n°</td>{" "}
            <td className="info">{infos.episode_id}</td>
          </tr>
        )}
        {infos.director && (
          <tr>
            <td className="label">Director</td>{" "}
            <td className="info">{infos.director}</td>
          </tr>
        )}
        {infos.producer && (
          <tr>
            <td className="label">Producer</td>{" "}
            <td className="info">{infos.producer}</td>
          </tr>
        )}
        {infos.release_date && (
          <tr>
            <td className="label">Release date</td>{" "}
            <td className="info">{infos.release_date}</td>
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

export default FilmDetail;
