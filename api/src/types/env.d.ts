declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV?: 'cloud' | 'local';
		DB_URL?: string;
		PORT?: string;
		HOST?: string;
		JWT_SECRET?: string;
	};
};