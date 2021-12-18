import { Image, View } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import fish from "../images/pictograms/fish.png";
import flamable from "../images/pictograms/flamable.png";
import warning from "../images/pictograms/warning.png";

const PictogramDisplay = ({ type, images, imageStyles, containerStyles }) => {
  const imageSrcs = {
    1: warning,
    2: flamable,
    3: fish,
  };

  const imageHelper = (index) => {
    if (imageStyles && imageStyles[index]) {
      return imageStyles[index];
    }

    if (imageStyles && imageStyles[0]) {
      return imageStyles[0];
    }

    return {};
  };

  const displayImages = images.map((image, index) =>
    type === "pdf" ? (
      <Image key={image} src={imageSrcs[image]} style={imageHelper(index)} />
    ) : (
      <img
        style={imageHelper(index)}
        key={image}
        src={imageSrcs[image]}
        className="en-icon"
      />
    )
  );

  return images.length ? (
    type === "pdf" ? (
      <View
        style={{ display: "flex", flexDirection: "row", ...containerStyles }}
      >
        {displayImages}
      </View>
    ) : (
      <div style={containerStyles}>{displayImages}</div>
    )
  ) : null;
};

PictogramDisplay.propTypes = {};

PictogramDisplay.defaultProps = {
  containerStyles: {},
};

export default PictogramDisplay;
