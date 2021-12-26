import { Font, StyleSheet, Image, Text, View } from "@react-pdf/renderer";
import React from "react";

import sourceSansProBold from "../fonts/SourceSansPro-Bold.ttf";
import sourceSansProItalic from "../fonts/SourceSansPro-Italic.ttf";
import sourceSansProRegular from "../fonts/SourceSansPro-Regular.ttf";
import PictogramDisplay from "../PictogramDisplay/PictogramDisplay";

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
    height: "100%",
    width: "100%",
  },
  container: {
    fontSize: "5px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
  },
  title: {
    fontWeight: "bold",
    fontSize: "14px",
    fontFamily: "SourceSansPro",
  },
  batchContainer: {
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  tinyText: {
    fontSize: "3px",
  },
});
const Label = ({ eanCode, form, pictogramContainerSize, pictogramGutter }) => {
  const sharedDynamicContainerStyles = {
    border: form.showBorder ? "3px dashed #000" : "none",
  };

  return (
    <View
      data-testid="Label"
      style={
        form.labelStyle === "round"
          ? {
              ...styles.container,
              ...styles.roundContainer,
              ...sharedDynamicContainerStyles,
            }
          : { ...sharedDynamicContainerStyles, ...styles.container }
      }
    >
      <Text style={styles.title}>{form.fragrance}</Text>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          marginBottom: styles.bottomMargin.marginBottom,
        }}
      >
        <View style={styles.batchContainer}>
          <Image
            source={eanCode}
            style={{ width: "30%", height: "auto", marginRight: "5px" }}
          />
          <PictogramDisplay
            containerStyles={{
              marginLeft: "5px",
              marginTop: "5px",
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
                top: "29%",
                left: "27%",
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
            images={form.pictograms}
          />
        </View>
      </View>
      <Text style={{ ...styles.tinyText, ...styles.bottomMargin }}>
        {form.productText}
      </Text>
      <View style={{ ...styles.batchContainer, ...styles.bottomMargin }}>
        <Text>
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
        <Text style={{ marginLeft: "10px" }}>~{form.mass} Net</Text>
      </View>
      <View
        style={{
          ...styles.tinyText,
          ...{ display: "flex", alignItems: "center" },
        }}
      >
        <Text>{form.business_name}</Text>
        <Text>{form.business_address_1}</Text>
        <Text>{form.business_address_2}</Text>
        <Text>{form.business_telephone}</Text>
      </View>
    </View>
  );
};

Label.propTypes = {};

Label.defaultProps = {
  pictogramContainerSize: 200,
  pictogramGutter: 1,
};

export default Label;
