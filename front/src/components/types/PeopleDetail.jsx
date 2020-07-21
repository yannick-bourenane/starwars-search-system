import React, { useEffect, useState } from "react";
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
      <h1>{infos.name}</h1>
      <ul className="divers">
        {infos.gender && <li>Gender : {infos.gender}</li>}
        {infos.birth_year && <li>Birth year : {infos.birth_year}</li>}
        {infos.mass && <li>Mass : {infos.mass}</li>}
        {infos.height && <li>Height : {infos.height}</li>}
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

export default PeopleDetail;
