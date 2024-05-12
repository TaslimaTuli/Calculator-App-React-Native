import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import Column from "./Column";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient";
import { StatusBar } from "react-native";

function Calculator() {
	const [expression, setExpression] = useState("");
	const [result, setResult] = useState("0");
	const colorScheme = useColorScheme();
	const [darkMode, setDarkMode] = useState(colorScheme === "dark");

	useEffect(() => {
		// Automatically switch between light and dark mode based on system color scheme
		if (colorScheme === "dark") {
			setDarkMode(true);
		} else {
			setDarkMode(false);
		}
	}, [colorScheme]);

	const handlePress = (value) => {
		// Evaluate expression if "=" is pressed
		if (value === "=") {
			try {
				const evalResult = eval(expression);
				setResult("= " + evalResult.toLocaleString());
			} catch (error) {
				setResult("Error");
			}
		} else if (value === "Ac") {
			// Clear expression and result if C is pressed
			setExpression("");
			setResult("");
		} else if (value === "back") {
			// Remove last character if back is pressed
			setExpression((prevExpression) => prevExpression.slice(0, prevExpression.length - 1));
		} else if (value === "%") {
			try {
				const evalResult = eval(expression);
				const percentage = evalResult / 100;
				// setExpression(percentage.toString());
				setResult(percentage.toLocaleString());
			} catch (error) {
				setResult("Error");
			}
		} else {
			setExpression((prevExpression) => prevExpression + value);
		}
	};

	const isOperator = (char) => {
		return ["+", "-", "*", "/"].includes(char);
	};

	const toggleDarkMode = () => {
		setDarkMode((prevMode) => !prevMode);
	};

	return (
		<LinearGradient colors={darkMode ? ["#17181a", "#111112"] : ["#f7f8fb", "#9ecde8"]} className="h-full items-center flex flex-col">
			<View className="h-full justify-end p-5 ">
				{/* StatusBar */}
				<StatusBar barStyle={darkMode ? "light-content" : "dark-content"} backgroundColor={darkMode ? "#17181a" : "#f7f8fb"} />
				{/* dark/light mode toggle */}
				<TouchableOpacity onPress={toggleDarkMode} className="absolute top-4 left-4 mx-5 my-2.5">
					<Icon name={darkMode ? "white-balance-sunny" : "moon-waning-crescent"} size={24} color={darkMode ? "#fff" : "#000"} />
				</TouchableOpacity>
				{/* Input expression */}
				<Text className={`text-4xl mb-8 px-3 text-right ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
					{expression.split("").map((char, index) => (
						<Text key={index} className={isOperator(char) ? (darkMode ? "text-sky-400" : "text-sky-600") : ""}>
							{char}
						</Text>
					))}
				</Text>
				{/* show result */}
				<Text className={`text-6xl font-bold mb-16 px-3 text-right ${darkMode ? "text-white" : "text-gray-600"}`}>{result}</Text>
				{/* calculator buttons */}
				<View className="flex flex-row">
					<Column>
						<TouchableOpacity
							className={`bg-white py-0 px-0 h-9 rounded-full w-16 mx-5 my-2.5 border-solid border-2 border-white items-center justify-center ${
								darkMode ? "bg-neutral-800 border-neutral-800" : "bg-sky-50	border-white"
							}`}
							onPress={() => handlePress("e")}
						>
							<Text className={`text-xl ${darkMode ? "text-sky-500" : "text-gray-300"} text-center font-bold`}>e</Text>
						</TouchableOpacity>

						{["Ac", "7", "4", "1"].map((value) => (
							<TouchableOpacity
								key={value}
								className={`py-3 px-3 m-1  mx-5 my-2.5 rounded-[20px] border-solid border-2 w-16 items-center justify-center ${
									value === "Ac"
										? darkMode
											? "bg-neutral-600 border-neutral-600"
											: "bg-sky-100	border-sky-50"
										: darkMode
										? "bg-neutral-800 border-neutral-800"
										: "bg-sky-50	border-white"
								}`}
								onPress={() => handlePress(value)}
							>
								<Text
									className={`text-3xl ${
										value === "Ac" ? (darkMode ? "text-gray-400" : "text-gray-400") : darkMode ? "text-sky-500" : "text-gray-300"
									} text-center font-black`}
								>
									{value}
								</Text>
							</TouchableOpacity>
						))}

						<TouchableOpacity
							className={`  py-3 px-3 m-1 rounded-[20px] w-40 mx-5 my-2.5 border-solid border-2 border-white items-center justify-center ${
								darkMode ? "bg-neutral-800 border-neutral-800" : "bg-sky-50	border-white"
							}`}
							onPress={() => handlePress("0")}
						>
							<Text className={`text-3xl ${darkMode ? "text-sky-500" : "text-gray-300"} text-center font-black`}>0</Text>
						</TouchableOpacity>
					</Column>

					<Column>
						<TouchableOpacity
							className={` py-0 px-0 h-9 w-16 rounded-[20px] mx-5 my-2.5 border-solid border-2  items-center justify-center ${
								darkMode ? "bg-neutral-800 border-neutral-800" : "bg-sky-50	border-white"
							}`}
							onPress={() => handlePress("(")}
						>
							<Text className={`text-xl ${darkMode ? "text-sky-500" : "text-gray-300"} text-center font-bold`}>{"("}</Text>
						</TouchableOpacity>

						{["back", "8", "5", "2"].map((value) => (
							<TouchableOpacity
								key={value}
								className={` py-3 px-3 m-1 rounded-[20px] mx-5 my-2.5 w-16 border-solid border-2 items-center justify-center ${
									value === "back"
										? darkMode
											? "bg-neutral-600 border-neutral-600"
											: "bg-sky-100	border-sky-50"
										: darkMode
										? "bg-neutral-800 border-neutral-800"
										: "bg-sky-50 border-white"
								}`}
								onPress={() => handlePress(value)}
							>
								{value === "back" ? (
									<Icon name="backspace-outline" size={30} color="rgb(156 163 175)" />
								) : (
									<Text className={`text-3xl ${darkMode ? "text-sky-500" : "text-gray-300"} text-center font-black`}>{value}</Text>
								)}
							</TouchableOpacity>
						))}
					</Column>

					<Column>
						<TouchableOpacity
							className={`h-9 py-0 px-0 w-16 rounded-[20px] mx-5 my-2.5  border-solid border-2  items-center justify-center ${
								darkMode ? "bg-neutral-800 border-neutral-800" : "bg-sky-50	border-white"
							}`}
							onPress={() => handlePress(")")}
						>
							<Text className={`text-xl ${darkMode ? "text-sky-500" : "text-gray-300"} text-center font-bold`}>{")"}</Text>
						</TouchableOpacity>

						{["/", "9", "6", "3", "."].map((value) => (
							<TouchableOpacity
								key={value}
								className={`${
									value === "/"
										? darkMode
											? "bg-sky-900 border-sky-900"
											: "bg-sky-300	border-sky-200"
										: darkMode
										? "bg-neutral-800 border-neutral-800"
										: "bg-sky-50	border-white"
								}
								} w-16 py-3 px-3 m-1 mx-5 my-2.5 rounded-[20px] items-center justify-center border-solid border-2  `}
								onPress={() => handlePress(value)}
							>
								<Text
									className={`text-3xl text-center font-black ${
										value === "/" ? (darkMode ? "text-sky-300" : "text-sky-700 ") : darkMode ? "text-sky-500" : "text-gray-300"
									}`}
								>
									{value}
								</Text>
							</TouchableOpacity>
						))}
					</Column>

					<Column>
						<TouchableOpacity
							className={`h-9 py-0 px-0  rounded-[20px] mx-5 my-2.5 border-solid border-2  items-center justify-center ${
								darkMode ? "bg-neutral-800 border-neutral-800" : "bg-sky-50	border-white"
							}`}
							onPress={() => handlePress("%")}
						>
							<Text className={`text-xl ${darkMode ? "text-sky-500" : "text-gray-300"} text-center font-bold`}>%</Text>
						</TouchableOpacity>

						{["*", "-", "+", "="].map((value) => (
							<TouchableOpacity
								key={value}
								className={`py-3 px-3 m-1 rounded-[20px] mx-4 my-2.5 border-solid border-2  items-center justify-center
								${
									value === "="
										? darkMode
											? "bg-sky-600 border-sky-600"
											: "bg-sky-500	border-sky-200"
										: darkMode
										? "bg-sky-900 border-sky-900"
										: "bg-sky-300	border-sky-200"
								}  ${value === "=" || value === "+" ? "h-[100] " : ""}`}
								onPress={() => handlePress(value)}
							>
								<Text className={`text-3xl text-center font-black ${darkMode ? "text-sky-300" : "text-sky-700 "}`}>{value}</Text>
							</TouchableOpacity>
						))}
					</Column>
				</View>
			</View>
		</LinearGradient>
	);
}

export default Calculator;
