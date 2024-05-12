import React from "react";
import { View } from "react-native";

const Column = ({ children }) => (
	<View>
		{children.map((child, index) => (
			<View key={index} className="flex flex-row justify-center">
				{index === 0 ? <View className="text-xs w-24">{child}</View> : <View className="flex-1">{child}</View>}
			</View>
		))}
	</View>
);

export default Column;
