import React from "react";
import PropTypes from "prop-types";
import { Page, Document } from "@react-pdf/renderer";
import Label from "../Label/Label";

const LabelDisplay = ({
  form,
  eanBase64,
  size,
  orientation,
  wrapperStyles,
}) => {
  return (
    <Document data-testid="LabelDisplay">
      <Page size={size} orientation={orientation} style={wrapperStyles}>
        {form && (
          <Label
            eanCode={eanBase64}
            pictogramContainerSize={size[0] / 2.5}
            form={form}
          />
        )}
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
  size: [190, 190],
};

export default LabelDisplay;
