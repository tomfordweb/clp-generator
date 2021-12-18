import React from "react";
import PropTypes from "prop-types";
import "./LabelDisplay.scss";
import { Page, Document } from "@react-pdf/renderer";
import Label from "../Label/Label";

const LabelDisplay = ({ form, size, orientation, wrapperStyles }) => {
  return (
    <Document>
      <Page size={size} orientation={orientation} style={wrapperStyles}>
        <Label pictogramContainerSize={size[0] / 3} form={form} />
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
