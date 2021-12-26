import React from "react";
import PropTypes from "prop-types";
import { Page, Document } from "@react-pdf/renderer";
import Label from "../Label/Label";

const LabelDisplay = ({ form, size, orientation, wrapperStyles }) => {
  console.log("ld", form);
  return (
    <Document data-testid="LabelDisplay">
      <Page size={size} orientation={orientation} style={wrapperStyles}>
        {form && <Label pictogramContainerSize={size[0] / 3} form={form} />}
      </Page>
    </Document>
  );
};

LabelDisplay.propTypes = {
  orientation: PropTypes.oneOf(["landscape", "portrait"]),
  form: PropTypes.object,
  size: PropTypes.arrayOf(PropTypes.number),
};

LabelDisplay.defaultProps = {
  orientation: "portrait",
  form: {},
  size: [180, 180],
};

export default LabelDisplay;
