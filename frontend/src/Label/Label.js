import {
  Document,
  Font,
  Image,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import En15494Display from "../En15494Display/En15494Display";
import sourceSansProBold from "../fonts/SourceSansPro-Bold.ttf";
import sourceSansProItalic from "../fonts/SourceSansPro-Italic.ttf";
import sourceSansProRegular from "../fonts/SourceSansPro-Regular.ttf";
import caution from "../images/caution.png";

Font.register({
  family: "SourceSansPro",
  fonts: [
    {
      src: sourceSansProRegular,
    },
    {
      src: sourceSansProBold,
      fontWeight: "bold",
    },
    {
      src: sourceSansProItalic,
      fontWeight: "normal",
      fontStyle: "italic",
    },
  ],
});

const styles = StyleSheet.create({
  bottomMargin: {
    marginBottom: "5px",
  },
  roundContainer: {
    borderRadius: "50%",
    padding: "20px",
    height: "180px",
  },
  container: {},
  title: {
    fontWeight: "bold",
    fontSize: "14px",
    fontFamily: "SourceSansPro",
    fontWeight: "bold",
  },
  batchContainer: {
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "space-between",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});
const Label = ({ form, pictogramContainerSize, pictogramGutter }) => {
  const containerStyles = {
    width: "180px",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    border: form.showBorder ? "3px dashed #000" : "none",
    padding: "5px",
    fontSize: "5px",
  };

  return (
    <View
      style={
        form.labelStyle === "round"
          ? { ...containerStyles, ...styles.roundContainer }
          : containerStyles
      }
    >
      <Text style={styles.title}>{form.fragrance}</Text>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: styles.bottomMargin.marginBottom,
        }}
      >
        <En15494Display
          containerStyles={{
            position: "relative",
            width: `${pictogramContainerSize}px`,
            height: `${pictogramContainerSize}px`,
          }}
          imageStyles={[
            {
              left: "0",
              height: `${pictogramContainerSize / 2 - pictogramGutter}px`,
              width: `${pictogramContainerSize / 2 - pictogramGutter}px`,
              position: "absolute",
            },
            {
              height: `${pictogramContainerSize / 2 - pictogramGutter}px`,
              width: `${pictogramContainerSize / 2 - pictogramGutter}px`,
              top: "32%",
              left: "26%",
              position: "absolute",
            },
            {
              height: `${pictogramContainerSize / 2 - pictogramGutter}px`,
              width: `${pictogramContainerSize / 2 - pictogramGutter}px`,
              right: "0",
              position: "absolute",
            },
          ]}
          type="pdf"
          images={form.en15494}
        />
      </View>
      <Text style={{ fontSize: "4px" }}>{form.productText}</Text>
      <View style={styles.bottomMargin}></View>
      <View style={styles.batchContainer}>
        <Text style={{ marginRight: "10px" }}>
          <strong>BN: </strong>
          {form.batch}
        </Text>
        <Text
          style={{
            marginLeft: "10px",
          }}
        >
          <strong>UFI:</strong>
          {form.ufi}
        </Text>
      </View>
      <Text>{form.business_name}</Text>
      <Text>{form.business_address}</Text>
      <Text>{form.business_telephone}</Text>
      <Text>~{form.mass}g Net</Text>
    </View>
  );
};

Label.propTypes = {};

Label.defaultProps = {
  pictogramContainerSize: 200,
  pictogramGutter: 1,
};

export default Label;
