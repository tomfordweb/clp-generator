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
    marginBottom: "10px",
  },
  roundContainer: {
    textAlign: "center",
    borderRadius: "50%",
    height: "100%",
    width: "100%",
  },
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "hidden",
  },
  customTitle: {
    fontWeight: 100,
    fontFamily: "SourceSansPro",
  },
  specialText: {
    fontWeight: "bold",
    fontFamily: "SourceSansPro",
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
});
const Label = ({ eanCode, form, pictogramContainerSize, pictogramGutter }) => {
  const sharedDynamicContainerStyles = {
    border: form.showBorder ? "1px dashed #ddd" : "none",
    // there is no "box sizing: border-box" here so
    // we need to subtract the width of the border from
    // padding to make sure item alignment doesn't change...welcome to my hell
    padding: "10px",
    // padding:
    //   form.labelStyle === "round" ? (form.showBorder ? "14px" : "15px") : "5px",
  };

  const label = form.alternate_title
    ? form.alternate_title
    : form.custom_title
    ? form.custom_title
    : form.fragrance;

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
      <Text
        style={{
          ...styles.specialText,
          ...styles.bottomMargin,
          fontSize: `${form.titleFontSize}px`,
          paddingTop: `${form.titlePaddingTop}px`,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
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
              position: "relative",
              display: "block",
              width: `${pictogramContainerSize}px`,
              // height: `${pictogramContainerSize + pictogramGutter / 5}px`,
              height: "75px",
            }}
            imageStyles={[
              {
                left: "1%",
                top: "38%",
                height: `${pictogramContainerSize / 2 - pictogramGutter}px`,
                width: `${pictogramContainerSize / 2 - pictogramGutter}px`,
                position: "absolute",
              },
              {
                height: `${pictogramContainerSize / 2 - pictogramGutter}px`,
                width: `${pictogramContainerSize / 2 - pictogramGutter}px`,
                top: `10%`,
                left: "25.8%",
                position: "absolute",
              },
              {
                height: `${pictogramContainerSize / 2 - pictogramGutter}px`,
                width: `${pictogramContainerSize / 2 - pictogramGutter}px`,
                right: "0",
                top: "38%",
                position: "absolute",
              },
            ]}
            type="pdf"
            images={form.pictograms}
          />
        </View>
      </View>
      <Text
        style={{
          ...styles.bottomMargin,
          fontSize: `${form.warningTextFontSize}px`,
        }}
      >
        {form.productText}
      </Text>
      <View
        style={{
          ...styles.bottomMargin,
          display: "flex",
          alignItems: "center",
          fontSize: `${form.textFontSize}px`,
        }}
      >
        <Text>{form.business_name}</Text>
        <Text>{form.business_address_1}</Text>
        <Text>{form.business_address_2}</Text>
        <Text>{form.business_telephone}</Text>
      </View>
      <Text
        style={{
          ...styles.bottomMargin,
          ...styles.specialText,
          fontSize: `${form.textFontSize}px`,
        }}
      >
        {form.custom_text}
      </Text>
      <View style={{ ...styles.batchContainer, alignSelf: "flex-end" }}>
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
        <Text
          style={{
            ...styles.specialText,
            ...styles.batchItemSpacing,
            alignSelf: "flex-end",
          }}
        >
          {form.mass || " "}
        </Text>
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
