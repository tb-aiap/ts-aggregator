import fs, { read } from "fs";
import os from "os";
import path from "path";

const configFile = ".gatorconfig.json";

type Config = {
	dbUrl: string;
	currentUserName: string;
};

export function setUser(userName: string) {
	const config = readConfig();
	config.currentUserName = userName;
	writeConfig(config);
}

function writeConfig(config: Config) {
	const jsonPath = getConfigFilePath();
	const rawConfig = {
		db_url: config.dbUrl,
		current_user_name: config.currentUserName,
	};
	const data = JSON.stringify(rawConfig, null, 2);
	fs.writeFileSync(jsonPath, data, { encoding: "utf-8" });
}

export function readConfig(): Config {
	const jsonPath = getConfigFilePath();
	const jsonContent = fs.readFileSync(jsonPath, { encoding: "utf-8" });
	const config = JSON.parse(jsonContent);
	return validateConfig(config);
}

function getConfigFilePath(): string {
	const homeDir = os.homedir();
	return path.join(homeDir, configFile);
}

function validateConfig(rawConfig: any): Config {
	if (!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
		throw new Error("db_url is required for config file.");
	}
	const config: Config = {
		dbUrl: rawConfig.db_url,
		currentUserName: rawConfig.current_user_name,
	};

	if (
		rawConfig.current_user_name &&
		typeof rawConfig.current_user_name !== "string"
	) {
		config.currentUserName = rawConfig.current_user_name;
	}

	return config;
}
