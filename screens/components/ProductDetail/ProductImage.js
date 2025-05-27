import React from "react";
import { Image } from "react-native";
import { URLServer } from "../../../api/apiConfig";

const ProductImage = ({ encodeAnh }) => (
  <Image
    source={{ uri: `${URLServer}/images${encodeAnh}` }}
    style={{ width: "100%", height: 300, resizeMode: "cover" }}
  />
);

export default ProductImage;
