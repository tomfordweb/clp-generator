import React from "react";
import PropTypes from "prop-types";
import En15494Display from "../En15494Display/En15494Display";
import "./LabelDisplay.scss";
import {
  Page,
  Image,
  Text,
  View,
  Document,
  Font,
  StyleSheet,
} from "@react-pdf/renderer";
import Label from "../Label/Label";

const LabelDisplay = ({
  form,
  labelCount,
  size,
  orientation,
  wrapperStyles,
}) => {
  const labels = Array.from(Array(labelCount)).map((i) => (
    <Label key={i} form={form} />
  ));
  return (
    <Document>
      <Page size={size} orientation={orientation} style={wrapperStyles}>
        {labels}
      </Page>
    </Document>
  );
};

LabelDisplay.propTypes = {
  orientation: PropTypes.oneOf(["landscape", "portrait"]),
  form: PropTypes.object,
};

LabelDisplay.defaultProps = {
  orientation: "portrait",
  form: {},
};

export default LabelDisplay;
