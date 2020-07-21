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
      <h1>{infos.title}</h1>
      <ul className="divers">
        {infos.episode_id && (
          <li>
            <b>Movie n°</b> : {infos.episode_id}
          </li>
        )}
        {infos.director && (
          <li>
            <b>Director</b> : {infos.director}
          </li>
        )}
        {infos.producer && (
          <li>
            <b>Producer</b> : {infos.producer}
          </li>
        )}
        {infos.release_date && (
          <li>
            <b>Release date</b> : {infos.release_date}
          </li>
        )}
      </ul>
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
