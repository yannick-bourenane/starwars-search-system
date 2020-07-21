import React from "react";
import { Link } from "react-router-dom";

const relatedContent = ({ related }) => {
  return (
    <div className="related">
      <h5>{related[0].label} : </h5>
      <div className={"list list-" + related[0].type}>
        {related.map((infos) => (
          <Link
            key={infos.name}
            to={{
              pathname: "/detailed",
              state: {
                url: infos.url,
                type: infos.type,
              },
            }}
          >
            {infos.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default relatedContent;
