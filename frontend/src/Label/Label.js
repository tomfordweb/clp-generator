import { Font, Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

import sourceSansProBold from "../fonts/SourceSansPro-Bold.ttf";
import sourceSansProExtraLight from "../fonts/SourceSansPro-ExtraLight.ttf";
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
    {
      src: sourceSansProExtraLight,
      fontWeight: 100,
      fontStyle: "regular",
    },
  ],
});

const styles = StyleSheet.create({
  bottomMargin: {
    marginBottom: "5px",
  },
  roundContainer: {
    borderRadius: "50%",
    height: "100%",
    width: "100%",
  },
  container: {
    fontSize: "5px",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
  },
  customTitle: {
    fontWeight: 100,
    fontSize: "16px",
    fontFamily: "SourceSansPro",
  },
  specialText: {
    fontWeight: "bold",
    fontFamily: "SourceSansPro",
  },
  title: {
    fontSize: "14px",
  },
  batchContainer: {
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  batchItemSpacing: {
    marginLeft: "5px",
    marginRight: "5px",
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
    border: form.showBorder ? "1px dashed #ddd" : "none",
    // there is no "box sizing: border-box" here so
    // we need to subtract the width of the border from
    // padding to make sure item alignment doesn't change...welcome to my hell
    padding:
      form.labelStyle === "round" ? (form.showBorder ? "19px" : "20px") : "5px",
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
      <Text style={styles.customTitle}>{form.custom_title}</Text>
      <Text style={{ ...styles.specialText, ...styles.title }}>
        {form.fragrance}
      </Text>
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
          {eanCode && (
            <Image
              source={eanCode}
              style={{ width: "30%", height: "auto", marginRight: "5px" }}
            />
          )}
          <PictogramDisplay
            containerStyles={{
              marginLeft: "5px",
              marginTop: "5px",
              position: "relative",
              overflow: "hidden",
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
      <View style={{ ...styles.batchContainer, ...styles.bottomMargin }}>
        <Text style={{ ...styles.specialText, ...styles.batchItemSpacing }}>
          {form.batch ? `BN: ${form.batch}` : " "}
        </Text>
        <Text
          style={{
            ...styles.batchItemSpacing,
            ...styles.specialText,
          }}
        >
          {form.ufi ? `UFI: ${form.ufi}` : " "}
        </Text>
        <Text style={{ ...styles.specialText, ...styles.batchItemSpacing }}>
          {form.mass || " "}
        </Text>
      </View>
      <Text style={{ ...styles.tinyText, ...styles.bottomMargin }}>
        {form.productText}
      </Text>
      <View
        style={{
          ...styles.tinyText,
          ...styles.bottomMargin,
          ...{ display: "flex", alignItems: "center" },
        }}
      >
        <Text>{form.business_name}</Text>
        <Text>{form.business_address_1}</Text>
        <Text>{form.business_address_2}</Text>
        <Text>{form.business_telephone}</Text>
      </View>
      <Text style={{ ...styles.specialText, ...{ fontSize: "5px" } }}>
        {form.custom_text}
      </Text>
    </View>
  );
};

Label.propTypes = {};

Label.defaultProps = {
  pictogramContainerSize: 200,
  pictogramGutter: 1,
};

export default Label;
