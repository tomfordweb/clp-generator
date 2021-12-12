import React from "react";
import PropTypes from "prop-types";
import { Image, View } from "@react-pdf/renderer";
import en15494_1 from "../images/1.png";
import en15494_2 from "../images/2.png";
import en15494_3 from "../images/3.png";
import en15494_4 from "../images/4.png";
import en15494_5 from "../images/5.png";
import en15494_6 from "../images/6.png";

const En15494Display = ({ type, images, imageStyles }) => {
  const imageSrcs = {
    1: en15494_1,
    2: en15494_2,
    3: en15494_3,
    4: en15494_4,
    5: en15494_5,
    6: en15494_6,
  };

  const displayImages = images.map((image) =>
    type === "pdf" ? (
      <Image key={image} src={imageSrcs[image]} style={imageStyles} />
    ) : (
      <img
        key={image}
        src={imageSrcs[image]}
        className="en-icon"
        style={imageStyles}
      />
    )
  );

  return type === "pdf" ? (
    <View style={{ display: "flex", flexDirection: "row" }}>
      {displayImages}
    </View>
  ) : (
    <div>{displayImages}</div>
  );
};

En15494Display.propTypes = {};

En15494Display.defaultProps = {};

export default En15494Display;
